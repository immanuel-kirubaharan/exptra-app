Running "expo doctor"
Running 17 checks on your project...
15/17 checks passed. 2 checks failed. Possible issues detected:
Use the --verbose flag to see more details about passed checks.
✖ Validate packages against React Native Directory package metadata
The following issues were found when validating your dependencies against React Native Directory:
  Untested on New Architecture: react-native-android-sms-listener
  Unmaintained: react-native-android-sms-listener
  No metadata available: expo-sms-retriever
Advice:
Use libraries that are actively maintained and support the New Architecture. Find alternative libraries with https://reactnative.directory.
Add packages to expo.doctor.reactNativeDirectoryCheck.exclude in package.json to selectively skip validations, if the warning is not relevant.
Update React Native Directory to include metadata for unknown packages. Alternatively, set expo.doctor.reactNativeDirectoryCheck.listUnknownPackages in package.json to false to skip warnings about packages with no metadata, if the warning is not relevant.
✖ Check that packages match versions required by installed Expo SDK
⚠️ Minor version mismatches
package             expected  found    
react-native-svg    15.12.1   15.15.0  
🔧 Patch version mismatches
package             expected  found    
expo                ~54.0.24  54.0.23  
expo-linking        ~8.0.9    8.0.8    
expo-notifications  ~0.32.13  0.32.12  
expo-router         ~6.0.15   6.0.14   
expo-splash-screen  ~31.0.11  31.0.10  
Changelogs:
- expo-linking → https://github.com/expo/expo/blob/sdk-54/packages/expo-linking/CHANGELOG.md
- expo-notifications → https://github.com/expo/expo/blob/sdk-54/packages/expo-notifications/CHANGELOG.md
- expo-router → https://github.com/expo/expo/blob/sdk-54/packages/expo-router/CHANGELOG.md
- expo-splash-screen → https://github.com/expo/expo/blob/sdk-54/packages/expo-splash-screen/CHANGELOG.md
6 packages out of date.
Advice:
Use 'npx expo install --check' to review and upgrade your dependencies.
To ignore specific packages, add them to "expo.install.exclude" in package.json. Learn more: https://expo.fyi/dependency-validation
2 checks failed, indicating possible issues with the project.
Command "expo doctor" failed.
npx -y expo-doctor exited with non-zero code: 1