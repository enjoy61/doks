---
title: "company-box"
date: 2023-08-21T10:38:43
lastmod: 2023-08-21T13:30:23+08:00
draft: false
weight: 2024
---

修改文本补全备选框样式 <br/>


## company-box-安装 {#company-box-安装}

```elisp
(use-package company-box
  :ensure t
  :if window-system
  :hook (company-mode . company-box-mode))
```

