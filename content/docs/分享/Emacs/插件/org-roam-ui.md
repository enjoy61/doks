---
title: "org-roam-ui"
date: 2023-08-21T10:04:08
lastmod: 2023-08-21T13:30:20+08:00
draft: false
weight: 2011
---

在网页展示org-roam节点 <br/>


## 便签 {#便签}

[GitHub](https://github.com/org-roam/org-roam-ui) <br/>


## org-roam-ui-安装 {#org-roam-ui-安装}

```elisp
(use-package org-roam-ui
  :ensure t
  :after org-roam
;;         normally we'd recommend hooking orui after org-roam, but since org-roam does not have
;;         a hookable mode anymore, you're advised to pick something yourself
;;         if you don't care about startup time, use
  :hook (after-init . org-roam-ui-mode)
  :config
  (setq org-roam-ui-sync-theme t
        org-roam-ui-follow t
        org-roam-ui-update-on-save t
        org-roam-ui-open-on-start t)
  :bind (("C-c n u" . org-roam-ui-open)))
```


## org-roam-ui-快捷键 {#org-roam-ui-快捷键}

| -       |      |
|---------|------|
| C-c n u | 打开视图 |

