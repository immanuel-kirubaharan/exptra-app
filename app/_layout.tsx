import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { AppProvider, useApp } from '../contexts/AppContext';
import { TransactionProvider } from '../contexts/TransactionContext';
import { AccountProvider } from '../contexts/AccountContext';

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { user, loading: authLoading } = useAuth();
  const { settings, loading: settingsLoading } = useApp();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (authLoading || settingsLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    console.log('Navigation check:', { user: !!user, inAuthGroup, inTabsGroup, setupComplete: settings.isInitialSetupComplete });

    if (!user && !inAuthGroup) {
      console.log('Redirecting to login');
      router.replace('/(auth)/login');
    } else if (user && !settings.isInitialSetupComplete && !inAuthGroup) {
      console.log('Redirecting to setup');
      router.replace('/(auth)/setup');
    } else if (user && settings.isInitialSetupComplete && !inTabsGroup) {
      console.log('Redirecting to tabs');
      router.replace('/(tabs)');
    }
  }, [user, authLoading, settingsLoading, settings.isInitialSetupComplete, segments]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppProvider>
        <AccountProvider>
          <TransactionProvider>
            <RootLayoutNav />
          </TransactionProvider>
        </AccountProvider>
      </AppProvider>
    </AuthProvider>
  );
}
