---
title: 'Titanium CLI 7.0.0.RC released'
date: '2024-03-06 00:00:00'
category: 'RC'
author: 'Chris Barber'
teaser: 'Titanium CLI version 7 is almost here!'
---

Titanium CLI version 7 is almost here! It's been almost 2 years since the last major version and the CLI is overdue for a little ❤️.

This Release Candidate includes several breaking changes and improvements, but most importantly updates the code so that we can update the Node.js code and dependencies in the SDK.

## Notable changes:

  * BREAKING: Dropped support for Node.js 18 and older
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

For a complete list of changes, please see the release notes: [Titanium CLI 7.0.0-rc Release Notes](https://github.com/tidev/titanium-cli/releases/tag/v7.0.0-rc).

## Install

**To install 7.0.0-rc, run:**

```
[sudo] npm i -g titanium@next
```

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-cli/issues).

## How can I support?

If you like our work and want to support, think about a [donation](/donate) or to [contribute](/contribute) with your time and code.
