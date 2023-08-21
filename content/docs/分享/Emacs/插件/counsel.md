---
title: "counsel"
date: 2023-08-21T09:56:12
lastmod: 2023-08-21T13:30:19+08:00
draft: false
weight: 2007
---

## 概览 {#概览}

-   提供M-x提示、打开文件等功能 <br/>
-   支持在文件夹内所有文件中查找文本, 通过在Shell执行ag命令完成, 需要安装the_silver_searcher <br/>


## the_silver_searcher {#the-silver-searcher}

`macOS` <br/>


### 便签 {#便签}

[GitHub](https://github.com/ggreer/the_silver_searcher)    <br/>


### 安装 {#安装}

```bash
brew install the_silver_searcher
```


### ag支持目录中查找, 速度快, 高亮匹配 {#ag支持目录中查找-速度快-高亮匹配}

```bash
# ag fact
```


### grep需给定文件信息 {#grep需给定文件信息}

```bash
# grep fact *.cpp
```


## counsel-安装 {#counsel-安装}

```elisp
(use-package counsel
  :ensure t
  :config
  (progn
    (global-set-key (kbd "M-x") 'counsel-M-x) ;; M-x
    (global-set-key (kbd "C-x C-f") 'counsel-find-file) ;; 查找文件
    (global-set-key (kbd "C-c k") 'counsel-ag) ;; 目录下查找
    ;; (global-set-key (kbd "C-c C-r") 'ivy-resume)          
    ;; (global-set-key (kbd "<f1> f") 'counsel-describe-function)
    ;; (global-set-key (kbd "<f1> v") 'counsel-describe-variable)
    ;; (global-set-key (kbd "<f1> o") 'counsel-describe-symbol)
    ;; (global-set-key (kbd "<f1> l") 'counsel-find-library)
    ;; (global-set-key (kbd "<f2> i") 'counsel-info-lookup-symbol)
    ;; (global-set-key (kbd "<f2> u") 'counsel-unicode-char)
    ;; (global-set-key (kbd "C-c g") 'counsel-git)
    ;; (global-set-key (kbd "C-c j") 'counsel-git-grep)
    ;; (global-set-key (kbd "C-x l") 'counsel-locate)
    ;; (global-set-key (kbd "C-S-o") 'counsel-rhythmbox)
    ;; (define-key minibuffer-local-map (kbd "C-r") 'counsel-minibuffer-history)
    ))
```


## counsel-快捷键 {#counsel-快捷键}

| -             |                       |           |
|---------------|-----------------------|-----------|
| M-x提示       | counsel-M-x           | `M-x`     |
| 打开文件      | counsel-find-file     | `C-x C-f` |
| 文件夹内所有文件中查找文本 | counsel-ag            | `C-c k`   |
| 打开文件(版本控制) | counsel-git           | `C-c g`   |
| buffer切换    | counsel-switch-buffer | `C-x b`   |


### 打开文件 {#打开文件}

不能使用Delete键删除路径, 输入..返回上层路径 <br/>


## counsel-ag {#counsel-ag}

文件夹内查找 <br/>

| -          |                |                     |
|------------|----------------|---------------------|
| 在新窗口输出查询结果 | ivy-occur      | C-c C-o             |
| 下一个     | next-error     | `M-g n` `` C-x ` `` |
| 上一个     | previous-error | `M-g p`             |

