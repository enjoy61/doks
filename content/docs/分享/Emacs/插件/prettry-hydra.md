---
title: "prettry-hydra"
date: 2023-08-21T10:09:33
lastmod: 2023-08-21T13:30:20+08:00
draft: false
weight: 2013
---

自定义快捷键菜单 <br/>


## pretty-hydra-安装 {#pretty-hydra-安装}

```elisp
(use-package pretty-hydra
  :ensure t
  :init
  (pretty-hydra-define emms-video-hydra (:title "Emms-hydra" :quit-key "q" :color blue) ;; 为Emms定制播放菜单
    ("Control" (("SPC" emms-pause "Pause")
                ("f" emms-seek-forward "Fast Forward")
                ("b" emms-seek-backward "Rewind")
                ("p" emms-previous "Previous")
                ("n" emms-next "Next")
                ("x" emms-stop "Stop"))))
  :bind("C-c e m" . emms-video-hydra/body))
```


## pretty-hydra-快捷键 {#pretty-hydra-快捷键}

| -       |          |
|---------|----------|
| C-c e m | 打开Emms菜单 |

