---
title: 'Titanium SDK 13.0.0.GA released'
date: '2025-09-15'
category: 'Release'
author: 'Hans Knöchel'
teaser: 'Full Support for iOS 26, Xcode 26 and Liquid Glass UI'
image: https://tidev.io/images/titanium-general.png
---

![Titanium SDK 13.0.0.GA](/images/13_0_x/13_0_0_0.png)

Titanium SDK 13.0.0 is a major release of the SDK, providing full support for iOS 26 and Xcode 26. It is also compatible with the latest Android 16 KB page size requirement by Google and all included first party Android modules support 16kb page size too. Many community modules like the Firebase modules are also already updated. If you need help with other modules make sure to join our [Slack group](https://slack.tidev.io/) and ask for support.

Since the RC version on September 10th, we have fixed some additional issues related to safe area handling in iOS 26 and updated all core modules to the 16 KB page size requirement on Android.

Here are some highlights of the release:

- iOS: Full support for building and deploying apps with iOS 26 and Xcode 26 - you can use the Xcode 26 that has been released today already to deploy your apps
- iOS: Full support for the new `Glass Effect` API to add beautiful interactive background layers to your apps
- iOS: A new `bottomAccessoryView` property for tab groups to have "floating" views that can be hidden on scroll and merge with the tab group. Learn more here!
- iOS: A new `configuration` property for buttons on iOS to use the modern button API (incl. pre-defined styles for rounded buttons, icon buttons, etc.). If the adoption goes well, it will soon become to the default (without the own nested property). Feedback welcome!
- iOS: To properly support the new floating tab group and navigation bar enhancements, we've fixed some issues related to the safe area calculation. make sure to use `extendSafeArea: true`, `extendEdges: [Ti.UI.EXTEND_EDGE_ALL]` and `autoAdjustScrollViewInsets: true` to get the native default behavior for your windows. Titanium defaults to not extending the safe area, which will soon be deprecated to use the mentioned configuration instead
- Android: We've rebuilt all major modules to comply with the "16 KB page sizes" requirement coming this fall. Read more about it here, a list of updated modules can be found here.

Last but not least: We have been able to clock in many additional hours over the last few months to get your apps in the best possible position for the future. While I know what I may repeat myself: If you appreciate our work, a monthly donation via Github helps us to continue to put this level of effort into the SDK! We appreciate it a LOT!

P.S.: We are the first cross platform framework to fully support all these new iOS 26 features - spread it to the world and code strong.

To view the full list of changes, see the release notes: [Titanium SDK 13.0.0.GA Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_13.x/Titanium_SDK_13.0.0.GA_Release_Note.html).

## Install

**Follow these steps to get SDK 13.0.0.GA:**

1. Install the CLI with `npm i -g titanium alloy`
2. Run `ti sdk install 13.0.0.GA`
3. Set `<sdk-version>13.0.0.GA</sdk-version>` in your `tiapp.xml`

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-sdk/issues).

## How can I support?

If you like our work and want to support, think about a [donation](https://github.com/sponsors/tidev) or to [contribute](/contribute) with your time and code.
A donation helps us to cover the monthly maintenance costs of the projects, so we can continue to release feature- and compatibility updates in the future. Your help is appreciated!
