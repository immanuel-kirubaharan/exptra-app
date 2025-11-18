# I have some issues and bugs in my project

1. Bills & EMI is not getting save and getting the below error while trying to save the bill or EMI.

```ERROR  Error saving bills: [FirebaseError: Function setDoc() called with invalid data. Unsupported field value: undefined (found in document users/Crc654cBV0
Q7K6UmmcyRlTyrGAE3/data/bills)] FirebaseError: Function setDoc() called with invalid data. Unsupported field value: undefined (found in document users/Crc654c
BV0Q7K6UmmcyRlTyrGAE3/data/bills)```

This Bills & EMI should be added to the firebase firestore database after adding a bill or EMI. All the completed bills should be shown in a separate section and should come back to the main list when the next due date is approaching as of now it is coming under the pending bills only.

2. Currently in Transaction page the transactions are not connected to the account for the expense or income. When I add a transaction the account dropdown (currently it is text box) should list all the existing account which should be linked to the new transaction and the balance of the account should be updated accordingly. All the accounts should show the respective transactions. and in income/expense add/update screen should have this account selection option. and all these information should be stored in the firebase firestore database.

3. Recent Transactions on the dashboard is not filtering the transactions based on the income or expense type. It is showing all the transactions together. There is an filter button available in screen but that should filter the transactions to show only income or only expense transactions and default to all.

4. In Dashboard the title named remaining budget should be replaced with the current month name as a dropdown to select previous months to view the budget details of that month. also the speedometer should be replaced with a circular progress bar showing the percentage of budget used in that month.
 
5. Icons in the navigation tabs are not showing properly. The icons are not visible in the bottom tab navigation. Please fix the icons to show properly.

6. Along with the recent transactions in the dashboard there should be two more cards showing the total balance across all accounts and total pending bills with count of overdue bills. and the monthly expense breakdown should be shown in a separate screen with a bar chart representation. The view all button in recent transactions should navigate to the transactions screen.




