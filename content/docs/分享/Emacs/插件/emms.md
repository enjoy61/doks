---
title: "emms"
date: 2023-08-21T10:07:07
lastmod: 2023-08-21T13:30:20+08:00
draft: false
weight: 2012
---

播放器和Emacs之间的接口 <br/>


## 便签 {#便签}

[GNU Emms](https://www.gnu.org/software/emms/#get_emms) <br/>
[Manual](https://www.gnu.org/software/emms/manual/) <br/>


## emms-安装 {#emms-安装}

```elisp
(use-package emms
  :ensure t
  :init
  (emms-all)
  :config
  (setq emms-player-list '(emms-player-mpv)
        emms-info-function '(emms-info-native)
        emms-source-file-default-directory my/movie-path
        emms-seek-seconds 5)
  :bind (("C-c e SPC" . emms-pause)
         ("C-c e f" . emms-seek-forward)
         ("C-c e b" . emms-seek-backward)
         ("C-c e p" . emms-previous)
         ("C-c e n" . emms-next)
         ("C-c e x" . emms-stop)
         ("C-c e e" . emms)))
```


## emms-快捷键 {#emms-快捷键}

[使用Emacs做视频笔记](/docs/分享/emacs/需求/使用emacs做视频笔记/#使用emacs做视频笔记) <br/>

| -         |        |
|-----------|--------|
| C-c e SPC | 暂停/播放 |
| C-c e f   | 前进   |
| C-c e b   | 后退   |
| C-c e p   | 上一个 |
| C-c e n   | 下一个 |
| C-c e x   | 关闭播放器 |
| C-c e e   | 打开播放列表 |
| C-c e i   | 插入时间戳 |
| C-c e g   | 时间戳跳转 |

