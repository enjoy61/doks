---
title: "Hugo Theme - 博文列表"
date: 2023-11-13T04:02:34
lastmod: 2023-11-13T21:11:49+08:00
draft: false
weight: 2007
---

## 说明 {#说明}

将分区内博文罗列出来, 并显示在单页面 <br/>

| -    |                     |                                 |            |
|------|---------------------|---------------------------------|------------|
| 博文列表 | 单页面 `Single Page` | Section属性值为空字符串, Type属性为 `page` | \_index.md |
| 博文页 | 章节页面 `Section Page` | Section属性值为所在目录名       |            |


## 创建分区页面 {#创建分区页面}

```bash
hugo new post/_index.md
```


## 博文列表逻辑 {#博文列表逻辑}

`./tass/themes/tass/layouts/_default/list.html` <br/>

| -          |                          |
|------------|--------------------------|
| .Pages     | 获取当前分区的文章集合, 注意, 时间上由新到旧 |
| range      | 遍历集合                 |
| .Permalink | 获取页面链接             |

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>列表页面</title>
</head>
<body>
    <!-- {{ with .Site.GetPage "/post" }}<a href="{{ .Permalink }}">{{ .Title }}</a>{{ end }} -->
    {{ range .Pages }}
    <div>
        <a href="{{ .Permalink }}">{{ .Title }}</a>
    </div>
    {{ end }}
</body>
</html>
```

之前的上一页/下一页, 即是对{{ .Pages }}返回的文章集合遍历 <br/>


### Pages {#pages}

<img src="/pic/搭建博客/Hugo Theme - 博文列表/pages.png" width="400" /> <br/> <br/>


### Permalink {#permalink}

<img src="/pic/搭建博客/Hugo Theme - 博文列表/permalink.png" width="400" /> <br/> <br/>


## 成果 {#成果}

<img src="/pic/搭建博客/Hugo Theme - 博文列表/list.png" width="100" /> <br/> <br/>


## 参考 {#参考}

[内容列表页](https://hugo.aiaide.com/post/%E8%87%AA%E5%AE%9A%E4%B9%89hugo%E4%B8%BB%E9%A2%98-%E5%86%85%E5%AE%B9%E5%88%97%E8%A1%A8%E9%A1%B5/) <br/>

