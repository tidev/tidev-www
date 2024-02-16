---
title: 'Titanium SDK 12.3.0.GA released'
date: '2024-02-16'
category: 'Release'
author: 'Hans Knöchel'
teaser: 'Support for Node.js 20, Apple Vision Pro and new Android camera handling'
---

The next stable version of the Titanium SDK is now available: <b>12.3.0.GA</b>. Titanium SDK 12.3.0 is a minor release of the SDK, adding new features and fixing existing bugs:
  * General: Official support for Node.js 18 and 20
  * General: Module updates (e.g. hyperloop and ti.map)
  * iOS: Support multi-scene applications (e.g. CarPlay and visionOS)
  * Android: New camera handling using the official `CameraX` Jetpack library when you use a camera with an overlay. Use `useCameraX: true` to enable the new features (see the documentation for more information).

For a more detailed overview, known issues and closed issues, see the release notes: [Titanium SDK 12.3.0.GA Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_12.x/Titanium_SDK_12.3.0.GA_Release_Note.html).

## Install

**Follow these steps to get SDK 12.3.0.GA:**

1. Install the CLI with `[sudo] npm i -g titanium alloy`
2. Run `titanium sdk install 12.3.0.GA`
3. Set `<sdk-version>12.3.0.GA</sdk-version>` in your `tiapp.xml`

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-sdk/issues).

## How can I support?

If you like our work and want to support, think about a [donation](/donate) or to [contribute](/contribute) with your time and code.
