---
title: "org-mode"
date: 2023-06-10T23:56:27
lastmod: 2023-08-12T15:48:57+08:00
draft: false
weight: 1001
---

## 便签 {#便签}

[The Org Manual](https://orgmode.org/org.html) <br/>


## 样式 {#样式}


### 删除线 {#删除线}

~~Content~~ <br/>

```text
+Content+     
```


### 下划线 {#下划线}

<span class="underline">Content</span> <br/>

```text
_Content_
```


### 文本块 {#文本块}

`Content` <br/>

```text
=test=
~test~
```


### 斜体 {#斜体}

_Content_ <br/>

```text
/Content/     
```


### 加粗 {#加粗}

**Content** <br/>

```text
*Content*
```


### 分隔线 {#分隔线}

---

```text
-----
```


## 标题 {#标题}


### 标题间移动 {#标题间移动}

| -   |         |
|-----|---------|
| 上一个 | C-c C-p |
| 下一个 | C-c C-n |


#### 去到上级标题 {#去到上级标题}

C-c C-u <br/>


#### 同级标题间移动 {#同级标题间移动}

| -   |         |
|-----|---------|
| 上一个 | C-c C-b |
| 下一个 | C-c C-f |


### 创建标题 {#创建标题}

| -          |         |
|------------|---------|
| 同级标题   | C-RET   |
| 同级标题 / 列表项 | M-RET   |
| 同级TODO标题 | M-S-RET |


### 标题、列表项转换 {#标题-列表项转换}

|             | -      |
|-------------|--------|
| 标题转换为列表项 | C-c -  |
| 文本、列表项转换为标题 | C-c \* |


### 标题和列表项升降级 {#标题和列表项升降级}

|    | -       |
|----|---------|
| 降级 | M-LEFT  |
| 升级 | M-RIGHT |


### TODO标题状态切换 {#todo标题状态切换}

`> 普通标题 > TODO > DONE` <br/>


#### 所属标题状态切换 {#所属标题状态切换}

C-c C-t <br/>


#### 处于标题行 {#处于标题行}

| -       |    |
|---------|----|
| S-LEFT  | 逆向 |
| S-RIGHT | 逆向 |


## 文本显示 {#文本显示}


### 进入预览模式，显示一级标题 {#进入预览模式-显示一级标题}

C-c C-j <br/>


### 标题展开 {#标题展开}

`> 只展开第一个一级标题 > 展开所有标题 > 展开全部内容` <br/>
S-TAB <br/>


## 子树 {#子树}

| -    |             |
|------|-------------|
| 删除子树 | C-c C-x C-w |
| 拷贝子树 | C-c C-x M-w |
| 降级 | M-S-LEFT    |
| 升级 | M-S-RIGHT   |


## 模板 {#模板}

[Structure Templates](https://orgmode.org/org.html#Structure-Templates) <br/>


### 插入模板 {#插入模板}

| -   |                               |
|-----|-------------------------------|
| 快捷键 | C-c C-,                       |
| 函数 | org-insert-structure-template |

不再支持 `<s TAB` <br/>


### 模板样式 {#模板样式}


#### 代码块 {#代码块}

```cpp
#include <iostream>
using namespace std;

int main()
{
    cout << "Hello World!" << endl;
    return 0;
}
```

需填写编程语言 <br/>

```text
#+begin_src <language>
#+end_src
```


#### 文本块 {#文本块}

```text
Hello World!
```

```nil
#+begin_example
#+end_example
```


#### 引用 {#引用}

> Hello World! <br/>

```text
#+begin_quote
#+end_quote
```


### 代码块编辑 {#代码块编辑}

要求能识别编程语言 <br/>

| -             |           |
|---------------|-----------|
| 插入代码框    | C-c C-, s |
| 在新窗口编辑代码 | C-c '     |
| 保存修改      | C-x C-s   |
| 关闭编辑窗口(未保存丢失) | C-c C-k   |
| 执行          | C-c C-c   |
| 对选中内容注释/去注释 | M-；      |


## 计时 {#计时}

精确到分钟 <br/>

| -  |             |
|----|-------------|
| 开始 | C-c C-x C-i |
| 停止 | C-c C-x C-o |


## 链接 {#链接}

| -        |             |
|----------|-------------|
| 插入     | C-c C-l     |
| 打开     | C-c C-o     |
| 显示/ 隐藏图片 | C-c C-x C-v |


### 网页 {#网页}

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


### 添加日程 {#添加日程}

| -  |         |
|----|---------|
| 开始 | C-c C-s |
| 结束 | C-c C-d |


### 搜索路径保存在列表org-agenda-files中，不支持递归搜索 {#搜索路径保存在列表org-agenda-files中-不支持递归搜索}


### 进入日程菜单 {#进入日程菜单}

| -            |            |
|--------------|------------|
| 函数         | org-agenda |
| 快捷键(自定义) | C-c a      |
| 切换到当日安排/本周安排 | d / w      |


## 表格 {#表格}


### 快捷键 {#快捷键}

| -                |               |
|------------------|---------------|
| M-LEFT / M-RIGHT | 移动当前列    |
| M-UP / M-DOWN    | 移动当前行    |
| C-c -            | 在当前行下方加分割线 |
| C-c RET          | 在当前行下方加分割线和换行 |
| M-a              | 移动到cell开始 |
| M-e              | 移动到cell末尾 |
| TAB              | 下一个cell    |
| S-TAB            | 上一个cell    |
| C-c C-c          | 格式化表格    |
| M-S-LEFT         | 删除当前列    |
| M-S-RIGHT        | 左侧新建列    |


### 计算 {#计算}

|          | 快捷键 |
|----------|-----|
| 查询单元所在行列 | C-c ? |
| 显示表格相对行列 | C-c } |


#### 行累加 {#行累加}

在公式所在行C-c C-c <br/>

```text
|------+------------|
|      | 待累加数值 |
|------+------------|
|      |          3 |
|      |          2 |
|      |         10 |
|      |         22 |
|------+------------|
| 累加 |         37 |
|------+------------|
#+TBLFM: @6$2=vsum(@2..@5)
```


### 使用插件按类别统计表格数据 {#使用插件按类别统计表格数据}

[orgtbl-aggregate](https://github.com/tbanel/orgaggregate) <br/>

在公式所在行C-c C-c <br/>

```text
#+NAME: 2023-08-01开销
|------+------+--------|
| 类别 | 金额 | 项目   |
|------+------+--------|
| 水果 |   10 | 苹果   |
| 水果 |    8 | 香蕉   |
| 日化 |   12 | 洗手液 |
|------+------+--------|

#+BEGIN: aggregate :table "2023-08-01开销" :cols "类别 sum(金额)"
| 类别 | sum(金额) |
|------+-----------|
| 水果 |        18 |
| 日化 |        12 |
#+END     
```


## 缩进 {#缩进}


### 第一种: 文本不含空格，在org-mode下显示缩进 {#第一种-文本不含空格-在org-mode下显示缩进}

[indent mode](https://orgmode.org/manual/Org-Indent-Mode.html) <br/>


#### 使能mode {#使能mode}

```elisp
(org-indent-mode t)
```


#### 全局设置 {#全局设置}

```elisp
(setq org-startup-indented t)
```


#### 文件选项 {#文件选项}

```elisp
#+STARTUP：indent
```


### 第二种: 换行时自动缩进 {#第二种-换行时自动缩进}

[hard indentation](https://orgmode.org/manual/Hard-indentation.html) <br/>

全局设置 <br/>

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
导出时文章目录选项 <br/>


#### 不添加文章目录 {#不添加文章目录}

```elisp
#+OPTIONS: toc:nil
```


#### 生成的文章目录层级 {#生成的文章目录层级}

包含1-2级标题 <br/>

```elisp
#+TOC: headlines 2
```


### 标题标号 {#标题标号}

导出时标题标号选项 <br/>


#### 不添加标题标号 {#不添加标题标号}

```elisp
#+OPTIONS num:nil
```


### 上下标 {#上下标}


#### 格式 {#格式}

-   下标 <br/>
    ```text
    a_b
    ```
-   上标 <br/>
    ```text
    a^b
    ```


#### 关闭上下标转换 {#关闭上下标转换}

```elisp
#+OPTIONS: ^:nil
```


#### 要求使用{}转义 {#要求使用-转义}

```elisp
#+OPTIONS ^:{}
```

-   上标 <br/>
    ```text
    a^{b}
    ```
-   下标 <br/>
    ```text
    a_{b}
    ```


### OPTIONS合并 {#options合并}

```elisp
#+OPTIONS: toc:nil ^:{}
```


### 文本显示 {#文本显示}


#### 只显示一级标题 {#只显示一级标题}

```elisp
#+STARTUP: overview
```


#### 显示所有内容 {#显示所有内容}

```elisp
#+STARTUP: showall
```


#### STARTUP合并 {#startup合并}

```elisp
#+STARTUP: showall hidestars        
```

