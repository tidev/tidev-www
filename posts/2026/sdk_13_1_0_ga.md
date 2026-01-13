---
title: 'Titanium SDK 13.1.0.GA released'
date: '2026-01-13'
category: 'Release'
author: 'Hans Knöchel'
teaser: 'SPM Modules, Gradle/Kotlin Upgrades & Bug Fixes'
image: https://tidev.io/images/titanium-general.png
---

![Titanium SDK 13.1.0.GA](/images/titanium-general.png)

This version focuses on high‑priority fixes from previous versions. It also brings a broad set of platform updates
like iOS 26+ API support, Swift Package Manager module dependencies, Android Gradle/Kotlin upgrades, and
various UI/API parity improvements.

Titanium SDK 13.1.0.GA will increase the Android minSdkVersion to 24. If you already have a custom `android:minSdkVersion` in your tiapp.xml that is lower then 24 you will see an error during compile time:
```
[ERROR] The minimum supported SDK API version must be 24 or newer, but is currently set to 22

Update the android:minSdkVersion in the tiapp.xml or custom AndroidManifest to at least 24.
```
To fix that issue either remove your custom value or set it to `<uses-sdk android:minSdkVersion="24" />` or higher.

For a more detailed overview and all changes, see the release notes: [Titanium SDK 13.1.0.GA Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_13.x/Titanium_SDK_13.1.0.GA_Release_Note.html).

## Install

**Follow these steps to get SDK 13.1.0.GA:**

1. Install the CLI with `npm i -g titanium alloy`
2. Run `titanium sdk install 13.1.0.GA`
3. Set `<sdk-version>13.1.0.GA</sdk-version>` in your `tiapp.xml`

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-sdk/issues).

## How can I support?

If you like our work and want to support, think about a [donation](https://github.com/sponsors/tidev) or to [contribute](/contribute) with your time and code.
A donation helps us to cover the monthly maintenance costs of the projects, so we can continue to release feature- and compatibility updates in the future. Your help is appreciated!
