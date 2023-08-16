---
title: "Actor类"
date: 2023-08-17T02:32:13
lastmod: 2023-08-17T02:34:14+08:00
draft: false
weight: 1001
---

## AActor {#aactor}

`UE_5.1/Engine/Source/Runtime/Engine/Classes/GameFrameWork/Actor.h` <br/>


## AActor::AttachToComponent {#aactor-attachtocomponent}

将Actor附加到可变换组件的挂载点 <br/>


### 声明 {#声明}

```cpp
/**
 * Attaches the RootComponent of this Actor to the supplied component, optionally at a named socket. It is not valid to call this on components that are not Registered.
 * @param  Parent					Parent to attach to.
 * @param  AttachmentRules			How to handle transforms and welding when attaching.
 * @param  SocketName				Optional socket to attach to on the parent.
 */
void AttachToComponent(USceneComponent* Parent, const FAttachmentTransformRules& AttachmentRules, FName SocketName = NAME_None);
```


### 参数 {#参数}

| -               |           |
|-----------------|-----------|
| Parent          | 目标: 可变换组件 |
| AttachmentRules | 挂载规则  |
| SocketName      | 挂载点名字 |

