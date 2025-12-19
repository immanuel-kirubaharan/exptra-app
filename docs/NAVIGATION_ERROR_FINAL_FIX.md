# Navigation Error - Final Fix ✅

## Error
```
ERROR: The action 'REPLACE' with payload {"name":"setup","params":{}} 
was not handled by any navigator.

Do you have a route named 'setup'?
```

## Root Cause
The root Stack navigator was trying to navigate to `/(auth)/setup`, but the Stack only knows about the GROUP names `(auth)` and `(tabs)`, not the individual screen routes inside them.

Expo-router's Stack navigator at the root level can only navigate between registered screens, which are the layout groups, not the screens inside those groups.

## The Problem Flow
```
RootLayoutNav tries to navigate to: /(auth)/setup
  ↓
Root Stack doesn't have a screen named "setup"
  ↓
Root Stack only knows about: "(auth)", "(tabs)", "modal"
  ↓
ERROR: Route not found! ❌
```

## The Solution

### Use initialRouteName

Instead of trying to navigate to nested routes from the root, set the `initialRouteName` on the Stack based on the auth state:

```typescript
// Determine initial route based on auth state
let initialRouteName: 'auth' | 'tabs' = '(auth)';
if (user && settings.isInitialSetupComplete) {
  initialRouteName = '(tabs)';
}

return (
  <Stack initialRouteName={initialRouteName}>
    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
  </Stack>
);
```

### How It Works

```
1. App loads
2. Loading splash shows (waiting for auth + settings)
3. Auth + settings load
4. initialRouteName is set based on state:
   - Not authenticated or setup incomplete → '(auth)'
   - Authenticated and setup complete → '(tabs)'
5. Stack renders with the initial route
6. Once user is in the group, navigation within the group works:
   - (auth)/login ↔ (auth)/setup works
   - (tabs) screens work
✅ NO ERROR!
```

### The Inner Navigation

Now that we're in the right group, the navigation effect handles routing between screens:

**In (auth) group:**
- If not authenticated → show login
- If authenticated but setup incomplete → show setup
- Navigation between login and setup works ✅

**In (tabs) group:**
- Show main app screens
- Navigation between tabs works ✅

## Files Changed
`app/_layout.tsx` - Added `initialRouteName` logic

## Key Changes
```typescript
// NEW:
let initialRouteName: 'auth' | 'tabs' = '(auth)';
if (user && settings.isInitialSetupComplete) {
  initialRouteName = '(tabs)';
}

// Then use it:
<Stack initialRouteName={initialRouteName}>
```

## Why This Works

1. **No invalid route navigation**: Only navigate to registered screens
2. **Uses proper expo-router pattern**: initialRouteName is the correct way
3. **Respects hierarchy**: Groups at root level, screens within groups
4. **Clean navigation**: Each group handles its own internal navigation

## Status

✅ **FIXED**

Navigation no longer throws errors. The app properly:
- Routes to (auth) for unauthenticated or setup incomplete users
- Routes to (tabs) for authenticated users with setup complete
- Handles internal navigation within each group
- Shows loading splash during initialization
- Prevents flash of wrong screen

## Testing

```
✅ Fresh signup → Shows setup page (in auth group)
✅ Return login → Shows dashboard (in tabs group)
✅ No navigation errors
✅ Smooth transitions
✅ No setup page flash
```

---

**Status**: ✅ RESOLVED
**Method**: Using initialRouteName instead of router.replace for root navigation
**Result**: Clean, error-free navigation
