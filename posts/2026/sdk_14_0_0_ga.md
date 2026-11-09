---
title: 'Titanium SDK 14.0.0.GA released'
date: '2026-11-09'
category: 'Release'
author: 'Hans Knöchel'
teaser: 'iPhone Duo and Xcode 27.2 support, native SplitWindow, true multi-scene support on iOS and a modernized Android build stack'
image: https://tidev.io/images/titanium-general.png
---

![Titanium SDK 14.0.0.GA](/images/titanium-general.png)

Titanium SDK 14.0.0 is a major release of the SDK, adding iPhone Duo and Xcode 27.2 support, a native `Ti.UI.iOS.SplitWindow`, true multi-scene support on iOS and a modernized Android build stack. On top of that, it ships a long list of new cross-platform APIs, performance work in the Android V8 runtime and more than 50 bug fixes across both platforms.

Here are the highlights of the release:

- iOS: Full support for Xcode 27.2 and the new iPhone Duo, including a `hingechange` event, `Window.reservedRegions`, vertical tab bar APIs and an `arrangementStyle` property on `SplitWindow`
- iOS: `Ti.UI.iOS.SplitWindow` is now backed by the native `UISplitViewController`, exposing `displayMode`, `splitBehavior`, column width properties and the `displaymodechange`, `collapse` and `expand` events
- iOS: True multi-scene support - your app can now run in multiple windows on iPad and Mac
- iOS: Device builds now go through Apple's CoreDevice (`devicectl`) via ioslib 6, so iOS 17+ devices are detected and installed reliably again, also over Wi-Fi. `node-ios-device` and its prebuilt binaries are gone
- iOS: Dark and tinted app icons, `hideSharedBackground` for toolbars and navigation bar buttons, a `height` property for toolbars and animatable `scrollToTop`/`scrollToBottom`
- Android: Change app icons at runtime, `VectorDrawable` support in `ImageView`, camera/gallery pickers for file inputs in `WebView`, `Ti.Android.sdkVersion`, optional flags for `Database.open()` and custom gallery folder names
- Android: A faster V8 bridge (cached property names, no forced full GC after `TiBlob` image operations), Material library 1.14.0 and merged module `build.gradle` repositories
- Cross-platform: `borderDashPattern` on views, `padding` on labels, `itemlongpress` on `ListView`, `searchText` on `TableView`, scroll snapping for `ListView`/`TableView` and animatable rotation
- CLI: Async `validate()`/`run()` for commands and native `fetch`/streams instead of legacy request libraries

**Breaking changes:**

- iOS: `Ti.UI.iOS.SplitWindow` now requires `masterView` and `detailView` to be `Ti.UI.Window` instances. Plain windows get a system navigation bar unless `navBarHidden` is set, and the old layout properties (`showMasterInPortrait`, `masterIsOverlayed`, `portraitSplit`, `landscapeSplit`) are deprecated and have no effect anymore
- Android: `Ti.UI.Color` now has parity with iOS - `Ti.UI.fetchSemanticColor()` returns a `Ti.UI.Color` instance and color instances can be passed to component properties directly

Thanks to everyone in the community who contributed fixes and improvements to this release, especially Michael Gangolf, Chris Barber, Prashant Saini, César Estrada, Marc Bender, Jason David Miller, Sergey Volkov and abentley8!

For a more detailed overview and all changes, see the release notes: [Titanium SDK 14.0.0.GA Release Note](https://titaniumsdk.com/guide/Titanium_SDK/Titanium_SDK_Release_Notes/Titanium_SDK_Release_Notes_14.x/Titanium_SDK_14.0.0.GA_Release_Note.html).

## Install

**Follow these steps to get SDK 14.0.0.GA:**

1. Install the CLI with `npm i -g titanium alloy`
2. Run `titanium sdk install 14.0.0.GA`
3. Set `<sdk-version>14.0.0.GA</sdk-version>` in your `tiapp.xml`

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-sdk/issues).

## How can I support?

If you like our work and want to support, think about a [donation](https://github.com/sponsors/tidev) or to [contribute](/contribute) with your time and code.
A donation helps us to cover the monthly maintenance costs of the projects, so we can continue to release feature- and compatibility updates in the future. Your help is appreciated!
