---
title: 'Test iOS 16 & Xcode 14 support in Titanium'
date: '2022-06-10'
category: 'Release'
author: 'Hans Knöchel'
teaser: 'Days after the WWDC 2022 and the first Beta version of iOS 16, Titanium apps already able to build for iOS 16 and Xcode 14 (Beta).'
---

We are happy to announce that Titanium apps are already able to build for iOS 16 and Xcode 14 (Beta), just days after the WWDC 2022 and the first Beta version of iOS 16.

While we are working on further improvements and the support of new features, you can also test your own app today:

## Install

**Follow these steps to get SDK 11.1.0 (nightly):**

1. Install the CLI with `[sudo] npm i -g titanium alloy`
2. `titanium sdk install -b master`

You can also execute `titanium sdk install latest` to get the latest **GA** of the Titanium SDK.

**NEW**: We just launched the revamped [Titanium SDK Downloads](https://downloads.titaniumsdk.com/) page, check it out!

## Rollback

Execute `titanium sdk select 10.1.1.GA` to rollback.

## Planned Features

- Support for lock screen widgets (already possible today, but we will provide sample apps)
- Support for the new MapKit API's for improved directions and map interaction
- Support for the native (date range) calendar view
- Support for the password-less `PassKeys` API
- Improved support for biometric auth to authorize / deauthorize specifics parts of your app

Missing a feature? Please report it via [GitHub](https://github.com/tidev/titanium_mobile/issues)

## Known Issues

- When using `Ti.UI.TabGroup`, the navigation bar / tab bar does not respect proper safe area. This might be a beta issue, but it's being investigated

Missing a known issue? Please report it via [GitHub](https://github.com/tidev/titanium_mobile/issues)

## Roadmap

- TODAY: Be able to target iOS 16 using Xcode 14 using a nightly build
- July 15: Basic support for new major features, both in modules and as core-SDK adjustments, also parity efforts with Android
- August 15: First Ti SDK 12.0.0 Beta (bumped from 11.11.0) with full support for iOS 16 and Xcode 14
- August 30: 12.0.0 RC release, own sample app showcasing the new features and changes in general
- September 15: 12.0.0 GA release

## How can I support?

If you like our work and want to support, think about a [donation](/donate) or to [contribute](/contribute) with your time and code.
