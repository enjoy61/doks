---
title: "Character类"
date: 2023-11-05T20:50:34
lastmod: 2023-11-05T20:51:01+08:00
draft: false
weight: 2004
---

派生自APawn，实现了角色的动作(motion)，动画(animation)和物理交互(physical interaction) <br/>


## ACharacter {#acharacter}


## 构成 {#构成}

| -                         |          |
|---------------------------|----------|
|                           | 构造函数 |
| BeginPlay                 | 出现在场景中调用 |
| Tick                      | 每秒调用 |
| SetupPlayerInputComponent | 键位绑定 |


### ACharacter::ACharacter {#acharacter-acharacter}

构造函数 <br/>
设置组件类型(派生类or基类) <br/>

<img src="/pic/游戏角色/ACharacter类型/ACharacter-ACharacter.png" width="600" /> <br/> <br/>


## ACharacter::GetMesh {#acharacter-getmesh}

获取Character的SkeletalMesh组件 <br/>

<img src="/pic/游戏角色/ACharacter类型/ACharacter-GetMesh.png" width="400" /> <br/> <br/>


## 访问Controller对象 {#访问controller对象}

[访问Controller对象](/docs/虚幻引擎/api/游戏角色/pawn类/#访问controller对象) <br/>


## 受控于AI控制器 {#受控于ai控制器}

[受控于AI控制器](/docs/虚幻引擎/api/游戏角色/pawn类/#受控于ai控制器) <br/>

