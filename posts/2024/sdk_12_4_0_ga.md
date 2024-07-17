---
title: 'Titanium SDK 12.4.0.GA released'
date: '2024-07-17'
category: 'Release'
author: 'Hans Knöchel'
teaser: 'Android API 34 Support'
image: https://tidev.io/images/titanium-general.png
---

![Titanium SDK 12.4.0.GA](/images/titanium-general.png)

The next version of the Titanium SDK is now is available: <b>12.4.0.GA</b>. Titanium SDK 12.4.0 is a minor release of the SDK, adding new features and platform updates.

This update is focused on supporting the latest Android API level 34, which will be required by Google for all new apps and app updates starting in August 2024.
To retain backwards compatibility in this minor release, the feature will be opt-in until the release of Titanium SDK 13.0.0, where it will become the new default value.

To opt-in for API level 34, add the following to your tiapp.xml:
```xml
 <android>
    <manifest>
        <uses-sdk android:targetSdkVersion="34" />
    </manifest>
</android>
```
## Features

Besides the Android API level 34 update we have some other highlights in this release:

* Android/iOS: Swipe actions support for Ti.UI.TableView ([demo video](https://github.com/tidev/titanium-sdk/pull/14065))
* Android: new moveToBackground() method to move the whole app to the background
* Android: option to hide scrollbars in a WebView
* Android: missing Event.remove() method was added
* Android: parity for OptionBar color properties<br/><img src="/images/12_4_x/12_4_0_4.png"/>
* Android: change track colors in a Ti.UI.Switch<br/><img src="/images/12_4_x/12_4_0_1.png"/>
* Android: text alignment for date pickers<br/><img src="/images/12_4_x/12_4_0_3.png"/>
* Android: change video playback speed
* Android: defaultLang option in tiapp.xml (in case you run an app that doesn't have EN as the first language)
* iOS: iOS 17 symbol effects ([demo video](https://github.com/tidev/titanium-sdk/pull/13982))
* iOS: change the backgroundColor of a RefreshControl<br/><img src="/images/12_4_x/12_4_0_2.png"/>
* iOS: use overrideUserInterfaceStyle for a Picker
For a more detailed overview and all changes, see the release notes: [Titanium SDK 12.4.0.GA Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_12.x/Titanium_SDK_12.4.0.GA_Release_Note.html).

## Install

**Follow these steps to get SDK 12.4.0.GA**:

1. Install the CLI with `[sudo] npm i -g titanium alloy`
2. Run `titanium sdk install 12.4.0.GA`
3. Set `<sdk-version>12.4.0.GA</sdk-version>` in your `tiapp.xml`

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-sdk/issues).

## How can I support?

If you like our work and want to support, think about a [donation](/donate) or to [contribute](/contribute) with your time and code.
