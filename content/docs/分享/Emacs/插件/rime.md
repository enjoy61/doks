---
title: "rime"
date: 2023-08-21T10:11:32
lastmod: 2023-08-21T13:30:21+08:00
draft: false
weight: 2016
---

Emacs中使用的中文输入法, 区分快捷键和中文输入 <br/>


## 便签 {#便签}

[GitHub](https://github.com/DogLooksGood/emacs-rime) <br/>


## 依赖 {#依赖}


### 支持动态模块的Emacs {#支持动态模块的emacs}

-   [Emacs Rime依赖动态模块](https://github.com/DogLooksGood/emacs-rime/blob/master/INSTALLATION.org) <br/>
-   重新安装Emacs, 选择emacs-plus <br/>


### Rime应用程序 {#rime应用程序}

[Rime](https://rime.im/) <br/>


### librime {#librime}

`macOS` <br/>


#### 下载编译好的librime {#下载编译好的librime}

```bash
# curl -L -O https://github.com/rime/librime/releases/download/1.7.1/rime-1.7.1-osx.zip
# unzip rime-1.7.1-osx.zip -d ~/.emacs.d/librime
# rm -rf rime-1.7.1-osx.zip
```


## 配置 {#配置}


### librime路径 {#librime路径}

```elisp
;; (setq my/rime-librime-root "~/.emacs.d/librime/dist")
```


### 用户数据路径 {#用户数据路径}

```elisp
;; (setq my/rime-user-data-dir "path/to/rime/user/data")
```


## rime-安装 {#rime-安装}

```elisp
(use-package rime
  :ensure t
  :custom
  (rime-librime-root my/rime-librime-root)
  (default-input-method "rime")
  (rime-user-data-dir my/rime-user-data-dir)
  (rime-show-candidate 'posframe)
  :bind
  (:map rime-mode-map
        ("C-`" . 'rime-send-keybinding)))
```


## rime-快捷键 {#rime-快捷键}

| -         |      |
|-----------|------|
| 配置简繁、全半角 | C-\` |
| Rime输入法切换 | C-\\ |

