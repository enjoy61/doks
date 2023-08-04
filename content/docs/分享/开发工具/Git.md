---
title: "Git"
date: 2023-06-10T21:44:19
lastmod: 2023-08-04T13:55:54+08:00
draft: false
weight: 1001
---

代码管理, 版本控制 <br/>


## 安装 {#安装}

`macOS` <br/>


### 方法一: Xcode自带 {#方法一-xcode自带}


### 方法二: 使用homebrew安装较新版本 {#方法二-使用homebrew安装较新版本}

```bash
brew install git
```


### 方法三: 下载源码, 编译安装 {#方法三-下载源码-编译安装}

[官网下载git-2.41.0.tar.gz](https://mirrors.edge.kernel.org/pub/software/scm/git/) <br/>

```bash
make install
```


### 验证 {#验证}

```bash
git -v      
```


## 配置 {#配置}

1.  查看Git配置 <br/>
    ```bash
    git config --list
    ```
2.  配置Git账户 <br/>
    ```bash
    git config --global user.name "enjoy61"
    git config --global user.email "enjoy61@protonmail.com"
    ```
3.  配置SSH <br/>
    
    -   生成密钥 <br/>
    
    <!--listend-->
    
    ```bash
    ssh-keygen
    cat ~/.ssh/id_rsa.pub
    ```
    
    -   拷贝公钥到Github <br/>
4.  代理 <br/>
    -   设置 <br/>
        ```bash
        # 使用代理端口替换1949
        git config --global https.proxy https://localhost:1949
        git config --global http.proxy http://localhost:1949
        ```
    -   取消 <br/>
        ```bash
        git config --global --unset http.proxy
        git config --global --unset https.proxy
        ```


## 初始化项目 {#初始化项目}

已在Github创建项目 <br/>


### 场景一: 从Github克隆项目，上游信息自动配置 {#场景一-从github克隆项目-上游信息自动配置}

```bash
git clone git@github.com:enjoy61/even.git
```


### 查看远端信息 {#查看远端信息}

```bash
git remote -v
```


### 场景二: 手动配置上游信息 {#场景二-手动配置上游信息}

```bash
git init
git remote add cute git@github.com:enjoy61/even.git # cute为上游别名
git fetch cute # 拉取上游内容，和Github项目同步
```


### 场景三: 首次提交本地项目到远端 {#场景三-首次提交本地项目到远端}

```bash
git init
git add README.md # 添加管理文件
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:enjoy61/even.git
git push -u origin main
```


### 子模块管理 {#子模块管理}


#### 添加子模块 {#添加子模块}

```bash
git submodule add git@github.com:enjoy61/hugo-theme-even.git themes/even
```


#### 从远端拉取项目时亦拉取子模块项目 {#从远端拉取项目时亦拉取子模块项目}

```bash
git clone --recursive git@github.com:enjoy61/even.git
```


### 设置项目同步链接 {#设置项目同步链接}

-   SSH <br/>
    ```bash
    git remote set-url cute git@github.com:enjoy61/even.git
    ```
-   HTTPS <br/>
    _push时需要验证，Github不再支持用户名和密码_ <br/>
    ```bash
    git remote set-url cute https://github.com/enjoy61/even.git
    ```


## 文件托管 {#文件托管}


### 添加 {#添加}

```bash
git add file # 指定文件

git add -A # 所有文件
```


### 删除 {#删除}

```bash
git rm file
```


### 查看托管文件状态 {#查看托管文件状态}

```bash
git diff
```


### 查看项目内文件状态 {#查看项目内文件状态}

```bash
git status
```


## 提交 {#提交}


### 提交当前改动 {#提交当前改动}

```bash
git commit -m "first commit"
```


### 推送到远端 {#推送到远端}

```bash
git push
```


### 查看提交记录 {#查看提交记录}

```bash
git log
```


### 删除历史提交 {#删除历史提交}

```bash
# 查看提交记录
git log # 最新提交 F E D C B，要删除F和E，记录D

# 设置回溯目标
git rebase -i D # 将F E的pick改为drop

# 检查设置是否生效
git log # 查看当前提交 D C B

# 同步到远端
git push cute master --force # 上游cute 分支master
```


### 存在多个文件添加/删除/修改，在上次提交的基础上再次提交 {#存在多个文件添加-删除-修改-在上次提交的基础上再次提交}

`不建议如此操作，提交前建议检阅改动` <br/>

1.  项目文件夹一式两份，A和A.BAK, 项目新版本B <br/>
2.  删除文件夹A内所有代码 <br/>
    _不会删除.git，提交和同步记录均保留_ <br/>
    ```bash
    rm -rf A/*
    ```
3.  将B内的所有文件拷贝到A <br/>
    _不会拷贝.git_ <br/>
    ```bash
    cp -r B A
    ```
4.  打开文件夹A, 再次提交 <br/>
    ```bash
    git add -A
    git commit -m "Comments"
    git push
    ```


## 提交规范 {#提交规范}

```text
<type>(<scope>): <subject>

<body>

<footer>
```


### 标题行 {#标题行}

**必填** <br/>


#### 类型 {#类型}

`type` <br/>

| 标识     |                   |
|--------|-------------------|
| feat     | feature 新功能    |
| fix      | 修复bug           |
| docs     | 文档              |
| style    | 格式，如.clang-format |
| refactor | 重构              |
| test     | 测试用例          |
| build    | 项目构建和依赖项  |
| revert   | 回退              |
| ci       | 持续集成          |
| perf     | 性能优化          |
| merge    | 代码合并          |
| sync     | 同步主线或分支的bug |
| chore    | 其他类型          |
| release  | 新版本发布        |
| workflow | 工作流            |


#### 受到提交影响的范围 {#受到提交影响的范围}

`scope` <br/>


#### 概述 {#概述}

`subject` <br/>

-   动词开头 <br/>
-   如果用英文，使用第一人称现在时，首字母小写 <br/>
-   结尾不加句号 <br/>


### 正文 {#正文}

`body` <br/>
具体修改内容, 可多行 <br/>


### 页脚注释 {#页脚注释}

`footer` <br/>
备注 <br/>


## 分支 {#分支}


### 当前分支和分支列表 {#当前分支和分支列表}

```bash
git branch -a
```


### 切换分支 {#切换分支}

```bash
git checkout main
```


### 创建分支 {#创建分支}

```bash
git branch master
```


### 本地创建新分支后, 同步到远端 {#本地创建新分支后-同步到远端}

```bash
git push --set-upstream origin master
```


### 创建并切换 {#创建并切换}

```bash
git checkout -b iss53
```


### 删除分支 {#删除分支}

-   本地 <br/>
    ```bash
    git branch -d iss51
    ```
-   上游 <br/>
    ```bash
    git push origin -d iss51
    ```


### 重命名分支 {#重命名分支}


#### 未推送到远端, 重命名即可 {#未推送到远端-重命名即可}

```bash
git branch -m oldName newName
```


#### 已推送过远端 {#已推送过远端}

1.  重命名本地分支 <br/>
    ```bash
    git branch -m oldName newName
    ```
2.  删除远端分支 <br/>
    ```bash
    git push --delete origin oldName
    ```
3.  将本地分支推送到远端 <br/>
    ```bash
    git push origin newName
    ```
4.  将本地分支和远端分支关联 <br/>
    ```bash
    git branch --set-upstream-to origin/newName
    ```


### 分支合并 {#分支合并}

合并过程中可能会产生冲突 <br/>
[git-scm](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6) <br/>

1.  在iss53分支上开发新功能 <br/>
    ```bash
    git checkout master # 主分支
    git checkout -b iss53
    vim index.html
    git commit -a -m 'added a new footer [issue 53]'
    ```
2.  在hotfix分支上解决问题 <br/>
    ```bash
    git checkout master # 主分支        
    git checkout -b hotfix
    vim index.html
    git commit -a -m 'fixed the broken email address'
    ```
3.  在主分支上合并解决方案，删除hotfix分支 <br/>
    ```bash
    git checkout master
    git merge hotfix
    git branch -d hotfix
    ```
4.  继续在分支iss53上开发新功能 <br/>
    ```bash
    git checkout iss53
    vim index.html
    git commit -a -m 'finished the new footer [issue 53]'
    ```
5.  合并新功能到主分支，删除iss53分支 <br/>
    ```bash
    git checkout master
    git merge iss53
    git branch -d iss53
    ```

