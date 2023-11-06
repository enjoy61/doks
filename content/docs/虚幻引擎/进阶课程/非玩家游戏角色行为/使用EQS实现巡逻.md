---
title: "使用EQS实现巡逻"
date: 2023-11-03T21:33:53
lastmod: 2023-11-06T10:48:34+08:00
draft: false
weight: 2012
---

## 说明 {#说明}

AI / EQS / Random Roam <br/>

AI系统 <br/>

`Environment Query System` <br/>

EQS帮助NPC在给定的条件下对空间进行分析 <br/>

本节将给出满足条件的适合NPC的位置区域 <br/>

目的在于使NPC巡逻更自然 <br/>


## 创建类 {#创建类}

-   创建文件夹 `AI/EQS` <br/>
-   创建EQS资产 <br/>
    `AI/EQS` 目录下空白处右键 &gt; Artificial Intelligence &gt; Environment Query, 命名为EQS_RandomRoam <br/>
    
    使用EQS_RandomRoam取代巡逻时生成随机点逻辑 <br/>
-   创建蓝图类 <br/>
    `AI/EQS` 目录下空白处右键 &gt; Blueprint Class <br/>
    
    | -  |                |
    |----|----------------|
    | 基类 | EQSTestingPawn |
    | 名称 | EQS_TestPawn   |
    
    专门用于在虚幻编辑器对EQS进行测试. 游戏成品中不会使用到 <br/>
    
    添加到关卡中 <br/>
-   在细节面板中设置EQS_TestPawn <br/>
    在世界大纲选中 `EQS_TestPawn` <br/>
    
    `Details > EQS > Query Template` , 设置为EQS_RandomRoam <br/>

<img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/test-pawn.png" width="1200" /> <br/> <br/>


## 介绍EQS资产 {#介绍eqs资产}

[随机目的地](/docs/虚幻引擎/专题/npc行为/介绍eqs资产/#随机目的地) <br/>


## 设置EQS资产 {#设置eqs资产}

-   添加生成器: 扇形点阵 <br/>
    
    | 配置                             |               |
    |--------------------------------|---------------|
    | Cone Degrees                     | 200           |
    | Angle Step                       | 10            |
    | Range &gt; Data Binding          | Random number |
    | Range &gt; Data Binding &gt; Min | 1200          |
    | Range &gt; Data Binding &gt; Max | 1600          |
    | Track Mode                       | Navigation    |
    
    <img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/cone.png" width="1200" /> <br/> <br/>

-   为扇形点阵添加距离条件: Distance <br/>

-   设置Distance: 限定筛选类型为最小值, 最小值为400 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/set-distance.png" width="1000" /> <br/> <br/>
    
    小于给定最小值的点, 显示为蓝色, 权重为0 <br/>


## 在行为树运行EQS {#在行为树运行eqs}

-   断开ROOT节点到选择器的箭头 <br/>
-   添加序列 <br/>
-   为序列添加任务 `Run EQSQuery` <br/>
    
    `Details > EQS > EQSRequest > Query Template`, 选择EQS_RandomRoam <br/>
    
    `Details > Blackboard > Blackboard Key` , 选择AimLocation: 对黑板变量AimLocation进行设置 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/set-run-eqs.png" width="400" /> <br/> <br/>
-   为序列添加任务 `MoveTo` <br/>
    `Details > Blackboard > Blackboard Key` , 选择AimLocation: 从黑板变量AimLocation获取目的位置 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/set-move-to.png" width="400" /> <br/> <br/>
-   为序列添加任务 `Wait` <br/>
    等待2s <br/>

<img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/bt.png" width="1000" /> <br/>   <br/>


## 查看 {#查看}

-   设置NPC生命值100 <br/>
    `BP_STUAICharacter > Details > MaxHealth` <br/>
-   在世界大纲选中AICharacter <br/>
-   按下 `'` 打开AI调试界面, 按下小写键盘 `3` 显示EQS信息 <br/>
-   选中位置点显示为浅绿色 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/res.png" width="1000" /> <br/> <br/>

