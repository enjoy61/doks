---
title: "NPC自行更换武器"
date: 2023-11-01T17:25:14
lastmod: 2023-11-01T20:40:21+08:00
draft: false
weight: 2009
---

## 说明 {#说明}

AI Weapon Component <br/>


## 查看当前NPC更换武器需求 {#查看当前npc更换武器需求}

1.  调整武器顺序: 第一个为发射器 <br/>
    `BP_STUAICharacter > WeaponComponent` <br/>
    拖动Index[1]到最上 <br/>
    
    <img src="/pic/非玩家游戏角色行为/NPC自行更换武器/drag.png" width="500" /> <br/> <br/>
2.  修改发射器默认子弹数 <br/>
    `BP_STULauncherWeapon > Details > Default Ammo` <br/>
    设置Clips = 2, Bullets = 1 <br/>
3.  修改步枪弹药库和伤害 <br/>
    `BP_STURifleWeapon > Details` <br/>
    -   `Default Ammo` <br/>
        取消勾选 `Infinite`, 设置Clips = 3 <br/>
    -   设置DamageAmount = 0.0 <br/>

查看: 射击完发射器榴弹后, 停止射击 <br/>


## NPC射击榴弹特效异常 {#npc射击榴弹特效异常}

在枪口处爆炸, 无移动 <br/>


### 调试思路 {#调试思路}

NPC和玩家游戏角色的区别, 刚好在上节子弹轨迹的修改; 上层控制器类型 <br/>

-   GetPlayerViewPoint由 `GetTraceData` 调用: 能获取到ViewLocation和ViewRotation值 <br/>
-   发射器MakeShot调用GetTraceData后, 调用 `MakeHit` <br/>
    打印碰撞信息: 永远发生碰撞; 怀疑MuzzleSocket变换 <br/>
    输出碰撞点: 和枪口位置一致 <br/>
    将轨迹终点改为根据射程计算得到的终点: 轨迹和射击方向近乎垂直 <br/>


### 原因 {#原因}

MuzzleSocket变换配置存在失误; 已在 `武器 > 榴弹类` 更正 <br/>

<img src="/pic/非玩家游戏角色行为/NPC自行更换武器/launcher.png" width="1200" /> <br/> <br/>


## 创建C++类 {#创建c-plus-plus-类}

| -  |                      |
|----|----------------------|
| 基类 | STUWeaponComponent   |
| 路径 | Components           |
|    | Public               |
| 类名 | STUAIWeaponComponent |


## 调整武器基类接口的访问属性 {#调整武器基类接口的访问属性}

`ShootThemUp: Weapon/STUBaseWeapon.h` <br/>
IsAmmoEmpty: protected &gt; public <br/>


## 调整武器组件成员的访问属性 {#调整武器组件成员的访问属性}

`ShootThemUp: Components/STUWeaponComponent.h` <br/>

-   之前误把FireStart和FireStop声明成虚函数: 恢复FireStop <br/>
    ```cpp
    void FireStop();
    ```
-   STUAIWeaponComponent需要重新实现下列接口逻辑 <br/>
    ```cpp
    virtual void FireStart();
    virtual void NextWeapon();
    ```
-   派生类需要访问下列成员 `private > protected` <br/>
    -   Weapons数组 <br/>
    -   当前武器指针CurrentWeapon <br/>
    -   当前武器在数组中的索引CurrentWeaponIndex <br/>
-   派生类需要使用下列成员函数 `private > protected`  <br/>
    -   CanFire和CanEquip <br/>
    -   EquipWeapon <br/>


## 实现STUAIWeaponComponent {#实现stuaiweaponcomponent}


### 覆写虚函数 {#覆写虚函数}

`public` <br/>
`ShootThemUp: Components/STUAIWeaponComponent.h` <br/>

```cpp
virtual void FireStart() override;
virtual void NextWeapon() override;
```


### 射击时, 若当前武器没有弹药, 尝试更换武器 {#射击时-若当前武器没有弹药-尝试更换武器}

`ShootThemUp: Components/STUAIWeaponComponent.cpp` <br/>

```cpp
#include "Weapon/STUBaseWeapon.h"

void USTUAIWeaponComponent::FireStart()
{
    if (!CanFire()) return;

    if (CurrentWeapon->IsAmmoEmpty())
    {
        NextWeapon();
    }
    else
    {
        CurrentWeapon->FireStart();
    }
}
```


### 若存在武器弹药不为空, 切换到该武器 {#若存在武器弹药不为空-切换到该武器}

`ShootThemUp: Components/STUAIWeaponComponent.cpp` <br/>

```cpp
void USTUAIWeaponComponent::NextWeapon()
{
    if (!CanEquip()) return;

    int32 NextIndex = (CurrentWeaponIndex + 1) % Weapons.Num();
    while (NextIndex != CurrentWeaponIndex)
    {
        if (!Weapons[NextIndex]->IsAmmoEmpty()) break;
        NextIndex = (NextIndex + 1) % Weapons.Num();
    }

    if (NextIndex != CurrentWeaponIndex)
    {
        CurrentWeaponIndex = NextIndex;
        EquipWeapon(CurrentWeaponIndex);
    }
}
```


## AICharacter使用STUAIWeaponComponent {#aicharacter使用stuaiweaponcomponent}

参考STUBaseCharacter使用STUCharacterMovementComponent <br/>
`ShootThemUp: Player/STUBaseCharacter.cpp` <br/>

`ShootThemUp: AI/STUAICharacter.cpp` <br/>

```cpp
#include "Components/STUAIWeaponComponent.h"

ASTUAICharacter::ASTUAICharacter(const FObjectInitializer &ObjInit)
    : Super(ObjInit.SetDefaultSubobjectClass<USTUAIWeaponComponent>("WeaponComponent"))
{
    // ...
}
```


## 查看 {#查看}

榴弹用完后自动更换武器, 步枪子弹用完后无法射击 <br/>

