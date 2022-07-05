---
title: 'TiDev, Inc. Releases Titanium SDK 11 GA, Titanium CLI 6.1.0'
date: '2022-07-01'
category: 'Release'
author: 'Josh Lambert'
teaser: 'First official GA release of the SDK under TiDev Management & Control.'
image: 'https://tidev.io/sdk11.png'
---

## Overview

On July 1st, 2022, we published the General Availability version of TiDev’s Titanium SDK, and a new version of the Titanium CLI. This SDK version is a major release — the first under non-profit TiDev, Inc leadership and management — featuring 62+ feature and bug-fix contributions from TiDev staff and the Titanium community at large. For a full list of changes in the SDK and CLI, we encourage you to review their respective release notes at the links below:

- **For the SDK:** https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_11.x/Titanium_SDK_11.0.0.GA_Release_Note.html
- **For the CLI:** https://github.com/tidev/titanium/releases/tag/v6.1.0

**This release marks an important community milestone in that you can develop, run, and distribute a Titanium mobile app entirely from TiDev tooling without any dependencies on the older appc system.** All copyrights and licensing information has also been updated to reflect Titanium’s new open-source future.

If you’re upgrading from `10.1.1.GA` to `11.0.0.GA`, you shouldn’t need to make any code changes in your Titanium app to support this version.

Both iOS and Android apps will benefit from a number of stability and performance improvements in this release. For Android development, Java 17 is now supported without encountering errors. You’ll also enjoy better rendered round corners on Android 12+. For iOS development, adaptive gradients for dark mode have been fixed, multi-selection event issues in ListViews have been fixed — just to name a few things. Definitely check out the release notes at the links above for an exhaustive list of changes.

We have a new download site that provides web browser access to all official SDK releases. You can find that at https://downloads.titaniumsdk.com/. From this site, you’ll find our official GA releases (releases recommended for production use) along with release candidate versions and CI builds of the Titanium SDK. Handy install commands are provided on each release page making the entire process of bringing in new releases super smooth and elegant. Special thanks to board member and community contributor Chris Barber for building and developing this new site.

## Install

If you already have the Titanium environment setup on your system, upgrading to this new release is simple. First, update to the latest Titanium CLI and Titanium Alloy versions:
`sudo npm install -g titanium alloy`

Once this update is complete, you can download Titanium SDK 11 with one command:
`ti sdk install latest`

If you’re new to Titanium and are installing this for the first time, we encourage you to review our new user setup process by clicking here: https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Getting_Started/

## What's Next

Looking ahead to the next SDK version, we’re anticipating a number of both major and minor changes including support for iOS 16, improved support for Android 13, scrollToItem position parity across both platforms, excluding directories from the iOS assets catalog, and more. Keep an eye on this blog along with the TiDev social media for the latest official information.

Titanium SDK 11 and CLI 6.1.0 are a strong start to Titanium’s new community-led future! We hope you enjoy this release and all that it has to offer for building amazing mobile applications. Please remember that TiDev relies entirely on community contributions -- both code and financial -- in order to maintain the Titanium ecosystem. All our code is publicly available on Github and we welcome your pull-requests. To help fund our development efforts, we ask that you consider a recurring monthly donation via [Github Sponsors](https://github.com/sponsors/tidev) or [Liberapay](https://liberapay.com/tidev/). **As we are a registered non-profit, donations are tax deductible under IRS 501c3 regulations.**

We’re excited to bring you these releases and are optimistic for Titanium’s future. **Ti Strong!**

Josh Lambert  
Board Chairman  
TiDev, Inc.
