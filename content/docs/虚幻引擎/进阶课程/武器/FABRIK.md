---
title: "FABRIK"
date: 2023-08-18T19:46:42
lastmod: 2023-08-19T16:13:59+08:00
draft: false
weight: 1010
---

## 概览 {#概览}

-   [X] 问题描述 <br/>
-   [X] FABRIK <br/>
-   [X] 在动画蓝图中使用FABRIK <br/>


## 问题描述 {#问题描述}


### 调整游戏角色Camera组件位置, 使之拍摄游戏角色正面 {#调整游戏角色camera组件位置-使之拍摄游戏角色正面}

`BP_STUBaseCharacter` <br/>

1.  在SpringArm组件细节面板设置Camera组件的Socket Offset <br/>
    -   之前 <br/>
        
        <img src="/pic/武器/FABRIK/CameraSocketOffsetBefore.png" width="900" /> <br/> <br/>
    -   `SpringArm > Details > Camera > Socket Offset > X = 600 Y = 0` <br/>
        
        <img src="/pic/武器/FABRIK/CameraSocketOffset.png" width="900" /> <br/> <br/>
2.  设置Camera组件变换属性 <br/>
    -   之前 <br/>
        
        <img src="/pic/武器/FABRIK/CameraBefore.png" width="900" /> <br/> <br/>
    -   `Camera > Details > Transform > Rotation > Yaw = 180` <br/>
        
        <img src="/pic/武器/FABRIK/Camera.png" width="900" /> <br/> <br/>
3.  效果图 <br/>
    
    <img src="/pic/武器/FABRIK/Camera拍摄正面.png" width="900" /> <br/> <br/>


### 操控游戏角色运动时, 左手和枪管之间未固定, 二者会有错开的情况 {#操控游戏角色运动时-左手和枪管之间未固定-二者会有错开的情况}


### 在动画蓝图添加FABRIK, 将左手固定在枪管合适位置 {#在动画蓝图添加fabrik-将左手固定在枪管合适位置}


## FABRIK {#fabrik}

[FABRIK](/docs/虚幻引擎/专题/虚幻编辑器/fabrik/#fabrik) <br/>


## 在动画蓝图添加FABRIK {#在动画蓝图添加fabrik}

`ABP_BaseCharacter > AnimGraph` <br/>
在动画蓝图添加FABRIK, 取消末端执行器变换信息的针脚 <br/>


### 确定骨骼链 {#确定骨骼链}

1.  在导航栏选择骨骼 <br/>
    
    <img src="/pic/武器/FABRIK/导航栏骨骼项.png" width="400" /> <br/> <br/>
2.  左臂的起点为b_LeftArm, 终点为b_LeftWeapon <br/>
    
    <img src="/pic/武器/FABRIK/左臂.png" width="400" /> <br/> <br/>
3.  配置FABRIK &gt; Solver <br/>
    
    |           | -            |
    |-----------|--------------|
    | Tip Bone  | b_LeftWeapon |
    | Root Bone | b_LeftArm    |
    
    <img src="/pic/武器/FABRIK/Solver.png" width="400" /> <br/> <br/>


### 游戏角色移动时, 左手和右手都在武器上, 以右手为参照, 固定左手位置 {#游戏角色移动时-左手和右手都在武器上-以右手为参照-固定左手位置}

1.  设置末端执行器Target <br/>
2.  设置相对Target的变换 <br/>

| -                        |                  |
|--------------------------|------------------|
| Effector Target          | b_RightHand      |
| Effector Transform Space | Bone Space       |
| Effector Transform       | X=-50  Y=-11 Z=4 |

<img src="/pic/武器/FABRIK/EndEffector.png" width="400" /> <br/> <br/>


### 将FABRIK加入到输出 {#将fabrik加入到输出}

1.  将AO_BaseCharacter作为FABRIK的输入 <br/>
    `Component Pose` <br/>
    自动添加转换座标系的节点 `LocalToComponent` <br/>
2.  将输出作为Slot的输入 <br/>
    -   自动添加转换座标系的节点 `ComponentToLocal` <br/>
    -   播放死亡动画时, 左手不再扶在枪管上 <br/>

<img src="/pic/武器/FABRIK/加入.png" width="1000" /> <br/> <br/>


## 查看 {#查看}

操控游戏角色运动时, 左手固定在枪管合适位置 <br/>

