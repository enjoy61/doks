---
title: "Actor类"
date: 2023-11-05T20:50:41
lastmod: 2023-11-09T20:57:26+08:00
draft: false
weight: 2002
---

虚幻C++基础类型，能放置到世界场景中的物体，具有相同的基类AActor。 <br/>

所有能添加到世界场景中的物体都可称作Actor，如几何体，特效，声音。Actor对象有无实体均可。 <br/>

可视化需要USceneComponent组件，模型需要UStaticMeshComponent组件。 <br/>

可以在虚幻编辑器中往关卡添加Actor对象，也可以在代码中动态生成Actor对象。 <br/>

Actor对象由各种Component组成，所有组件可以根据需求进行组装，方便重用。 <br/>


## AActor {#aactor}


## 头文件 {#头文件}

`UE_5.1/Engine/Source/Runtime/Engine/Classes/GameFrameWork/Actor.h` <br/>


## 派生关系 {#派生关系}

> AActor <br/>
> ^ <br/>
> UObject <br/>
> ^ <br/>
> UObjectBaseUtility <br/>


## 构成 {#构成}

| -         |        |
|-----------|--------|
|           | 构造函数 |
| BeginPlay | 出现在场景中 |
| Tick      | 每秒更新 |


## AActor::AttachToComponent {#aactor-attachtocomponent}

将Actor附加到可变换组件的挂载点 <br/>


### 声明 {#声明}

```cpp
// **
// * Attaches the RootComponent of this Actor to the supplied component, optionally at a named socket. It is not valid to call this on components that are not Registered.
// * @param  Parent					Parent to attach to.
// * @param  AttachmentRules			How to handle transforms and welding when attaching.
// * @param  SocketName				Optional socket to attach to on the parent.
// *
void AttachToComponent(USceneComponent* Parent, const FAttachmentTransformRules& AttachmentRules, FName SocketName = NAME_None);
```


### 参数 {#参数}

| -               |           |
|-----------------|-----------|
| Parent          | 目标, 可变换组件 |
| AttachmentRules | 挂载规则  |
| SocketName      | 挂载点名字 |


### 从属关系 {#从属关系}


#### AActor::SetOwner {#aactor-setowner}

`public` <br/>
设置上级 <br/>

```cpp
// *
// * Set the owner of this Actor, used primarily for network replication.
// * @param NewOwner	The Actor who takes over ownership of this Actor
// *
UFUNCTION(BlueprintCallable, Category=Actor)
virtual void SetOwner( AActor* NewOwner );
```


#### AActor::GetOwner {#aactor-getowner}

`public` <br/>
访问上级 <br/>

```cpp
// Get the owner of this Actor, used primarily for network replication
UFUNCTION(BlueprintCallable, Category=Actor)
AActor* GetOwner() const;
```


#### AActor::GetOwner&lt;T&gt; {#aactor-getowner-t}

`public` <br/>
访问上级 <br/>

```cpp
// Templated version of GetOwner(), will return nullptr if cast fails
template< class T >
T* GetOwner() const
{
    return Cast<T>(GetOwner());
}
```

