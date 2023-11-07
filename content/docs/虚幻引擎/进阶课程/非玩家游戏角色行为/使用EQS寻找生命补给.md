---
title: "使用EQS寻找生命补给"
date: 2023-11-07T21:14:10
lastmod: 2023-11-07T21:14:12+08:00
draft: false
weight: 2014
---

## 说明 {#说明}

AI / EQS / Find Health Pickup <br/>


## 概览 {#概览}

-   [X] EQS生成器 <br/>
-   [X] 生成器限制条件 <br/>
-   [X] 使用C++实现Decorator <br/>


## 暂时修改声明补给外观 {#暂时修改声明补给外观}

EQS标记也是亮色 <br/>

1.  `Content > Materials` 目录下选中 `M_BaseColor` <br/>
2.  选择关卡中的BP_STUHealthPickup, 通过Details面板在蓝图编辑器中打开 `BP_STUHealthPickup` <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/open-bp.png" width="1000" /> <br/> <br/>
3.  选中 `Static Mesh` , 应用材质 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/apply-m.png" width="1000" /> <br/> <br/>
4.  回到关卡编辑器, 按住 `Option` 拖动BP_STUHealthPickup进行复制, 共三个 <br/>
5.  在场景中添加墙 <br/>
    `Place Actors > Geometry > Box` <br/>
6.  设置墙; 将一个生命补给放在墙后 <br/>
    `Details > Brush Settings` , 设置X = 50, Y = 500, Z = 500 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/set-wall.png" width="1000" /> <br/> <br/>


## 创建EQS资产 {#创建eqs资产}

`Content/AI/EQS` 目录下, 新建EQS资产, 命名为EQS_FindHealthPickup <br/>


### 添加生成器, 寻找场景中指定类型的Actor {#添加生成器-寻找场景中指定类型的actor}

`Generators > Actors Of Class` <br/>

| -                    |           |                 |
|----------------------|-----------|-----------------|
| Searched Actor Class | 指定Actor类型 | STUHealthPickup |
| Search Radius        | 搜索半径  | 1500            |

<img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/generator-actor-class.png" width="800" /> <br/> <br/>


### 设置场景中EQS_TestPawn使用的EQS模板 {#设置场景中eqs-testpawn使用的eqs模板}

`Details > EQS > Query Template` , 选择EQS_FindHealthPickup <br/>

移动EQS_TestPawn到合适位置, 三个生命补给均被标记为亮蓝色, 此时无视阻挡, 以搜索半径为准 <br/>

<img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/test-pawn.png" width="1000" /> <br/> <br/>


### 为生成器添加限制条件: 要求视线可见 {#为生成器添加限制条件-要求视线可见}

`Add Test > Trace` <br/>

在Visibility通道计算Pawn到Actor之间是否存在其他物体阻挡视线 <br/>

-   使用默认设置 <br/>
    
    |                                          | -          |
    |------------------------------------------|------------|
    | Trace &gt; Trace Data &gt; Trace Channel | Visibility |
    | Trace &gt; Trace Data &gt; Trace Shape   | Line       |
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/trace-default.png" width="500" /> <br/> <br/>

-   勾选则要求阻挡 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/trace-block.png" width="1000" /> <br/> <br/>

-   取消勾选则要求无阻挡 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/trace-unblock.png" width="1000" /> <br/> <br/>

-   设置为无阻挡 <br/>
    
    | -                      |      |
    |------------------------|------|
    | Filter &gt; Bool Match | 取消勾选 |
    
    通道存在阻挡则Actor被标记为蓝色; 无阻挡被标记为绿色 <br/>


### 为生成器添加限制条件: 寻找距离最近的生命补给 {#为生成器添加限制条件-寻找距离最近的生命补给}

`Add Test > Distance` <br/>

| -                           |         |            |
|-----------------------------|---------|------------|
| Filter &gt; Filter Type     | Minimum |            |
| Filter &gt; Float Value Min | 0       |            |
| Score &gt; Scoring Factor   | -1      | 距离越近, 权重越大 |

<img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/distance.png" width="1200" /> <br/> <br/>


### 为生成器添加限制条件: 存在获取生命补给的有效路径 {#为生成器添加限制条件-存在获取生命补给的有效路径}

`Add Test > Path Finding` <br/>
过滤掉无法去到的生命补给 <br/>

使用默认设置 <br/>

| -                          |             |
|----------------------------|-------------|
| Pathfinding &gt; Test Mode | Path Exists |

<img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/path-finding.png" width="1200" /> <br/> <br/>


## 在行为树中使用EQS_FindHealthPickup {#在行为树中使用eqs-findhealthpickup}

1.  暂时停止当前逻辑 <br/>
2.  添加节点: Selector <br/>
    NPC寻找生命补给, 或等待 <br/>
3.  添加节点: Wait <br/>
    设置时长为2s <br/>
4.  添加序列 <br/>
5.  为序列添加任务: RunEQSQuery <br/>
6.  设置EQS模板 <br/>
    
    -   `Details > EQS > EQSRequest > Query Template` , 设置为EQS_FindHealthPickup <br/>
    -   `Details > Blackboard > Blackboard Key` , 设置为AimLocation <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/set-run-eqs.png" width="1000" /> <br/> <br/>
7.  为序列添加任务: MoveTo <br/>
    `Details > Blackboard > Blackboard Key` , 设置为AimLocation <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/move-to.png" width="1000" /> <br/> <br/>


## 查看 {#查看}

1.  在选中窗口运行 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/selected-vp.png" width="500" /> <br/> <br/>
2.  按下 `F8` 或者点击 `Eject` <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/f8.png" width="700" /> <br/> <br/>
3.  拖动距离NPC最近的生命补给: NPC寻找并去到此时距离最近的生命补给位置 <br/>
4.  点击 `Pause` , 将所有生命补给移动到墙后, 点击 `Resume simulation` <br/>
    序列停止, NPC循环执行Wait任务 <br/>


## 使用C++实现Decorator {#使用c-plus-plus-实现decorator}

检查NPC生命值, 低于给定百分比NPC才会拾取生命补给 <br/>


### 学习BTDecorator类 {#学习btdecorator类}

在CalculateRawConditionValue中计算条件布尔值 <br/>

`protected` <br/>

```cpp
/** calculates raw, core value of decorator's condition. Should not include calling IsInversed */
virtual bool CalculateRawConditionValue(UBehaviorTreeComponent& OwnerComp, uint8* NodeMemory) const; 
```


### 创建C++类 {#创建c-plus-plus-类}

| -  |                           |
|----|---------------------------|
| 基类 | BTDecorator               |
| 名称 | STUHealthPercentDecorator |
| 路径 | AI/Decorators             |
| 属性 | Public                    |

添加到头文件搜索路径 <br/>
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
    "ShootThemUp/Public/AI/EQS",
    "ShootThemUp/Public/AI/Decorators"
});
```


### 添加构造函数 {#添加构造函数}

`public` <br/>
`ShootThemUp: AI/Decorators/STUHealthPercentDecorator.h` <br/>

```cpp
USTUHealthPercentDecorator();
```

`ShootThemUp: AI/Decorators/STUHealthPercentDecorator.cpp` <br/>

```cpp
USTUHealthPercentDecorator::USTUHealthPercentDecorator()
{
    NodeName = "Health Percent";
}
```


### 添加属性: 指定生命值 {#添加属性-指定生命值}

`protected` <br/>
`ShootThemUp: AI/Decorators/STUHealthPercentDecorator.h` <br/>

```cpp
UPROPERTY(EditAnywhere, BlueprintReadWrite)
float HealthPercent = 0.6f;
```


### 覆写条件 {#覆写条件}

`protected` <br/>
`ShootThemUp: AI/Decorators/STUHealthPercentDecorator.h` <br/>

```cpp
virtual bool CalculateRawConditionValue(UBehaviorTreeComponent& OwnerComp, uint8* NodeMemory) const override;
```

通过控制器获取当前Pawn, 通过Pawn获取健康组件 <br/>
`ShootThemUp: AI/Decorators/STUHealthPercentDecorator.cpp` <br/>

```cpp
#include "AIController.h"
#include "STUUtils.h"
#include "Components/STUHealthComponent.h"

bool USTUHealthPercentDecorator::CalculateRawConditionValue(UBehaviorTreeComponent& OwnerComp, uint8* NodeMemory) const
{
    const auto Controller = OwnerComp.GetAIOwner();
    if (!Controller) return false;

    const auto HealthComponent = STUUtils::GetSTUPlayerComponent<USTUHealthComponent>(Controller->GetPawn());
    if (!HealthComponent || HealthComponent->IsDead()) return false;

    return HealthComponent->GetHealthPercent() <= HealthPercent;
}
```


## 使用STUHealthPercentDecorator {#使用stuhealthpercentdecorator}

`BT_STUCharacter` <br/>

1.  为Sequence添加Decorator <br/>
2.  设置STUHealthPercentDecorator <br/>
    
    | -               |      |
    |-----------------|------|
    | Observer aborts | Self |
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/decorator.png" width="1000" /> <br/> <br/>
3.  查看 <br/>
    NPC满生命值时呆在原地 &gt; 使之生命值不大于60% &gt; NPC去到生命补给所在 <br/>


## 整理行为树 {#整理行为树}

1.  将本节新建序列移动到原行为树左侧: 优先级最高 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/left.png" width="800" /> <br/> <br/>
2.  作为Selector的下级; 设置Root节点 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/root.png" width="1000" /> <br/> <br/>
3.  将Fire服务移动到选择器 <br/>
    NPC寻找生命补给时仍射击敌人(是否有敌人?) <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/fire.png" width="1000" /> <br/> <br/>
4.  查看时注意NPC是否满足寻找生命补给条件 <br/>


## 恢复设置 {#恢复设置}

1.  可以恢复Fire服务目标: 保证当前为None <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找生命补给/fire-target.png" width="1000" /> <br/> <br/>
2.  恢复生命补给材质 <br/>

