---
title: "smartparens"
date: 2023-08-21T10:31:34
lastmod: 2023-08-21T13:30:22+08:00
draft: false
weight: 2020
---

成对键入括号 <br/>


## 说明 {#说明}

若开启smartparens-strict-mode, 会成对删除括号和其包含的内容 <br/>


## smartparens-安装 {#smartparens-安装}

```elisp
(use-package smartparens
  :ensure t
  :hook (
         (prog-mode . smartparens-mode)
         (c++-mode . smartparens-mode) 
         (c-mode . smartparens-strict-mode)              
         )
  :custom
  (sp-escape-quotes-after-insert nil)
  :config
  (require 'smartparens-config)
  (smartparens-global-mode t))
```

