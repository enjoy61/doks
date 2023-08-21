---
title: "swiper"
date: 2023-08-21T09:59:39
lastmod: 2023-08-21T13:30:19+08:00
draft: false
weight: 2008
---

文本查找, 依赖ivy <br/>


## swiper-安装 {#swiper-安装}

```elisp
(use-package swiper
  :ensure t
  :config
  (progn
    (ivy-mode)
    (setq ivy-use-virtual-buffers t)
    (setq enable-recursive-minibuffers t)
  ;; enable this if you want `swiper' to use it
  ;; (setq search-default-mode #'char-fold-to-regexp)
    (global-set-key "\C-s" 'swiper)
    ))
```


## swiper-快捷键 {#swiper-快捷键}

| -     |     |
|-------|-----|
| 文件内查找 | C-s |
| 下一个 | C-n |
| 上一个 | C-p |
| 跳转  | RET |

