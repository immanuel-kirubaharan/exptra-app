import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors as themeColors } from '../constants/theme';

interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
  strokeWidth?: number;
  title?: string;
}

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#A3D5A3',
  '#FFB6C1', '#87CEEB', '#DDA0DD', '#F0E68C', '#20B2AA',
];

export default function PieChart({
  data,
  size = 200,
  strokeWidth = 20,
  title = 'Spending Breakdown',
}: PieChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  if (total === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    );
  }

  let currentOffset = 0;
  const slices = data.map((item, index) => {
    const percentage = item.value / total;
    const sliceLength = percentage * circumference;
    const strokeDashoffset = currentOffset;
    
    const slice = {
      offset: strokeDashoffset,
      length: sliceLength,
      color: item.color,
      percentage,
    };
    
    currentOffset += sliceLength;
    return slice;
  });

  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      
      <View style={styles.chartContainer}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G rotation="-90" origin={`${centerX}, ${centerY}`}>
            {slices.map((slice, index) => (
              <Circle
                key={index}
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke={slice.color}
                strokeWidth={strokeWidth}
                strokeDasharray={slice.length + ' ' + circumference}
                strokeDashoffset={-slice.offset}
                strokeLinecap="round"
              />
            ))}
          </G>
        </Svg>

        {/* Center text */}
        <View style={[styles.centerContent, { width: size, height: size }]}>
          <Text style={styles.totalAmount}>
            ₹{total.toLocaleString()}
          </Text>
          <Text style={styles.totalLabel}>Total</Text>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[
                styles.legendColor,
                { backgroundColor: item.color },
              ]}
            />
            <View style={styles.legendContent}>
              <Text style={styles.legendLabel}>{item.label}</Text>
              <Text style={styles.legendValue}>
                ₹{item.value.toLocaleString()} ({((item.value / total) * 100).toFixed(1)}%)
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.surface,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: themeColors.text,
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    position: 'relative',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: themeColors.primary,
  },
  totalLabel: {
    fontSize: 12,
    color: themeColors.muted,
    marginTop: 4,
  },
  legend: {
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    padding: 12,
    borderRadius: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 12,
  },
  legendContent: {
    flex: 1,
  },
  legendLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: themeColors.text,
  },
  legendValue: {
    fontSize: 12,
    color: themeColors.muted,
    marginTop: 2,
  },
  emptyContainer: {
    backgroundColor: themeColors.surface,
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  emptyText: {
    fontSize: 14,
    color: themeColors.muted,
  },
});
