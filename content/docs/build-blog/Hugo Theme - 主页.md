---
title: "Hugo Theme - 主页"
date: 2023-11-13T04:24:58
lastmod: 2023-11-13T21:12:12+08:00
draft: false
weight: 2008
---

## 说明 {#说明}

在首页显示所有分区列表 <br/>


## 创建另一个分区 {#创建另一个分区}

```bash
hugo new news/page1.md

hugo new news/page2.md
```

可以不执行下列命令, localhost:1313/news/页面仍会显示分区内文章列表 <br/>

```bash
hugo new news/_index.md
```


## 主页 {#主页}

对应 `./tass/content/_index.md` <br/>

同样可以不创建 <br/>


## 主页逻辑 {#主页逻辑}

`./tass/themes/tass/layouts/index.html` <br/>

| -                  |                          |
|--------------------|--------------------------|
| .Site              | 站内                     |
| .RegularPages      | 常规页面                 |
| .Site.RegularPages | 获取了站内所有页面, 包括news和post分区 |

where用来查询集合中满足条件的项目, 即筛选出指定分区的页面. 用法如下 <br/>

```text
where COLLECTION KEY [OPERATOR] MATCH
```

```html
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>网站首页</title>
</head>

<body>
    <h2> 新闻列表 </h2>
    {{ range where .Site.RegularPages "Section" "news" }}
    <div>
        <a href="{{ .Permalink }}">{{ .Title }}</a>
    </div>
    {{ end }}

    <h2> 博文列表 </h2>
    {{ range where .Site.RegularPages "Section" "post" }}
    <div>
        <a href="{{ .Permalink }}">{{ .Title }}</a>
    </div>
    {{ end }}
</body>
</html>
```


### Site {#site}

<img src="/pic/搭建博客/Hugo Theme - 主页/site.png" width="400" /> <br/> <br/>


### RegularPages {#regularpages}

<img src="/pic/搭建博客/Hugo Theme - 主页/regular-pages.png" width="400" /> <br/> <br/>


## 成果 {#成果}

<img src="/pic/搭建博客/Hugo Theme - 主页/homepage.png" width="100" /> <br/> <br/>


## 参考 {#参考}

[首页](https://hugo.aiaide.com/post/%E8%87%AA%E5%AE%9A%E4%B9%89hugo%E4%B8%BB%E9%A2%98-%E7%BD%91%E7%AB%99%E9%A6%96%E9%A1%B5/) <br/>

