---
title: "NPC前进向量变化时自动插入旋转过渡"
date: 2023-10-29T22:00:25
lastmod: 2023-10-30T18:46:46+08:00
draft: false
weight: 2004
---

## 蓝图 {#蓝图}

`BP_STUAICharacter` <br/>

-   游戏角色在水平方向旋转不再通过控制器控制 <br/>
    
    <img src="/pic/专题/NPC行为/旋转过渡/controller-yaw.png" width="900" /> <br/> <br/>
-   游戏角色旋转由控制器根据预期自行实现; 设置旋转插入比例 <br/>
    
    <img src="/pic/专题/NPC行为/旋转过渡/desired.png" width="800" /> <br/> <br/>


## C++ {#c-plus-plus}

`STUAICharacter` <br/>
FRotator中分量的顺序依次为: Pitch `Y` , Yaw `Z` , Roll `X`     <br/>

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

