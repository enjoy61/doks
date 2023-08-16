---
title: "SkeletalMesh组件"
date: 2023-06-21T21:51:03
lastmod: 2023-08-17T03:00:05+08:00
draft: false
weight: 1001
---

## USkeletalMeshComponent {#uskeletalmeshcomponent}

`UE_5.1/Engine/Source/Runtime/Engine/Classes/Components/SkeletalMeshComponent.h` <br/>

-   骨骼网格体外形是多边形，内里由具有层级结构的骨骼组成，因此，可以为骨骼网格体编排动画 <br/>
-   可以是人，可以是物 <br/>
-   可以为骨骼网格体绑定模型 <br/>
-   USkeletalMeshComponent和UStaticMeshComponent拥有共同基类UMeshComponent <br/>
-   UMeshComponent派生自UPrimitiveComponent, UPrimitiveComponent派生自USceneComponent, 而USceneComponent具有变换属性 <br/>
-   ACharacter自带Skeletal组件 <br/>


## 头文件 {#头文件}

```cpp
#include "Components/SkeletalMeshComponent.h"
```


## 相关函数 {#相关函数}

| -                                                                               |                            |
|---------------------------------------------------------------------------------|----------------------------|
| [ACharacter::GetMesh](/docs/虚幻引擎/api/虚幻c++/游戏角色/character类/#acharacter-getmesh) | 获取Character的SkeletalMesh组件 |

