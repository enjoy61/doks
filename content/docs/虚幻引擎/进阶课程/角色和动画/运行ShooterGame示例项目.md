---
title: "运行ShooterGame示例项目"
date: 2023-06-11T06:14:27
lastmod: 2023-08-05T13:48:47+08:00
draft: false
weight: 1001
---

## 下载ShooterGame {#下载shootergame}

`Epic Games Launcher > Samples > Shooter Game` <br/>

支持引擎版本 `4.0` - `4.27` ，当前使用引擎版本 `5.1.1` <br/>


## 修改源码 {#修改源码}


### 退化类 {#退化类}

`UMatineeCameraShake` 已被 `ULegacyCameraShake` 替代 <br/>


### 不再支持的宏 {#不再支持的宏}

`PLATFORM_PS4` <br/>


#### 改法一: 定义该宏 {#改法一-定义该宏}

在引擎代码中，紧接着 `SWITCH` 定义该宏 <br/>


#### 改法二: 屏蔽该宏的出现 {#改法二-屏蔽该宏的出现}


### 条件运算符第二个和第三个操作数类型不一致, 且可以互相转换 {#条件运算符第二个和第三个操作数类型不一致-且可以互相转换}

[参考](https://learn.microsoft.com/zh-cn/cpp/cpp/conditional-operator-q?view=msvc-170) <br/>

`AController *` 和 `AActor *` 可以相互转换，此处有歧义 <br/>

`Source/ShooterGame/Private/Player/ShooterCharacter.cpp:322`        <br/>


## 运行效果 {#运行效果}

<img src="/pic/角色和动画/在本地运行ShooterGame示例项目/运行效果.png" width="600" /> <br/> <br/>

