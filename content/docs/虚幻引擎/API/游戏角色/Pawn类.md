---
title: "Pawn类"
date: 2023-11-05T20:50:38
lastmod: 2023-11-05T20:50:56+08:00
draft: false
weight: 2003
---

玩家所操作的角色，提供键位绑定 <br/>

由PlayerController控制，可在多个Pawn之间进行切换 <br/>


## APawn {#apawn}


## 构成 {#构成}


### APawn::SetupPlayerInputComponent {#apawn-setupplayerinputcomponent}

配置用户输入: 在该函数内绑定键位 <br/>

<img src="/pic/游戏角色/APawn类型/APawn-SetupPlayerInputComponent.png" width="900" /> <br/>     <br/>


## APawn::StaticClass {#apawn-staticclass}

`静态成员` `返回指向UClass的指针` `在GENERATED_BODY宏中定义` <br/>

<img src="/pic/游戏角色/APawn类型/APawn-StaticClass-GENERATED_BODY.png" width="900" /> <br/> <br/>

_UObject也有StaticClass，UObjectBaseUtility没有_ <br/>


## 控制器 {#控制器}


### 访问Controller对象 {#访问controller对象}


#### APawn::GetController {#apawn-getcontroller}

获取指向AController的指针 <br/>
可以是PlayerController，也可以是AIController, 自行转换 <br/>

<img src="/pic/游戏角色/APawn类型/APawn-GetController.png" width="400" /> <br/> <br/>


#### APawn::Controller {#apawn-controller}

`public` <br/>
使用指向AController的指针 <br/>

<img src="/pic/游戏角色/APawn类型/APawn-Controller.png" width="350" /> <br/> <br/>


#### APawn::GetController&lt;T&gt; {#apawn-getcontroller-t}

获取指定类型控制器 <br/>

```cpp
/** Returns controller for this actor cast to the template type. May return NULL is the cast fails. */
template < class T >
T* GetController() const
{
    return Cast<T>(GetController());
}
```


### 控制状态 {#控制状态}


#### APawn::IsControlled {#apawn-iscontrolled}

是否被PlayerController接管 <br/>

<img src="/pic/游戏角色/APawn类型/APawn-IsControlled.png" width="1400" /> <br/> <br/>

<img src="/pic/游戏角色/APawn类型/APawn-IsControlled-Definition.png" width="500" /> <br/> <br/>


#### APawn::IsPawnControlled {#apawn-ispawncontrolled}

是否被Controller接管: AIController或PlayerController <br/>

<img src="/pic/游戏角色/APawn类型/APawn-IsPawnControlled.png" width="1000" /> <br/> <br/>

<img src="/pic/游戏角色/APawn类型/APawn-IsPawnControlled-Definition.png" width="300" /> <br/> <br/>


### 受控于AI控制器 {#受控于ai控制器}


#### APawn::AIControllerClass {#apawn-aicontrollerclass}

设置AIController类型 <br/>

```cpp
/** Default class to use when pawn is controlled by AI. */
UPROPERTY(EditAnywhere, BlueprintReadWrite, meta=(DisplayName="AI Controller Class"), Category=Pawn)
TSubclassOf<AController> AIControllerClass;       
```


#### APawn::AutoPossessAI {#apawn-autopossessai}

设置Pawn被创建和被AI控制器接管的条件 <br/>

```cpp
// *
// * Determines when the Pawn creates and is possessed by an AI Controller (on level start, when spawned, etc).
// * Only possible if AIControllerClassRef is set, and ignored if AutoPossessPlayer is enabled.
// * @see AutoPossessPlayer
// *
UPROPERTY(EditAnywhere, Category=Pawn)
EAutoPossessAI AutoPossessAI;
```

