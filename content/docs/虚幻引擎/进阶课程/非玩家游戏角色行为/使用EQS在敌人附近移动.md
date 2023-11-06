---
title: "使用EQS在敌人附近移动"
date: 2023-11-06T21:28:06
lastmod: 2023-11-06T22:05:04+08:00
draft: false
weight: 2013
---

## 说明 {#说明}

AI / EQS / Context <br/>

完成两点 <br/>

1.  在敌人周围生成具有随机性的点阵, 选择一个位置点, 去到那里 <br/>
2.  设置点阵中心为敌人 <br/>


## 生成创建BP类 {#生成创建bp类}

Content/AI/EQS目录下, 创建EQS资产EQS_NextToEnemyLocation <br/>

为EQS_TestPawn设置EQS模板: 在世界大纲中选中EQS_TestPawn, `Details > EQS > Query Template` , 设置为EQS_NextToEnemyLocation <br/>

<img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/set-test-pawn.png" width="1000" /> <br/> <br/>


## 设置EQS资产 {#设置eqs资产}

`EQS_NextToEnemyLocation` <br/>

[生成附近随机位置](/docs/虚幻引擎/专题/npc行为/介绍eqs资产/#生成附近随机位置) <br/>

-   添加生成器: 环形点阵 <br/>
-   设置环形点阵 <br/>
    
    | -                               |                                                        |
    |---------------------------------|--------------------------------------------------------|
    | Projection Data &gt; Track Mode | Navigation                                             |
    | Inner Radius                    | Data Binding = None, Inner Radius = 450                |
    | Outer Radius                    | Data Binding = Random number, Outer Radius = 1000-1500 |
    | Number Of Rings                 | Data Binding = Random number, Number Of Rings = 3-8    |
    | Points Per Ring                 | Data Binding = Random number, Number Of Rings = 4-20   |
    | Arc Angle                       | 360                                                    |
    | Use Spiral Pattern              | 勾选                                                   |
    
    <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/set-donut.png" width="1000" /> <br/> <br/>
-   为环形点阵添加距离条件: Distance <br/>
-   设置Distance <br/>
    
    | -                         |                                                           |
    |---------------------------|-----------------------------------------------------------|
    | Filter &gt; Filter Type   | Range: 400-800                                            |
    | Score &gt; Scoring Factor | Data Binding = Random number, Scoring Factor = -1 ~ 1, 随机 |
    
    <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/set-distance.png" width="1000" /> <br/> <br/>


## 使用蓝图类测试 {#使用蓝图类测试}


### 创建蓝图类 {#创建蓝图类}

| -  |                               |
|----|-------------------------------|
| 基类 | EnvQueryContext_BlueprintBase |
| 路径 | AI/EQS                        |
| 名称 | EQS_ContextSTUCharacter       |


### 覆写函数 {#覆写函数}

选择返回Actor或者位置 <br/>

双击打开 `EQS_NextToEnemyLocation`       <br/>


#### 选择函数原型 {#选择函数原型}

`My Blueprint > Functions Override` , 选择 `Provide Single Actor` <br/>

| -                       |         |
|-------------------------|---------|
| Provide Actors Set      | Actor数组 |
| Provide Locations Set   | 位置数组 |
| Provide Single Actor    | 单一Actor |
| Provide Single Location | 单一位置 |

<img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/override-func.png" width="500" /> <br/> <br/>


#### 覆写 {#覆写}

1.  筛选Actor类型 <br/>
    `Provide Single Actor` 之后, 添加节点: `Get All Actors Of Class` , 设置类类型为STUBaseCharacter <br/>
2.  `Get All Actor Of Class` 之后, 返回第一个元素, 添加节点: `Get (a copy)` <br/>
    未作检查, 返回第一个元素 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/get.png" width="500" /> <br/> <br/>

<img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/func.png" width="800" /> <br/>    <br/>


### 设置中心点 {#设置中心点}

[设置中心点](/docs/虚幻引擎/专题/npc行为/介绍eqs资产/#设置中心点) <br/>

1.  设置环状点阵生成器中心点使用EQS_ContextSTUCharacter <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/donut-center1.png" width="1000" /> <br/> <br/>
2.  设置Distance距离计算参照点使用EQS_ContextSTUCharacter <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/distance-to1.png" width="1000" /> <br/> <br/>
3.  查看 <br/>
    -   在场景中添加BP_STUBaseCharacter <br/>
    -   移动游戏角色, 再次选中TestPawn, 环状点阵的中心一直是游戏角色 <br/>
        
        <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/test-bp.png" width="1000" /> <br/> <br/>
    -   移除游戏角色 <br/>


### 在行为树中使用 {#在行为树中使用}

1.  选择 `Run EQS Query`, 设置使用的模板为 `EQS_NextToEnemyLocation` <br/>
    `Details > EQS > Query Template` , 选择EQS_NextToEnemyLocation <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/set-bt1.png" width="1000" /> <br/> <br/>
2.  运行游戏 <br/>
    NPC始终在游戏角色附近的圆环点阵中切换位置 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/test-bt.png" width="1000" /> <br/> <br/>


## 学习EnvQueryContext_Querier {#学习envquerycontext-querier}

1.  构造函数 <br/>
2.  PrivideContext <br/>
    -   该函数只用来计算Actor, 返回计算得到Actor <br/>
    -   获取EQS上级, 并通过SetContextHelper设置给ContextData <br/>
    -   我们要做的, 即获取黑板变量EnemyActor对应的Actor, 并设置给ContextData <br/>
    -   QueryOwener: Pawn或者Character, EQS的上级 <br/>


## 使用C++类实现 {#使用c-plus-plus-类实现}

设置黑板变量EnemyActor <br/>


### 创建C++类 {#创建c-plus-plus-类}

| - |                         |
|---|-------------------------|
|   | EnvQueryContext         |
|   | STUEnemyEnvQueryContext |
|   | AI/EQS                  |
|   | Public                  |


### 修改STUUtils.h的预编译命令的遗留错误 {#修改stuutils-dot-h的预编译命令的遗留错误}

`STUUtils.h` <br/>

```cpp
#pragma once
```


### 修改头文件搜索路径 {#修改头文件搜索路径}

`ShootThemUp: ShootThemUp.Build.cs` <br/>

```cpp
PublicIncludePaths.AddRange(new string[]
{
    "ShootThemUp/Public/Player",
    "ShootThemUp/Public/Components",
    "ShootThemUp/Public/Dev",
    "ShootThemUp/Public/Weapon",
    "ShootThemUp/Public/UI",
    "ShootThemUp/Public/Animations",
    "ShootThemUp/Public/Pickups",
    "ShootThemUp/Public/Weapon/Components",
    "ShootThemUp/Public/AI",
    "ShootThemUp/Public/AI/Tasks",
    "ShootThemUp/Public/AI/Services",
    "ShootThemUp/Public/AI/EQS"
});
```


### 实现STUEnemyEnvQueryContext {#实现stuenemyenvquerycontext}


#### 添加属性: EnemyActor变量名 {#添加属性-enemyactor变量名}

`protected` <br/>

`ShootThemUp: AI/EQS/STUEnemyEnvQueryContext.h` <br/>

```cpp
UPROPERTY(EditAnywhere, BlueprintReadWrite)
FName EnemyActorKeyName = "EnemyActor";
```


#### 覆写虚函数 {#覆写虚函数}

`public` <br/>

`ShootThemUp: AI/EQS/STUEnemyEnvQueryContext.h`        <br/>

```cpp
virtual void ProvideContext(FEnvQueryInstance &QueryInstance, FEnvQueryContextData &ContextData) const override;
```

<!--list-separator-->

-  获取EQS上级对应的Actor

    FEnvQueryInstance在EnvQueryTypes.h中 <br/>
    
    ```cpp
    #include "EnvironmentQuery/EnvQueryTypes.h"
    
    const auto QueryOwner = Cast<AActor>(QueryInstance.Owner.Get());
    ```

<!--list-separator-->

-  获取黑板组件

    通过转换EQS上级得到Pawn, 通过Pawn得到Controller; 指定组件类型, 通过Controller获取黑板组件 <br/>
    
    ```cpp
    #include "Blueprint/AIBlueprintHelperLibrary.h"
    #include "BehaviorTree/BlackboardComponent.h"
    
    const auto Blackboard = UAIBlueprintHelperLibrary::GetBlackboard(QueryOwner);
    if (!Blackboard) return;
    ```

<!--list-separator-->

-  获取黑板变量

    ```cpp
    const auto ContextActor = Blackboard->GetValueAsObject(EnemyActorKeyName);
    ```

<!--list-separator-->

-  将黑板变量用作中心点

    ```cpp
    #include "EnvironmentQuery/Items/EnvQueryItemType_Actor.h"
    
    UEnvQueryItemType_Actor::SetContextHelper(ContextData, Cast<AActor>(ContextActor));
    ```

<!--list-separator-->

-  完整实现

    `ShootThemUp: AI/EQS/STUEnemyEnvQueryContext.cpp` <br/>
    
    ```cpp
    #include "EnvironmentQuery/EnvQueryTypes.h"          
    #include "Blueprint/AIBlueprintHelperLibrary.h"
    #include "BehaviorTree/BlackboardComponent.h"
    #include "EnvironmentQuery/Items/EnvQueryItemType_Actor.h"
    
    void USTUEnemyEnvQueryContext::ProvideContext(FEnvQueryInstance &QueryInstance, FEnvQueryContextData &ContextData) const
    {
        const auto QueryOwner = Cast<AActor>(QueryInstance.Owner.Get());
    
        const auto Blackboard = UAIBlueprintHelperLibrary::GetBlackboard(QueryOwner);
        if (!Blackboard) return;
    
        const auto ContextActor = Blackboard->GetValueAsObject(EnemyActorKeyName);
        UEnvQueryItemType_Actor::SetContextHelper(ContextData, Cast<AActor>(ContextActor));
    
    }      
    ```


## 使用C++类STUEnemyEnvQueryContext {#使用c-plus-plus-类stuenemyenvquerycontext}


### 设置行为树 {#设置行为树}

`BT_STUCharacter` <br/>

1.  在环形点阵和距离限制条件中使用STUEnemyEnvQueryContext <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/donut-center2.png" width="1000" /> <br/> <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/distance-to2.png" width="1000" /> <br/> <br/>

2.  恢复行为树框架, 移除Task <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/remove-task.png" width="800" /> <br/> <br/>

3.  添加任务: RunEQSQuery - EQS_NextToEnemyLocation <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/eqs1.png" width="1000" /> <br/> <br/>

4.  添加任务: RunEQSQuery - EQS_RandomRoam <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/eqs2.png" width="1000" /> <br/> <br/>

5.  暂时移除Fire服务里目标: 点击恢复图标 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/fire.png" width="1000" /> <br/> <br/>


### 查看 {#查看}

-   按下 `'` 打开调试界面 <br/>
-   选中AICharacter <br/>
-   按下小写键盘 `3` 显示EQS <br/>
-   当前存在两个EQS点阵, 按下小写键盘 `*` 显示当前EQS <br/>
    `Project Settings > Engine > Gameplay Debugger` <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS在敌人附近移动/eqs.png" width="500" /> <br/> <br/>

对于EQS的使用, 我们现在可以设置任意移动模板, 或者随机结合他们 <br/>

-   可以移除楼梯和模拟爆炸 <br/>
-   可以添加墙, 躲避NPC捕获 <br/>

