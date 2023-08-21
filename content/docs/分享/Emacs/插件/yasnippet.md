---
title: "yasnippet"
date: 2023-08-21T10:35:32
lastmod: 2023-08-21T13:30:22+08:00
draft: false
weight: 2022
---

预定义模板 <br/>


## yasnippet-安装 {#yasnippet-安装}

```elisp
(use-package yasnippet
  :config
  (progn
    (let ((yas-snippet (concat my/emacs-config "/snippets")))
      (setq yas-snippet-dirs '())
      (add-to-list 'yas-snippet-dirs yas-snippet)
      )
    (require 'yasnippet)
    (yas-global-mode 1)
    )
  :ensure t
  )
```

