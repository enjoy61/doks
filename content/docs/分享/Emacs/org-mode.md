---
title: "org-mode"
date: 2023-06-10T23:56:27
lastmod: 2023-08-04T18:46:59+08:00
draft: false
weight: 1001
---

## 便签 {#便签}

[The Org Manual](https://orgmode.org/org.html) <br/>


## 样式 {#样式}

1.  ~~删除线~~ <br/>
    ```text
    +Content+     
    ```
2.  <span class="underline">下划线</span> <br/>
    _ox-hugo转markdown存在问题_ <br/>
    ```text
    _Content_     
    ```
3.  `文本块` <br/>
    ```text
    =test=
    ~test~
    ```
4.  _斜体_ <br/>
    ```text
    /test/     
    ```
5.  **加粗** <br/>
    ```text
    *test*     
    ```
6.  分隔线 <br/>
    ```text
    -----
    ```


## 标题 {#标题}


### 标题间移动 {#标题间移动}

| -           |         |
|-------------|---------|
| 上一个      | C-c C-p |
| 下一个      | C-c C-n |
| 去到上级标题 | C-c C-u |
| 同级标题间移动 上一个 | C-c C-b |
| 同级标题间移动 下一个 | C-c C-f |


### 创建标题 {#创建标题}

| -          |         |
|------------|---------|
| 同级标题   | C-RET   |
| 同级标题 / 列表项 | M-RET   |
| 同级TODO标题 | M-S-RET |


### 标题、列表项转换 {#标题-列表项转换}

|              | -      |
|--------------|--------|
| 标题转换为列表项 | C-c -  |
| 文本、列表项 转换为标题 | C-c \* |


### 升降级 {#升降级}

|            | -                |
|------------|------------------|
| 标题、列表项 升降级 | M-LEFT / M-RIGHT |


### 子树 {#子树}

| -    |                      |
|------|----------------------|
| 删除子树 | C-c C-x C-w          |
| 拷贝子树 | C-c C-x M-w          |
| 升降级 | M-S-LEFT / M-S-RIGHT |


### 标题状态切换 {#标题状态切换}

|            | -                            |                        |
|------------|------------------------------|------------------------|
| TODO标题状态切换 | `C-c C-t` `S-LEFT / S-RIGHT` | `> 普通标题 > TODO > DONE` |


### 显示 {#显示}

|               | -       |                               |
|---------------|---------|-------------------------------|
| 进入预览模式，显示一级标题 | C-c C-j |                               |
| 标题展开      | S-TAB   | `> 只展开一级标题 > 展开所有标题 > 展开全部内容` |


## 模板 {#模板}

[Structure Templates](https://orgmode.org/org.html#Structure-Templates) <br/>

| -   |                                 |
|-----|---------------------------------|
| 快捷键 | `C-c C-,`                       |
|     | `<s TAB` 不再支持               |
| 函数 | `org-insert-structure-template` |


### 模板样式 {#模板样式}

1.  代码框 <br/>
    填写编程语言 <br/>
    ```cpp
    // C++样式
    ```
    
    ```text
    #+begin_src <language>
    #+end_src
    ```
2.  文本框 <br/>
    ```text
    文本框样式
    ```
    
    ```nil
    #+begin_example
    #+end_example
    ```
3.  quote <br/>
    
    > quote样式 <br/>
    
    ```text
    #+begin_quote
    #+end_quote
    ```


### 代码块编辑 {#代码块编辑}

| -             |           |
|---------------|-----------|
| 插入代码框    | C-c C-, s |
| 在新窗口编辑代码 | C-c '     |
| 保存修改      | C-x C-s   |
| 关闭编辑窗口(未保存丢失) | C-c C-k   |
| 执行          | C-c C-c   |


## 计时 {#计时}

精确到分钟 <br/>

| -  |             |
|----|-------------|
| 开始 | C-c C-x C-i |
| 停止 | C-c C-x C-o |


## 链接 {#链接}

| -         |             |
|-----------|-------------|
| 插入      | C-c C-l     |
| 打开      | C-c C-o     |
| 显示/ 隐藏 图片 | C-c C-x C-v |


### 链接 {#链接}

```text
[[http://www.baidu.com][百度]]     
```


### 文件 {#文件}

```text
[[file:xxx.txt][描述]]
```


### 图片 {#图片}

```text
#+ATTR_ORG: :width 400
#+ATTR_HTML: :width 500
[[file:pic/xxxx.png]]
```


## org文件导出 {#org文件导出}


### html {#html}

| -       |             |
|---------|-------------|
| 生成文件并打开 | C-c C-e h o |


### markdown {#markdown}

| -       |             |
|---------|-------------|
| 生成文件并打开 | C-c C-e m o |

1.  菜单项添加markdown选项 <br/>
    `customize-option > org-export-backends > 勾选org-markdown` <br/>
2.  安装markdown-mode <br/>


## 日程管理 {#日程管理}

`agenda` <br/>


### 搜索路径保存在列表org-agenda-files中，不支持递归搜索 {#搜索路径保存在列表org-agenda-files中-不支持递归搜索}


### 查看 {#查看}

| -             |            |
|---------------|------------|
| 日程菜单      | org-agenda |
| 快捷键(自定义) | C-c a      |
| 切换当日安排 / 本周安排 | d / w      |


### 添加任务 {#添加任务}

| -  |         |
|----|---------|
| 开始 | C-c C-s |
| 结束 | C-c C-d |


## 表格 {#表格}


### 快捷键 {#快捷键}

| -                |            |
|------------------|------------|
| M-LEFT / M-RIGHT | 移动当前列 |
| M-UP / M-DOWN    | 移动当前行 |
| C-c -            | 在当前行下方加分割线 |
| C-c RET          | 在当前行下方加分割线 |
| M-a              | 移动到cell开始 |
| M-e              | 移动到cell末尾 |
| TAB              | 下一个cell |
| S-TAB            | 上一个cell |
| C-c C-c          | 格式化表格 |
| M-S-LEFT         | 删除当前列 |
| M-S-RIGHT        | 左侧新建列 |


### 计算 {#计算}

|          | 快捷键 |
|----------|-----|
| 查询单元所在行列 | C-c ? |
| 显示表格相对行列 | C-c } |


#### 行累加 {#行累加}

在公式所在行C-c C-c <br/>

|    | 待累加数值 |
|----|-------|
|    | 3     |
|    | 2     |
|    | 10    |
|    | 22    |
| 累加 | 37    |


### 使用插件按类别统计 {#使用插件按类别统计}

[orgtbl-aggregate](https://github.com/tbanel/orgaggregate) <br/>

<a id="table--2023-08-01开销"></a>

| 类别 | 金额 | 项目 |
|----|----|----|
| 水果 | 10 | 苹果 |
| 水果 | 8  | 香蕉 |
| 日化 | 12 | 洗手液 |

| 类别 | sum(金额) |
|----|---------|
| 水果 | 18      |
| 日化 | 12      |


## 缩进 {#缩进}


### 第一种: 文本不含空格，但org-mode下显示缩进 {#第一种-文本不含空格-但org-mode下显示缩进}

[indent mode](https://orgmode.org/manual/Org-Indent-Mode.html) <br/>

-   使能mode <br/>
    ```elisp
    (org-indent-mode t)
    ```
-   全局设置 <br/>
    ```elisp
    (setq org-startup-indented t)
    ```
-   文件选项 <br/>
    ```elisp
    #+STARTUP：indent
    ```


### 第二种: 换行时自动缩进 {#第二种-换行时自动缩进}

[hard indentation](https://orgmode.org/manual/Hard-indentation.html) <br/>

-   全局设置 <br/>
    ```elisp
    (setq org-adapt-indentation t)
    ```


## 隐藏前缀星号 {#隐藏前缀星号}

-   全局设置 <br/>
    ```elisp
    (setq org-hide-leading-stars t)
    ```
-   文件选项 <br/>
    ```elisp
    #+STARTUP: hidestars
    ```


## 选项设置 {#选项设置}


### 文章目录 {#文章目录}

`Table of Contents` <br/>

1.  关闭toc <br/>
    ```elisp
    #+OPTIONS: toc:nil
    ```
2.  指定toc显示层级 <br/>
    ```elisp
    #+TOC: headlines 2
    ```


### 自动为标题添加标号 {#自动为标题添加标号}

-   关闭 <br/>
    ```elisp
    #+OPTIONS num:nil
    ```


### 上下标 {#上下标}

```text
a_b a^b
```

1.  关闭 <br/>
    ```elisp
    #+OPTIONS: ^:nil
    ```
2.  使用{}转义 <br/>
    ```elisp
    #+OPTIONS ^:{}
    ```
    
    -   示例 <br/>
        ```text
        a_{b} a^{b}
        ```
3.  选项合并 <br/>
    ```elisp
    #+OPTIONS: toc:nil ^:{}
    ```


### 显示 {#显示}

-   一级标题预览 <br/>
    ```elisp
    #+STARTUP: overview
    ```
-   显示所有内容 <br/>
    ```elisp
    #+STARTUP: showall
    ```
-   选项合并 <br/>
    ```elisp
    #+STARTUP: showall hidestars        
    ```

