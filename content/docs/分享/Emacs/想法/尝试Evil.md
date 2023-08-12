---
title: "尝试Evil"
date: 2023-08-12T22:51:51
lastmod: 2023-08-12T22:58:47+08:00
draft: false
weight: 2001
---

## 安装evil {#安装evil}

[Manual](https://evil.readthedocs.io/en/latest/index.html) <br/>
[GitHub](https://github.com/emacs-evil/evil/tree/8231fe57b8420ae4d7c7b4d99b65ba0809073565) <br/>


### 依赖 {#依赖}

| -         |                                                                                                |
|-----------|------------------------------------------------------------------------------------------------|
| goto-chg  | [github](https://github.com/emacs-evil/goto-chg/tree/278cd3e6d5107693aa2bb33189ca503f22f227d0) |
| undo-tree | [elpa](https://elpa.gnu.org/packages/undo-tree.html)                                           |
| undo-fu   | [melpa](https://melpa.org/#/?q=undo-fu)                                                        |

```elisp
;; (use-package goto-chg
;;   :ensure t)
;; (use-package undo-tree
;;   :ensure t)
;; (use-package undo-fu
;;   :ensure t)
```


### 安装evil {#安装evil}

```elisp
;; (use-package evil
;;   :ensure t
;;   :config (progn (evil-mode t)
;;                  (setq evil-default-state 'emacs)
;;                  ;; (evil-set-initial-state evil-mode 'emacs)
;;                  (setq evil-emacs-state-cursor '("grey" box)) ;; C-z
;;                  (setq evil-normal-state-cursor '("green" box)) ;; esc
;;                  (setq evil-insert-state-cursor '("red" box)) ;; i
;;                  (setq evil-replace-state-cursor '("red" hollow)) ;; r
;;                  (setq evil-visual-state-cursor '("yellow" box))))
```


### 相关插件 {#相关插件}

| -           |                    |
|-------------|--------------------|
| evil-tabs   | tabs标签           |
| evil-leader | 定义evil-mode下使用的快捷键 |


#### evil-tabs {#evil-tabs}

```elisp
;;(use-package evil-tabs
;;:ensure t
;;:config (global-evil-tabs-mode t))
```


#### evil-leader {#evil-leader}

[GitHub](https://github.com/cofi/evil-leader/tree/39f7014bcf8b36463e0c7512c638bda4bac6c2cf) <br/>

```elisp
;; (use-package evil-leader
;; :ensure t
;; :init (progn
;;           (global-evil-leader-mode t)
;;           (evil-leader/set-leader "<SPC>")
;;           (evil-leader/set-key
;;             "e" 'find-file)))
```

