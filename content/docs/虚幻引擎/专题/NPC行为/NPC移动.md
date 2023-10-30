---
title: "NPC移动"
date: 2023-10-29T12:08:54
lastmod: 2023-10-30T16:29:13+08:00
draft: false
weight: 2002
---

## 设置NPC {#设置npc}


### 蓝图 {#蓝图}

`BP_STUAICharacter` <br/>

`Details > Pawn` <br/>

-   勾选 `Auto Possess AI` <br/>
-   设置 `AI Controller Class` <br/>

<img src="/pic/专题/NPC行为/NPC移动/ai-character.png" width="400" /> <br/> <br/>


### C++ {#c-plus-plus}

`STUAICharacter` <br/>

```cpp
#include "AI/STUAIController.h"

ASTUAICharacter::ASTUAICharacter(const FObjectInitializer &ObjInit) : Super(ObjInit)
{
    AutoPossessAI = EAutoPossessAI::PlacedInWorldOrSpawned;
    AIControllerClass = ASTUAIController::StaticClass();
}
```


## 囊括NPC移动范围 {#囊括npc移动范围}

-   使用NavMeshBoundsVolume标识NPC可移动区域 <br/>
    `Place Actors > Volumes > NavMeshBoundsVolume` <br/>
    
    <img src="/pic/专题/NPC行为/NPC移动/add-nav.png" width="400" /> <br/> <br/>
-   设置NavMeshBoundsVolume体积: 长宽高均要考虑设置 <br/>
    `Details > Brush Settings` <br/>
    
    <img src="/pic/专题/NPC行为/NPC移动/set-nav-volume.png" width="400" /> <br/> <br/>
-   查看 <br/>
    按下 `P` 显示 / 隐藏 <br/>
    
    <img src="/pic/专题/NPC行为/NPC移动/show-nav.png" width="1000" /> <br/> <br/>
    
    在 `Unreal Editor > Preference > General > Keyboard Shortcuts > Show Flags Menu > Show Navigation` 修改快捷键 <br/>
    
    <img src="/pic/专题/NPC行为/NPC移动/show-nav-hotkey.png" width="800" /> <br/> <br/>


## 方法一: 在AIController中使NPC移动 {#方法一-在aicontroller中使npc移动}

添加节点 `AIMoveTo` , 在 `BeginPlay` 后执行 <br/>

<img src="/pic/专题/NPC行为/NPC移动/ai-move-to.png" width="500" /> <br/> <br/>


## 方法二: 使用行为树和黑板资产 {#方法二-使用行为树和黑板资产}


### 添加黑板变量 {#添加黑板变量}

`BB_STUCharacter` <br/>
添加Vector变量Location1和Location2 <br/>

<img src="/pic/专题/NPC行为/NPC移动/bb-key.png" width="400" /> <br/> <br/>


### 设置行为树 {#设置行为树}

`BT_STUCharacter` <br/>


#### 设置匹配的黑板资产 {#设置匹配的黑板资产}

`Details > BehaviorTree > Blackboard Asset` <br/>

<img src="/pic/专题/NPC行为/NPC移动/set-bb.png" width="600" /> <br/> <br/>


#### 添加Sequence节点 {#添加sequence节点}

-   为Sequence添加任务MoveTo <br/>
    设置 `Details > Blackboard > Blackboard Key` 为 `Location1` <br/>
-   为Sequence添加任务Wait <br/>
    设置 `Details > Wait > Wait Time` 为2 <br/>
-   为Sequence添加任务MoveTo <br/>
    设置 `Details > Blackboard > Blackboard Key` 为 `Location2` <br/>
-   为Sequence添加任务Wait <br/>
    设置 `Details > Wait > Wait Time` 为2 <br/>

<img src="/pic/专题/NPC行为/NPC移动/bt.png" width="800" /> <br/>   <br/>


### 设置黑板变量 {#设置黑板变量}

`BP_STUAIController` <br/>
添加节点: SetValueAsVector <br/>

-   添加节点: GetBlackboard; 获取黑板资产, 连到 `SetValueAsVector > Target` <br/>
-   添加节点: MakeLiteralName; 传入黑板变量名, 连到 `SetValueAsVector > Key Name` <br/>
-   设置Vector值 <br/>

<img src="/pic/专题/NPC行为/NPC移动/set-bb-key.png" width="800" /> <br/>   <br/>


### 运行行为树 {#运行行为树}


#### 蓝图 {#蓝图}

`BP_STUAIController` <br/>
添加节点: RunBehaviorTree; 在BeginPlay之后执行; 需设置BTAsset <br/>

<img src="/pic/专题/NPC行为/NPC移动/run-bt.png" width="500" /> <br/> <br/>


#### C++ {#c-plus-plus}

-   添加属性: 保存行为树信息 <br/>
    `STUAICharacter`         <br/>
    ```cpp
    class UBehaviorTree;
    
    UPROPERTY(EditDefaultsOnly, BlueprintReadWrite)
    UBehaviorTree *BehaviorTreeAsset;
    ```
-   运行行为树 <br/>
    控制器每次切换控制Pawn, 执行对应的行为树 <br/>
    `STUAIController` <br/>
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


## 查看AI调试信息 {#查看ai调试信息}

-   按下 `'` 显示 / 隐藏 界面 <br/>
    
    <img src="/pic/专题/NPC行为/NPC移动/apostrophe.png" width="1000" /> <br/> <br/>
-   按下小写键盘数字 关闭 / 打开 指定类别调试信息 <br/>
-   建议在新窗口运行游戏, Character Preview无阻挡 <br/>
    `Modes > New Editor Window(PIE)` <br/>
    
    <img src="/pic/专题/NPC行为/NPC移动/pie.png" width="400" /> <br/> <br/>

