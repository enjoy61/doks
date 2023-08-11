---
title: "在可变换组件上挂载Actor"
date: 2023-06-21T21:56:47
lastmod: 2023-08-08T15:58:13+08:00
draft: false
weight: 1001
---

## 概览 {#概览}

| -            |                           |
|--------------|---------------------------|
| 可变换组件   | USceneComponent及其派生类 |
| 挂载函数     | AActor::AttachToComponent |
| 获取骨骼网格体组件 | ACharacter::GetMesh       |
| 挂载规则集合 | FAttachmentTransformRules |
| 应用于挂载规则的枚举类型 | EAttachmentRule           |


## EAttachmentRule {#eattachmentrule}


### 概览 {#概览}

-   [API](https://docs.unrealengine.com/5.1/en-US/API/Runtime/Engine/Engine/EAttachmentRule/) <br/>
-   应用于挂载规则的枚举类型 <br/>
-   `UE_5.1/Engine/Source/Runtime/Engine/Classes/Engine/EngineTypes.h` <br/>


### 枚举成员 {#枚举成员}

|                | Actor最终变换矩阵                  |                                         |
|----------------|------------------------------|-----------------------------------------|
| SnapToTarget   | 组件变换矩阵 x 组件和Actor的相对变换 |                                         |
| KeepWorld ？   | 计算Actor和组件在世界坐标系中的相对变换，并在最终变换矩阵中使用 | socket相对b_Right_Weapon的变换对Actor的最终位置无影响 |
|                |                                    | 与组件的变换矩阵无关                    |
|                |                                    | 与BP_STUBaseCharacter对象在世界坐标系中的变换有关 |
| KeepRelative ？ | 使用Actor相对变换矩阵乘以最终变换矩阵 | Actor也能挂载到合适位置                 |


## FAttachmentTransformRules {#fattachmenttransformrules}


### 数据成员 {#数据成员}

| -                                   |                       |
|-------------------------------------|-----------------------|
| LocationRule RotationRule SacleRule | 使用EAttachmentRule进行设置 |
| bWeldSimulatedBodies                | 连接两部分时，是否将其焊接 |


### 构造函数 {#构造函数}

1.  对变换分量使用相同规则 <br/>
    
    <img src="/pic/专题/在可变换组件上挂载Actor/Con1.png" width="600" /> <br/> <br/>
2.  分别设置变换分量 <br/>
    
    <img src="/pic/专题/在可变换组件上挂载Actor/Con2.png" width="1100" /> <br/> <br/>


## ACharacter::GetMesh {#acharacter-getmesh}

获取Character USkeletalComponent组件 <br/>

<img src="/pic/专题/在可变换组件上挂载Actor/ACharacter-GetMesh.png" width="500" /> <br/> <br/>


## AActor::AttachToComponent {#aactor-attachtocomponent}


### 说明 {#说明}

将Actor挂载到可变换组件 <br/>

<img src="/pic/专题/在可变换组件上挂载Actor/AActor-AttachToComponent.png" width="900" /> <br/> <br/>


### 参数 {#参数}

| -               |              |
|-----------------|--------------|
| Parent          | 要挂载的可变换组件 |
| AttachmentRules | 挂载后变换矩阵的计算规则 |
| SocketName      | 挂载点名字   |

