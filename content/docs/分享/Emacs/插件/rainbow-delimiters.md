---
title: "rainbow-delimiters"
date: 2023-08-21T10:33:47
lastmod: 2023-08-21T13:30:22+08:00
draft: false
weight: 2021
---

为匹配括号设置相同颜色 <br/>


## rainbow-delimiters-安装 {#rainbow-delimiters-安装}

```elisp
(use-package rainbow-delimiters
  :ensure t
  :init
  (progn
    (rainbow-delimiters-mode t)
    (add-hook 'prog-mode-hook #'rainbow-delimiters-mode)
    ;; (add-hook 'org-mode-hook #'rainbow-delimiters-mode)          
    )
  )
```

