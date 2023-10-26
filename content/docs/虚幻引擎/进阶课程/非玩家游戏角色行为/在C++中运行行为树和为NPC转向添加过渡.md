---
title: "在C++中运行行为树和为NPC转向添加过渡"
date: 2023-10-21T20:42:48
lastmod: 2023-10-26T20:16:11+08:00
draft: false
weight: 2005
---

## 说明 {#说明}

Smooth Character Rotation <br/>

在C++中运行行为树; NPC转向时有过渡 <br/>


## 补充遗漏 {#补充遗漏}

`让NPC移动到指定位置` 那一节: 提供了允许游戏角色同时在场景中添加和代码中生成的方法; 以及在代码中设置AI控制器类的方法 <br/>

添加构造函数 <br/>
`public` <br/>
`ShootThemUp: AI/STUAICharacter.h` <br/>

```cpp
ASTUAICharacter(const FObjectInitializer &ObjInit);
```

`ShootThemUp: AI/STUAICharacter.cpp` <br/>

```cpp
#include "AI/STUAIController.h"

ASTUAICharacter::ASTUAICharacter(const FObjectInitializer &ObjInit) : Super(ObjInit)
{
    AutoPossessAI = EAutoPossessAI::PlacedInWorldOrSpawned;
    AIControllerClass = ASTUAIController::StaticClass();
}
```


## 在C++中运行行为树 {#在c-plus-plus-中运行行为树}

-   添加属性: 保存行为树资产 <br/>
    可以作为控制器的逻辑, 也可以作为游戏角色的逻辑; 由于控制器控制多个游戏角色, 其有自己的行为树逻辑, 所以, 更适合放在游戏角色 <br/>
    `public` <br/>
    `ShootThemUp: AI/STUAICharacter.h` <br/>
    ```cpp
    class UBehaviorTree;
    
    UPROPERTY(EditDefaultsOnly, BlueprintReadWrite)
    UBehaviorTree *BehaviorTreeAsset;
    ```
-   运行行为树 <br/>
    在OnPossess函数中; 在游戏中会被多次调用; 控制器每次切换游戏角色时调用 <br/>
    `protected` <br/>
    `ShootThemUp: AI/STUAIController.h` <br/>
    ```cpp
    virtual void OnPossess(APawn *InPawn) override;
    ```
    `ShootThemUp: AI/STUAIController.cpp` <br/>
    ```cpp
    #include "AI/STUAICharacter.h"
    
    void ASTUAIController::OnPossess(APawn *InPawn)
    {
        Super::OnPossess(InPawn);
    
        const auto STUCharacter = Cast<ASTUAICharacter>(InPawn);
        if (STUCharacter)
        {
            RunBehaviorTree(STUCharacter->BehaviorTreeAsset);
        }
    }
    ```


## 查看 {#查看}

`BP_STUAIController` <br/>

-   移除行为树逻辑 <br/>
    
    <img src="/pic/非玩家游戏角色行为/在C++中运行行为树和为NPC转向添加过渡/remove-bt.png" width="600" /> <br/> <br/>

`BP_STUAICharacter`   <br/>

-   设置行为树资产 <br/>
    
    <img src="/pic/非玩家游戏角色行为/在C++中运行行为树和为NPC转向添加过渡/set-bt-asset.png" width="400" /> <br/> <br/>

`BT_STUCharacter` <br/>

-   移除Wait任务 <br/>
    
    <img src="/pic/非玩家游戏角色行为/在C++中运行行为树和为NPC转向添加过渡/remove-wait.png" width="500" /> <br/> <br/>

游戏角色转向突兀 <br/>


## 在蓝图中设置NPC转向时过渡 {#在蓝图中设置npc转向时过渡}

`BP_STUAICharacter` <br/>

-   `CharacterMovement > Details > Character Movement(Rotation Settings)` <br/>
    勾选Use Controller Desired Rotation: 旋转时在Tick函数中插入旋转过渡 <br/>
    
    设置旋转插入比例: Z = 200 <br/>
    
    <img src="/pic/非玩家游戏角色行为/在C++中运行行为树和为NPC转向添加过渡/rotate-set.png" width="500" /> <br/> <br/>

-   `BU_STUAICharacter > Details > Pawn` , 取消Use Controller Rotation Yaw的勾选 <br/>
    
    <img src="/pic/非玩家游戏角色行为/在C++中运行行为树和为NPC转向添加过渡/uncheck-rotate-yaw.png" width="500" /> <br/> <br/>


## 在C++中为NPC转向添加过渡的方法 {#在c-plus-plus-中为npc转向添加过渡的方法}

`ShootThemUp: AI/STUAICharacter.cpp` <br/>

```cpp
#include "GameFramework/CharacterMovementComponent.h"

// ASTUAICharacter

bUseControllerRotationYaw = false;
if (GetCharacterMovement())
{
    GetCharacterMovement()->bUseControllerDesiredRotation = true;
    GetCharacterMovement()->RotationRate = FRotator(0.0f, 200.0f, 0.0f);
}
```

