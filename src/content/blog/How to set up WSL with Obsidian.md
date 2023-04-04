---
title: "Hello World test markdown"
pubDate: 2023-02-09
description: "hello world"
author: "Pike"
tags: ["blog"]
slug: obsidian-to-wsl
---

# How to set up WSL with Obsidian
Obsidian can't natively open and edit WSL files, so, if you're like me and like using Obsidian (because vs-code always gives me markdown errors when I add front matter) you can mount your windows directory into the Astro content directory.

- edit /etc/wsl.conf:
```
[boot]
systemd=true
```
- edit /etc/fstab and add a folder and link it to your astro content folder:
```
/mnt/c/Users/<path to obsidian folder with site content> /home/<path to astro content directory> none defaults,bind,uid=1000,gid=1000,umask=022 0 0
```
- open obsidian in windows and edit your content files in astro