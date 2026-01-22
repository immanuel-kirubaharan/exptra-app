import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';
import { Card } from 'react-native-paper';
import { colors as themeColors } from '../constants/theme';
import { NotificationPreferences } from '../contexts/AppContext';
import {
  checkNotificationPermissions,
  requestNotificationPermissions,
  scheduleDailyNotification,
} from '../utils/notificationUtils';

interface NotificationSettingsProps {
  preferences: NotificationPreferences;
  onPreferencesChange: (preferences: NotificationPreferences) => void;
}

export default function NotificationSettings({
  preferences,
  onPreferencesChange,
}: NotificationSettingsProps) {
  const [loading, setLoading] = useState(false);

  const handleToggleNotifications = async (enabled: boolean) => {
    setLoading(true);
    try {
      if (enabled) {
        // Request permissions first
        const hasPermission = await checkNotificationPermissions();
        if (!hasPermission) {
          const granted = await requestNotificationPermissions();
          if (!granted) {
            Alert.alert(
              'Permission Denied',
              'Please enable notifications in your device settings to use this feature.'
            );
            setLoading(false);
            return;
          }
        }

        // Schedule 3 random daily notifications with mixed messages
        await scheduleDailyNotification();
      }

      onPreferencesChange({
        ...preferences,
        enabled,
      });
    } catch (error) {
      console.error('Error toggling notifications:', error);
      Alert.alert('Error', 'Failed to update notification settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          {/* Enable/Disable Toggle */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.titleContainer}>
                <Text style={styles.sectionTitle}>Daily Reminders</Text>
                <Text style={styles.description}>3 random notifications per day</Text>
              </View>
              <Switch
                value={preferences.enabled}
                onValueChange={handleToggleNotifications}
                disabled={loading}
                trackColor={{ false: 'rgba(255,255,255,0.2)', true: 'rgba(99,102,241,0.3)' }}
                thumbColor={preferences.enabled ? themeColors.primary : '#999'}
              />
            </View>
          </View>
        </View>
      </Card>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>💡 How it works</Text>
        <Text style={styles.infoText}>
          • Frequency: 3 random notifications per day
        </Text>
        <Text style={styles.infoText}>
          • Messages: To remind you to log transactions
        </Text>
        <Text style={styles.infoText}>
          • Time: (8-9am), (12-2pm), (6-9pm)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  card: {
    backgroundColor: themeColors.card,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
  },
  cardContent: {
    paddingVertical: 5,
  },
  section: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: themeColors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: themeColors.muted,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 8,
  },
  infoSection: {
    backgroundColor: 'rgba(99,102,241,0.1)',
    borderRadius: 12,
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: themeColors.primary,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: themeColors.text,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 12,
    color: themeColors.muted,
    lineHeight: 18,
    marginBottom: 6,
  },
});
