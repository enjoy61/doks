---
title: "AIController类"
date: 2023-11-05T20:56:44
lastmod: 2023-11-05T20:56:45+08:00
draft: false
weight: 2003
---

NPC的控制器 <br/>


## AAIController {#aaicontroller}


## AAIController::SetPerceptionComponent {#aaicontroller-setperceptioncomponent}

设置感知组件, 传参 **引用** <br/>

```cpp
void SetPerceptionComponent(UAIPerceptionComponent& InPerceptionComponent);
```


## AAIController::RunBehaviorTree {#aaicontroller-runbehaviortree}

运行行为树 <br/>

```cpp
/** Starts executing behavior tree. */
UFUNCTION(BlueprintCallable, Category = "AI")
virtual bool RunBehaviorTree(UBehaviorTree* BTAsset);
```


## 访问当前Pawn {#访问当前pawn}

[AController::GetPawn](/docs/虚幻引擎/api/控制器/controller类/#acontroller-getpawn) <br/>


## 运行行为树 {#运行行为树}

在下列函数中实现 <br/>
[AController::OnPossess](/docs/虚幻引擎/api/控制器/controller类/#acontroller-onpossess) <br/>

