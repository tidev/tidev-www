---
title: 'Titanium SDK 12.1.0.GA released'
date: '2023-04-24'
category: 'Release'
author: 'Hans Knöchel'
teaser: 'The release candidate of the Titanium SDK 12.1.0.GA is available.'
---

The release candidate of the next Titanium SDK is available: <b>12.1.0.GA</b>. Titanium SDK 12.1.0 is a minor release of the SDK,
addressing high-priority issues from previous releases. Highlights of this release are:

- Support for Node.js 19
- Enhanced support for Android 13
- Improved macOS support
- More parity APIs between iOS and Android

For a more detailed overview, known issues and closed tickets, see the release notes: [Titanium SDK 12.1.0.GA Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_12.x/Titanium_SDK_12.1.0.GA_Release_Note.html).

## Install

**Follow these steps to get SDK 12.1.0.GA:**

1. Install the CLI with `[sudo] npm i -g titanium alloy`
2. Run `titanium sdk install 12.1.0.GA`
3. Set `<sdk-version>12.1.0.GA</sdk-version>` in your `tiapp.xml`

## Rollback

Execute `titanium sdk install latest --default` to rollback.

## Known Issues

### iOS

The production build compile issues that have been noted in the RC version are now fixed!

## Report Bugs

As this is a Release Candidate Version, it's not meant to be used for production. So please test it on your apps and give feedback so we will have a **bug-free/working GA** at the end. If you run into any issues that seem related to the updates, please report them on [GitHub](https://github.com/tidev/titanium_mobile/issues).

## How can I support?

If you like our work and want to support, think about a [donation](/donate) or to [contribute](/contribute) with your time and code.
