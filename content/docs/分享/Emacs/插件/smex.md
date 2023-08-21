---
title: "smex"
date: 2023-08-21T09:55:50
lastmod: 2023-08-21T13:30:19+08:00
draft: false
weight: 2006
---

M-x提示 <br/>


## smex-安装 {#smex-安装}

```elisp
;; (use-package smex
;;   :ensure t
;;   :config ((smex-initialize)
;;            (global-set-key (kbd "M-x") 'smex)
;;            (global-set-key (kbd "M-X") 'smex-major-mode-commands)
;;            (global-set-key (kbd "C-c C-c M-x") 'execute-extended-command) ;; This is your old M-x.
;;            ))
```

