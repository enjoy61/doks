---
title: "try"
date: 2023-08-20T19:15:02
lastmod: 2023-08-21T13:30:18+08:00
draft: false
weight: 2001
---

试用插件, 重启后删除 <br/>


## try-安装 {#try-安装}

```elisp
(use-package try
  :ensure t)
```


## 尝试使用其他插件 {#尝试使用其他插件}

1.  M-x, 执行try <br/>
2.  输入想要尝试的插件名 <br/>
3.  如果查找不到, 执行package-refresh-contents后再执行try, 或者直接执行try-and-refresh

