# Pre-Deployment Testing Checklist

## ✅ Complete Before Deployment

### 1. Authentication Flow
- [ ] Sign up with new email works
- [ ] Sign in with existing email works
- [ ] Email validation shows errors for invalid format
- [ ] Password validation requires 6+ characters
- [ ] Wrong password shows proper error message
- [ ] Network error shows when offline
- [ ] App remembers login after restart
- [ ] Sign out clears user data

### 2. Initial Setup
- [ ] Setup screen appears after first login
- [ ] Nickname field validation works
- [ ] Budget field accepts numbers only
- [ ] Month start date validation (1-31)
- [ ] "Skip" option works
- [ ] Settings save to Firebase
- [ ] Settings persist after app restart
- [ ] Settings accessible from Settings tab

### 3. Accounts Management
- [ ] Add new bank account works
- [ ] Add cash account works
- [ ] Add credit card works
- [ ] Add wallet works
- [ ] Long-press to edit account
- [ ] Delete account works
- [ ] Total balance calculates correctly
- [ ] Account types show correct icons
- [ ] Income/Expense stats display per account

### 4. Bills & EMI
- [ ] Add new bill works
- [ ] Add EMI with tenure works
- [ ] All categories available
- [ ] Frequency options work (Monthly/Quarterly/Yearly/One-time)
- [ ] Due date accepts 1-31
- [ ] Reminder days setting works
- [ ] Mark as paid works
- [ ] EMI installment counter updates
- [ ] Pending tab shows current month bills
- [ ] Overdue tab shows overdue bills
- [ ] Long-press to edit bill

### 5. Dashboard
- [ ] Greeting shows correct nickname
- [ ] Speedometer displays budget usage
- [ ] Bank Balance shows total from all accounts
- [ ] Bank Balance card navigates to Accounts
- [ ] Pending Bills shows correct amount
- [ ] Pending Bills card navigates to Bills
- [ ] Overdue count displays if any
- [ ] Total Spent shows current month
- [ ] Recent transactions display
- [ ] Pull to refresh works

### 6. Transactions
- [ ] View all transactions
- [ ] Add manual transaction
- [ ] Transaction links to account
- [ ] Edit transaction works
- [ ] Delete transaction works
- [ ] Filter by type works
- [ ] Categories display correctly
- [ ] Amounts show with correct colors (green/red)

### 7. Navigation
- [ ] Dashboard tab works
- [ ] Accounts tab works
- [ ] Transactions tab works
- [ ] Bills tab works
- [ ] Settings tab works
- [ ] All tab icons visible
- [ ] Back navigation works
- [ ] Card navigation works

### 8. Data Persistence
- [ ] Accounts save and reload
- [ ] Bills save and reload
- [ ] Transactions save and reload
- [ ] Settings save and reload
- [ ] Works offline (AsyncStorage)
- [ ] Syncs to Firebase when online
- [ ] No data loss on app restart

### 9. Error Handling
- [ ] Network errors show friendly messages
- [ ] Invalid input shows validation errors
- [ ] Firebase errors are user-friendly
- [ ] App doesn't crash on errors
- [ ] Offline mode works
- [ ] Online sync works after coming back online

### 10. UI/UX
- [ ] Login screen looks professional
- [ ] Forms are easy to use
- [ ] Buttons are clickable and responsive
- [ ] Colors are consistent
- [ ] Icons are visible and clear
- [ ] Text is readable
- [ ] Cards have proper spacing
- [ ] Modals open and close smoothly
- [ ] Loading states show when needed

---

## 🧪 Test Scenarios

### Scenario 1: New User Journey
1. Sign up with new account
2. Complete initial setup
3. Add 2 bank accounts
4. Add cash account
5. Add 3 bills (1 monthly, 1 EMI)
6. Check dashboard displays correctly
7. Restart app - data should persist

### Scenario 2: Bill Management
1. Add monthly electricity bill (due on 5th)
2. Add EMI (12 months, ₹5000)
3. Mark electricity bill as paid
4. Check it disappears from pending
5. Verify EMI shows in pending
6. Mark EMI as paid
7. Check installment counter increases

### Scenario 3: Account & Balance
1. Add SBI account with ₹10,000 balance
2. Add HDFC account with ₹5,000 balance
3. Check total balance shows ₹15,000
4. Click Bank Balance on dashboard
5. Verify navigates to Accounts
6. Verify both accounts show

### Scenario 4: Offline Mode
1. Turn on airplane mode
2. Try to add account - should work locally
3. Try to add bill - should work locally
4. Turn off airplane mode
5. Verify data syncs to Firebase

### Scenario 5: Navigation Flow
1. From Dashboard, click Bank Balance
2. Should go to Accounts screen
3. Go back to Dashboard
4. Click Pending Bills
5. Should go to Bills screen
6. Verify tab navigation works

---

## 🐛 Known Issues to Monitor

1. **Month Selector** - UI only, functionality pending
2. **Auto Balance Sync** - Manual balance updates only
3. **Push Notifications** - Not implemented yet
4. **Transaction Filtering** - By account not yet available

---

## 📊 Performance Checks

- [ ] App starts in < 3 seconds
- [ ] Screen transitions are smooth
- [ ] No lag when scrolling lists
- [ ] Modals open without delay
- [ ] Data loads quickly
- [ ] No memory leaks
- [ ] Battery usage is normal

---

## 🔒 Security Checks

- [ ] Passwords not visible in logs
- [ ] Firebase rules configured
- [ ] User data isolated by UID
- [ ] No sensitive data in plain text
- [ ] API keys properly configured
- [ ] Auth tokens secure

---

## 📱 Device Testing

Test on:
- [ ] Android (different screen sizes)
- [ ] Physical device (not just emulator)
- [ ] Different Android versions
- [ ] Low-end device performance
- [ ] Different network conditions (3G, 4G, WiFi)

---

## 🎯 Final Validation

Before deploying to production:

1. **Code Review**
   - [ ] No console.log statements
   - [ ] No commented code
   - [ ] Proper error handling everywhere
   - [ ] TypeScript: zero errors

2. **Build**
   - [ ] `npx tsc --noEmit` passes
   - [ ] `npm run start` works without errors
   - [ ] Production build succeeds
   - [ ] APK size is reasonable

3. **Documentation**
   - [ ] README.md updated
   - [ ] CHANGELOG.md updated
   - [ ] User guides available
   - [ ] API documentation complete

4. **Firebase Setup**
   - [ ] Firestore rules configured
   - [ ] Authentication enabled
   - [ ] Collections created
   - [ ] Indexes created (if needed)

---

## 🚀 Ready to Deploy When:

✅ All critical tests pass
✅ No known blockers
✅ Performance acceptable
✅ UI/UX approved
✅ Data persistence verified
✅ Error handling tested
✅ Offline mode works
✅ Documentation complete

---

## 📝 Deployment Steps

1. Update version in app.json
2. Create production build: `npm run build:android`
3. Test APK on device
4. Sign APK
5. Upload to Play Store
6. Submit for review
7. Monitor crash reports
8. Gather user feedback

---

## 🆘 Rollback Plan

If issues found in production:
1. Identify the issue
2. Check if critical or minor
3. If critical: Revert to previous version
4. If minor: Add to fix list
5. Deploy patch update
6. Communicate with users

---

Good luck with deployment! 🎉
