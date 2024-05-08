---
title: 'Titanium CLI 7.0.0 GA released'
date: '2024-05-10'
category: 'Release'
author: 'Chris Barber'
teaser: 'Refactor, '
---

![Titanium CLI v7.0.0](/images/cli-7.0.0.png)

Titanium CLI 7 is finally here! This release is a complete refactor that includes several breaking changes and improvements.

Version 7 adopts the ESM module format allowing dependencies to be updated to their latest versions. Equally important, this enables us to finally update the Node.js code in the SDK including the build command logic.

Titanium CLI 7 now requires Node.js 18 or newer.

## Notable changes:

  * BREAKING: Dropped support for Node.js 16 and older
  * BREAKING: Removed `login`, `logout`, `plugin`, and `status` commands
  * BREAKING: `ti info` no longer shows `haxm`, `genymotion`, macOS info including Xcode CLI Tools, `jarsigner` tool, or `nodeAppcVer`.
  * BREAKING: `ti module` no longer shows both `iphone` and `ios` modules, only `ios`
  * BREAKING: `ti sdk --json` no longer contains `activeSDK` (see `ti sdk select` below)

There have been a number of other improvements:

  * `--sdk <ver>` is now a global option
    - `ti create` will prompt which SDK you wish to use
  * `-d`, `--project-dir` is now a global option
  * Added `--json` flag to `ti config`, `ti info`, `ti sdk`, and `ti sdk list`
  * `ti sdk select` is no longer needed, now it just reads `<sdk-version>` from the `tiapp.xml`
  * Removed all dead code: analytics, telemetry, i18n (for CLI prompts, etc), incomplete tab completion
  * Updated dependencies including replacing outdated dependencies with modern alternatives
  * Lazy load code when possible; when combined with the removed dead code, the CLI in general should be a tiny bit faster

For a complete list of changes, please see the release notes: [Titanium CLI 7.0.0 Release Notes](https://github.com/tidev/titanium-cli/releases/tag/v7.0.0).

## Install

**To install 7.0.0, run:**

```
[sudo] npm i -g titanium
```

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-cli/issues).

## How can I support?

If you like our work and want to support, think about a [donation](/donate) or to [contribute](/contribute) with your time and code.
