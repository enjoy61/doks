---
title: "将Actor附加到可变换组件的挂载点"
date: 2023-06-21T21:56:47
lastmod: 2023-08-17T04:43:29+08:00
draft: false
weight: 1001
---

## 说明 {#说明}

通过AActor::AttachToComponent将Actor附加到可变换组件的挂载点上, 要求已在组件上添加挂载点, 并提供以下信息 <br/>

| -     |
|-------|
| Actor |
| 可变换组件 |
| 挂载规则 |
| 挂载点名称 |


## 挂载函数 AActor::AttachToComponent {#挂载函数-aactor-attachtocomponent}

[AActor::AttachToComponent](/docs/虚幻引擎/api/虚幻c++/游戏角色/actor类/#aactor-attachtocomponent) <br/>


## 可变换组件: USceneComponent及其派生类 {#可变换组件-uscenecomponent及其派生类}

|                        | 基类                |
|------------------------|-------------------|
| UPrimitiveComponent    | USceneComponent     |
| UMeshComponent         | UPrimitiveComponent |
| USkeletalMeshComponent | UMeshComponent      |
| UStaticMeshComponent   | UMeshComponent      |


## 挂载规则: FAttachmentTransformRules对象 {#挂载规则-fattachmenttransformrules对象}


### FAttachmentTransformRules {#fattachmenttransformrules}


#### 说明 {#说明}

`UE_5.1/Engine/Source/Runtime/Engine/Classes/Engine/EngineTypes.h` <br/>
如何计算附加Actor的变换属性 <br/>


#### 数据成员 {#数据成员}

<!--list-separator-->

-  LocationRule, RotationRule和ScaleRule

    1.  对应变换属性的三个分量 <br/>
    2.  使用EAttachmentRule进行设置 <br/>

<!--list-separator-->

-  bInWeldSimulatedBodies

    `Whether to weld simulated bodies together when attaching` <br/>
    不知道效果, 设为false <br/>


#### 构造函数 {#构造函数}

1.  对变换属性的分量应用相同规则 <br/>
    ```cpp
    FAttachmentTransformRules(EAttachmentRule InRule, bool bInWeldSimulatedBodies)
        : LocationRule(InRule)
        , RotationRule(InRule)
        , ScaleRule(InRule)
        , bWeldSimulatedBodies(bInWeldSimulatedBodies)
    {}
    ```
2.  为变换属性定制规则 <br/>
    ```cpp
    FAttachmentTransformRules(EAttachmentRule InLocationRule, EAttachmentRule InRotationRule, EAttachmentRule InScaleRule, bool bInWeldSimulatedBodies)
        : LocationRule(InLocationRule)
        , RotationRule(InRotationRule)
        , ScaleRule(InScaleRule)
        , bWeldSimulatedBodies(bInWeldSimulatedBodies)
    {}
    ```


### EAttachmentRule {#eattachmentrule}


#### 说明 {#说明}

`UE_5.1/Engine/Source/Runtime/Engine/Classes/Engine/EngineTypes.h` <br/>
如何计算附件Actor的最终变换矩阵 <br/>
[API](https://docs.unrealengine.com/5.1/en-US/API/Runtime/Engine/Engine/EAttachmentRule/) <br/>


#### 枚举成员 {#枚举成员}

| -            |                                                                                                                       |
|--------------|-----------------------------------------------------------------------------------------------------------------------|
| SnapToTarget | `Snaps transform to the attach point`                                                                                 |
| KeepWorld    | `Automatically calculates the relative transform such that the attached component maintains the same world transform` |
| KeepRelative | `Keeps current relative transform as the relative transform to the new parent`                                        |

不知道区别, 使用SnapToTarget; 使用KeepRelative可以达到一样的效果 <br/>

