---
title: "Bootstrap 5 - 容器"
date: 2023-11-13T19:00:35
lastmod: 2023-11-13T21:17:49+08:00
draft: false
weight: 2012
---

## 说明 {#说明}

[容器](https://www.runoob.com/bootstrap5/bootstrap5-container.html)     <br/>
当前导航栏和最近发布有重叠 <br/>

以最近发布为例 <br/>


## 添加容器 {#添加容器}

默认情况下，容器都有填充左右内边距 <br/>

```html
<div class="container">
  <!-- 最近发布逻辑 -->
</div>
```


## 为容器填充内边距 {#为容器填充内边距}

1.  `p-5` 的效果好于 `pt-5` <br/>
    ```html
    <div class="container p-5">
      <!-- 最近发布逻辑 -->
    </div>
    ```
2.  同时使用 `my-5` <br/>
    内边距更宽 <br/>
    ```html
    <div class="container p-5 my-5">
      <!-- 最近发布逻辑 -->
    </div>
    ```
3.  设置边框 <br/>
    ```html
    <div class="container p-5 my-5 border">
      <!-- 最近发布逻辑 -->
    </div>
    ```


## 为导航栏添加容器 {#为导航栏添加容器}

```html
<div class="container p-5">
  <!-- 导航栏逻辑 -->
</div>
```


## 为最近发布和最近更新添加容器 {#为最近发布和最近更新添加容器}

```html
<div class="container p-5 my-5 border">
    <!-- 最近发布逻辑 -->
</div>

<div class="container p-5 my-5 border">
    <!-- 最近更新逻辑 -->
</div>
```


## 为博文添加容器 {#为博文添加容器}

```html
<div id="post" class="container p-5 my-5">
      <article>
          <header>
              <h1 class="post-title">{{ .Title }}</h1>
          </header>
          {{.Content}}
      </article>
  </div>

  <div class="container p-5 my-5">
      {{ with .NextInSection }}
      <a href="{{ .Permalink }}">前一篇</a>
      {{ end }}
      {{ with .PrevInSection }}
      <a href="{{ .Permalink }}">后一篇</a> 
      {{ end }}
</div>
```

