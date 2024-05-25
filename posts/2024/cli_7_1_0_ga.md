---
title: 'Titanium CLI 7.1.0 GA released'
date: '2024-05-25'
category: 'Release'
author: 'Chris Barber'
teaser: 'In this release, we''ve fixed a number of issues'
image: https://tidev.io/images/cli-7.1.0.jpg
---

![Titanium CLI v7.1.0](/images/cli-7.1.0.jpg)

Titanium CLI 7.1.0 is a small maintenance release with some bug fixes and updates.

 * feat: Support async hook `init()` functions
 * fix: Surface sdk install errors
 * fix: `ti sdk rm <ver>` treats confirm prompt as false
 * fix: Assert required Node.js version
 * fix: Clear out undefined command args which fixes `ti project`
 * fix: `ti sdk install` no longer silently fails when installing new modules
 * fix: When reinstalling an SDK, choosing "Overwrite" will force modules to also be reinstalled
 * fix: Properly handle result from `ti sdk install` overwrite prompt, `ti sdk uninstall` version prompt, and `ti setup user` name prompt

## Install

**To install 7.1.0, run:**

```
[sudo] npm i -g titanium
```

Note: Titanium CLI 7 now requires Node.js 18 or newer.

## Report Bugs

If you run into any issues that seem related to the update, please report them on [GitHub](https://github.com/tidev/titanium-cli/issues).

## How can I support?

If you like our work and want to support, think about a [donation](/donate) or to [contribute](/contribute) with your time and code.
