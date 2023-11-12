---
title: "动态创建NPC"
date: 2023-11-10T16:59:54
lastmod: 2023-11-12T18:22:39+08:00
draft: false
weight: 2003
---

`NPC Spawn` <br/>


## 说明 {#说明}

在GameModeBase中动态创建NPC <br/>


## 添加数据结构: 存放游戏规则 {#添加数据结构-存放游戏规则}

`STUCoreTypes.h` <br/>

| -    |            |                 |
|------|------------|-----------------|
| 玩家个数 | PlayersNum | 包含玩家操控的游戏角色和NPC |

```cpp
// game mode
USTRUCT(BlueprintType)
struct FGameData
{
    GENERATED_USTRUCT_BODY()

    UPROPERTY(EditDefaultsOnly, BlueprintReadWrite, meta = (ClampMin = "1", ClampMax = "100"))
    int32 PlayersNum = 2;    
};
```

本章会逐步补充游戏规则 <br/>


## 学习GameModeBase {#学习gamemodebase}

<img src="/pic/游戏规则/动态创建NPC/game-mode.png" width="800" /> <br/> <br/>


### StartPlay {#startplay}

先于GameMode::BeginPlay和所有Actor::BeginPlay之前调用 <br/>

在这里动态创建NPC <br/>

```cpp
// Transitions to calls BeginPlay on actors
UFUNCTION(BlueprintCallable, Category=Game)
virtual void StartPlay();
```


### RestartPlayer {#restartplayer}

通过控制器创建游戏角色, 游戏角色类型由游戏模式的默认Pawn类型决定, 游戏角色初始变换信息由场景中的PlayerStart决定 <br/>

```cpp
// Tries to spawn the player's pawn, at the location returned by FindPlayerStart
UFUNCTION(BlueprintCallable, Category=Game)
virtual void RestartPlayer(AController* NewPlayer);
```

```cpp
void AGameModeBase::RestartPlayer(AController* NewPlayer)
{
    if (NewPlayer == nullptr || NewPlayer->IsPendingKillPending())
    {
        return;
    }

    AActor* StartSpot = FindPlayerStart(NewPlayer);

    // If a start spot wasn't found,
    if (StartSpot == nullptr)
    {
        // Check for a previously assigned spot
        if (NewPlayer->StartSpot != nullptr)
        {
            StartSpot = NewPlayer->StartSpot.Get();
            UE_LOG(LogGameMode, Warning, TEXT("RestartPlayer: Player start not found, using last start spot"));
        }	
    }

    RestartPlayerAtPlayerStart(NewPlayer, StartSpot);
}
```

| -               |                              |
|-----------------|------------------------------|
| FindPlayerStart | 寻找场景中的PlayerStart, 即在何处创建NPC |

RestartPlayer保障StartSpot存在, 其决定待创建游戏角色变换信息. 具体在RestartPlayerAtPlayerStart中实现 <br/>


### RestartPlayerAtPlayerStart {#restartplayeratplayerstart}

```cpp
// Tries to spawn the player's pawn at the specified actor's location
UFUNCTION(BlueprintCallable, Category=Game)
virtual void RestartPlayerAtPlayerStart(AController* NewPlayer, AActor* StartSpot);
```

检查控制器是否拥有Pawn, 没有的话: <br/>

1.  通过GetDefaultPawnClassForController获取控制器默认的Pawn类型 <br/>
2.  调用SpawnDefaultPawnFor创建Pawn, 通过SetPawn挂载到控制器 <br/>

<!--listend-->

```cpp
if (NewPlayer->GetPawn() != nullptr)
{
    // If we have an existing pawn, just use it's rotation
    SpawnRotation = NewPlayer->GetPawn()->GetActorRotation();
}
else if (GetDefaultPawnClassForController(NewPlayer) != nullptr)
{
    // Try to create a pawn to use of the default class for this player
    APawn* NewPawn = SpawnDefaultPawnFor(NewPlayer, StartSpot);
    if (IsValid(NewPawn))
    {
        NewPlayer->SetPawn(NewPawn);
    }
}
```

最终通过NewPlayer-&gt;GetPawn()能获得Pawn, 并通过InitStartSpot设置Pawn变换 <br/>

```cpp
if (!IsValid(NewPlayer->GetPawn()))
{
    FailedToRestartPlayer(NewPlayer);
}
else
{
    // Tell the start spot it was used
    InitStartSpot(StartSpot, NewPlayer);

    FinishRestartPlayer(NewPlayer, SpawnRotation);
}
```


### BlueprintNativeEvent声明符 {#blueprintnativeevent声明符}

[UFunctions](https://docs.unrealengine.com/5.1/en-US/ufunctions-in-unreal-engine/) <br/>

<img src="pic/游戏规则/动态创建NPC/BlueprintNativeEvent.png" alt="BlueprintNativeEvent.png" width="1000" /> <br/>
BlueprintNativeEvent: 这标记函数通常在蓝图中被覆写 <br/>

也可以在C++中覆写, 在加上后缀_Implementation的同名函数中给出实现 <br/>

如果没有在蓝图中覆写, 而在C++中覆写, 加上_Implementation后缀的同名函数会被自动生成代码调用 <br/>


### InitStartSpot {#initstartspot}

使用了BlueprintNativeEvent声明符, 在蓝图中定义 <br/>

设置PlayerStart被占用 <br/>

```cpp
// Called from RestartPlayerAtPlayerStart, can be used to initialize the start spawn actor
UFUNCTION(BlueprintNativeEvent, Category=Game)
void InitStartSpot(AActor* StartSpot, AController* NewPlayer);
```


### SpawnDefaultPawnFor {#spawndefaultpawnfor}

使用了BlueprintNativeEvent声明符 <br/>

```cpp
// **
// * Called during RestartPlayer to actually spawn the player's pawn, when using a start spot
// * @param	NewPlayer - Controller for whom this pawn is spawned
// * @param	StartSpot - Actor at which to spawn pawn
// * @return	a pawn of the default pawn class
// *
UFUNCTION(BlueprintNativeEvent, Category=Game)
APawn* SpawnDefaultPawnFor(AController* NewPlayer, AActor* StartSpot);
```

调用SpawnDefaultPawnAtTransform设置Pawn变换 <br/>

```cpp
APawn* AGameModeBase::SpawnDefaultPawnFor_Implementation(AController* NewPlayer, AActor* StartSpot)
{
    // Don't allow pawn to be spawned with any pitch or roll
    FRotator StartRotation(ForceInit);
    StartRotation.Yaw = StartSpot->GetActorRotation().Yaw;
    FVector StartLocation = StartSpot->GetActorLocation();

    FTransform Transform = FTransform(StartRotation, StartLocation);
    return SpawnDefaultPawnAtTransform(NewPlayer, Transform);
}
```


### SpawnDefaultPawnAtTransform {#spawndefaultpawnattransform}

使用了BlueprintNativeEvent声明符 <br/>

```cpp
// **
// * Called during RestartPlayer to actually spawn the player's pawn, when using a transform
// * @param	NewPlayer - Controller for whom this pawn is spawned
// * @param	SpawnTransform - Transform at which to spawn pawn
// * @return	a pawn of the default pawn class
// *
UFUNCTION(BlueprintNativeEvent, Category=Game)
APawn* SpawnDefaultPawnAtTransform(AController* NewPlayer, const FTransform& SpawnTransform);
```

调用SpawnActor动态创建Pawn, 注意到: <br/>

1.  这里的Pawn类型来自GetDefaultPawnClassForController, 前面也出现过 <br/>
2.  变换信息来自传参, 即来自PlayerStart <br/>
3.  使用了FActorSpawnParameters配置生成时参数 <br/>

<!--listend-->

```cpp
APawn* AGameModeBase::SpawnDefaultPawnAtTransform_Implementation(AController* NewPlayer, const FTransform& SpawnTransform)
{
    FActorSpawnParameters SpawnInfo;
    SpawnInfo.Instigator = GetInstigator();
    SpawnInfo.ObjectFlags |= RF_Transient;	// We never want to save default player pawns into a map
    UClass* PawnClass = GetDefaultPawnClassForController(NewPlayer);
    APawn* ResultPawn = GetWorld()->SpawnActor<APawn>(PawnClass, SpawnTransform, SpawnInfo);
    if (!ResultPawn)
    {
        UE_LOG(LogGameMode, Warning, TEXT("SpawnDefaultPawnAtTransform: Couldn't spawn Pawn of type %s at %s"), *GetNameSafe(PawnClass), *SpawnTransform.ToHumanReadableString());
    }
    return ResultPawn;
}
```


#### GetDefaultPawnClassForController {#getdefaultpawnclassforcontroller}

使用了BlueprintNativeEvent声明符 <br/>

```cpp
// Returns default pawn class for given controller
UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category=Classes)
UClass* GetDefaultPawnClassForController(AController* InController);
```

DefaultPawnClass即我们在世界设置中给出的默认Pawn类型, STUGameModeBase的DefaultPawnClass为ASTUBaseCharacter::StaticClass() <br/>

```cpp
UClass* AGameModeBase::GetDefaultPawnClassForController_Implementation(AController* InController)
{
#if WITH_EDITOR && DO_CHECK
    UClass* DefaultClass = DefaultPawnClass.DebugAccessRawClassPtr();
    if (DefaultClass)
    {
        if (FBlueprintSupport::IsClassPlaceholder(DefaultClass))
        {
            ensureMsgf(false, TEXT("Trying to spawn class that is, directly or indirectly, a placeholder"));
            return ADefaultPawn::StaticClass();
        }
    }
#endif
    return DefaultPawnClass;
}
```


## FActorSpawnParameters {#factorspawnparameters}

-   定义生成NPC时处理碰撞的方式 <br/>
-   使用枚举类型ESpawnActorCollisionHandlingMethod赋值 <br/>
    
    | -           |             |
    |-------------|-------------|
    | AlwaysSpawn | 在何种条件下都动态创建 |


## 通过控制器创建NPC {#通过控制器创建npc}

1.  游戏角色销毁时, 会调用其成员函数Destroy, 而控制器不会从场景中移除 <br/>
2.  控制器会负责游戏角色的再次动态创建 <br/>


### 添加属性: 保存NPC类型 {#添加属性-保存npc类型}

`protected` <br/>
`ShootThemUp: STUGameModeBase.h` <br/>

```cpp
#include "STUCoreTypes.h"

class AAIController;

UPROPERTY(EditDefaultsOnly)
TSubclassOf<APawn> AIPawnClass;
```


### 覆写GetDefaultPawnClassForController, 使用设置的NPC类型 {#覆写getdefaultpawnclassforcontroller-使用设置的npc类型}

`public` <br/>
`ShootThemUp: STUGameModeBase.h` <br/>

```cpp
virtual UClass* GetDefaultPawnClassForController_Implementation(AController* InController) override;
```

可以返回DefaultPawnClass, 或者调用基类函数 <br/>
`ShootThemUp: STUGameModeBase.cpp`       <br/>

```cpp
UClass* ASTUGameModeBase::GetDefaultPawnClassForController_Implementation(AController* InController)
{
    if (InController && InController->IsA<AAIController>())
    {
        return AIPawnClass;
    }
    return DefaultPawnClass;
    // return Super::GetDefaultPawnClassForController_Implementation(InController);
}
```


### 添加属性: 存放游戏规则 {#添加属性-存放游戏规则}

`protected` <br/>
`ShootThemUp: STUGameModeBase.h` <br/>

```cpp
#include "STUCoreTypes.h"

UPROPERTY(EditDefaultsOnly)
FGameData GameData;
```


### 添加属性: 保存控制器类型 {#添加属性-保存控制器类型}

`protected` <br/>
`ShootThemUp: STUGameModeBase.h` <br/>

```cpp
class AAIController;

UPROPERTY(EditDefaultsOnly)
TSubclassOf<AAIController> AIControllerClass;
```


### 添加接口: 动态创建控制器和NPC {#添加接口-动态创建控制器和npc}

`private` <br/>
`ShootThemUp: STUGameModeBase.h`       <br/>

```cpp
void SpawnBots();
```

`ShootThemUp: STUGameModeBase.cpp` <br/>

```cpp
#include "AIController.h"

void ASTUGameModeBase::SpawnBots()
{
    if (!GetWorld()) return;

    FActorSpawnParameters SpawnInfo;
    SpawnInfo.SpawnCollisionHandlingOverride = ESpawnActorCollisionHandlingMethod::AlwaysSpawn;
    for (int32 i = 0; i < GameData.PlayersNum - 1; ++i)
    {
        const auto STUAIController = GetWorld()->SpawnActor<AAIController>(AIControllerClass, SpawnInfo);
        RestartPlayer(STUAIController);
    }
}
```


### 调用SpawnBots {#调用spawnbots}

`public` <br/>
`ShootThemUp: STUGameModeBase.h` <br/>

```cpp
virtual void StartPlay() override;
```

`ShootThemUp: STUGameModeBase.cpp` <br/>

```cpp
void ASTUGameModeBase::StartPlay()
{
    Super::StartPlay();

    SpawnBots();
}
```


## 查看 {#查看}

1.  设置BP_STUGameModeBase <br/>
    
    | -                          |                    |
    |----------------------------|--------------------|
    | AIPawn Class               | BP_STUAICharacter  |
    | AIController Class         | BP_STUAIController |
    | Game Data &gt; Players Num | 4                  |
    
    <img src="/pic/游戏规则/动态创建NPC/bp.png" width="600" /> <br/> <br/>
2.  删除场景中的AICharacter <br/>

3.  在场景中添加Player Start, 一共4个, 供生成NPC和玩家控制的游戏角色使用 <br/>

4.  运行游戏, 生成3个AICharacter, 6个AIController <br/>
    
    <img src="/pic/游戏规则/动态创建NPC/count.png" width="500" /> <br/> <br/>

