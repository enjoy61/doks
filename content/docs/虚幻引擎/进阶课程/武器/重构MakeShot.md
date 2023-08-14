---
title: "重构MakeShot"
date: 2023-08-11T18:23:16
lastmod: 2023-08-14T18:37:12+08:00
draft: false
weight: 1007
---

## 说明 {#说明}

-   本节使用的重构被称作提取 `The Extract Method` , 将函数切分, 使得代码可读性更高 <br/>
-   对武器类的MakeShot重构 <br/>
-   纯理论逻辑放在protected, 供派生类调用 <br/>


## 调整逻辑 {#调整逻辑}

```cpp
void ASTUBaseWeapon::MakeShot()
{
    if(!GetWorld()) return;

    // 获取PlayerController
    const auto Player = Cast<ACharacter>(GetOwner());
    if (!Player) return;

    const auto Controller = Player->GetController<APlayerController>();
    if (!Controller) return;

    // 通过Controller获取CameraComponent的位置和方向
    FVector ViewLocation;
    FRotator ViewRotation;
    Controller->GetPlayerViewPoint(ViewLocation, ViewRotation);

    // 通过CameraComponent的位置和方向计算轨迹信息
    const FVector TraceStart = ViewLocation;
    const FVector ShootDirection = ViewRotation.Vector();
    const FVector TraceEnd = TraceStart + ShootDirection * TraceMaxDistance;

    // 提供轨迹获取碰撞信息
    FHitResult HitResult;

    FCollisionQueryParams CollisionParams;
    CollisionParams.AddIgnoredActor(GetOwner());

    GetWorld()->LineTraceSingleByChannel(HitResult, TraceStart, TraceEnd, ECollisionChannel::ECC_Visibility, CollisionParams);

    // 获取枪口信息: 只用到了位置分量
    const FTransform SocketTransform = WeaponMeshComponent->GetSocketTransform(MuzzleSocketName);

    // 使用相交信息和枪口信息绘制轨迹和交点
    if (HitResult.bBlockingHit)
    {
        DrawDebugLine(GetWorld(), SocketTransform.GetLocation(), HitResult.ImpactPoint, FColor::Red, false, 3.0f, 0, 3.0f);
        DrawDebugSphere(GetWorld(), HitResult.ImpactPoint, 10.0f, 24, FColor::Red, false, 5.0f);
        UE_LOG(LogBaseWeapon, Display, TEXT("Bone: %s"), *HitResult.BoneName.ToString());
    }
    else
    {
        DrawDebugLine(GetWorld(), SocketTransform.GetLocation(), TraceEnd, FColor::Red, false, 3.0f, 0, 3.0f);
    }
}
```


## 拆分 {#拆分}

`ShootThemUp: Weapon/STUBaseWeapon.cpp` <br/>


### GetPlayerController {#getplayercontroller}

```cpp
APlayerController *ASTUBaseWeapon::GetPlayerController() const
{
    const auto Player = Cast<ACharacter>(GetOwner());
    if (!Player) return nullptr;

    return Player->GetController<APlayerController>();
}
```


### GetPlayerViewPoint {#getplayerviewpoint}

```cpp
bool ASTUBaseWeapon::GetPlayerViewPoint(FVector &ViewLocation, FRotator &ViewRotation) const
{
    const auto Controller = GetPlayerController();
    if (!Controller) return false;

    Controller->GetPlayerViewPoint(ViewLocation, ViewRotation);
    return true;
}
```


### GetTraceData {#gettracedata}

```cpp
bool ASTUBaseWeapon::GetTraceData(FVector& TraceStart, FVector& TraceEnd) const
{
    FVector ViewLocation;
    FRotator ViewRotation;
    if (!GetPlayerViewPoint(ViewLocation, ViewRotation)) return false;

    TraceStart = ViewLocation;
    const FVector ShootDirection = ViewRotation.Vector();
    TraceEnd = TraceStart + ShootDirection * TraceMaxDistance;
    return true;
}
```


### MakeHit {#makehit}

```cpp
void ASTUBaseWeapon::MakeHit(FHitResult &HitResult, const FVector &TraceStart, const FVector &TraceEnd)
{
    if (!GetWorld()) return;

    FCollisionQueryParams CollisionParams;
    CollisionParams.AddIgnoredActor(GetOwner());

    GetWorld()->LineTraceSingleByChannel(HitResult, TraceStart, TraceEnd, ECollisionChannel::ECC_Visibility, CollisionParams);
}
```


### GetMuzzleWorldLocation {#getmuzzleworldlocation}

```cpp
FVector ASTUBaseWeapon::GetMuzzleWorldLocation() const
{
    return WeaponMeshComponent->GetSocketLocation(MuzzleSocketName);
}
```


### MakeShot {#makeshot}

```cpp
void ASTUBaseWeapon::MakeShot()
{
    if (!GetWorld()) return;

    FVector TraceStart, TraceEnd;
    if (!GetTraceData(TraceStart, TraceEnd)) return;         

    FHitResult HitResult;
    MakeHit(HitResult, TraceStart, TraceEnd);

    if (HitResult.bBlockingHit)
    {
        DrawDebugLine(GetWorld(), GetMuzzleWorldLocation(), HitResult.ImpactPoint, FColor::Red, false, 3.0f, 0, 3.0f);
        DrawDebugSphere(GetWorld(), HitResult.ImpactPoint, 10.0f, 24, FColor::Red, false, 5.0f);
        // UE_LOG(LogBaseWeapon, Display, TEXT("Bone: %s"), *HitResult.BoneName.ToString());
    }
    else
    {
        DrawDebugLine(GetWorld(), GetMuzzleWorldLocation(), TraceEnd, FColor::Red, false, 3.0f, 0, 3.0f);
    }
}
```


## 添加声明 {#添加声明}

`protected` <br/>
`ShootThemUp: Weapon/STUBaseWeapon.h` <br/>

```cpp
APlayerController *GetPlayerController() const;
bool GetPlayerViewPoint(FVector &ViewLocation, FRotator &ViewRotation) const;
bool GetTraceData(FVector& TraceStart, FVector& TraceEnd) const;
void MakeHit(FHitResult &HitResult, const FVector &TraceStart, const FVector &TraceEnd);
FVector GetMuzzleWorldLocation() const;
```

