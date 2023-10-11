---
title: "补给绕Z轴旋转"
date: 2023-10-11T18:15:22
lastmod: 2023-10-11T18:23:17+08:00
draft: false
weight: 2006
---

## 说明 {#说明}

让补给绕Z轴旋转, 旋转角度为给定范围里的随机值 <br/>


## 添加属性 {#添加属性}

`ShootThemUp: Pickups/STUBasePickup.h` <br/>
`private` <br/>

```cpp
float RotationYaw = 0.0f;
```


## 添加接口 {#添加接口}

`ShootThemUp: Pickups/STUBasePickup.h` <br/>
`private` <br/>

```cpp
void GenerateRotationYaw();
```

`ShootThemUp: Pickups/STUBasePickup.cpp` <br/>

```cpp
// BeginPlay
GenerateRotationYaw();

// Respawn
GenerateRotationYaw();       

// Tick
AddActorLocalRotation(FRotator(0.0f, RotationYaw, 0.0f)); // AddActorWorldRotation

void ASTUBasePickup::GenerateRotationYaw()
{
    const auto Direction = FMath::RandBool() ? -1.0f : 1.0f;
    RotationYaw = FMath::RandRange(1.0f, 2.0f) * Direction;
}
```


## 查看 {#查看}

按下按钮, 控制器释放对游戏角色的控制, 可以选择场景中的任意物体进行观察 <br/>

<img src="/pic/补给/补给绕Z轴旋转/detach.png" width="1000" /> <br/> <br/>

在本地座标系和世界座标系间进行切换 <br/>

<img src="/pic/补给/补给绕Z轴旋转/switch.png" width="1000" /> <br/> <br/>

