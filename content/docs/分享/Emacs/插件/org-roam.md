---
title: "org-roam"
date: 2023-08-21T10:01:41
lastmod: 2023-08-21T13:30:20+08:00
draft: false
weight: 2010
---

构建个人知识网络 <br/>


## 便签 {#便签}

[GitHub](https://github.com/org-roam/org-roam/tree/5c06471c3a11348342719fd9011486455adeb701) <br/>
[Manual](https://www.orgroam.com/manual.html) <br/>


## org-roam-安装 {#org-roam-安装}

```elisp
(use-package org-roam
  :ensure t
  :custom
  (org-roam-directory my/org-roam-directory)
  ;; custom
  (org-roam-completion-everywhere t)
  :bind (("C-c n f" . org-roam-node-find)
         ("C-c n i" . org-roam-node-insert)         
         ("C-c n l" . org-roam-buffer-toggle)
         ("C-c n s" . org-roam-db-sync)
         ("C-c n r" . org-roam-db-clear-all)
         ;; ("C-c n c" . org-roam-capture)
         ;; Dailies
         ;; ("C-c n j" . org-roam-dailies-capture-today)
         ;; ("C-c n g" . org-roam-graph) ;; 需安装Graphviz       
         ;; custom ;; 使能 org-roam-completion-everywhere
         ;; ("C-M-i" . completion-at-point)
         )
  :config
  ;; If you're using a vertical completion framework, you might want a more informative completion interface
  (setq org-roam-node-display-template (concat "${title:*} " (propertize "${tags:10}" 'face 'org-tag)))
  (org-roam-db-autosync-mode)
  (org-roam-db-sync)
  ;; If using org-roam-protocol
  (require 'org-roam-protocol)
  (setq org-roam-capture-templates '(
                                     ("d" "default" plain
                                      "%?"
                                      :target (file+head "%^{目录}/${title}.org" "#+title: ${title}\n")
                                      :unarrowed t)
                                     )))
```


## org-roam-快捷键 {#org-roam-快捷键}

| -       |                    |
|---------|--------------------|
| C-c n f | 查找节点 （查找不到新增) |
| C-c n i | 在当前位置插入节点 （查找不到新增） |
| C-c n l | 查看所在节点引用   |
| C-c n s | 数据库同步         |
| C-c n r | 清除数据库         |
| C-c C-l | 查看节点链接       |
| C-c C-o | 打开节点           |


## 协作插件 {#协作插件}

[org-roam-ui](/docs/分享/emacs/插件/org-roam-ui/#org-roam-ui)

