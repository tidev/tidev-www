---
title: 'Titanium SDK 12.2.1.GA released'
date: '2023-10-09'
category: 'Release'
author: 'Michael Gangolf'
teaser: 'Fix Android and iOS issues related to 12.2.0.GA'
---

The next stable version of the Titanium SDK is now is available: <b>12.2.1.GA</b>. Titanium SDK 12.2.1 is a patch release of the SDK,
addressing Android and iOS issues found in 12.2.0.GA:
* Android: Fix camera overlays
* iOS: Fix crash when setting the `backgroundRepeat` property on iOS 17+
* iOS: Fix crash when setting the `navTintColor` property on iOS 17+
* iOS: Fix crash when using a `Ti.Media.VideoPlayer`, e.g. inside a modal window

For a more detailed overview, known issues and closed tickets, see the release notes: [Titanium SDK 12.2.1.GA Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_12.x/Titanium_SDK_12.2.1.GA_Release_Note.html).

## Install

**Follow these steps to get SDK 12.2.1.GA:**

1. Install the CLI with `[sudo] npm i -g titanium alloy`
2. Run `titanium sdk install 12.2.1.GA`
3. Set `<sdk-version>12.2.1.GA</sdk-version>` in your `tiapp.xml`

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-sdk/issues).

## How can I support?

If you like our work and want to support, think about a [donation](/donate) or to [contribute](/contribute) with your time and code.
