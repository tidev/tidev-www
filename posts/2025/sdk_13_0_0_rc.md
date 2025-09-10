---
title: 'Titanium SDK 13.0.0.RC released'
date: '2025-09-10'
category: 'Release'
author: 'Hans Knöchel'
teaser: 'Full Support for iOS 26, Xcode 26 and Liquid Glass UI'
image: https://tidev.io/images/titanium-general.png
---

![Titanium SDK 13.0.0.RC](/images/titanium-general.png)

Titanium SDK 13.0.0 is a major release of the SDK, providing full support for iOS 26 and Xcode 26. It is also compatible with the latest Android 16 KB page size requirement by Google and all included first party Android modules support 16kb page size too. Many community modules like the Firebase modules are also already updated.
If you need help with other modules make sure to join our [Slack group](https://slack.tidev.io/) and ask for support.

Here are some highlights:

- iOS: Full support for building and deploying apps with iOS 26 and Xcode 26 - you can use the Xcode 26 that has been released today already to deploy your apps
- iOS: Full support for the new `Glass Effect` API to add beautiful interactive background layers to your apps
- iOS: A new `bottomAccessoryView` property for tab groups to have "floating" views that can be hidden on scroll and merge with the tab group. Learn more here!
- iOS: A new `configuration` property for buttons on iOS to use the modern button API (incl. pre-defined styles for rounded buttons, icon buttons, etc.). If the adoption goes well, it will soon become to the default (without the own nested property). Feedback welcome!
- iOS: Option dialogs (`Ti.UI.OptionDialog API`) just got a UX upgrade - you can pass a `view` property to show the options as a tooltip inline to the clicked view.
- iOS: To properly support the new floating tab group and navigation bar enhancements, we've fixed some issues related to the safe area calculation. make sure to use `extendSafeArea: true`, `extendEdges: [Ti.UI.EXTEND_EDGE_ALL]` and `autoAdjustScrollViewInsets: true` to get the native default behavior for your windows. Titanium defaults to not extending the safe area, which will soon be deprecated to use the mentioned configuration instead
- Android: We've rebuilt all major modules to comply with the "16 KB page sizes" requirement coming this fall. Read more about it here, a list of updated modules can be found here.

Last but not least: We have been able to clock in many additional hours over the last few months to get your apps in the best possible position for the future. While I know what I may repeat myself: If you appreciate our work, a monthly donation via Github helps us to continue to put this level of effort into the SDK! We appreciate it a LOT!

P.S.: We are the first cross platform framework to fully support all these new iOS 26 features - spread it to the world and code strong :slightly_smiling_face: :titanium: 

To view the full list of changes, see the release notes: [Titanium SDK 13.0.0.RC Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_13.x/Titanium_SDK_13.0.0.RC_Release_Note.html).

## Install

**Follow these steps to get SDK 13.0.0.RC:**

1. Install the CLI with `[sudo] npm i -g titanium alloy`
2. Run `titanium sdk install 13.0.0.RC`
3. Set `<sdk-version>13.0.0.RC</sdk-version>` in your `tiapp.xml`

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-sdk/issues).

## How can I support?

If you like our work and want to support, think about a [donation](/donate) or to [contribute](/contribute) with your time and code.
