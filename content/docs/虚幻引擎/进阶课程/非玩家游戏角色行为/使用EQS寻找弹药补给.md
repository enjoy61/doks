---
title: "使用EQS寻找弹药补给"
date: 2023-11-08T13:01:44
lastmod: 2023-11-08T15:08:58+08:00
draft: false
weight: 2015
---

## 说明 {#说明}

AI / EQS / Find Ammo Pickup <br/>

寻找弹药补给的EQS: EQS_FindAmmoPickup <br/>

判断是否需要领取弹药补给的Decorator类名STUNeedAmmoDecorator <br/>

指定武器类型, 自然弹药不是无限模式, 而这里暂时设置为当弹药耗尽才去领取补给 <br/>

要求武器类型和弹药补给类型一致 <br/>

可以参考上节当作练习, 再和给出的答案进行比较 <br/>


## 创建EQS资产并测试 {#创建eqs资产并测试}


### 预备工作 {#预备工作}

1.  设置弹药补给材质为黑色 <br/>
    
    -   双击打开 `Content/Pickups/BP_STUAmmoPickup` <br/>
    -   内容浏览器选中 `Content/Materials/M_BaseColor` <br/>
    -   应用材质 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找弹药补给/apply-m.png" width="800" /> <br/> <br/>
2.  拖动复制弹药补给为3个 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找弹药补给/3.png" width="1000" /> <br/> <br/>
3.  确保发射器的弹药不是无限模式 <br/>
    `BP_STULauncherWeapon > Default Ammo > Infinite` , 取消勾选 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找弹药补给/cancel-infinite.png" width="700" /> <br/> <br/>


### 创建EQS资产, 命名为EQS_FindAmmoPickup {#创建eqs资产-命名为eqs-findammopickup}

`Content/AI/EQS` 目录下 <br/>

_可以使用Ctrl-W对EQS_FindHealthPickup进行拷贝, 并修改筛选Actor类型_ <br/>


#### 设置EQS_TestPawn应用EQS_FindAmmoPickup, 查看 {#设置eqs-testpawn应用eqs-findammopickup-查看}

`Details > EQS > Query Template` , 选择EQS_FindAmmoPickup  <br/>


#### 添加生成器: 设置补给类型 {#添加生成器-设置补给类型}

`Generators > Actors Of Class` <br/>

| -                    |           |               |
|----------------------|-----------|---------------|
| Searched Actor Class | 指定Actor类型 | STUAmmoPickup |
| Search Radius        | 搜索半径  | 1500          |

<img src="/pic/非玩家游戏角色行为/使用EQS寻找弹药补给/class.png" width="1000" /> <br/> <br/>


#### 为生成器添加限制条件: 视线可见 {#为生成器添加限制条件-视线可见}

`Add Test > Trace` <br/>

要求无阻挡 <br/>

| -                      |      |
|------------------------|------|
| Filter &gt; Bool Match | 取消勾选 |

<img src="/pic/非玩家游戏角色行为/使用EQS寻找弹药补给/trace.png" width="1000" /> <br/> <br/>


#### 为生成器添加限制条件: 距离最近 {#为生成器添加限制条件-距离最近}

`Add Test > Distance` <br/>

| -                           |         |            |
|-----------------------------|---------|------------|
| Filter &gt; Filter Type     | Minimum |            |
| Filter &gt; Float Value Min | 0       |            |
| Score &gt; Scoring Factor   | -1      | 距离越近, 权重越大 |

<img src="/pic/非玩家游戏角色行为/使用EQS寻找弹药补给/distance.png" width="1000" /> <br/> <br/>


#### 为生成器添加限制条件: 存在可到达路径 {#为生成器添加限制条件-存在可到达路径}

`Add Test > Path Finding` <br/>

<img src="/pic/非玩家游戏角色行为/使用EQS寻找弹药补给/path.png" width="1000" /> <br/> <br/>


### 在行为树中使用EQS资产 {#在行为树中使用eqs资产}

1.  暂时停止当前逻辑 <br/>
2.  添加节点: Selector <br/>
    NPC寻找弹药补给, 或等待 <br/>
3.  添加节点: Wait <br/>
    设置时长为2s <br/>
4.  添加序列 <br/>
5.  为序列添加任务: RunEQSQuery <br/>
6.  设置EQS <br/>
    
    -   `Details > EQS > EQSRequest > Query Template` , 设置为EQS_FindAmmoPickup <br/>
    -   `Details > Blackboard > Blackboard Key` , 设置为AimLocation <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找弹药补给/run-eqs.png" width="1000" /> <br/> <br/>
7.  为序列添加任务: MoveTo <br/>
    `Details > Blackboard > Blackboard Key` , 设置为AimLocation <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找弹药补给/move-to.png" width="1000" /> <br/> <br/>


### 查看 {#查看}

1.  按下 `F8` 或者点击 `Eject` <br/>
2.  拖动距离NPC最近的弹药补给: NPC寻找并去到此时距离最近的弹药补给位置 <br/>
3.  点击 `Pause simulation` , 将所有弹药补给移动到墙后, 点击 `Resume play-in-editor session` <br/>
    序列停止, NPC循环执行Wait任务 <br/>


## 实现STUNeedAmmoDecorator {#实现stuneedammodecorator}


### 创建C++类 {#创建c-plus-plus-类}

| -  |                      |
|----|----------------------|
| 基类 | BTDecorator          |
| 名称 | STUNeedAmmoDecorator |
| 路径 | AI/Decorators        |
| 属性 | Public               |


### 武器组件添加接口: 指定类型武器弹药是否为空 {#武器组件添加接口-指定类型武器弹药是否为空}

_课程中只要检测到弹药不是满的, 就会去领取弹药补给; 为此, 将ASTUBaseWeapon::IsAmmoFull从protected移动到public_ <br/>

`public` <br/>
`ShootThemUp: Components/STUWeaponComponent.h` <br/>

```cpp
bool IsAmmoEmpty(TSubclassOf<ASTUBaseWeapon> WeaponType) const;
```

`ShootThemUp: Components/STUWeaponComponent.cpp` <br/>

```cpp
bool USTUWeaponComponent::IsAmmoEmpty(TSubclassOf<ASTUBaseWeapon> WeaponType) const
{
    for (const auto Weapon : Weapons)
    {
        if (Weapon && Weapon->IsA(WeaponType))
        {
            return Weapon->IsAmmoEmpty();
        }
    }
    return false;
}
```


### 添加构造函数 {#添加构造函数}

`public` <br/>
`ShootThemUp: AI/Decorators/STUNeedAmmoDecorator.h` <br/>

```cpp
USTUNeedAmmoDecorator();
```

`ShootThemUp: AI/Decorators/STUNeedAmmoDecorator.cpp` <br/>

```cpp
USTUNeedAmmoDecorator::USTUNeedAmmoDecorator()
{
    NodeName = "Need Ammo";
}
```


### 添加属性: 设置武器类型 {#添加属性-设置武器类型}

`protected` <br/>
`ShootThemUp: AI/Decorators/STUNeedAmmoDecorator.h`       <br/>

```cpp
class ASTUBaseWeapon;

UPROPERTY(EditAnywhere, BlueprintReadWrite)
TSubclassOf<ASTUBaseWeapon> WeaponType;
```


### 覆写条件 {#覆写条件}

`protected` <br/>
`ShootThemUp: AI/Decorators/STUNeedAmmoDecorator.h`             <br/>

```cpp
virtual bool CalculateRawConditionValue(UBehaviorTreeComponent& OwnerComp, uint8* NodeMemory) const override;
```

参考拾取弹药逻辑: 要求游戏角色存活 <br/>
`ShootThemUp: Pickups/STUAmmoPickup.cpp` <br/>
`GivePickupTo` <br/>

`ShootThemUp: AI/Decorators/STUNeedAmmoDecorator.cpp`       <br/>

```cpp
#include "Weapon/STUBaseWeapon.h"
#include "AIController.h"
#include "STUUtils.h"
#include "Components/STUHealthComponent.h"
#include "Components/STUWeaponComponent.h"

bool USTUNeedAmmoDecorator::CalculateRawConditionValue(UBehaviorTreeComponent& OwnerComp, uint8* NodeMemory) const
{
    const auto Controller = OwnerComp.GetAIOwner();
    if (!Controller) return false;

    const auto HealthComponent = STUUtils::GetSTUPlayerComponent<USTUHealthComponent>(Controller->GetPawn());
    if (!HealthComponent || HealthComponent->IsDead()) return false;

    const auto WeaponComponent = STUUtils::GetSTUPlayerComponent<USTUWeaponComponent>(Controller->GetPawn());
    if (!WeaponComponent) return false;

    return WeaponComponent->IsAmmoEmpty(WeaponType);
}
```


## 使用STUNeedAmmoDecorator {#使用stuneedammodecorator}

`BT_STUCharacter` <br/>

1.  为Sequence添加Decorator <br/>
2.  设置STUHealthPercentDecorator <br/>
    
    | -               |                      |
    |-----------------|----------------------|
    | Observer aborts | Self                 |
    | Weapon Type     | BP_STULauncherWeapon |
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找弹药补给/decorator.png" width="1000" /> <br/> <br/>


## 调整行为树 {#调整行为树}

由于弹药初始不为空, 需要射击逻辑 <br/>

1.  将本节新建序列移动到拾取生命补给逻辑之后: 优先级其次 <br/>
2.  恢复行为树框架 <br/>
3.  确保射击服务有目标 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找弹药补给/fire-target.png" width="1000" /> <br/> <br/>
4.  暂时不更换武器 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找弹药补给/no-change.png" width="1000" /> <br/> <br/>
5.  步枪伤害设为0 <br/>
    `BP_STURifleWeapon > Damage Amount` <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找弹药补给/rifle.png" width="500" /> <br/> <br/>
6.  可以在拾取生命补给和拾取弹药补给移动之前添加Wait任务, 用来判断NPC发现补给情况 <br/>
    
    <img src="/pic/非玩家游戏角色行为/使用EQS寻找弹药补给/wait.png" width="800" /> <br/> <br/>


## 恢复设置 {#恢复设置}

-   更换武器 <br/>
-   弹药补给材质 <br/>

