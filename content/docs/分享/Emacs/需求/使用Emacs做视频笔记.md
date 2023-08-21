---
title: "使用Emacs做视频笔记"
date: 2023-08-12T16:27:08
lastmod: 2023-08-21T14:17:05+08:00
draft: false
weight: 2004
---

## 需求 {#需求}

有尝试使用Logseq和Obsidian做视频笔记，结果不太满意，不过弄清楚了需求 <br/>

| -                    |
|----------------------|
| 在笔记页面控制视频的暂停，前进，后退 |
| 播放器能加载字幕，能设置屏幕大小(全屏) |
| 在笔记页面添加时间戳 |
| 从时间戳播放视频     |


## 说明 {#说明}

| -     |              |                            |
|-------|--------------|----------------------------|
| 播放器 | mpv          |                            |
| 插件  | emms         | 播放器和Emacs间的接口：控制播放器，获取相关参数 |
| 插件  | pretty-hydra | 自定义快捷键菜单           |
| 自定义函数 |              | 打时间戳，跳转             |


## 时间戳样式 {#时间戳样式}

**无!** <br/>

```text
![[timestamp:file.mp4#00:29][name]]
```


## 需设置emms默认播放路径 {#需设置emms默认播放路径}

```elisp
;; (setq my/movie-path "path/to/movie")
```


## 需设置视频根目录 {#需设置视频根目录}

```elisp
;; (setq my/video-path "path/to/video")
```


## 安装emms {#安装emms}

[emms-安装](/docs/分享/emacs/插件/emms/#emms-安装) <br/>


## 安装pretty-hydra {#安装pretty-hydra}

[pretty-hydra-安装](/docs/分享/emacs/插件/prettry-hydra/#pretty-hydra-安装) <br/>


## 插入时间戳 {#插入时间戳}

```elisp
(defun my/insert-timestamp()
  (interactive)
  (let ((desc (read-string "Description: ")))
    (setq my/mpv-current-file nil)
    (setq my/mpv-timestamp nil)
    (emms-player-mpv-ipc-req-send '(get_property path)
                                  #'(lambda (ret err) (unless err
                                                        (setq my/mpv-current-file (file-relative-name ret my/video-path))
                                                        )
                                      )
                                  )
    (emms-player-mpv-ipc-req-send '(get_property time-pos)
                                  #'(lambda (ret err) (unless err
                                                        (setq my/mpv-timestamp ret)
                                                        )
                                      )
                                  )
    (sleep-for 0.1)
    (when (and my/mpv-timestamp my/mpv-current-file)
      (insert (format (concat "[[" "timestamp:%s#%d][时间戳:%s]]") my/mpv-current-file my/mpv-timestamp desc))
      (message "Add timestamp %s#%d success!" my/mpv-current-file my/mpv-timestamp)
      )
    (unless (and my/mpv-timestamp my/mpv-current-file)
      (message "Fail to insert timestamp!")
      )
    )
  )
(global-set-key (kbd "C-c e i") 'my/insert-timestamp)
```


## 时间戳跳转 {#时间戳跳转}

```elisp
(defun my/emms-player-start-hook ()
  ;; (emms-pause)
  (emms-seek-to my/emms-timestamp)
  (remove-hook 'emms-player-started-hook 'my/emms-player-start-hook))

(defun my/seek-to-timestamp ()
  (interactive)
  (when (search-backward (concat "[[" "timestamp:") nil t)
    (when (re-search-forward (rx "[[" "timestamp:" (group (0+ (not "#"))) "#" (group (0+ (not "]"))) "][" (group (0+ (not "]"))) "]]" ) nil t)
      (let ((file (string-join (mapcar #'string (match-string 1)))))
        (setq my/emms-timestamp (string-join (mapcar #'string (match-string 2))))
        (if emms-player-playing-p (emms-stop))
        (add-hook 'emms-player-started-hook 'my/emms-player-start-hook)
        (emms-player-start (emms-track 'file (concat my/video-path "/" file)))
        ;; (setq track (emms-track 'file (concat my/video-path "/" file)))
        ;; (emms-player-start track)
        )
      )
    )
  )
(global-set-key (kbd "C-c e g") 'my/seek-to-timestamp)
```

