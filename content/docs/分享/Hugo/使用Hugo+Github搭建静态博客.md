---
title: "使用Hugo+GitHub搭建静态博客"
date: 2023-06-08T10:57:46
lastmod: 2023-08-14T15:11:10+08:00
draft: false
weight: 1001
---

## 说明 {#说明}

|              | -                     |
|--------------|-----------------------|
| Github Pages | 使用Github提供的免费服务部署静态博客 |
| Hugo         | 本地构建静态网页      |
| anubis       | 主题                  |


## 安装Hugo {#安装hugo}

[Github](https://github.com/gohugoio/hugo#install-hugo-as-your-site-generator-binary-install) <br/>
[官网](https://gohugo.io/) <br/>


### 方法一: 使用go安装 {#方法一-使用go安装}

`Windows` <br/>

1.  安装go <br/>
    [官网下载](https://go.dev/dl/) <br/>
    -   环境变量 <br/>
        ```bash
        # go
        export PATH=/usr/local/go/bin:$PATH
        export GOROOT=/usr/local/go
        export GOPATH=/Users/USERNAME/go
        export GOBIN=/Users/USERNAME/go/bin
        
        # go安装的软件
        export PATH=$GOBIN:$PATH
        ```
2.  安装hugo <br/>
    -   如若遇上网络不佳, 配置代理 <br/>
        ```bash
        go env -w GOPROXY=https://goproxy.cn,direct
        go env -w GOSUMDB=off
        ```
    -   安装并验证 <br/>
        ```bash
        go install github.com/gohugoio/hugo@latest
        hugo env -v
        ```
    -   [部分主题需用hugo_extended提供的支持](https://github.com/gohugoio/hugo/releases) <br/>


### 方法二: 使用homebrew安装 {#方法二-使用homebrew安装}

`macOS` <br/>

```bash
brew install hugo
```


## 创建站点项目 {#创建站点项目}

1.  新建站点 <br/>
    ```bash
    hugo new site /site/path
    ```
2.  站点项目结构 <br/>
    
    | 文件        | 说明                |
    |-----------|-------------------|
    | config.toml | 配置文件；yaml格式也可以 |
    | content     | 存放blog；支持md和org |
    | theme       | 存放主题            |
    | public      | 生成的静态页面；同步到Github项目 |
    | archetypes  | 文章模版            |
3.  新建博客 <br/>
    所在目录为 ./content/post <br/>
    ```bash
    hugo new post/first-blog.org
    ```


## 使用主题anubis {#使用主题anubis}

[anubis on hugo](https://themes.gohugo.io/themes/hugo-theme-anubis/) <br/>
[anubis on github](https://github.com/mitrichius/hugo-theme-anubis) <br/>

1.  将主题作为项目子模块 <br/>
    ```bash
    git init
    git submodule add https://github.com/mitrichius/hugo-theme-anubis.git themes/anubis
    ```
2.  使用anubis提供的模板 <br/>
    `./themes/anubis/exampleSite/` <br/>
    ```bash
    cp themes/anubis/exampleSite/config.toml .
    cp themes/anubis/exampleSite/content/. content
    ```
3.  主题说明 <br/>
    -   提供标签(tags)和分类(categories)功能, 提供文章列表(archives) <br/>
    -   文章存放到content/post目录下 <br/>
4.  文章模板 <br/>
    `yaml` <br/>
    
    > --- <br/>
    > author: "author" <br/>
    > title: "article title" <br/>
    > date: "2023-03-17" <br/>
    > description: "article description" <br/>
    > tags: [ <br/>
    > "tag-1", <br/>
    > "tag-2", <br/>
    > ] <br/>
    > categories: [ <br/>
    > "category", <br/>
    > ] <br/>
    > --- <br/>
    > 
    > 简单介绍 <br/>
    > 
    > &lt;!--more--&gt; <br/>
    > 
    > 正文 <br/>


## 构建静态网页 {#构建静态网页}

| 选项                                    | 说明                    |           | 构建或测试 |
|---------------------------------------|-----------------------|-----------|-------|
| --theme=anubis                          | 设置主题                | -t anubis | both   |
| --watch                                 | 修改文件后自动刷新浏览器 | -w        | server |
| --buildDrafts                           | 包括标记为draft的笔记   | -D        | both   |
| --buildFuture                           | 包括新发布笔记；检查date选项 | -F        | both   |
| --baseUrl="<http://enjoy61.github.io/>" | 未配置编译，GithubPage部署会丢失样式 |           | both   |
| --cleanDestinationDir                   | 将public文件夹中不再使用的文件删除 |           | hugo   |


### 本地测试 {#本地测试}

-   查询server选项 <br/>
    [参考](https://www.gohugo.org/doc/overview/quickstart/) <br/>
    ```bash
    hugo help server
    ```
-   访问 <http://localhost:1313/> <br/>
    ```bash
    hugo server --theme=anubis --watch
    # hugo server
    ```


### 构建静态页面 {#构建静态页面}

生成文件路径 ./public/ <br/>

```bash
hugo --theme=anubis --baseUrl="https://enjoy61.github.io/"
# hugo
```


## 在Github创建项目 {#在github创建项目}

1.  创建仓库 <br/>
    -   仓库名为enjoy61.github.io <br/>
    -   使用Github Pages提供的免费服务需公开项目 <br/>
2.  测试服务: 为github设置主题 <br/>
    添加_config.yaml文件 <br/>
    ```bash
    remote_theme: pages-themes/midnight@v0.2.0
    ```
3.  将public文件夹提交到仓库 <br/>

