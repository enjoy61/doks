---
title: "treemacs"
date: 2023-08-21T10:18:10
lastmod: 2023-08-21T13:30:21+08:00
draft: false
weight: 2017
---

工作区管理 <br/>


## treemacs-安装 {#treemacs-安装}

```elisp
(use-package treemacs
  :ensure t
  :defer t
  :init
  (with-eval-after-load 'winum
    (define-key winum-keymap (kbd "M-0") #'treemacs-select-window))
  :config
  (progn
    (with-eval-after-load 'treemacs
      (define-key treemacs-mode-map [mouse-1] #'treemacs-single-click-expand-action)) ;; 单击打开文件
    (setq treemacs-show-hidden-files nil)          
    ;; (setq treemacs-show-cursor -1)
    ;; (treemacs-resize-icons 15)          
    )
  :bind
  (:map global-map
        ("M-0"       . treemacs-select-window)
        ;; ("C-x t 1"   . treemacs-delete-other-windows)
        ;; ("C-x t t"   . treemacs)
        ;; ("C-x t d"   . treemacs-select-directory)
        ;; ("C-x t B"   . treemacs-bookmark)
        ;; ("C-x t C-t" . treemacs-find-file)
        ))
```


## treemacs-快捷键 {#treemacs-快捷键}

| -      |     |
|--------|-----|
| 打开文件目录 | M-0 |

