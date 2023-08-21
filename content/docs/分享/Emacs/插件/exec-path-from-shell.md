---
title: "exec-path-from-shell"
date: 2023-08-21T09:42:45
lastmod: 2023-08-21T13:30:18+08:00
draft: false
weight: 2002
---

为在Emacs中执行Shell命令提供支持 <br/>


## 说明 {#说明}

1.  Shell可执行的命令，因为环境变量的缺失，在Emacs中无法正确执行；除非从终端运行Emacs，继承Shell环境变量 <br/>
2.  作者Purcell是Emacs博主, 很多人参考他的Emacs配置 <br/>


## exec-path-from-shell-安装 {#exec-path-from-shell-安装}

```elisp
(use-package exec-path-from-shell
  :ensure t
  :init
  (when (memq window-system '(mac ns x))
    (exec-path-from-shell-initialize))
  )
```

