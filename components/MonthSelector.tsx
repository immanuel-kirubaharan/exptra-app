import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors as themeColors } from '../constants/theme';

interface MonthSelectorProps {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number, year: number) => void;
}

export default function MonthSelector({
  selectedMonth,
  selectedYear,
  onMonthChange,
}: MonthSelectorProps) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const shiftMonth = (offset: number) => {
    let newMonth = selectedMonth + offset;
    let newYear = selectedYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    onMonthChange(newMonth, newYear);
  };

  const isCurrentMonth = selectedMonth === currentMonth && selectedYear === currentYear;

  const monthName = new Date(selectedYear, selectedMonth).toLocaleString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => shiftMonth(-1)}
        style={styles.navButton}
      >
        <Text style={styles.navButtonText}>◀</Text>
      </TouchableOpacity>

      <View style={styles.monthDisplay}>
        <Text style={styles.monthText}>{monthName}</Text>
        {isCurrentMonth && <Text style={styles.currentBadge}>Current</Text>}
      </View>

      <TouchableOpacity
        onPress={() => shiftMonth(1)}
        style={styles.navButton}
      >
        <Text style={styles.navButtonText}>▶</Text>
      </TouchableOpacity>

      {!isCurrentMonth && (
        <TouchableOpacity
          onPress={() => onMonthChange(currentMonth, currentYear)}
          style={styles.resetButton}
        >
          <Text style={styles.resetButtonText}>Today</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: themeColors.surface,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 12,
    gap: 12,
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    color: themeColors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  monthDisplay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthText: {
    color: themeColors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  currentBadge: {
    color: themeColors.primary,
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
  resetButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: themeColors.primary,
    borderRadius: 8,
  },
  resetButtonText: {
    color: themeColors.background,
    fontSize: 13,
    fontWeight: '600',
  },
});
