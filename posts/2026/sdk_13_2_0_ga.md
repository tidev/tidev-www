---
title: 'Titanium SDK 13.2.0.GA released'
date: '2026-04-08'
category: 'Release'
author: 'Hans Knöchel'
teaser: 'Node.js 24+, Modern iOS Core, Android Improvements'
image: https://tidev.io/images/titanium-general.png
---

![Titanium SDK 13.2.0.GA](/images/titanium-general.png)

Titanium SDK 13.2.0 is a minor release focused on quality-of-life improvements across the platform. It adds support for Node.js 24, modernizes parts of the iOS core, improves Mac Catalyst support for app and module builds, and includes a broad set of Android fixes and performance updates.

On iOS, this release moves more core work to Grand Central Dispatch, fixes image blob memory issues, and adds a new WebView API to hide input accessory views when needed. On Apple platforms overall, button styling and event handling on Mac Catalyst have been improved and Catalyst module builds now support `mac=true`.

Android received the largest batch of updates in this release. Highlights include a `ViewPager2`-based `ScrollableView`, support for `AttributedString` objects, improved `ListView` search handling, better horizontal drag behavior for images inside `ScrollableView`, `keepHardwareMode` support in `Ti.UI.View`, i18n app names in the `AndroidManifest`, and several native stability improvements such as additional null checks, concurrency updates, and refreshed internal libraries.

Thanks to everyone in the community who contributed fixes and improvements to this release.

For a more detailed overview and all changes, see the release notes: [Titanium SDK 13.2.0.GA Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_13.x/Titanium_SDK_13.2.0.GA_Release_Note.html).

## Install

**Follow these steps to get SDK 13.2.0.GA:**

1. Install the CLI with `npm i -g titanium alloy`
2. Run `titanium sdk install 13.2.0.GA`
3. Set `<sdk-version>13.2.0.GA</sdk-version>` in your `tiapp.xml`

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-sdk/issues).

## How can I support?

If you like our work and want to support, think about a [donation](https://github.com/sponsors/tidev) or to [contribute](/contribute) with your time and code.
A donation helps us to cover the monthly maintenance costs of the projects, so we can continue to release feature- and compatibility updates in the future. Your help is appreciated!
