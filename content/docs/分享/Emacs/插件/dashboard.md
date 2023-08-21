---
title: "dashboard"
date: 2023-08-21T10:50:10
lastmod: 2023-08-21T13:30:23+08:00
draft: false
weight: 2025
---

自定义Emacs打开页面 <br/>


## dashboard-安装 {#dashboard-安装}

```elisp
(use-package dashboard
  :ensure t
  :config
  (setq dashboard-banner-logo-title "Emacs")
  (setq dashboard-startup-banner 'official)
  (setq dashboard-center-content t)
  (setq dashboard-show-shortcuts nil)
  (setq dashboard-items '((recents  . 5)
                          (bookmarks . 5)
                          ;; (projects . 5)
                          (agenda . 5)
                          (registers . 5)))
  (setq dashboard-set-heading-icons t)
  (setq dashboard-set-file-icons t)
  (setq dashboard-set-navigator nil)
  (dashboard-setup-startup-hook)
  )
```

