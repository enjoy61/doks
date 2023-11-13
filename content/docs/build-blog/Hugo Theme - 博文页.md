---
title: "Hugo Theme - 博文页"
date: 2023-11-13T03:40:24
lastmod: 2023-11-13T21:10:49+08:00
draft: false
weight: 2006
---

## 说明 {#说明}

本节目的是能打开localhost:1313/post/page1/链接 <br/>


## 准备工作 {#准备工作}

根目录 `./` <br/>

1.  创建项目 <br/>
    ```bash
    hugo new site tass
    cd tass
    ```
    出现文件夹 `./tass` <br/>
2.  创建主题 <br/>
    ```bash
    hugo new theme tass
    ```
    出现文件夹 `./tass/themes/tass` <br/>
3.  创建项目内第一篇博文 <br/>
    ```bash
    hugo new post/page1.md
    ```
    出现文件 `./post/page1.md` <br/>
    
    填写内容 <br/>
    ```text
    第一篇博文
    
    Hello
    
    World！
    ```
4.  创建项目内第二篇博文 <br/>
    ```bash
    hugo new post/page2.md
    ```
    出现文件 `./post/page2.md` <br/>


## 博文模板 {#博文模板}

`./archetypes/default.md` 为所有以(.md)结尾的文件的模板 <br/>

目前不会对其做修改 <br/>

相应地, 在本地测试时需使用 `-D` 参数 <br/>

```bash
hugo -D
```


## 配置主题 {#配置主题}

`./config.toml` <br/>

添加主题设置 <br/>

```toml
theme = "tass"
```


## 显示博文逻辑 {#显示博文逻辑}

`./tass/themes/tass/layouts/_default/single.html` <br/>

```html
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{.Title}}</title>
</head>

<body>
    <div id="post" class="post">
        <article>
            <header>
                <h1 class="post-title">{{ .Title }}</h1>
            </header>
            {{.Content}}
        </article>
    </div>
</body>

</html>
```


## Front Matter {#front-matter}

Markdown格式的博文最上方, 为yaml或toml设定的配置项 <br/>

通常有下列信息 <br/>

```toml
title: "Page1"
date: 2023-11-13T03:03:57+08:00
draft: false
```


## 可以使用的方法 {#可以使用的方法}

[Hugo - Page variables](https://gohugo.io/variables/page/) <br/>

| -              |                  |
|----------------|------------------|
| .Title         | 获取Front Matter标题 |
| .Date          | 获取Front Matter日期 |
| .Content       | 内容             |
| .NextInSection | 同一分区内下一个页面 |
| .PrevInSection | 同一分区内上一个页面 |
| .WordCount     | 适用于英文单词计数 |
| .ReadingTime   | 预估阅读时间     |

在 `./tass/themes/tass/layouts/_default/single.html` 中测试 <br/>

```html
<p>本页单词数{{ .WordCount }}</p>
<p>预计阅读时间{{ .ReadingTime }}Min</p>
<p>日期{{ .Date }}</p>
<br/>

<div>
  {{ with .PrevInSection }}
  <a href="{{ .Permalink }}">前一篇</a> 
  {{ end }}
  {{ with .NextInSection }}
  <a href="{{ .Permalink }}">后一篇</a>
  {{ end }}
</div>
```


## 成果 {#成果}

<img src="/pic/搭建博客/Hugo Theme - 博文页/page.png" width="300" /> <br/> <br/>


## 参考 {#参考}

[内容页](https://hugo.aiaide.com/post/%E8%87%AA%E5%AE%9A%E4%B9%89hugo%E4%B8%BB%E9%A2%98-%E4%BB%8E%E5%86%85%E5%AE%B9%E9%A1%B5%E5%BC%80%E5%A7%8B/) <br/>

