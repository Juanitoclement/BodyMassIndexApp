# Clement - Body Mass Index Calculator

Platforms: iOS, Android

## in Root install packages:

```zsh
$ yarn
```

### Run Index for Android on Emulator

```zsh
$ yarn run android
```

### Run Index for iOS on Emulator

```zsh
# Make sure pods are installed
$ cd ios && pod install && cd ..
# runs the similator
$ yarn run ios
```

if you want to specify the device to run the app on or if there is an error in the terminal saying simulator not found or similar, try adding a specific target device simulator, below iPhone 8.

```zsh
# Specifies the target simulator
$ yarn run ios --simulator="iPhone 8"
```

## Prepate a testing APK for internal testing / QA / PM etc.

1. navigate to `.env` file and make sure we are pointing to the desired environment host. GK, or Production.
2. To generate the APK do the following:

```zsh
# Navigate to the android folder
$ cd android

#Build the APK
$ ./gradlew assembleRelease
```

The APK / output can be found under `android/app/build/outputs/apk/release/app.apk` and is ready to be sent to internal testing.

## Prepare Android app bundle (AAB) for Google Play

There are several steps which needs to be completed as per the steps in this documentation provided by the react-native dev team: [Publishing to Google Play Store](https://reactnative.dev/docs/signed-apk-android)

Look in `./android/gradle.properties` for the current keystore password, alias and key password.

Note: Setting up app signing is mandatory for uploading the finished app bundle to google play.

1. Set ut key signing as above.
2. Make sure the host in environmental variables is pointing to production.
3. increment the marketing version of the app.
   1. Navigate to `package.json` and increment to the desired version number.
   2. navigate to `./android/app/build.gradle`
      1. find `versionName` and increment the version, this is also commonly know as the marketing version and is shown to the end user, match this version with the version tag in `package.json` and the release tag on github.
      2. find `versionCode` and increment by 1, this version is only used by google play to determine the succession of uploads and is not shown to the end user. If not incremented Google Play store will throw an error when uploading.
4. To generate the aab bundle do the following:

```zsh
# Navigate to the android folder
$ cd android

# Build the bundle
$ ./gradlew bundleRelease
```

The generated AAB can be found under `android/app/build/outputs/bundle/release/app.aab` and is ready to be uploaded to Google Play.

### Test the production variant of the app

Before sending it to our designated upload person, make sure to test the app with the `--variant="release"` flag.

eg.: 

```zsh
$ npx react-native run-android --variant=release
```

## Prepare for upload to the Apple Index store

First of all make sure to create a developer account on `developer.apple.com` and be invited to the Tiket.com organisation. Also make an Access Request Ticket on Jira for the appropriate access permissions.

There are some settings in iOS that needs to be made which we don't want while we are developing, so I recommend to make a new branch, make / push the changes there and make the release from that branch. In github when making the release tag target that branch.

Note: Many of the things in this list can be made through xcode in the GUI.

1. First make sure that all packages are installed

```zsh
# Make sure all packages are installed
$ yarn
# Navigate into the ios folder
$ cd ios
# install all native packages with cocoapods
$ pod install
```

2. Navigate to `ios/BodyMassIndexApp.xcodeproj/xcshareddata/xcschemes/BodyMassIndexApp.xcscheme` and change the folling line:

```xml
...
<LaunchAction
    -   buildConfiguration = "Debug"
    +   buildConfiguration = "Release"
...
```

3. Disable localhost, and unsecure HTTP requests. They are desired in development, but in release we only want to be able to access secure APIs which has SSL certificates. Navigate to `ios/BodyMassIndexCalculatorApp/Info.plist` and remove the dictionary under the `<key>NSExceptionDomains</key>` like the below:

```xml
<key>NSExceptionDomains</key>
-		<dict>
- 			<key>localhost</key>
- 			<dict>
- 				<key>NSExceptionAllowsInsecureHTTPLoads</key>
- 				<true/>
- 			</dict>
- 		</dict>
+       <dict/>
```

4. Update the marketing version:

   1. navigate to `ios/BodyMassIndexApp.xcodeproj/project.pbxproj`
   2. find all instances of `MARKETING_VERSION` and change to the desired version. _Note: The marketing version is the version shown to the end user_

5. If there are changes which needs to be uploaded later to testflight it is possible to either bump the marketing version or bump the build version. For instance if QA comes with feedback, one can push the changes, and then bump the build version. In testflight the app uploads will then be grouped under the same version number, differing only in build number. To bump the build version:
   1. Navigate to `ios/BodyMassIndexApp.xcodeproj/project.pbxproj`
   2. find all instances of `CURRENT_PROJECT_VERSION` and increment. _Note: only integers are accepted_

**Note: Version numbers can also easily be managed through XCode under `General` tab of the project**

6. Push all changes to the iOS release branch, and ask a person within the organisation that has `distribution` permissions in app store connect.
