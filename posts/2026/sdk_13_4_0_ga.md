---
title: 'Titanium SDK 13.4.0.GA released'
date: '2026-07-28'
category: 'Release'
author: 'Hans Knöchel'
teaser: 'Android target SDK 36 preparation, v8 memory cleanup and more'
image: https://tidev.io/images/titanium-general.png
---

![Titanium SDK 13.4.0.GA](/images/titanium-general.png)

Titanium SDK 13.4.0 is a minor release of the SDK, preparing the SDK for Android target SDK 36 and addressing high-priority issues from previous releases.

Here are the highlights of the release:

- Android: Prepared the SDK for Android target SDK 36
- Android: Improved memory cleanup in the V8 runtime
- Android: Fixed SDK build paths on Windows
- Android: `Window.rect` now reflects the `left`/`top` values set before opening a window
- iOS: Fixed the dimming area when using a `SearchBar` inside a `TableView`

**Android note:**
Since the Android status bar is now transparent (edge-to-edge design) you might have to adjust your  Ti.UI.Window/Ti.UI.TabGroup `backgroundColor` to have the original color in that area.

Thanks to everyone in the community who contributed fixes and improvements to this release, especially Michael Gangolf and Marc Bender!

For a more detailed overview and all changes, see the release notes: [Titanium SDK 13.4.0.GA Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_13.x/Titanium_SDK_13.4.0.GA_Release_Note.html).

## Install

**Follow these steps to get SDK 13.4.0.GA:**

1. Install the CLI with `npm i -g titanium alloy`
2. Run `titanium sdk install 13.4.0.GA`
3. Set `<sdk-version>13.4.0.GA</sdk-version>` in your `tiapp.xml`

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-sdk/issues).

## How can I support?

If you like our work and want to support, think about a [donation](https://github.com/sponsors/tidev) or to [contribute](/contribute) with your time and code.
A donation helps us to cover the monthly maintenance costs of the projects, so we can continue to release feature- and compatibility updates in the future. Your help is appreciated!
