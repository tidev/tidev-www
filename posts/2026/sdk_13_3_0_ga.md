---
title: 'Titanium SDK 13.3.0.GA released'
date: '2026-07-01'
category: 'Release'
author: 'Hans Knöchel'
teaser: 'iOS 27, Xcode 27 and Android UI Improvements'
image: https://tidev.io/images/titanium-general.png
---

![Titanium SDK 13.3.0.GA](/images/titanium-general.png)

Titanium SDK 13.3.0 is a minor release of the SDK with support for Xcode 27 and iOS 27, Hyperloop 8.0.0 and iOS multi-scene applications.

Here are some highlights of the release:

- Multiple platforms: Support for Xcode 27 and iOS 27
- iOS: Support for multi-scene applications
- iOS: Fixes for TabGroup focus events, NavigationWindow handling, background completion handlers, TableView search field positioning and TextArea behavior
- Android: Improved ImageView pinch and zoom, optimized Ti.Preferences performance and better OrientationMonitor display handling
- Android: Fixes for CameraX rotation with orientation lock, WebView URLs with large GET data, VideoPlayer windows, Chrome debug sessions and Material 3 BottomNavigation behavior
- Multiple platforms: Fixed the module packaging process

Thanks to everyone in the community who contributed fixes and improvements to this release.

For a more detailed overview and all changes, see the release notes: [Titanium SDK 13.3.0.GA Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_13.x/Titanium_SDK_13.3.0.GA_Release_Note.html).

## Install

**Follow these steps to get SDK 13.3.0.GA:**

1. Install the CLI with `npm i -g titanium alloy`
2. Run `titanium sdk install 13.3.0.GA`
3. Set `<sdk-version>13.3.0.GA</sdk-version>` in your `tiapp.xml`

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-sdk/issues).

## How can I support?

If you like our work and want to support, think about a [donation](https://github.com/sponsors/tidev) or to [contribute](/contribute) with your time and code.
A donation helps us to cover the monthly maintenance costs of the projects, so we can continue to release feature- and compatibility updates in the future. Your help is appreciated!
