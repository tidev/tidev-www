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

This update is focussed on supporting the latest Android API level 34, which will be required by Google for all new apps and app updates starting in August 2024.
To retain backwards compatibility in this minor release, the feature will be opt-in until the release of Titanium SDK 13.0.0, where it will become the new default value.

To opt-in for API level 34, add the following to your tiapp.xml:
```xml
 <android>
    <manifest>
        <uses-sdk android:targetSdkVersion="34" />
    </manifest>
</android>
```

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
