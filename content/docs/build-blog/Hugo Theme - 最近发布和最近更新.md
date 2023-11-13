---
title: "Hugo Theme - 最近发布和最近更新"
date: 2023-11-13T19:01:21
lastmod: 2023-11-13T21:14:43+08:00
draft: false
weight: 2011
---

## 说明 {#说明}

春天开始用Hugo, 到现在已经鼓捣过好些了主题, 自己的需求也渐渐清晰. 自定义主题的好处, 拥有适合的框架, 以及满足自己的需求 <br/>

比如说, 文档类主题通常没有最近发布页面, 而这一点在技术博客里挺重要的, 可以把握自己一段时间以来的积累 <br/>

这一块的逻辑并不复杂, 一则是计数器, 再来就是分区的筛选, 最后是对日期显示的优化 <br/>


## 计数器逻辑 {#计数器逻辑}

Hugo提供全局计数器, 通过调用并减去初始值, 实现计数功能 <br/>

[转换成整型](https://gohugo.io/functions/cast/toint/) <br/>


## 分区筛选 {#分区筛选}

1.  `.Site.RegularPages` 用来获取站点所有博文页 <br/>
2.  使用 `ByPublishDate` 按发布日期从远到近排序; 使用 `ByLastmod` 按修改日期从远到近排序 <br/>
3.  使用 `Reverse` 逆序 <br/>
4.  对笔记分区使用 <br/>


## 日期显示 {#日期显示}

| -                                                       |
|---------------------------------------------------------|
| [Date用法](https://gohugo.io/methods/page/date/)        |
| [Time方法](https://gohugo.io/methods/time/)             |
| [Time.Format用法](https://gohugo.io/methods/time/format/) |


### Date用法 {#date用法}

```html
{{ .Date | time.Format ":date_medium" }}
```

```text
Oct 19, 2023
```


### 日期格式 {#日期格式}

-   年月日 <br/>
-   时间, 分上下午 <br/>
-   星期几 <br/>

<!--listend-->

```html
{{ $format := "Mon, 2 Jan 2006 03:04 pm"}}
{{ .PublishDate | time.Format $format }}
```


## 完整实现 {#完整实现}

-   最近发布 <br/>
    ```html
    <h2> 最近发布 </h2>
    {{ $start := math.Counter }}
    {{ $count := 15 }}
    {{ range where .Site.RegularPages.ByPublishDate.Reverse "Section" "notebook" }}
    <div>
      <a href="{{ .Permalink }}">{{ .Title }} {{ .PublishDate }} </a>
    </div>
      {{ $ans := sub math.Counter $start }}
      <!-- 将ans转换成整型-->
      {{ $ans := int $ans }}
      {{ if ge $ans $count }}
        {{ break }}
      {{ end }}
    {{ end }}
    ```
-   最近更新 <br/>
    ```html
    <h2> 最近更新 </h2>
    {{ $start := math.Counter }}
    {{ $count := 15 }}
    {{ range where .Site.RegularPages.ByLastmod.Reverse "Section" "notebook" }}
    <div>
      <a href="{{ .Permalink }}">{{ .Title }} {{ .Lastmod }} </a>
    </div>
      {{ $ans := sub math.Counter $start }}
      {{ $ans := int $ans }}
      {{ if ge $ans $count }}
        {{ break }}
      {{ end }}
    {{ end }}
    ```


## 可以改善的地方 {#可以改善的地方}

-   [ ] 按日期分组 <br/>
-   [X] 放在主页时, 和导航栏有重叠 <br/>

