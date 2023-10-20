---
title: "在C++中创建任务类型"
date: 2023-10-20T20:45:42
lastmod: 2023-10-20T20:48:14+08:00
draft: false
weight: 2004
---

## 说明 {#说明}

AI Task <br/>
在C++中生成随机点, 让NPC移动到随机生成位置 <br/>


## 创建任务类型 {#创建任务类型}

-   创建蓝图任务类型的方法 <br/>
    `BT_STUCharacter` <br/>
    
    点击 `New Task` <br/>
    
    <img src="/pic/非玩家游戏角色行为/在C++中创建任务类型/bp-new-task.png" width="500" /> <br/> <br/>
-   C++ <br/>
    
    | -  |                     |
    |----|---------------------|
    | 基类 | BTTaskNode          |
    | 路径 | AI/Tasks/           |
    |    | Public              |
    |    | STUNextLocationTask |
    
    `ShootThemUp: ShootThemUp.Build.cs` <br/>
    
    修改头文件搜索路径 <br/>
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
        "ShootThemUp/Public/AI/Tasks"             
    });
    ```
    添加依赖模块GameplayTasks和NavigationSystem <br/>
    ```cpp
    PublicDependencyModuleNames.AddRange(new string[]
    {
        "Core",
        "CoreUObject",
        "Engine",
        "InputCore",
        "Niagara",
        "PhysicsCore",
        "GameplayCameras",
        "GameplayTasks",
        "NavigationSystem"
    });
    ```


## 实现任务: 在给定半径圆形范围内生成随机点并设置变量 {#实现任务-在给定半径圆形范围内生成随机点并设置变量}

-   添加构造函数 <br/>
    `ShootThemUp: AI/Tasks/STUNextLocationTask.h` <br/>
    `public` <br/>
    ```cpp
    USTUNextLocationTask();
    ```
-   执行任务时调用ExecuteTask <br/>
    覆写 <br/>
    `ShootThemUp: AI/Tasks/STUNextLocationTask.h` <br/>
    `public` <br/>
    ```cpp
    virtual EBTNodeResult::Type ExecuteTask(UBehaviorTreeComponent &OwnerComp, uint8 *NodeMemory) override;
    ```
-   添加属性 <br/>
    半径和黑板变量 <br/>
    `ShootThemUp: AI/Tasks/STUNextLocationTask.h` <br/>
    `protected` <br/>
    ```cpp
    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    float Radius = 1000.0f;
    
    UPROPERTY(EditAnywhere, BlueprintReadWrite)
    FBlackboardKeySelector AimLocationKey;
    ```
-   在构造函数中设置任务节点名 <br/>
    `ShootThemUp: AI/Tasks/STUNextLocationTask.cpp` <br/>
    ```cpp
    USTUNextLocationTask::USTUNextLocationTask()
    {
        NodeName = "Next Location";
    }
    ```
-   生成随机点并写入黑板变量 <br/>
    GetRandomReachablePointInRadius在游戏角色可以去到的nav mesh范围内计算随机点, 该函数在覆盖范围实现路径搜索算法 <br/>
    
    如果找到该点, 游戏角色一定能从所处位置去到该点 <br/>
    
    给出搜索中心点, 搜索半径, 存放点的变量 <br/>
    
    `ShootThemUp: AI/Tasks/STUNextLocationTask.cpp` <br/>
    ```cpp
    #include "BehaviorTree/BlackboardComponent.h"
    #include "AIController.h"
    #include "NavigationSystem.h"
    
    EBTNodeResult::Type USTUNextLocationTask::ExecuteTask(UBehaviorTreeComponent &OwnerComp, uint8 *NodeMemory)
    {
        const auto Controller = OwnerComp.GetAIOwner();
        const auto Blackboard = OwnerComp.GetBlackboardComponent();
        if (!Controller || !Blackboard) return EBTNodeResult::Failed;
    
        const auto Pawn = Controller->GetPawn();
        if (!Pawn) return EBTNodeResult::Failed;
    
        const auto NavSys = UNavigationSystemV1::GetCurrent(Pawn);
        if (!NavSys) return EBTNodeResult::Failed;
    
        FNavLocation NavLocation;
        const auto Found = NavSys->GetRandomReachablePointInRadius(Pawn->GetActorLocation(), Radius, NavLocation);
        if (!Found) return EBTNodeResult::Failed;
    
        Blackboard->SetValueAsVector(AimLocationKey.SelectedKeyName, NavLocation.Location);
        return EBTNodeResult::Succeeded;
    }
    ```


## 查看 {#查看}

-   添加变量AimLocation <br/>
    `BB_STUCharacter` <br/>
-   更新行为树 <br/>
    `BT_STUCharacter` <br/>
    &gt; 生成随机点 &gt; 等待两秒 &gt; 去到随机点; 循环 <br/>
    
    黑板变量绑定 <br/>
    
    <img src="/pic/非玩家游戏角色行为/在C++中创建任务类型/bind-aim-location.png" width="1000" /> <br/> <br/>
    
    移动到随机点 <br/>
    
    <img src="/pic/非玩家游戏角色行为/在C++中创建任务类型/move-to-aim-location.png" width="1000" /> <br/> <br/>

-   移除上节在指定点往返逻辑 <br/>
    `BP_STUAIController` <br/>
    
    <img src="/pic/非玩家游戏角色行为/在C++中创建任务类型/break-link.png" width="600" /> <br/> <br/>


## 人为干预: 设置ExecuteTask返回Failed {#人为干预-设置executetask返回failed}

`BT_STUCharacter` <br/>

-   添加任务: FinishedWithResult, 设置结果为Failed; 游戏角色停留在Wait节点 <br/>
    
    <img src="/pic/非玩家游戏角色行为/在C++中创建任务类型/interfere-failed.png" width="1000" /> <br/> <br/>
-   移除FinishedWithResult节点 <br/>

