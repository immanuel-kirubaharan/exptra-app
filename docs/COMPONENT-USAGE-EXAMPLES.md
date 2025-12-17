# MonthSelector Component - Usage Examples

## Quick Start

### Basic Implementation

```tsx
import MonthSelector from '../../components/MonthSelector';

export default function MyScreen() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  return (
    <View>
      <MonthSelector
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={(month, year) => {
          setSelectedMonth(month);
          setSelectedYear(year);
        }}
      />
    </View>
  );
}
```

---

## Complete Example: Dashboard

```tsx
import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import MonthSelector from '../../components/MonthSelector';
import { useTransactions } from '../../contexts/TransactionContext';

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const { 
    getTotalExpense, 
    getTotalIncome, 
    getMonthlyTransactions 
  } = useTransactions();

  // Get data for selected month
  const monthlyTransactions = getMonthlyTransactions(selectedYear, selectedMonth);
  const totalExpense = getTotalExpense(selectedYear, selectedMonth);
  const totalIncome = getTotalIncome(selectedYear, selectedMonth);
  const balance = totalIncome - totalExpense;

  return (
    <ScrollView>
      {/* Header */}
      <View style={{ padding: 20, backgroundColor: '#007AFF' }}>
        <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>
          Dashboard
        </Text>
      </View>

      {/* Month Selector */}
      <MonthSelector
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={(month, year) => {
          setSelectedMonth(month);
          setSelectedYear(year);
        }}
      />

      {/* Data Display */}
      <View style={{ padding: 20 }}>
        <View style={{ 
          backgroundColor: '#F5F5F5', 
          padding: 15, 
          borderRadius: 10,
          marginBottom: 10
        }}>
          <Text style={{ fontSize: 14, color: '#666' }}>Total Income</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#34C759' }}>
            ₹{totalIncome.toLocaleString()}
          </Text>
        </View>

        <View style={{ 
          backgroundColor: '#F5F5F5', 
          padding: 15, 
          borderRadius: 10,
          marginBottom: 10
        }}>
          <Text style={{ fontSize: 14, color: '#666' }}>Total Expense</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FF3B30' }}>
            ₹{totalExpense.toLocaleString()}
          </Text>
        </View>

        <View style={{ 
          backgroundColor: '#F5F5F5', 
          padding: 15, 
          borderRadius: 10
        }}>
          <Text style={{ fontSize: 14, color: '#666' }}>Balance</Text>
          <Text style={{ 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: balance >= 0 ? '#34C759' : '#FF3B30' 
          }}>
            ₹{balance.toLocaleString()}
          </Text>
        </View>

        <Text style={{ marginTop: 20, fontSize: 14, color: '#999' }}>
          Transactions: {monthlyTransactions.length}
        </Text>
      </View>
    </ScrollView>
  );
}
```

---

## Complete Example: Transactions List

```tsx
import React, { useState } from 'react';
import { View, FlatList, Text, ListItem } from 'react-native';
import MonthSelector from '../../components/MonthSelector';
import { useTransactions } from '../../contexts/TransactionContext';

export default function Transactions() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const { getMonthlyTransactions } = useTransactions();

  const monthlyTransactions = getMonthlyTransactions(selectedYear, selectedMonth);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ padding: 20, backgroundColor: '#007AFF' }}>
        <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>
          Transactions
        </Text>
      </View>

      {/* Month Selector */}
      <MonthSelector
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={(month, year) => {
          setSelectedMonth(month);
          setSelectedYear(year);
        }}
      />

      {/* Transactions List */}
      <FlatList
        data={monthlyTransactions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )}
        renderItem={({ item }) => (
          <View style={{ 
            padding: 15, 
            borderBottomWidth: 1, 
            borderBottomColor: '#EEE',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View>
              <Text style={{ fontWeight: '600', fontSize: 16 }}>
                {item.category}
              </Text>
              <Text style={{ color: '#999', fontSize: 14, marginTop: 5 }}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
            <Text style={{ 
              fontSize: 16, 
              fontWeight: '600',
              color: item.type === 'income' ? '#34C759' : '#FF3B30'
            }}>
              {item.type === 'income' ? '+' : '-'}₹{item.amount}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Text style={{ color: '#999', fontSize: 16 }}>
              No transactions in {new Date(selectedYear, selectedMonth).toLocaleString(
                undefined, 
                { month: 'long', year: 'numeric' }
              )}
            </Text>
          </View>
        }
      />
    </View>
  );
}
```

---

## Complete Example: Bills & EMI

```tsx
import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import MonthSelector from '../../components/MonthSelector';
import { useTransactions } from '../../contexts/TransactionContext';

export default function Bills() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedTab, setSelectedTab] = useState('all');
  
  const { bills, getPendingBills, getOverdueBills } = useTransactions();

  const getFilteredBills = () => {
    switch (selectedTab) {
      case 'pending':
        return getPendingBills(selectedYear, selectedMonth);
      case 'overdue':
        return getOverdueBills();
      default:
        return bills;
    }
  };

  const filteredBills = getFilteredBills();

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ padding: 20, backgroundColor: '#007AFF' }}>
        <Text style={{ fontSize: 28, color: 'white', fontWeight: 'bold' }}>
          Bills & EMI
        </Text>
      </View>

      {/* Month Selector */}
      <MonthSelector
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={(month, year) => {
          setSelectedMonth(month);
          setSelectedYear(year);
        }}
      />

      {/* Tabs */}
      <View style={{ flexDirection: 'row', padding: 10, gap: 10 }}>
        <TouchableOpacity
          onPress={() => setSelectedTab('all')}
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: 20,
            backgroundColor: selectedTab === 'all' ? '#007AFF' : '#EEE',
          }}
        >
          <Text style={{
            textAlign: 'center',
            color: selectedTab === 'all' ? 'white' : '#666',
            fontWeight: '600'
          }}>
            All ({bills.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedTab('pending')}
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: 20,
            backgroundColor: selectedTab === 'pending' ? '#007AFF' : '#EEE',
          }}
        >
          <Text style={{
            textAlign: 'center',
            color: selectedTab === 'pending' ? 'white' : '#666',
            fontWeight: '600'
          }}>
            Pending ({getPendingBills(selectedYear, selectedMonth).length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedTab('overdue')}
          style={{
            flex: 1,
            paddingVertical: 10,
            borderRadius: 20,
            backgroundColor: selectedTab === 'overdue' ? '#007AFF' : '#EEE',
          }}
        >
          <Text style={{
            textAlign: 'center',
            color: selectedTab === 'overdue' ? 'white' : '#666',
            fontWeight: '600'
          }}>
            Overdue ({getOverdueBills().length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bills List */}
      <FlatList
        data={filteredBills}
        renderItem={({ item }) => (
          <View style={{ 
            padding: 15,
            margin: 10,
            backgroundColor: '#F9F9F9',
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View>
              <Text style={{ fontWeight: '600', fontSize: 16 }}>
                {item.name}
              </Text>
              <Text style={{ color: '#999', fontSize: 14, marginTop: 5 }}>
                {item.category} • Due: {item.dueDate}
              </Text>
              {item.isEMI && (
                <Text style={{ 
                  color: '#007AFF', 
                  fontSize: 12, 
                  marginTop: 5,
                  fontWeight: '600'
                }}>
                  EMI: {item.emiPaid || 0}/{item.emiTenure}
                </Text>
              )}
            </View>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold',
              color: '#FF3B30'
            }}>
              ₹{item.amount}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Text style={{ color: '#999', fontSize: 16 }}>
              No bills found
            </Text>
          </View>
        }
      />
    </View>
  );
}
```

---

## Advanced: With Data Transformation

```tsx
import React, { useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import MonthSelector from '../../components/MonthSelector';
import { useTransactions } from '../../contexts/TransactionContext';

export default function AdvancedExample() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const { getMonthlyTransactions } = useTransactions();

  // Memoize complex calculations
  const monthStats = useMemo(() => {
    const transactions = getMonthlyTransactions(selectedYear, selectedMonth);
    
    return {
      total: transactions.length,
      income: transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0),
      expense: transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
      byCategory: transactions.reduce((acc, t) => {
        if (!acc[t.category]) acc[t.category] = 0;
        acc[t.category] += t.amount;
        return acc;
      }, {} as Record<string, number>),
    };
  }, [selectedMonth, selectedYear]);

  return (
    <View>
      <MonthSelector
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={(month, year) => {
          setSelectedMonth(month);
          setSelectedYear(year);
        }}
      />

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
          Summary for {new Date(selectedYear, selectedMonth).toLocaleString(
            undefined,
            { month: 'long', year: 'numeric' }
          )}
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          Total Transactions: {monthStats.total}
        </Text>

        <Text style={{ fontSize: 16, color: '#34C759', marginBottom: 10 }}>
          Income: ₹{monthStats.income.toLocaleString()}
        </Text>

        <Text style={{ fontSize: 16, color: '#FF3B30', marginBottom: 20 }}>
          Expense: ₹{monthStats.expense.toLocaleString()}
        </Text>

        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>
          By Category:
        </Text>

        {Object.entries(monthStats.byCategory).map(([category, amount]) => (
          <View
            key={category}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#EEE',
            }}
          >
            <Text style={{ fontSize: 14 }}>{category}</Text>
            <Text style={{ fontSize: 14, fontWeight: '600' }}>
              ₹{amount.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
```

---

## Props Reference

```typescript
interface MonthSelectorProps {
  // Current selected month (0-11, where 0 = January)
  selectedMonth: number;

  // Current selected year (e.g., 2024)
  selectedYear: number;

  // Callback fired when user changes the month
  // Parameters: (month: 0-11, year: number)
  onMonthChange: (month: number, year: number) => void;
}
```

---

## Common Patterns

### Pattern 1: Auto-reset to Today
```tsx
useEffect(() => {
  // Reset to today when component mounts
  const today = new Date();
  setSelectedMonth(today.getMonth());
  setSelectedYear(today.getFullYear());
}, []);
```

### Pattern 2: Limit to Current Year
```tsx
const handleMonthChange = (month: number, year: number) => {
  const today = new Date();
  if (year > today.getFullYear()) {
    // Don't allow future dates
    return;
  }
  setSelectedMonth(month);
  setSelectedYear(year);
};
```

### Pattern 3: Allow Last 12 Months
```tsx
const handleMonthChange = (month: number, year: number) => {
  const today = new Date();
  const monthsBack = (today.getFullYear() - year) * 12 + (today.getMonth() - month);
  
  if (monthsBack < 0 || monthsBack > 12) {
    // Limit to last 12 months
    return;
  }
  setSelectedMonth(month);
  setSelectedYear(year);
};
```

---

## Styling Customization

The MonthSelector uses `themeColors` from your theme. To customize:

1. **Colors**: Edit `constants/theme.ts`
2. **Spacing**: Modify component styles in `MonthSelector.tsx`
3. **Typography**: Update font sizes and weights in styles

---

## Troubleshooting

### Issue: Month not updating
**Solution**: Ensure `onMonthChange` callback updates state properly

### Issue: Year not adjusting at boundaries
**Solution**: This is handled automatically in the component

### Issue: "Today" button always shows
**Solution**: Component checks `currentMonth === selectedMonth && currentYear === selectedYear`

### Issue: Styling doesn't match
**Solution**: Verify `themeColors` is imported correctly from `constants/theme`

---

## Best Practices

1. ✅ Use month state local to component
2. ✅ Pass month to all data fetching functions
3. ✅ Memoize expensive calculations
4. ✅ Update empty states based on month
5. ✅ Don't modify year/month directly; use callback
6. ✅ Test edge cases (month boundaries, no data)

---

## Performance Tips

- Component is lightweight (~100 lines)
- No external dependencies
- Re-renders only when month changes
- Data filtering is efficient
- Memoization recommended for derived data
