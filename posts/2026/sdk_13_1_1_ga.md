---
title: 'Titanium SDK 13.1.1.GA released'
date: '2026-01-29'
category: 'Release'
author: 'Hans Knöchel'
teaser: 'Bug Fixes and Improvements for 13.1.x Release'
image: https://tidev.io/images/titanium-general.png
---

![Titanium SDK 13.1.1.GA](/images/titanium-general.png)

Titanium SDK 13.1.1 is a focused patch release aimed at stabilizing recent changes. It ships with
high‑priority fixes and officially sunsets support for 13.1.0. On Android, it tightens up stability by
adding null checks around `localOverlayProxy` and corrects Android environment detection in CLI info output.
On iOS, it resolves Mac Catalyst build failures and App Store distribution issues, and backs
out a problematic `tabBarItem` reuse change while restoring missing initial values. In short: fewer surprises,
cleaner builds, and smoother deployment—exactly what you want from a patch release.

For a more detailed overview and all changes, see the release notes: [Titanium SDK 13.1.1.GA Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_13.x/Titanium_SDK_13.1.1.GA_Release_Note.html).

## Install

**Follow these steps to get SDK 13.1.1.GA:**

1. Install the CLI with `npm i -g titanium alloy`
2. Run `titanium sdk install 13.1.1.GA`
3. Set `<sdk-version>13.1.1.GA</sdk-version>` in your `tiapp.xml`

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-sdk/issues).

## How can I support?

If you like our work and want to support, think about a [donation](https://github.com/sponsors/tidev) or to [contribute](/contribute) with your time and code.
A donation helps us to cover the monthly maintenance costs of the projects, so we can continue to release feature- and compatibility updates in the future. Your help is **seen and appreciated**!
