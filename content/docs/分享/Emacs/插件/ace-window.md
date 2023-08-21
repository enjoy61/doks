---
title: "ace-window"
date: 2023-08-21T09:55:24
lastmod: 2023-08-21T13:30:18+08:00
draft: false
weight: 2005
---

根据标号切换窗口 <br/>


## ace-window-安装 {#ace-window-安装}

```elisp
(use-package ace-window
  :ensure t
  :init
  (progn
    (global-set-key [remap other-window] 'ace-window)
    (custom-set-faces
     '(aw-leading-char-face
       ((t (:inherit ace-jump-face-foreground :height 3.0))))) ;; 配置标识样式
    ))
```

