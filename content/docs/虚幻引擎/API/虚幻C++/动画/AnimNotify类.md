---
title: "AnimNotify类"
date: 2023-09-12T14:28:54
lastmod: 2023-09-12T16:12:19+08:00
draft: false
weight: 2003
---

## 便签 {#便签}

`UE_5.1/Engine/Source/Runtime/Engine/Classes/Animation/AnimNotifies/AnimNotify.h` <br/>

| -                                                                                                                   |
|---------------------------------------------------------------------------------------------------------------------|
| [API - UAnimNotify](https://docs.unrealengine.com/5.1/en-US/API/Runtime/Engine/Animation/AnimNotifies/UAnimNotify/) |


## 派生关系 {#派生关系}

> UObject <br/>
> ^ <br/>
> UAnimNotify <br/>


## AnimNotify::Notify {#animnotify-notify}

`public` <br/>

事件发生时, 调用Notify函数 <br/>

| 参数      |            |
|---------|------------|
| MeshComp  | 动画绑定的骨骼网格体 |
| Animation | 轨道信息   |

```cpp
virtual void Notify(USkeletalMeshComponent* MeshComp, UAnimSequenceBase* Animation, const FAnimNotifyEventReference& EventReference);
```

