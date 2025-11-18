import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, PermissionsAndroid } from 'react-native';
import { parseBankingSMS, detectCategory } from './smsParser';
import { Transaction } from '../contexts/TransactionContext';

// Sample SMS messages for testing/development
interface SMSMessage {
  id: string;
  address: string;
  body: string;
  date: number;
}

const PROCESSED_SMS_KEY = 'processed_sms_ids';
const LAST_SMS_READ_TIME = 'last_sms_read_time';

export class SMSService {
  private static instance: SMSService;
  
  private constructor() {}
  
  static getInstance(): SMSService {
    if (!SMSService.instance) {
      SMSService.instance = new SMSService();
    }
    return SMSService.instance;
  }

  async requestSMSPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      return false;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'SMS Permission',
          message: 'Exptra needs access to read SMS for automatic transaction tracking',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting SMS permission:', error);
      return false;
    }
  }

  async checkSMSPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      return false;
    }

    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_SMS
      );
      return granted;
    } catch (error) {
      console.error('Error checking SMS permission:', error);
      return false;
    }
  }

  async getProcessedSMSIds(): Promise<Set<string>> {
    try {
      const processedIds = await AsyncStorage.getItem(PROCESSED_SMS_KEY);
      if (processedIds) {
        return new Set(JSON.parse(processedIds));
      }
      return new Set();
    } catch (error) {
      console.error('Error getting processed SMS IDs:', error);
      return new Set();
    }
  }

  async saveProcessedSMSId(id: string): Promise<void> {
    try {
      const processedIds = await this.getProcessedSMSIds();
      processedIds.add(id);
      await AsyncStorage.setItem(PROCESSED_SMS_KEY, JSON.stringify(Array.from(processedIds)));
    } catch (error) {
      console.error('Error saving processed SMS ID:', error);
    }
  }

  async getLastSMSReadTime(): Promise<number> {
    try {
      const lastTime = await AsyncStorage.getItem(LAST_SMS_READ_TIME);
      return lastTime ? parseInt(lastTime, 10) : 0;
    } catch (error) {
      console.error('Error getting last SMS read time:', error);
      return 0;
    }
  }

  async saveLastSMSReadTime(timestamp: number): Promise<void> {
    try {
      await AsyncStorage.setItem(LAST_SMS_READ_TIME, timestamp.toString());
    } catch (error) {
      console.error('Error saving last SMS read time:', error);
    }
  }

  // Generate sample SMS messages for testing
  private generateSampleSMS(): SMSMessage[] {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    return [
      {
        id: 'sms_1',
        address: 'SBI',
        body: 'Rs 1,250.00 debited from A/c XX1234 on 15-Nov-24 at SWIGGY BANGALORE. Avl Bal: Rs 25,340.50',
        date: now - 2 * dayMs,
      },
      {
        id: 'sms_2',
        address: 'HDFC',
        body: 'INR 5,000.00 credited to Account ending 5678 on 14-Nov-24. Salary credit. Avl Bal: INR 30,340.50',
        date: now - 3 * dayMs,
      },
      {
        id: 'sms_3',
        address: 'ICICI',
        body: 'Your A/c XX9012 is debited with Rs 800 on 13-Nov-24 for Amazon purchase. Avl bal: Rs 29,540.50',
        date: now - 4 * dayMs,
      },
      {
        id: 'sms_4',
        address: 'PAYTM',
        body: 'Rs. 150.00 paid to UBER via UPI on 12-Nov-24. UPI Ref No: 431234567890',
        date: now - 5 * dayMs,
      },
      {
        id: 'sms_5',
        address: 'AXIS',
        body: 'INR 299 debited from card ending 3456 at NETFLIX on 11-Nov-24. Available limit: INR 48,701',
        date: now - 6 * dayMs,
      },
      {
        id: 'sms_6',
        address: 'KOTAK',
        body: 'Rs 2,500 debited from your A/c XX7890 for electricity bill payment on 10-Nov-24',
        date: now - 7 * dayMs,
      },
      {
        id: 'sms_7',
        address: 'SBI',
        body: 'Rs 650.00 paid to UBER EATS via UPI on 09-Nov-24. UPI Ref No: 987654321',
        date: now - 8 * dayMs,
      },
      {
        id: 'sms_8',
        address: 'HDFC',
        body: 'ATM withdrawal of Rs 3,000 from A/c XX5678 on 08-Nov-24. Avl Bal: Rs 27,340.50',
        date: now - 9 * dayMs,
      },
      {
        id: 'sms_9',
        address: 'GPAY',
        body: 'You paid Rs 499 to FLIPKART via Google Pay on 07-Nov-24',
        date: now - 10 * dayMs,
      },
      {
        id: 'sms_10',
        address: 'PHONEPE',
        body: 'Rs 1,200 transferred to John Doe on 06-Nov-24 via PhonePe UPI',
        date: now - 11 * dayMs,
      },
    ];
  }

  async readAllSMS(monthsBack: number = 6): Promise<Transaction[]> {
    try {
      console.log('Reading SMS messages...');
      
      // For now, use sample data
      // In production with proper SMS library, you would read actual SMS
      const smsMessages = this.generateSampleSMS();
      
      const processedIds = await this.getProcessedSMSIds();
      const transactions: Transaction[] = [];
      const cutoffDate = Date.now() - (monthsBack * 30 * 24 * 60 * 60 * 1000);

      for (const sms of smsMessages) {
        // Skip if already processed
        if (processedIds.has(sms.id)) {
          continue;
        }

        // Skip if too old
        if (sms.date < cutoffDate) {
          continue;
        }

        // Parse the SMS
        const parsedTransaction = parseBankingSMS(sms.address, sms.body, sms.date);
        
        if (parsedTransaction) {
          transactions.push({
            ...parsedTransaction,
            id: sms.id,
          });
          
          // Mark as processed
          await this.saveProcessedSMSId(sms.id);
        }
      }

      // Update last read time
      await this.saveLastSMSReadTime(Date.now());

      console.log(`Successfully processed ${transactions.length} transactions from SMS`);
      return transactions;
    } catch (error) {
      console.error('Error reading SMS:', error);
      return [];
    }
  }

  async readNewSMS(): Promise<Transaction[]> {
    try {
      const lastReadTime = await this.getLastSMSReadTime();
      
      // For now, use sample data
      const smsMessages = this.generateSampleSMS();
      
      const processedIds = await this.getProcessedSMSIds();
      const transactions: Transaction[] = [];

      for (const sms of smsMessages) {
        // Skip if already processed or older than last read
        if (processedIds.has(sms.id) || sms.date <= lastReadTime) {
          continue;
        }

        const parsedTransaction = parseBankingSMS(sms.address, sms.body, sms.date);
        
        if (parsedTransaction) {
          transactions.push({
            ...parsedTransaction,
            id: sms.id,
          });
          
          await this.saveProcessedSMSId(sms.id);
        }
      }

      if (transactions.length > 0) {
        await this.saveLastSMSReadTime(Date.now());
      }

      return transactions;
    } catch (error) {
      console.error('Error reading new SMS:', error);
      return [];
    }
  }

  async resetProcessedSMS(): Promise<void> {
    try {
      await AsyncStorage.removeItem(PROCESSED_SMS_KEY);
      await AsyncStorage.removeItem(LAST_SMS_READ_TIME);
      console.log('Reset processed SMS data');
    } catch (error) {
      console.error('Error resetting processed SMS:', error);
    }
  }
}

export default SMSService.getInstance();
