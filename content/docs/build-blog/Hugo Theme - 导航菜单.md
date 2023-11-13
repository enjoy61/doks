---
title: "Hugo Theme - 导航菜单"
date: 2023-11-13T04:43:03
lastmod: 2023-11-13T21:23:00+08:00
draft: false
weight: 2009
---

## 说明 {#说明}

添加导航菜单 <br/>


## 添加导航菜单 {#添加导航菜单}

`config.toml` <br/>

<img src="/pic/搭建博客/Hugo Theme - 导航菜单/nav.png" width="400" /> <br/> <br/>

`menu.main` 中的 `main` 为表名 <br/>

子项有 `parent` 属性, 用于关联上级菜单, 可以设置为上级菜单名字和ID. 因为名字可以重复, 建议设置为ID <br/>

```toml
# 主导航菜单
[[menu.main]]
  name="主页"
  url="/"
  weight="10"

[[menu.main]]
  name="笔记"
  url="/notebook"
  weight="20"

[[menu.main]]
  name="日志"
  url="/blog"
  weight="30"

[[menu.main]]
  name="书签"
  url="/bookmark"
  weight="40"

[[menu.main]]
  name="关于"
  identifier="about"
  url="/about"
  weight="50"

[[menu.main]]
  parent="about"
  name="技能树"
  url="/about/skill-tree"
  weight="5001"

[[menu.main]]
  parent="about"
  name="Hobby"
  url="/about/hobby"
  weight="5002"

[[menu.main]]
  parent="about"
  name="版权声明"
  url="/about/copyright"
  weight="5003"
```


## 导航菜单项仓用属性 {#导航菜单项仓用属性}

| -           |             |
|-------------|-------------|
| .Name       | 名称        |
| .Identifier | 唯一标识, 不允许重复 |
| .Weight     | 权重        |
| .Parent     | 上级菜单ID  |
| .URL        | 该项链接    |


## 获取导航菜单逻辑 {#获取导航菜单逻辑}

按理说所有页面都有导航菜单. 现只给出逻辑, 并在主页尝试 <br/>

导航菜单项通过 `.Site.Menus` 获取. 比如我们使用 `[[menu.main]]` , 通过 `.Site.Menus.main` 获取菜单项 <br/>

如果我们定义了页脚菜单 `[[menu.footer]]` , 则通过 `.Site.Menus.footer` 获取 <br/>


### 无子项 {#无子项}

```html
<h2>导航菜单</h2>
<ul>
  {{ range .Site.Menus.main }}
  <li><a href="{{ .URL }}">{{ .Name }}</a></li>
  {{ end }}
</ul>
```


### 有子项 {#有子项}

如果该项拥有子项, `.HasChildren` 返回true <br/>

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
      <h2>导航菜单</h2>
      <ul>
        {{ range .Site.Menus.main }} 
        {{ if .HasChildren }}
        <li>{{ .Name }}</li>
        <ul>
          {{ range .Children }}
          <li>
            <a href="{{ .URL }}">{{ .Name }}</a>
          </li>
          {{ end }}
        </ul>
        {{ else }}
        <li><a href="{{ .URL }}">{{ .Name }}</a></li>
        {{ end }}
        {{ end }}
      </ul>
    </body>
  </html>
```


## 成果 {#成果}

<img src="/pic/搭建博客/Hugo Theme - 导航菜单/res.png" width="200" /> <br/> <br/>


## 参考 {#参考}

[导航菜单](https://hugo.aiaide.com/post/%E8%87%AA%E5%AE%9A%E4%B9%89hugo%E4%B8%BB%E9%A2%98-%E5%AF%BC%E8%88%AA%E8%8F%9C%E5%8D%95/) <br/>

