---
title: 'Titanium SDK 12.0.0.RC released'
date: '2022-12-12'
category: 'Release'
author: 'Michael Gangolf'
teaser: 'The first release candidate of the next Titanium SDK 12.0.0.RC is available.'
---

The first release candidate of the next Titanium SDK is available: <b>12.0.0.RC</b>. Titanium SDK 12.0.0 is a major release of the SDK, addressing high-priority issues from previous releases.

iOS adds support for DynamicIslands and adds a new error page layout. Andorid targetSDK is now 33 and you can use Material3 themes like `Theme.Titanium.Material3.DayNight`.

For a more detailed overview, known issues and closed tickets, see the release notes: [Titanium SDK 12.0.0.RC Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_12.x/Titanium_SDK_12.0.0.RC_Release_Note.html).

## Install

**Follow these steps to get SDK 12.0.0.RC:**

1. Install the CLI with `[sudo] npm i -g titanium alloy`
2. Run `titanium sdk install 12.0.0.RC`
3. Set `<sdk-version>12.0.0.RC</sdk-version>` in your `tiapp.xml`

## Rollback

Execute `titanium sdk install latest --default` to rollback.

## Report Bugs

As this is a Release Candidate Version, it's not meant to be used for production. So please test it on your apps and give feedback so we will have a **bug-free/working GA** at the end. If you run into any issues that seem related to the updates, please report them on [GitHub](https://github.com/tidev/titanium_mobile/issues).

## How can I support?

If you like our work and want to support, think about a [donation](/donate) or to [contribute](/contribute) with your time and code.
