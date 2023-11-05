---
title: "Object类"
date: 2023-11-05T20:50:43
lastmod: 2023-11-05T20:50:46+08:00
draft: false
weight: 2001
---

虚幻引擎中最基础的类型，AActor类型的父类 <br/>

不能在场景中添加UObject对象，可以在代码中创建UObject对象并对逻辑进行封装 <br/>


## UObject {#uobject}


## UObject::CreateDefaultSubobject&lt;T&gt; {#uobject-createdefaultsubobject-t}

创建组件 <br/>
返回指向组件的指针 <br/>

**将this设置为组件的上级** <br/>

<img src="/pic/游戏角色/UObject类型/UObject-CreateDefaultSubobject.png" width="1100" /> <br/> <br/>

| 参数          | 含义         | 说明    |
|-------------|------------|-------|
| SubobjectName | 虚幻编辑器中显示的组件名 | FName类型 |
| BTransient    |              | 使用默认值 |


### 使用 {#使用}

```cpp
StaticMesh = CreateDefaultSubobject<UStaticMeshComponent>("StaticMeshInEditor");
```

在C++中对变量StaticMesh做设置，在虚幻编辑器中对名为"StaticMeshInEditor"的组件做设置；二者相对应。 <br/>

可以在C++中修改变量名；如果修改组件名，虚幻编辑器中该组件的已有设置会因找不到目标载体而无法生效。 <br/>

