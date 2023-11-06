---
title: "介绍EQS资产"
date: 2023-11-06T10:34:48
lastmod: 2023-11-06T21:29:46+08:00
draft: false
weight: 2005
---

## 介绍EQS资产 {#介绍eqs资产}

类似行为树图表 <br/>


### 从Root出发, 可以设置各种生成器 {#从root出发-可以设置各种生成器}

<img src="/pic/专题/NPC行为/介绍EQS资产/generators.png" width="500" /> <br/> <br/>


### 随机目的地 {#随机目的地}

双击打开EQS_RandomRoam <br/>

介绍下列生成器 <br/>

| -              |      |
|----------------|------|
| Points: Grid   | 方形点阵 |
| Points: Circle | 圆圈点阵 |
| Points: Cone   | 扇形点阵 |


#### 方形点阵 {#方形点阵}

EQS_TestPawn身处方形点阵表示的位置区域中 <br/>

| 可配置项      |      |
|-----------|------|
| GridHalfSize  | 点阵大小 |
| Space Between | 点阵密度 |

<img src="/pic/专题/NPC行为/介绍EQS资产/grid.png" width="1000" /> <br/> <br/>


#### 圆圈点阵 {#圆圈点阵}

只圆形周长存在有效位置 <br/>

| 可配置项      |    |
|-----------|----|
| Circle Radius | 半径 |

<img src="/pic/专题/NPC行为/介绍EQS资产/circle.png" width="1000" /> <br/> <br/>


#### 扇形点阵 {#扇形点阵}

EQS_TestPawn位于顶点处, 前进向量对应扇形中线 <br/>

该模板用于选择前进时的下一个目的地, 因为前进向量的改变不会太突兀 <br/>

| 可配置项                              |         |
|-----------------------------------|---------|
| Aligned Points Distance               | 射线上的点间距 |
| Cone Degrees                          | 顶角    |
| Angle Step                            | 射线密度 |
| Range &gt; Data Binding = None, Range | 半径    |

<img src="/pic/专题/NPC行为/介绍EQS资产/eqs-default.png" width="1000" /> <br/> <br/>

-   Projection Data &gt; Track Mode <br/>
    设置投影 <br/>
    
    | -          |                    |
    |------------|--------------------|
    | Navigation | 默认值, 显示投影到导航网格体的点阵 |
    | None       | 无投影, 会生成无法去到的位置点 |
    
    Track Mode = None <br/>
    
    <img src="/pic/专题/NPC行为/介绍EQS资产/trace-mode-none.png" width="1000" /> <br/> <br/>
-   Range &gt; Data Binding <br/>
    半径模板选项 <br/>
    
    | -             |         |
    |---------------|---------|
    | None          | 默认, 固定值 |
    | Query Params  |         |
    | Random number | 设置随机数范围 |
    
    Range &gt; Data Binding = Random number <br/>
    
    <img src="/pic/专题/NPC行为/介绍EQS资产/range-random.png" width="1000" /> <br/> <br/>


#### 为扇形点阵添加限制条件 {#为扇形点阵添加限制条件}

右键生成器, `Add Test > Distance` : 根据位置点到顶点的距离对位置点进行筛选 <br/>

<img src="/pic/专题/NPC行为/介绍EQS资产/distance.png" width="500" /> <br/> <br/>

| `Details > Filter > Filter Type` | 限制类型 |
|----------------------------------|------|
| Range                            | 给定范围 |
| Minimum                          | 给定最小值 |

-   当前给定筛选距离范围, 最大值和最小值均为0, 所以无合适位置点 <br/>
    表示位置点的球型显示为蓝色: 不是合适的位置点 <br/>
    
    <img src="/pic/专题/NPC行为/介绍EQS资产/filter-none.png" width="1000" /> <br/> <br/>

-   给定最小值 <br/>
    为每个位置计算到顶点的距离, 根据距离, 给出权重: 距离越大的点, 选中的可能性更高 <br/>
    
    Float Value Min = 0.0: 颜色从红色到绿色, 权重由小变大 <br/>
    
    <img src="/pic/专题/NPC行为/介绍EQS资产/filter-min.png" width="1000" /> <br/> <br/>


### 生成附近随机位置 {#生成附近随机位置}

| -          |         |
|------------|---------|
| 生成敌人附近的随机点 | 环状点阵 |
| 寻找敌人   | Context |

介绍新生成器 <br/>

| -             |      |
|---------------|------|
| Points: Donut | 环形点阵 |


#### 环状点阵 {#环状点阵}

`Points: Donut` <br/>

| -                               |         |
|---------------------------------|---------|
| Projection Data &gt; Track Mode | 设置投影 |
| Inner Radius                    | 内圈半径 |
| Outer Radius                    | 外圈半径 |
| Number Of Rings                 | 半径上的点个数 |
| Points Per Ring                 | 一圈上的点个数 |
| Arc Angle                       | 圆环扇形 |
| Use Spiral Pattern              | 螺旋模式 |


#### 为环状点阵添加限制条件 {#为环状点阵添加限制条件}

使用Distance <br/>

| -                         |                      |
|---------------------------|----------------------|
| Filter &gt; Filter Type   | 筛选方式             |
| Score &gt; Scoring Factor | 权重比: 1则越远越大, -1则越近越大 |

-   权重比为1 <br/>
    最外层有几圈蓝色位置点, 均无效, 权重为0; 有效位置点由红色变为绿色, 权重由0变为1 <br/>
-   权重比为-1 <br/>
-   给定权重比范围, -1 ~ 1 <br/>


### 设置中心点 {#设置中心点}


#### 环状点阵生成器中心点选项 {#环状点阵生成器中心点选项}

选中环状点阵, `Details > Center` <br/>

| -                       |                                          |
|-------------------------|------------------------------------------|
| EnvQueryContext_Querier | 默认值, 使用EQS的上级Pawn; 可以自定义EnvQueryrContext |


#### 环状点阵距离限制条件距离计算的参照点选项 {#环状点阵距离限制条件距离计算的参照点选项}

选中Distance, `Details > Distance > Distance To` <br/>

| -                       |                                          |
|-------------------------|------------------------------------------|
| EnvQueryContext_Querier | 默认值, 使用EQS的上级Pawn; 可以自定义EnvQueryrContext |

