---
title: "Bootstrap 5 - 导航栏"
date: 2023-11-13T17:16:04
lastmod: 2023-11-13T21:13:08+08:00
draft: false
weight: 2010
---

## 前置 {#前置}

-   Bootstrap是前端插件库 <br/>
    [Bootstrap](https://getbootstrap.com/) <br/>
-   使用[RUNOOB-Bootstrap5教程](https://www.runoob.com/bootstrap5/bootstrap5-tutorial.html) <br/>


## 说明 {#说明}

[导航栏](https://www.runoob.com/bootstrap5/bootstrap5-navbar.html) <br/>

-   不同颜色导航栏 <br/>
-   品牌/Logo <br/>
-   导航栏使用下拉菜单 <br/>
-   固定导航栏 <br/>


## 框架 {#框架}

使用bootstrap5 <br/>

```html
<!DOCTYPE html>
<html lang="zh">
    <head>
        <meta charset="UTF-8">
        <title>{{ .Title }}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.staticfile.org/twitter-bootstrap/5.1.1/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.staticfile.org/twitter-bootstrap/5.1.1/js/bootstrap.bundle.min.js"></script>
    </head>

    <!-- 导航栏逻辑 -->
</html>
```


## 添加导航栏 {#添加导航栏}


### 框架 {#框架}

1.  暗色背景需对应浅色文本 `navbar-dark` , 浅色背景需要深色文本 `navbar-light` <br/>
    
    | -    |              |        |
    |------|--------------|--------|
    | 浅色文本 | navbar-dark  | 背景色是深色 |
    | 深色文本 | navbar-light | 背景色时浅色 |
    
    **没有写错** <br/>
2.  背景颜色 <br/>
    
    | -            |     | 文本色       |
    |--------------|-----|-----------|
    | bg-light     | 浅灰色 | navbar-light |
    | bg-dark      | 黑色 | navbar-dark  |
    | bg-primary   | 蓝色 | navbar-dark  |
    | bg-success   | 绿色 | navbar-dark  |
    | bg-info      | 青色 | navbar-dark  |
    | bg-warning   | 黄色 | navbar-dark  |
    | bg-danger    | 红色 | navbar-dark  |
    | bg-secondary | 深灰色 | navbar-dark  |
3.  使用 `fixed-top` 将导航栏固定在顶部 <br/>

<!--listend-->

```html
<body>
  <nav class="navbar navbar-expand-sm bg-info navbar-light fixed-top">
    <!-- logo -->
    <a class="navbar-brand" href="/">六一的部落格</a>
    <ul class="navbar-nav">
      <!-- 遍历菜单 -->
    </ul>
  </nav>
</body>
```


### 遍历菜单 {#遍历菜单}

支持二级, 显示在下拉框 <br/>

```html
{{ range .Site.Menus.main }} 
{{ if .HasChildren }}
<li class="nav-item dropdown">
  <a href="#" class="nav-link dropdown-toggle" id="navbardrop" data-bs-toggle="dropdown">
    {{ .Name }}
  </a>    
  <div class="dropdown-menu">
    {{ range .Children }}
    <a class="dropdown-item" href="{{ .URL }}">{{ .Name }}</a>
    {{ end }}
  </div>
</li>    
{{ else }}
<li class="nav-item"><a class="nav-link" href="{{ .URL }}">{{ .Name }}</a></li>
{{ end }} 
{{ end }}
```

