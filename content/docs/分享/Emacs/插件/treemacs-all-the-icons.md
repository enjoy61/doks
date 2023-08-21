---
title: "treemacs-all-the-icons"
date: 2023-08-21T10:20:58
lastmod: 2023-08-21T13:30:21+08:00
draft: false
weight: 2018
---

设置treemacs图标主题 <br/>


## 依赖 {#依赖}

all-the-icons是一个插件, 可以在文本中插入字体图标 <br/>
treemacs-all-the-icons并不依赖all-the-icons, 但使用all-the-icons提供的字体 <br/>


### all-the-icons {#all-the-icons}

[GitHub](https://github.com/domtronn/all-the-icons.el/tree/d922aff57ac8308d3ed067f9151cc76d342855f2) <br/>
字体存放在fonts目录下 <br/>


## treemacs-all-the-icons-安装 {#treemacs-all-the-icons-安装}

```elisp
(use-package treemacs-all-the-icons
  :ensure t
  :config
  (treemacs-load-theme "all-the-icons")
  )
```

