import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { G, Line, Rect, Text as SvgText } from 'react-native-svg';
import { colors as themeColors } from '../constants/theme';

interface BarChartData {
  label: string;
  income: number;
  expense: number;
}

interface BarChartProps {
  data: BarChartData[];
  title?: string;
  height?: number;
}

export default function BarChart({
  data,
  title = 'Income vs Expense',
  height = 300,
}: BarChartProps) {
  const padding = 40;
  const chartHeight = height - padding * 2;
  const chartWidth = Math.max(300, data.length * 60);
  const barWidth = 20;
  const groupSpacing = 60;

  // Calculate max value for scaling
  const maxValue = Math.max(...data.flatMap(d => [d.income, d.expense]));
  const scale = maxValue > 0 ? chartHeight / maxValue : 1;

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        <Svg width={chartWidth} height={height} viewBox={`0 0 ${chartWidth} ${height}`}>
          {/* Y-axis */}
          <Line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke={themeColors.muted}
            strokeWidth="1"
          />
          
          {/* X-axis */}
          <Line
            x1={padding}
            y1={height - padding}
            x2={chartWidth - padding}
            y2={height - padding}
            stroke={themeColors.muted}
            strokeWidth="1"
          />

          {/* Grid lines and Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = height - padding - ratio * chartHeight;
            const value = Math.round(maxValue * ratio);
            return (
              <G key={`grid-${idx}`}>
                <Line
                  x1={padding}
                  y1={y}
                  x2={chartWidth - padding}
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.5"
                  strokeDasharray="5,5"
                />
                <SvgText
                  x={padding - 5}
                  y={y + 4}
                  fontSize="11"
                  fill={themeColors.muted}
                  textAnchor="end"
                >
                  ₹{(value / 1000).toFixed(0)}K
                </SvgText>
              </G>
            );
          })}

          {/* Bars and labels */}
          {data.map((item, idx) => {
            const groupX = padding + idx * groupSpacing;
            const incomeHeight = item.income * scale;
            const expenseHeight = item.expense * scale;
            const incomeY = height - padding - incomeHeight;
            const expenseY = height - padding - expenseHeight;

            return (
              <G key={`bar-group-${idx}`}>
                {/* Income bar */}
                <Rect
                  x={groupX - barWidth - 2}
                  y={incomeY}
                  width={barWidth}
                  height={incomeHeight}
                  fill="#4CAF50"
                  rx="4"
                />
                
                {/* Expense bar */}
                <Rect
                  x={groupX + 2}
                  y={expenseY}
                  width={barWidth}
                  height={expenseHeight}
                  fill="#F44336"
                  rx="4"
                />

                {/* X-axis label */}
                <SvgText
                  x={groupX}
                  y={height - padding + 20}
                  fontSize="11"
                  fill={themeColors.text}
                  textAnchor="middle"
                >
                  {item.label.length > 3 ? item.label.substring(0, 3) : item.label}
                </SvgText>
              </G>
            );
          })}
        </Svg>
      </ScrollView>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.legendLabel}>Income</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#F44336' }]} />
          <Text style={styles.legendLabel}>Expense</Text>
        </View>
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
  scrollContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: themeColors.text,
  },
  emptyContainer: {
    backgroundColor: themeColors.surface,
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 14,
    color: themeColors.muted,
  },
});
