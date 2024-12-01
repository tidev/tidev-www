---
title: 'Titanium SDK 12.6.0.RC released'
date: '2024-12-01'
category: 'Release'
author: 'Hans Knöchel'
teaser: 'Gradle 8 Support'
image: https://tidev.io/images/titanium-general.png
---

![Titanium SDK 12.6.0.RC](/images/titanium-general.png)

The next version of the Titanium SDK is now is available: <b>12.6.0.RC</b>. Titanium SDK 12.6.0 is a minor
release of the SDK, adding new features and addressing potential bugs from previous releases.

This release adds stable support for Gradle 8, allowing to build even more modern apps using APIs like Material 3
(aka Material You). In addition, it includes some performance improvements for list views and other features like
native support for iOS 18+ dark mode app icons.

**Important**: If you are using Android modules that were built with 12.6.0 or later in a project with a Titanium version prior to 12.6.0, you will see the following error:
```
Unsupported class file major version 61as the module was build with JAVA_17 and the app is trying to build with JAVA_11
```
To resolve this error, simply use 12.6.0+ or recompile it with a lower Titanium SDK version. 

For a more detailed overview and all changes, see the release notes: [Titanium SDK 12.6.0.RC Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_12.x/Titanium_SDK_12.6.0.RC_Release_Note.html).

## Install

**Follow these steps to get SDK 12.6.0.RC:**

1. Install the CLI with `[sudo] npm i -g titanium alloy`
2. Run `titanium sdk install 12.6.0.RC`
3. Set `<sdk-version>12.6.0.RC</sdk-version>` in your `tiapp.xml`

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-sdk/issues).

## How can I support?

If you like our work and want to support, think about a [donation](/donate) or to [contribute](/contribute) with your time and code.
