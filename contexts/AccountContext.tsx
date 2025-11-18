import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';

export interface Account {
  id: string;
  name: string;
  type: 'bank' | 'cash' | 'credit_card' | 'wallet';
  accountNumber?: string;
  bankName?: string;
  balance: number;
  isDefault: boolean;
  createdAt: Date;
}

interface AccountContextType {
  accounts: Account[];
  addAccount: (account: Omit<Account, 'id' | 'createdAt'>) => Promise<void>;
  updateAccount: (id: string, updates: Partial<Account>) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
  getAccountById: (id: string) => Account | undefined;
  updateAccountBalance: (id: string, amount: number, operation: 'add' | 'subtract') => Promise<void>;
  getTotalBalance: () => number;
  loadAccounts: () => Promise<void>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);

  const loadAccounts = async () => {
    if (!user) {
      setAccounts([]);
      return;
    }

    try {
      // Try to load from Firestore first
      const docRef = doc(db, 'users', user.uid, 'data', 'accounts');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const accountsWithDates = data.accounts.map((a: any) => ({
          ...a,
          createdAt: a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt),
        }));
        setAccounts(accountsWithDates);
        await AsyncStorage.setItem(`accounts_${user.uid}`, JSON.stringify(accountsWithDates));
      } else {
        // Fallback to AsyncStorage
        const storedAccounts = await AsyncStorage.getItem(`accounts_${user.uid}`);
        if (storedAccounts) {
          const parsed = JSON.parse(storedAccounts);
          const accountsWithDates = parsed.map((a: any) => ({
            ...a,
            createdAt: new Date(a.createdAt),
          }));
          setAccounts(accountsWithDates);
        } else {
          // Create default cash account
          const cashAccount: Account = {
            id: 'cash_' + Date.now(),
            name: 'Cash',
            type: 'cash',
            balance: 0,
            isDefault: true,
            createdAt: new Date(),
          };
          setAccounts([cashAccount]);
          await saveAccounts([cashAccount]);
        }
      }
    } catch (error) {
      console.error('Error loading accounts:', error);
      // Try AsyncStorage as fallback
      try {
        const storedAccounts = await AsyncStorage.getItem(`accounts_${user.uid}`);
        if (storedAccounts) {
          const parsed = JSON.parse(storedAccounts);
          const accountsWithDates = parsed.map((a: any) => ({
            ...a,
            createdAt: new Date(a.createdAt),
          }));
          setAccounts(accountsWithDates);
        }
      } catch (e) {
        console.error('Error loading from AsyncStorage:', e);
      }
    }
  };

  const saveAccounts = async (newAccounts: Account[]) => {
    if (!user) return;

    try {
      // Save to both Firestore and AsyncStorage
      const docRef = doc(db, 'users', user.uid, 'data', 'accounts');
      await setDoc(docRef, { accounts: newAccounts }, { merge: true });
      
      await AsyncStorage.setItem(
        `accounts_${user.uid}`,
        JSON.stringify(newAccounts)
      );
    } catch (error) {
      console.error('Error saving accounts:', error);
      // Still try to save to AsyncStorage if Firestore fails
      try {
        await AsyncStorage.setItem(
          `accounts_${user.uid}`,
          JSON.stringify(newAccounts)
        );
      } catch (e) {
        console.error('Error saving to AsyncStorage:', e);
      }
    }
  };

  const addAccount = async (account: Omit<Account, 'id' | 'createdAt'>) => {
    const newAccount: Account = {
      ...account,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    const newAccounts = [...accounts, newAccount];
    setAccounts(newAccounts);
    await saveAccounts(newAccounts);
  };

  const updateAccount = async (id: string, updates: Partial<Account>) => {
    const newAccounts = accounts.map(a =>
      a.id === id ? { ...a, ...updates } : a
    );
    setAccounts(newAccounts);
    await saveAccounts(newAccounts);
  };

  const deleteAccount = async (id: string) => {
    const newAccounts = accounts.filter(a => a.id !== id);
    setAccounts(newAccounts);
    await saveAccounts(newAccounts);
  };

  const getAccountById = (id: string): Account | undefined => {
    return accounts.find(a => a.id === id);
  };

  const updateAccountBalance = async (id: string, amount: number, operation: 'add' | 'subtract') => {
    const account = getAccountById(id);
    if (!account) return;

    const newBalance = operation === 'add' 
      ? account.balance + amount 
      : account.balance - amount;

    await updateAccount(id, { balance: newBalance });
  };

  const getTotalBalance = (): number => {
    return accounts.reduce((sum, account) => sum + account.balance, 0);
  };

  useEffect(() => {
    loadAccounts();
  }, [user]);

  return (
    <AccountContext.Provider
      value={{
        accounts,
        addAccount,
        updateAccount,
        deleteAccount,
        getAccountById,
        updateAccountBalance,
        getTotalBalance,
        loadAccounts,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccounts must be used within an AccountProvider');
  }
  return context;
};
