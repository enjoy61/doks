---
title: "ox-hugo用法"
date: 2023-11-11T13:33:01
lastmod: 2023-11-11T14:31:29+08:00
draft: false
weight: 2001
---

## 便签 {#便签}

[ox-hugo manual](https://ox-hugo.scripter.co/) <br/>


## 介绍 {#介绍}

Hugo, 或者gohugo, 是用Go语言编写的, 提供生成静态博客内容功能的一个软件 <br/>

[ox-hugo](https://ox-hugo.scripter.co/), Emacs插件, 用以生成Hugo兼容的Markdown文件 <br/>


## 说明 {#说明}

有两个范畴: 一个org文件对应一篇文章; 一个org子树对应一篇文章. 对应两种设置域: org文件选项和子树属性 <br/>

以一个org文件对应一篇文章作为基础 <br/>


## org文件选项设置 {#org文件选项设置}


### 必须设置的选项 {#必须设置的选项}

1.  HUGO_BASE_DIR <br/>
    导出目录的根目录. 导出文件存放在其下级目录, 且是下级content目录下. 如果content目录不存在, 自动创建 <br/>
    如果HUGO_BASE_DIR的值为/Volumes/Blogs, 那么无其他设置时, 导出文件存放在/Volumes/Blogs/content目录下 <br/>
    ```text
    根目录/content
    ```
2.  HUGO_SECTION <br/>
    导出目录的下级目录. 和HUGO_BASE_DIR一起决定导出文件所在目录 <br/>
    如果HUGO_BASE_DIR的值为/Volumes/Blogs, 而HUGO_SECTION的值为Hobby, 导出文件存放在/Volumes/Blogs/content/Hobby目录下 <br/>
    ```text
    根目录/content/分区目录
    ```
3.  TITLE <br/>
    导出org文件时, TITLE选项用作标题, 导出文件和org文件同名. 如果使用临时buffer, 则需要输入导出文件名 <br/>
    ```text
    根目录/content/分区目录/文章标题.md
    ```


#### 文本图片 {#文本图片}

-   ox-hugo支持把文章内图片迁移拷贝到导出目录, 需满足以下条件: <br/>
    1.  使能org-hugo-external-file-extensions-allowed-for-copying <br/>
    2.  根目录下有static文件夹 <br/>
-   并做以下事情: <br/>
    1.  在static目录下创建ox-hugo文件夹 <br/>
    2.  把图片拷贝到static/ox-hugo文件夹 <br/>

对于图片和博文都不多的博客, 这一实现无疑提供了便利 <br/>

相对应地, 如果博客图片较多, 后续出现整理博客的需求, 则无法使用任何分类 <br/>

建议安装时禁用org-hugo-external-file-extensions-allowed-for-copying, 自行管理图片 <br/>

```elisp
(setq org-hugo-external-file-extensions-allowed-for-copying nil)
```


#### 示例 {#示例}

```org
#+HUGO_BASE_DIR: /Volumes/Blogs
#+HUGO_SECTION: Hobby
#+TITLE: 示例   
```

以下写法也是可以的 <br/>

```org
#+HUGO_BASE_DIR: ../    
```

```org
#+HUGO_SECTION: ./
```


### 常用选项 {#常用选项}


#### Markdown文件选项格式 {#markdown文件选项格式}

`toml` <br/>

```org
#+HUGO_FRONT_MATTER_FORMAT: toml
```

`yaml` <br/>

```org
#+HUGO_FRONT_MATTER_FORMAT: yaml
```


#### 文章权重 {#文章权重}

通常用于同级目录文章显示时排序 <br/>

设定给定值 <br/>

```org
#+HUGO_WEIGHT: 10
```


#### 文章状态 {#文章状态}

值可以为true或false. 和hugo构建时使用的命令相对应: 如果值为true, 则说明文章仍是草稿, 未指定其他选项构建时, 文章不会被包含到生成的静态博客内容中 <br/>

```org
#+HUGO_DRAFT: true
```


#### 创建时间 {#创建时间}

和hugo构建时使用的命令相对应: 如果未指定其他选项, 会比对文件创建时间和某个时区的时间. 若晚于该时区时间, 文章不会被包含到生成的静态博客内容中 <br/>

和hugo本地测试的命令相对应: 如果未指定其他选项, 会比对文件创建时间和某个时区的时间. 若晚于该时区时间, 文章不会被展示 <br/>

```org
#+DATE: 2023-08-21T09:42:45
```

**有自动填写的方法** <br/>


#### 记录最后修改时间 {#记录最后修改时间}

导出时, 自动填写该文章最后修改时间 <br/>

```org
#+HUGO_AUTO_SET_LASTMOD: t
```


#### 文章分类和标签 {#文章分类和标签}

```org
#+HUGO_CATEGORIES: emacs org
#+HUGO_TAGS: hugo
```


### 自定义选项 {#自定义选项}

导出后的博文, 在不同的主题中展示. 主题会定义自己的选项, 个性化展示 <br/>

```org
#+HUGO_CUSTOM_FRONT_MATTER: :foo bar :baz zoo
```

导出后: <br/>

```toml
foo = bar
baz = zoo
```


## 子树属性设置 {#子树属性设置}

既是进阶级用法, 也是ox-hugo所推荐的用法 <br/>

当文章数较多时, 单个文章的导出将变得繁琐 <br/>

子树可以使用文件的以下选项 <br/>

```org
#+HUGO_BASE_DIR: ../
#+HUGO_SECTION: ./      
#+HUGO_AUTO_SET_LASTMOD: t
#+HUGO_DRAFT: false
#+HUGO_FRONT_MATTER_FORMAT: yaml
```


### 导出子树时可以指定文件名, 子树名作为标题 {#导出子树时可以指定文件名-子树名作为标题}

```org
:PROPERTIES:         
:EXPORT_FILE_NAME: 导出文件名
:END:         
```


### 子树可以更细致地对文章分区 {#子树可以更细致地对文章分区}

```org
:PROPERTIES:
:EXPORT_HUGO_SECTION_FRAG: game
:END:
```

1.  一个常用结构: 目录是不会导出的, 待导出子树之间同级 <br/>
    ```org
    #+HUGO_BASE_DIR: ../
    #+HUGO_SECTION: ./
    ​* 目录
      :PROPERTIES:
      :EXPORT_HUGO_SECTION_FRAG: sub
      :END:
    ** 待导出子树1
       给出导出选项
    ** 待导出子树2
       给出导出选项
    ```
    均导出到../content/sub目录下 <br/>
2.  EXPORT_HUGO_SECTION_FRAG支持叠加 <br/>
    [manual](https://ox-hugo.scripter.co/doc/hugo-section/) <br/>
    ```org
    #+HUGO_BASE_DIR: ../
    #+HUGO_SECTION: ./
    ​
    * Main section
      :PROPERTIES:
      :EXPORT_HUGO_SECTION: main
      :END:               
      导出目录为../content/main/
    ** Sub section 1
       :PROPERTIES:
       :EXPORT_HUGO_SECTION_FRAG: sub1
       :END:
       导出目录为../content/main/sub1
    *** Sub section 1.1
        :PROPERTIES:
        :EXPORT_HUGO_SECTION_FRAG: p1
        :END:
        导出目录为../content/main/sub1/p1     
    *** Sub section 1.2
        :PROPERTIES:
        :EXPORT_HUGO_SECTION_FRAG: p2
        :END:
        导出目录为../content/main/sub1/p2     
    ** Sub section 2
       :PROPERTIES:
       :EXPORT_HUGO_SECTION_FRAG: sub2
       :END:
       导出目录为../content/main/sub2     
    ```
    _可以使用EXPORT_HUGO_SECTION_ <br/>
    _有EXPORT_HUGO_SECTION_FRAG, 不需要用到EXPORT_HUGO_SECTION_ <br/>


### 常用选项 {#常用选项}

[manual](https://ox-hugo.scripter.co/doc/org-meta-data-to-hugo-front-matter/) <br/>


#### Markdown文件选项格式 {#markdown文件选项格式}

`toml` <br/>

```org
:PROPERTIES:
:EXPORT_HUGO_FRONT_MATTER_FORMAT: toml
:END:
```

`yaml` <br/>

```org
:PROPERTIES:
:EXPORT_HUGO_FRONT_MATTER_FORMAT: yaml
:END:
```


#### 文章权重 {#文章权重}

设定给定值 <br/>

```org
:PROPERTIES:
:EXPORT_HUGO_WEIGHT: 4
:END:
```

导出时自动计算 <br/>

```org
:PROPERTIES:
:EXPORT_HUGO_WEIGHT: auto
:END:
```


#### 文章状态 {#文章状态}

草稿 <br/>

```org
* TODO 待导出子树
```

已完成 <br/>

```org
* DONE 待导出子树1
* 待导出子树2
```


#### 创建时间 {#创建时间}

```org
:PROPERTIES:
:EXPORT_DATE: 2023-08-21T10:10:05
:END:
```


#### 记录最后修改时间 {#记录最后修改时间}

```org
:PROPERTIES:
:EXPORT_HUGO_AUTO_SET_LASTMOD: t
:END:
```


#### 文章分类和标签 {#文章分类和标签}

```org
* 待导出子树 :@分类:标签1:标签2:
```


### 自定义选项 {#自定义选项}

如果同时在子树和文件配置，导出子树时，只有子树定义项 <br/>

```org
* 每棵子树作为一篇博文
  :PROPERTIES:
  :EXPORT_HUGO_CUSTOM_FRONT_MATTER: :foo bar :baz zoo
  :END:
```


## 使用Emacs函数自动填充信息 {#使用emacs函数自动填充信息}

```elisp
title = "`(cdr (assoc "ITEM" (org-entry-properties)))`"
date = "`(format-time-string "%Y-%m-%dT%H:%M:%S")`"
```

