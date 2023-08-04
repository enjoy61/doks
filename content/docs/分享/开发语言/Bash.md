---
title: "Shell脚本"
date: 2023-06-10T23:33:26
lastmod: 2023-08-04T14:50:44+08:00
draft: false
weight: 1001
---

## 花括号的使用 {#花括号的使用}

可以使用花括号定义集合集合，集合内有多个可以枚举的项，使用逗号分隔 <br/>

```text
{项1, 项2, 项3...}
```

遇到花括号时，会对集合进行展开，将集合内的每一项与外面的字符串进行组合，然后返回全部组合项 <br/>

```text
xxx.conf{,.bak} 展开为 xxx.conf xxx.conf.bak
```

和前方的命令配合起来，就可以起到多个入参的效果 <br/>

```bash
cp xxx.conf{,.bak}
# cp xxx.conf xxx.conf.bak
```

接受多个参数的命令都可以这样使用，但前提是这些参数有共同部分，或者有某些规律 <br/>

> echo cp mkdir mv for <br/>

```bash
mkdir app{,.bak}
echo {1..5}
echo {a..z}
echo {001..10} # 前导0
echo {001..10..2} # 前导0 + 步进
echo {a..z}{0..9} # 组合：26 * 10 
```


## tr命令 {#tr命令}

[runoob](https://www.runoob.com/linux/linux-comm-tr.html) <br/>


### 去除引号 {#去除引号}

```bash
tr -d '"'
```

_使用sed_ <br/>

```bash
sed 's/\"//g'
```


## sed命令 {#sed命令}

`macOS` <br/>
[runoob](https://www.runoob.com/linux/linux-comm-sed.html)    <br/>


### 安装gsed {#安装gsed}

```bash
brew install gsed
```


### 匹配行打印 {#匹配行打印}

`p` <br/>

```bash
gsed -n "/abc/p" file
```


### 修改源文件 {#修改源文件}

`-i` <br/>

```bash
gsed -i "/abc/d" file # 匹配行删除      
```


### 匹配行删除 {#匹配行删除}

`d` <br/>

```bash
gsed "/abc/d" file
```


### 匹配行文本替换 {#匹配行文本替换}

`s` <br/>

-   首个匹配项 <br/>
    ```bash
    gsed "s/abc/edf/" file
    ```
-   所有匹配项 <br/>
    `g` <br/>
    ```bash
    gsed "s/abc/edf/g" file
    ```


## awk命令 {#awk命令}


### 指定分隔符，打印第3个参数 {#指定分隔符-打印第3个参数}

```bash
awk -F ',' '{print $3}'
```


## file命令 {#file命令}


### 查看文件编码 {#查看文件编码}

```bash
file FILE
```


## echo命令 {#echo命令}


### 输出单行 {#输出单行}

```bash
var="hello world!"
echo $var
```


### 输出多行 {#输出多行}

```bash
echo -e "\nhello world!\n"
```


## head命令 {#head命令}


### 安装coreutils {#安装coreutils}

```bash
brew install coreutils
```


### 输出文件去掉末尾4行的文本 {#输出文件去掉末尾4行的文本}

```bash
ghead -n -4 xx.txt
```

