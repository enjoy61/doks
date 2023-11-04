---
title: "使用EQS实现巡逻"
date: 2023-11-03T21:33:53
lastmod: 2023-11-04T14:37:03+08:00
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

双击打开EQS_RandomRoam <br/>

类似行为树图表 <br/>


### 从Root出发, 可以设置各种生成器 {#从root出发-可以设置各种生成器}

| -              |      |
|----------------|------|
| Points: Grid   | 方形点阵 |
| Points: Circle | 圆圈点阵 |
| Points: Cone   | 扇形点阵 |

<img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/generators.png" width="500" /> <br/> <br/>


#### 方形点阵 {#方形点阵}

EQS_TestPawn身处方形点阵表示的位置区域中 <br/>

| 可配置项      |      |
|-----------|------|
| GridHalfSize  | 点阵大小 |
| Space Between | 点阵密度 |

<img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/grid.png" width="1000" /> <br/> <br/>


#### 圆圈点阵 {#圆圈点阵}

只圆形周长存在有效位置 <br/>

| 可配置项      |    |
|-----------|----|
| Circle Radius | 半径 |

<img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/circle.png" width="1000" /> <br/> <br/>


#### 扇形点阵 {#扇形点阵}

EQS_TestPawn位于顶点处, 前进向量对应扇形中线 <br/>

该模板用于选择前进时的下一个目的地, 因为前进向量的改变不会太突兀 <br/>

| 可配置项                              |         |
|-----------------------------------|---------|
| Aligned Points Distance               | 射线上的点间距 |
| Cone Degrees                          | 顶角    |
| Angle Step                            | 射线密度 |
| Range &gt; Data Binding = None, Range | 半径    |

<img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/eqs-default.png" width="1000" /> <br/> <br/>

-   Projection Data &gt; Track Mode <br/>
    设置投影 <br/>
    
    | -          |                    |
    |------------|--------------------|
    | Navigation | 默认值, 显示投影到导航网格体的点阵 |
    | None       | 无投影, 会生成无法去到的位置点 |
    
    Track Mode = None <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/trace-mode-none.png" width="1000" /> <br/> <br/>
-   Range &gt; Data Binding <br/>
    半径模板选项 <br/>
    
    | -             |         |
    |---------------|---------|
    | None          | 默认, 固定值 |
    | Query Params  |         |
    | Random number | 设置随机数范围 |
    
    Range &gt; Data Binding = Random number <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/range-random.png" width="1000" /> <br/> <br/>


### 为扇形点阵添加限制条件 {#为扇形点阵添加限制条件}

右键生成器, `Add Test > Distance` : 根据位置点到顶点的距离对位置点进行筛选 <br/>

<img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/distance.png" width="500" /> <br/> <br/>

| `Details > Filter > Filter Type` | 限制类型 |
|----------------------------------|------|
| Range                            | 给定范围 |
| Minimum                          | 给定最小值 |

-   当前给定筛选距离范围, 最大值和最小值均为0, 所以无合适位置点 <br/>
    表示位置点的球型显示为蓝色: 不是合适的位置点 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/filter-none.png" width="1000" /> <br/> <br/>

-   给定最小值 <br/>
    为每个位置计算到顶点的距离, 根据距离, 给出权重: 距离越大的点, 选中的可能性更高 <br/>
    
    Float Value Min = 0.0: 颜色从红色到绿色, 权重由小变大 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS实现巡逻/filter-min.png" width="1000" /> <br/> <br/>


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

