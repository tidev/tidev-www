---
title: 'Titanium SDK 11.1.1.GA released'
date: '2022-09-26'
category: 'Release'
author: 'Hans Knöchel'
teaser: 'Minor bug fixes related to the 11.0.0.GA release'
---

The next stable version of the Titanium SDK is now available: <b>11.1.1.GA</b>. Titanium SDK 11.1.1 is a partch release of the SDK, addressing high-priority issues from the 11.1.0.GA release.
In detail, it fixes a crash on iOS related to a deprecated API log, a crash on Android related to modules built with SDK 11.1.0 and an issue related to testing apps on Apple Silicon devices.

For a more detailed overview, known issues and closed tickets, see the release notes: [Titanium SDK 11.1.1.GA Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_11.x/Titanium_SDK_11.1.1.GA_Release_Note.html). 

## Install

**Follow these steps to get SDK 11.1.1.GA:**

1. Install the CLI with `[sudo] npm i -g titanium alloy`
2. Run `titanium sdk install 11.1.1.GA`
3. Set `<sdk-version>11.1.1.GA</sdk-version>` in your `tiapp.xml`

## Rollback

Execute `titanium sdk install latest --default` to rollback.

## Report Bugs

Although the release has been tested, there can always be issues that slipped through.
Therefore please test it on your apps and provide feedback. If you run into any issues that seem related to the updates, please report them on [GitHub](https://github.com/tidev/titanium_mobile/issues).

## How can I support?

If you like our work and want to support, think about a [donation](/donate) or to [contribute](/contribute) with your time and code.
