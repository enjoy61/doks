---
title: "Controller类"
date: 2023-11-05T20:56:22
lastmod: 2023-11-05T20:56:23+08:00
draft: false
weight: 2001
---

## AController {#acontroller}


## 切换Pawn {#切换pawn}


### AController::Possess {#acontroller-possess}

切换到指定Pawn <br/>

<img src="/pic/控制器/AController类型/AController-Possess1.png" width="800" /> <br/> <br/>

<img src="/pic/控制器/AController类型/AController-Possess2.png" width="800" /> <br/> <br/>


### AController::OnPossess {#acontroller-onpossess}

`protected` <br/>
切换Pawn时被调用 <br/>

```cpp
// *
// * Overridable native function for when this controller is asked to possess a pawn.
// * @param InPawn The Pawn to be possessed
// *
virtual void OnPossess(APawn* InPawn);
```


## AController::GetPawn {#acontroller-getpawn}

访问当前Pawn <br/>

```cpp
/** Getter for Pawn */
FORCEINLINE APawn* GetPawn() const { return Pawn; }
```


## AController::GetPawn&lt;T&gt; {#acontroller-getpawn-t}

访问当前Pawn <br/>

```cpp
/** Templated version of GetPawn, will return nullptr if cast fails */
template<class T>
T* GetPawn() const
{
    return Cast<T>(Pawn);
}
```


## AController::GetPlayerViewPoint {#acontroller-getplayerviewpoint}

```cpp
// *
// * Returns Player's Point of View
// * For the AI this means the Pawn's 'Eyes' ViewPoint
// * For a Human player, this means the Camera's ViewPoint
// *
// * @output	out_Location, view location of player
// * @output	out_rotation, view rotation of player
// *
UFUNCTION(BlueprintCallable, Category = Pawn)
virtual void GetPlayerViewPoint( FVector& Location, FRotator& Rotation ) const;      
```

