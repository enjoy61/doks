---
title: "company"
date: 2023-08-21T10:37:06
lastmod: 2023-08-21T13:30:23+08:00
draft: false
weight: 2023
---

提供文本补全 <br/>


## company-安装 {#company-安装}

```elisp
(use-package company
  :ensure t
  :init (add-hook 'after-init-hook 'global-company-mode) ;; 全局有效
  :config
  (setq company-idle-delay                 0.08 ;; 提示时延
        company-minimum-prefix-length      2 ;; 触发提示的字符数
        company-show-numbers               t ;; 给选项编号 M-编号选择
        company-dabbrev-downcase nil ;; 关闭转小写
        ))
```


## 协作插件 {#协作插件}

[company-box](/docs/分享/emacs/插件/company-box/#company-box)

