---
title: "Bootstrap 5 - 侧边栏导航"
date: 2023-11-13T20:12:04
lastmod: 2023-11-13T21:20:27+08:00
draft: false
weight: 2013
---

`Offcanvas` <br/>


## 说明 {#说明}

[侧边导航栏](https://www.runoob.com/bootstrap5/bootstrap5-offcanvas.html) <br/>

因为笔记本很多, 侧边导航栏需要支持折叠 <br/>

是否可以不固定, 有待观察 <br/>


## 侧边栏样式 {#侧边栏样式}

添加到头部 <br/>

```html
<head>
  <!-- 其他逻辑 -->
  <style>body{min-height:100vh;min-height:-webkit-fill-available}html{height:-webkit-fill-available}main{display:flex;flex-wrap:nowrap;height:100vh;height:-webkit-fill-available;max-height:100vh;overflow-x:auto;overflow-y:hidden}.b-example-divider{flex-shrink:0;width:1.5rem;height:100vh;background-color:rgba(0,0,0,.1);border:solid rgba(0,0,0,.15);border-width:1px 0;box-shadow:inset 0 .5em 1.5em rgba(0,0,0,.1),inset 0 .125em .5em rgba(0,0,0,.15)}.bi{vertical-align:-.125em;pointer-events:none;fill:currentColor}.dropdown-toggle{outline:0}.nav-flush .nav-link{border-radius:0}.btn-toggle{display:inline-flex;align-items:center;padding:.25rem .5rem;font-weight:600;color:rgba(0,0,0,.65);background-color:transparent;border:0}.btn-toggle:hover,.btn-toggle:focus{color:rgba(0,0,0,.85);background-color:#d2f4ea}.btn-toggle::before{width:1.25em;line-height:0;content:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");transition:transform .35s ease;transform-origin:.5em 50%}.btn-toggle[aria-expanded="true"]{color:rgba(0,0,0,.85)}.btn-toggle[aria-expanded="true"]::before{transform:rotate(90deg)}.btn-toggle-nav a{display:inline-flex;padding:.1875rem .5rem;margin-top:.125rem;margin-left:1.25rem;text-decoration:none}.btn-toggle-nav a:hover,.btn-toggle-nav a:focus{background-color:#d2f4ea}.scrollarea{overflow-y:auto}.fw-semibold{font-weight:600}.lh-tight{line-height:1.25}.bd-placeholder-img{font-size:1.125rem;text-anchor:middle;-webkit-user-select:none;-moz-user-select:none;user-select:none}@media (min-width:768px){.bd-placeholder-img-lg{font-size:3.5rem}}</style>
</head>
```


## 图片信息 {#图片信息}

```html
<body>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="grid" viewBox="0 0 16 16">
      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
    </symbol>
  </svg>
</body>
```


## 框架 {#框架}

```html
<body>
    <!-- 图片信息 -->

    <div class="flex-shrink-0 p-3 bg-white" style="width: 280px;">
        <a href="/notebook" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
            <svg class="bi me-2" width="30" height="24"><use xlink:href="#grid"/></svg>
            <span class="fs-5 fw-semibold">类别</span>
        </a>
        <ul class="list-unstyled ps-0">
            <!-- TODO: 遍历notebook下级分区 -->
        </ul>
    </div>
</body>
```


## 嵌套分区 {#嵌套分区}


### 最外层框架: 遍历notebook下级分区 {#最外层框架-遍历notebook下级分区}

notebook分区下没有博文, 全是节点, 为第1级分区 <br/>

```html
{{ range where .Site.Sections "Section" "notebook"}}
{{ range .Sections }}

<!-- 分区逻辑 -->
<li class="mb-1 my-1 ms-3">

    <!-- 显示第1级分区 -->
    <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#section-{{ md5 .Title }}" aria-expanded="false">
        {{ .Title }}
    </button>

    <!-- TODO: 遍历第1级分区下级 -->
</li>
{{ end }}
{{ end }}
```


### 遍历第1级分区下级 {#遍历第1级分区下级}

```html
<!-- 注意此处id值 -->
<div class="collapse" id="section-{{ md5 .Title }}">
    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">

        <!-- 第1级分区中第2级分区和博文混合 -->
        {{ range .Pages }}
        {{ if .IsNode }}
        <!-- 如果是节点, 则为第2级分区 -->

        <!-- TODO: 第2级分区框架 -->
        {{ else }}
        <!-- 如果是博文, 显示博文标题 -->
        <li><a href="{{ .Permalink }}" class="link-dark rounded">{{ .Title}} </a></li>
        {{ end }} 
        {{ end }}    
    </ul>  
</div> 
```


### 第2级分区框架 {#第2级分区框架}

```html
<li class="mb-1 my-1 ms-3">

    <!-- 显示第2级分区 -->
    <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#section-{{ md5 .Title }}" aria-expanded="false">
    {{ .Title }}
    </button>

    <!-- TODO: 遍历第2级分区下级 -->
</li>
```


### 遍历第2级分区下级 {#遍历第2级分区下级}

```html
<div class="collapse" id="section-{{ md5 .Title }}">
     <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">

         <!-- 第2级分区中第3级分区和博文混合 -->
         {{ range .Pages }}
         {{ if .IsNode }}
         <!-- 如果是节点, 则为第3级分区 -->

         <!-- TODO: 第3级分区框架 -->
         {{ else }}
         <!-- 如果是博文, 显示博文标题 -->
         <li><a href="{{ .Permalink }}" class="link-dark rounded">{{ .Title}} </a></li>
         {{ end }} 

         {{ end }}    
     </ul>
 </div> 
```


### 第3级分区框架 {#第3级分区框架}

```html
<li class="mb-1 my-1 ms-3">

    <!-- 显示第3级分区 -->        
    <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#section-{{ md5 .Title }}" aria-expanded="false">
    {{ .Title }}
    </button>

    <!-- TODO: 遍历第3级分区下级 -->
</li>
```


### 遍历第3级分区下级 {#遍历第3级分区下级}

认为全是博文页 <br/>

```html
<div class="collapse" id="section-{{ md5 .Title }}">
  <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
    {{ range .Pages }}
    <li><a href="{{ .Permalink }}" class="link-dark rounded">{{ .Title}} </a></li>
    {{ end }}    
  </ul>
</div> 
```


## 完整实现 {#完整实现}

```html
<div class="flex-shrink-0 p-3 bg-white" style="width: 280px;">
    <a href="/notebook" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
        <svg class="bi me-2" width="30" height="24"><use xlink:href="#grid"/></svg>
        <span class="fs-5 fw-semibold">类别</span>
    </a>
    <ul class="list-unstyled ps-0">
        {{ range where .Site.Sections "Section" "notebook"}}
        {{ range .Sections }}
        <li class="mb-1 my-1 ms-3">
            <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#section-{{ md5 .Title }}" aria-expanded="false">
                {{ .Title }}
            </button>
            <div class="collapse" id="section-{{ md5 .Title }}">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                    {{ range .Pages }}
                    {{ if .IsNode }}
                    <li class="mb-1 my-1 ms-3">
                        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#section-{{ md5 .Title }}" aria-expanded="false">
                            {{ .Title }}
                        </button>

                        <div class="collapse" id="section-{{ md5 .Title }}">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                {{ range .Pages }}

                                {{ if .IsNode }}
                                <li class="mb-1 my-1 ms-3">
                                    <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#section-{{ md5 .Title }}" aria-expanded="false">
                                        {{ .Title }}
                                    </button>

                                    <div class="collapse" id="section-{{ md5 .Title }}">
                                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            {{ range .Pages }}

                                            <li><a href="{{ .Permalink }}" class="link-dark rounded">{{ .Title}} </a></li>

                                            {{ end }}    
                                        </ul>
                                    </div> 
                                </li>
                                {{ else }}
                                <li><a href="{{ .Permalink }}" class="link-dark rounded">{{ .Title}} </a></li>
                                {{ end }} 

                                {{ end }}    
                            </ul>
                        </div> 
                    </li>
                    {{ else }}
                    <li><a href="{{ .Permalink }}" class="link-dark rounded">{{ .Title}} </a></li>
                    {{ end }} 
                    {{ end }}    
                </ul>  
            </div> 
        </li>
        {{ end }}
        {{ end }}
    </ul>
</div>
```


## 可以优化的地方 {#可以优化的地方}

-   [ ] 高亮选中项 <br/>
-   [ ] 保持选中项在正中位置 <br/>
-   [ ] 折叠展开逻辑 <br/>

