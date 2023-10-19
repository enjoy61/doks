---
title: "让NPC移动到指定位置"
date: 2023-10-19T19:05:23
lastmod: 2023-10-19T22:16:15+08:00
draft: false
weight: 2002
---

## 说明 {#说明}

AI Character / Controller / Navmesh <br/>


## 创建类 {#创建类}

-   NPC游戏角色 <br/>
    
    | -  |                  |
    |----|------------------|
    | 基类 | STUBaseCharacter |
    |    | Public           |
    | 路径 | AI/              |
    |    | STUAICharacter   |
-   相应控制器 <br/>
    
    | -  |                 |
    |----|-----------------|
    | 基类 | AIController    |
    |    | Public          |
    | 路径 | AI/             |
    |    | STUAIController |
-   添加到头文件搜索路径 <br/>
    `ShootThemUp: ShootThemUp.Build.cs` <br/>
    ```cpp
    PublicIncludePaths.AddRange(new string[]
    {
        "ShootThemUp/Public/Player",
        "ShootThemUp/Public/Components",
        "ShootThemUp/Public/Dev",
        "ShootThemUp/Public/Weapon",
        "ShootThemUp/Public/UI",
        "ShootThemUp/Public/Animations",
        "ShootThemUp/Public/Pickups",
        "ShootThemUp/Public/Weapon/Components",
        "ShootThemUp/Public/AI"
    });
    ```
-   创建文件夹 `Content/AI` <br/>
-   创建基于STUAICharacter和STUAIController的蓝图类, 添加前缀BP\_ <br/>


## 配置BP_STUAICharacter {#配置bp-stuaicharacter}

参照BP_STUBaseCharacter <br/>

-   显示修改过的属性 <br/>
    
    <img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/show-modified-properties.png" width="1000" /> <br/> <br/>
-   设置属性时善用复制粘贴 <br/>
-   对BP_AIBaseCharacter进行修改 <br/>
    生命值文本 <br/>
    
    <img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/health-text.png" width="1000" /> <br/> <br/>
    
    网格体 <br/>
    
    <img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/mesh.png" width="1000" /> <br/> <br/>
    
    设置动画蓝图类 <br/>
    
    <img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/abp.png" width="1000" /> <br/> <br/>
    
    健康组件 <br/>
    
    <img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/health.png" width="1000" /> <br/> <br/>
    
    武器组件 <br/>
    
    <img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/weapon.png" width="1000" /> <br/> <br/>
-   允许该游戏角色直接添加到场景中或动态生成; 设置控制器类型 <br/>
    
    <img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/set-ai-controller.png" width="1000" /> <br/> <br/>
-   移除添加到场景中的BP_STUBaseCharacter, 添加BP_AIBaseCharacter <br/>
-   运行游戏, 正常生成NPC和AI控制器 <br/>
    
    <img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/scene-ai.png" width="1000" /> <br/> <br/>


## 让NPC移动到指定位置 {#让npc移动到指定位置}

-   设置地板大小 <br/>
    
    <img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/floor.png" width="400" /> <br/> <br/>
-   添加Actor到场景一角 <br/>
    `Place Actors > Basic > Actor` <br/>
    
    <img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/actor-location.png" width="700" /> <br/> <br/>
-   双击打开BP_STUAIController <br/>
    添加节点AIMoveTo, 在BeginPlay之后执行: 将控制器当前控制的游戏角色移动到目的地, 通过给出目的地座标或指示Actor <br/>
    
    <img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/ai-move.png" width="700" /> <br/> <br/>
-   添加NavMeshBoundsVolume: 覆盖NPC移动区域 <br/>
    `Place Actors > Volumes > NavMeshBoundsVolume` <br/>
-   设置NavMeshBoundsVolume大小: 高度管控层级; 与场景中的其他网格体有交互 <br/>
    `Details > Brush Settings` <br/>
    
    <img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/add-nav-mesh.png" width="1000" /> <br/> <br/>
-   绿色高亮显示导航网格体的覆盖区域, 按下 `P` 显示 / 隐藏 <br/>
    `Unreal Editor > Preference > General > Keyboard Shortcuts` <br/>
    
    <img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/show-nav.png" width="800" /> <br/> <br/>


## 优化榴弹爆炸特效 {#优化榴弹爆炸特效}

`Content/VFX/Projectile` <br/>

烟雾和火球无法扩散, 将烟雾效果扩大 <br/>

-   NE_Burst <br/>
-   NE_Fireball <br/>
-   NE_Flash <br/>
-   NE_Smoke <br/>

Properties使能Local Space <br/>

<img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/enable-local.png" width="600" /> <br/> <br/>


### NE_Fireball {#ne-fireball}

<img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/fb-frame.png" width="600" /> <br/> <br/>

分布半径 <br/>

<img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/fb-radius.png" width="600" /> <br/> <br/>


### NE_Smoke {#ne-smoke}

<img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/s-frame.png" width="600" /> <br/> <br/>

粒子数 <br/>

<img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/s-count.png" width="600" /> <br/> <br/>

分布半径 <br/>

<img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/s-radius.png" width="600" /> <br/> <br/>


### NS_ProjectileExplosion {#ns-projectileexplosion}

<img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/explosion.png" width="600" /> <br/> <br/>


## 优化步枪击中特效 {#优化步枪击中特效}


### NE_CoreFast {#ne-corefast}

<img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/cf-frame.png" width="600" /> <br/> <br/>


### NE_ShortBurst1 {#ne-shortburst1}

<img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/sb1-frame.png" width="600" /> <br/> <br/>


### NE_ShortBurst2 {#ne-shortburst2}

<img src="/pic/非玩家游戏角色行为/让NPC移动到指定位置/sb2-frame.png" width="600" /> <br/> <br/>

