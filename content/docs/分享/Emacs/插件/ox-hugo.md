---
title: "ox-hugo"
date: 2023-08-21T10:10:05
lastmod: 2023-11-11T18:47:10+08:00
draft: false
weight: 2014
---

导出Hugo兼容Markdown文件, 支持批量(子树)导出 <br/>


## ox-hugo-安装 {#ox-hugo-安装}

```elisp
(use-package ox-hugo
  :ensure t   ;Auto-install the package from Melpa
  :pin melpa  ;`package-archives' should already have ("melpa" . "https://melpa.org/packages/")
  :after ox
  :config
  ;; 不处理图片
  (setq org-hugo-external-file-extensions-allowed-for-copying nil))
```


## ox-hugo-快捷键 {#ox-hugo-快捷键}

[使用ox-hugo导出博客](/docs/分享/emacs/需求/使用ox-hugo导出博客/#使用ox-hugo导出博客) <br/>

| -       |           |
|---------|-----------|
| C-c h s | 导出所属子树 |
| C-c h a | 导出文件内所有子树 |


## 专题 {#专题}

[ox-hugo用法](/docs/分享/emacs/专题/ox-hugo用法/#ox-hugo用法) <br/>

