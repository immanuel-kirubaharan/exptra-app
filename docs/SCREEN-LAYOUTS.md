# Screen Layouts - Month-Based Filtering

## Dashboard Screen Layout

### Screen Structure
```
┌─────────────────────────────────┐
│         HEADER (Blue)           │
│   Hello, [User]                 │
│   Here's your expense overview  │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│     MONTH SELECTOR (NEW!)       │
│  ◀  December 2024  ▶  [Today]   │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│      SPEEDOMETER CARD           │
│   Overview                      │
│   [Speedometer Gauge]           │
│   Safe to spend ₹15,000         │
│   15 days left                  │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│      STATS CARDS (3 columns)    │
│ ┌──────┐ ┌──────┐ ┌──────┐    │
│ │Bank  │ │Bills │ │Spent │    │
│ │Balance│ │Pending│ │  ₹  │    │
│ │₹50K  │ │ ₹20K │ │35K  │    │
│ └──────┘ └──────┘ └──────┘    │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│   RECENT TRANSACTIONS SECTION   │
│  [All] [Income] [Expense]       │
│  ┌───────────────────────────┐  │
│  │ 📱 Mobile Bill            │  │
│  │ ICICI Bank • 15 Dec 2024 │  │
│  │                    -₹50  │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ 💰 Salary                 │  │
│  │ HDFC Bank • 1 Dec 2024   │  │
│  │                  +₹50K   │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### Interactive Elements
- Month Selector: ← (Previous) | Month/Year | → (Next) | [Today]
- All data updates based on selected month
- Cards show month-specific information
- Transactions filtered by month

---

## Transactions Screen Layout

### Screen Structure
```
┌─────────────────────────────────┐
│      HEADER (Blue)              │
│   Transactions                  │
│              [+ Add]            │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│     MONTH SELECTOR (NEW!)       │
│  ◀  December 2024  ▶  [Today]   │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│   TRANSACTION LIST              │
│   (Sorted by date, newest first)│
│                                 │
│   ┌─────────────────────────┐   │
│   │ 📱 Utilities            │   │
│   │ ICICI Bank • 15-12-2024│   │
│   │ Monthly internet bill   │   │
│   │          -₹1,499       │   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │ 🍽️ Food & Dining        │   │
│   │ Axis Bank • 14-12-2024  │   │
│   │ Lunch with friends      │   │
│   │            -₹450       │   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │ 💰 Salary               │   │
│   │ HDFC Bank • 01-12-2024  │   │
│   │ Monthly salary          │   │
│   │           +₹50,000      │   │
│   └─────────────────────────┘   │
│                                 │
│   [more transactions...]        │
└─────────────────────────────────┘
```

### Interactive Elements
- Month Selector navigation
- Tap transaction to edit
- Long press transaction to delete
- [+ Add] button to create new transaction
- All transactions filtered by selected month

### Empty State
```
┌─────────────────────────────────┐
│   No transactions in            │
│   December 2024                 │
│                                 │
│   Tap + Add to create one       │
└─────────────────────────────────┘
```

---

## Bills & EMI Screen Layout

### Screen Structure
```
┌─────────────────────────────────┐
│      HEADER (Blue)              │
│   Bills & EMI                   │
│              [+ Add]            │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│     MONTH SELECTOR (NEW!)       │
│  ◀  December 2024  ▶  [Today]   │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│         TAB NAVIGATION          │
│  [All] [Pending] [Overdue]      │
│   (Counts update per month)     │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│    BILLS LIST (Monthly)         │
│                                 │
│   ┌─────────────────────────┐   │
│   │ ⚡ Electricity Bill     │   │
│   │ Due: 5 of month         │   │
│   │ Monthly                 │   │
│   │ Reminder: 3 days before │   │
│   │            ₹3,500       │   │
│   │      [Mark Paid]        │   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │ 💳 EMI - Laptop         │   │
│   │ Due: 10 of month        │   │
│   │ Monthly                 │   │
│   │ EMI: 15/60 paid         │   │
│   │            ₹8,500       │   │
│   │      [Mark Paid]        │   │
│   └─────────────────────────┘   │
│                                 │
│   ┌─────────────────────────┐   │
│   │ 📺 Internet             │   │
│   │ Status: ✓ Paid          │   │
│   │ Monthly                 │   │
│   │            ₹499         │   │
│   └─────────────────────────┘   │
│                                 │
│   [more bills...]               │
└─────────────────────────────────┘
```

### Month Selector Behavior
- **Previous ◀**: Goes to previous month
- **Month Display**: Shows "December 2024"
- **Next ▶**: Goes to next month
- **Today Button**: Appears only when not on current month
- **Current Badge**: Shows when viewing today's month

### Bill Status by Month
- **Paid Badge**: ✓ Paid (green)
- **Pending**: [Mark Paid] button active
- **Overdue**: Red border indicator
- **EMI Progress**: Shows current/total months

### Empty State
```
┌─────────────────────────────────┐
│   No bill(s)                    │
│                                 │
│   [Add Your Bill]               │
└─────────────────────────────────┘
```

---

## MonthSelector Component Detail

### Visual Representation
```
┌──────────────────────────────────────────┐
│  ◀ Previous  │  December 2024  │ Next ▶  │
│              │    (Current)    │         │
│              │  Today Button   │         │
└──────────────────────────────────────────┘
```

### States

#### Normal State (Not Current Month)
```
┌──────────────────────────────────────────┐
│  ◀ Button  │  November 2024  │ ▶ Button │
│  (active)  │                 │  (active)│
│            │     [Today]     │          │
└──────────────────────────────────────────┘
```

#### Current Month State
```
┌──────────────────────────────────────────┐
│  ◀ Button  │  December 2024  │ ▶ Button │
│  (active)  │    (Current)    │  (active)│
│            │   (no Today btn) │          │
└──────────────────────────────────────────┘
```

#### Year Boundary
```
// December → January automatically adjusts year
◀ Previous  │  January 2025  │ Next ▶

// January → December automatically adjusts year
◀ Previous  │  December 2024  │ Next ▶
```

---

## Interaction Flow

### User Navigation Flow

#### View Current Month (Default)
```
Open App
    ↓
See Today's Data
(Dashboard, Transactions, Bills)
    ↓
Month Selector Shows Current Month
```

#### Navigate to Previous Month
```
Tap ◀ Previous Button
    ↓
Month Selector Updates
(e.g., December → November)
    ↓
All Data Refreshes
(Shows November's data)
```

#### Navigate to Future/Past
```
Tap Multiple Times
(◀ or ▶)
    ↓
Navigate Across Years
(Nov 2024 → Dec 2024 → Jan 2025)
    ↓
Data Updates Each Month
```

#### Return to Today
```
Select Different Month
    ↓
Tap "Today" Button
    ↓
Returns to Current Month
    ↓
All Data Refreshes to Today's Data
```

---

## Data Update Flow by Screen

### Dashboard
```
Month Selected → Speedometer Updates
             → Income/Expense Updates
             → Pending Bills Update
             → Transactions Filter Updates
```

### Transactions
```
Month Selected → FlatList Data Updates
             → Empty State Conditionally Shows
             → Transaction Count Updates
             → Sorting Applied (Date DESC)
```

### Bills & EMI
```
Month Selected → Pending Count Updates
             → Overdue Status Updates
             → EMI Progress Updates
             → Paid Status Checks
             → Tab Counts Update
```

---

## Color Scheme

### Theme Colors Used
- **Primary**: #007AFF (Blue) - Main actions, active states
- **Success**: #34C759 (Green) - Income, paid status
- **Danger**: #FF3B30 (Red) - Expense, overdue
- **Surface**: Background cards
- **Text**: Primary text color
- **Muted**: Secondary text color

### MonthSelector Colors
- **Background**: Surface color
- **Buttons**: Primary color for active states
- **Text**: Text color for contrast
- **Badge**: Primary color for "Current"

---

## Responsive Layout

### Mobile (375px width)
- Full width month selector
- Single column for stats
- Scrollable lists
- Touch-friendly buttons (48x48 minimum)

### Tablet (800px width)
- Month selector centered
- Multi-column cards
- Larger fonts
- More padding

### Desktop (1200px width)
- Month selector centered
- Side-by-side layout
- Optimized spacing
- Full-width cards

---

## Animation & Transitions

### Month Navigation
- Smooth transition when changing months
- Data updates with fade animation
- Button press feedback (slightly dimmed)

### List Items
- Fade in when data loads
- Smooth scroll within month
- Delete with slide animation

### Empty States
- Fade in when no data for month
- Fade out when data appears
- Smooth transition between states

---

## Summary

The implementation provides:
- ✅ Consistent month selector across all screens
- ✅ Clear data organization by month
- ✅ Intuitive navigation controls
- ✅ Visual feedback for current state
- ✅ Responsive layout for all devices
- ✅ Smooth animations and transitions
- ✅ Professional appearance
- ✅ User-friendly interactions
