---
title: "Sublime"
date: 2023-06-10T22:05:01
lastmod: 2023-08-25T12:29:02+08:00
draft: false
weight: 2002
---

## 打开命令行 {#打开命令行}

| -       |                 |
|---------|-----------------|
| Windows | Control-Shift-P |
| macOS   | Command-Shift-P |


## 插件管理 {#插件管理}


### 安装Package Controll {#安装package-controll}

1.  打开命令行 <br/>
2.  选择Install Package Controll <br/>
    
    <img src="/pic/开发工具/Sublime/PackageControll.png" width="700" /> <br/> <br/>


#### 无法使用Package Controll {#无法使用package-controll}

`macOS` <br/>

1.  环境: Monterey <br/>
2.  [参考](https://github.com/wbond/package_control/issues/1612) <br/>
3.  解决方法 <br/>
    ```bash
    ln -sf /usr/local/Cellar/openssl@1.1/1.1.1u/lib/libcrypto.dylib /usr/local/lib/
    ```


### 安装插件 {#安装插件}

1.  打开命令行 <br/>
2.  输入Package Controll: Install Package <br/>
3.  输入插件名 <br/>
    
    | -                  |             |
    |--------------------|-------------|
    | Project Manager    | 创建项目    |
    | Switch File Deluxe | 头文件和源文件之间切换 |


### 查看已安装插件 {#查看已安装插件}

1.  打开命令行 <br/>
2.  输入Package Controll: List Packages <br/>


### 删除插件 {#删除插件}

1.  打开命令行 <br/>
2.  输入Package Controll: Remove Package <br/>


## 设置UI主题 {#设置ui主题}

1.  打开命令行 <br/>
2.  选择UI: Select Theme <br/>
3.  选择主题 <br/>


## 设置配色方案 {#设置配色方案}

1.  打开命令行 <br/>
2.  选择UI: Select Color Scheme <br/>
3.  选择配色方案 <br/>


## 分屏 {#分屏}

1.  复原: Option-Command-1 <br/>
2.  左右分屏和上下分屏不能同时进行 <br/>
3.  田字型 `Grid` : Option-Command-5 <br/>


### 左右分屏 {#左右分屏}

方法一: `View > Layout, 默认Single，选择Columns: 2` <br/>
方法二: Option-Command-N；2-4 <br/>


### 上下分屏 {#上下分屏}

Option-Command-Shift-N；2-3 <br/>


## 行号跳转 {#行号跳转}

`Control-G` <br/>


## 语法高亮 {#语法高亮}

1.  打开命令行 <br/>
2.  选择SetSyntax: + 指定语言 <br/>


## 项目管理 {#项目管理}


### 关闭所有文件 {#关闭所有文件}

命令行 &gt; File: Close All <br/>


### 打开项目 {#打开项目}

命令行 &gt; Project: Add Folder <br/>


### 查看定义 {#查看定义}

F12 <br/>


### 打开项目内文件 {#打开项目内文件}

Command-P &gt; 文件名 <br/>


### 文件内查找 {#文件内查找}

Command-F <br/>


### 项目内查找 {#项目内查找}

Command-Shift-F <br/>


### 头文件和源文件之间切换 {#头文件和源文件之间切换}

| -       |           |
|---------|-----------|
| Windows | Alt-O     |
| macOS   | Options-O |

