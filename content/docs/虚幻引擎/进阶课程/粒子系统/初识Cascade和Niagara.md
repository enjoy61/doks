---
title: "初识Cascade和Niagara"
date: 2023-10-12T17:23:39
lastmod: 2023-10-12T17:35:56+08:00
draft: false
weight: 2002
---

## 说明 {#说明}

-   `VFX` <br/>
    视觉特效 `Visual Effects` 的缩写 <br/>
-   `Niagara` 和 `Cascade` <br/>
    虚幻引擎提供的两个特效编辑器, Niagara较新 <br/>


## 从ShooterGame导出资产 {#从shootergame导出资产}

选中 `Content/Effects/ParticleSystems/Weapon` , 右键, `Migrate` <br/>

导出文件夹Effects包含4个子文件夹 <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/export.png" width="800" /> <br/> <br/>


## 导入到ShootThemUp {#导入到shootthemup}

移动到 `Content/ExternalContent/` <br/>

为Pickup和Effects文件夹设置颜色 <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/folder-color.png" width="600" /> <br/> <br/>


## 熟悉Cascade {#熟悉cascade}

创建文件夹 `Content/VFX` <br/>

空白处右键, 命名为PS_Test <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/create-cascade.png" width="800" /> <br/> <br/>

双击打开: 视口在左侧, 显示粒子系统; 发射器 `Emitter` 在右侧, 对粒子系统进行设置 <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/cascade-editor.png" width="1200" /> <br/> <br/>

选择设置项类别, 去到 `Details` 进行设置 <br/>


### 设置每帧生成粒子数 {#设置每帧生成粒子数}

`Emitters > Spawn` , `Details > Spawn > Rate > Distribution > Constant` , 由20改为200: 视口粒子数便多 <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/spawn-rate.png" width="500" /> <br/> <br/>


### 设置粒子生存时间 {#设置粒子生存时间}

`Emitters > Lifetime` , `Details > Lifetime > Distribution > Max` , 由1.0改为10.0: 粒子上升得更高 <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/lifetime-max.png" width="500" /> <br/> <br/>


### 使粒子分布在圆柱体中 {#使粒子分布在圆柱体中}

-   添加其他设置项 <br/>
    空白处右键 <br/>
    
    <img src="/pic/粒子系统/初识Cascade和Niagara/location-cylinder-add.png" width="400" /> <br/> <br/>
-   设置圆柱体半径 <br/>
    
    <img src="/pic/粒子系统/初识Cascade和Niagara/location-cylinder-radius.png" width="600" /> <br/> <br/>


### 添加粒子发射器 {#添加粒子发射器}

空白处右键 <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/new-emitter.png" width="600" /> <br/> <br/>

-   设置材质 <br/>
    `Emitter > Required` , `Details > Emitter > Material` <br/>
    
    <img src="/pic/粒子系统/初识Cascade和Niagara/emitter-material.png" width="600" /> <br/> <br/>


### 查看 {#查看}

添加到关卡: 多个粒子发射器组合的效果 <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/ps-text-in-viewport.png" width="1000" /> <br/> <br/>


## 在Cascade编辑器中查看粒子特效 {#在cascade编辑器中查看粒子特效}

`ExternalContent > Effects` <br/>

-   过滤资产 <br/>
    
    <img src="/pic/粒子系统/初识Cascade和Niagara/filter.png" width="700" /> <br/> <br/>
    
    <img src="/pic/粒子系统/初识Cascade和Niagara/filter-result.png" width="700" /> <br/> <br/>
-   双击打开 `P_Launcher_IH` <br/>
    榴弹爆炸特效. 可以看到一组配置好的粒子发射器, 共同构成爆炸 <br/>
    
    <img src="/pic/粒子系统/初识Cascade和Niagara/a-set-emitters.png" width="1000" /> <br/> <br/>
-   查看单个粒子发射器效果: 点击 `S` <br/>
    `Solo` <br/>
    
    <img src="/pic/粒子系统/初识Cascade和Niagara/smoke.png" width="1000" /> <br/> <br/>


## 熟悉Niagara {#熟悉niagara}


### 创建Niagara粒子发射器 {#创建niagara粒子发射器}

`Content/VFX` <br/>
空白处右键 <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/create-niagara-emitter.png" width="1000" /> <br/> <br/>

使用模板 <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/use-template.png" width="400" /> <br/> <br/>

选择 `Upward Mesh Burst`, 命名为NE_BaseImpact <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/select-upward-mesh-burst.png" width="500" /> <br/> <br/>

之后会根据子弹击中的表面创建不同的冲击特效 <br/>


### Niagara编辑器 {#niagara编辑器}

双击打开NE_BaseImpact <br/>

预览窗口在左侧, 中间对粒子系统进行设置, 底部有时间线 <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/ne-in-editor.png" width="1200" /> <br/> <br/>


#### 设置每次生成的粒子个数 {#设置每次生成的粒子个数}

`NE_BaseImpact > Emitter Update > Spawn Burst Instantaneous` , `Selection > Spawn Count`, 由80改为10 <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/spawn-count.png" width="1200" /> <br/> <br/>


#### 设置粒子颜色 {#设置粒子颜色}

`NE_BaseImpact > Particle Spawn > Initialize Particle` , `Selection > Point Attribute > Color Mode` <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/color-mode.png" width="1200" /> <br/> <br/>


### 添加Niagara粒子发射器 {#添加niagara粒子发射器}

将NE_BaseImpact拖到到视口, 添加失败. 原因在于PS_Test可以包含多个粒子发射器, 将其拖动到视口时, 创建对应Actor. <br/>

而一个Niagara粒子发射器就是一个资产, 通常会将多个Niagara粒子发射器组合起来使用, 而Niagara粒子发射器可用于多个组合. <br/>


### 创建Niagara粒子系统 {#创建niagara粒子系统}

`Content/VFX` <br/>
空白处右键 <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/create-ns.png" width="800" /> <br/> <br/>

创建空的粒子系统, 命名为NS_BaseImpact <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/empty.png" width="400" /> <br/> <br/>

如果选择 `New system from selected emitter(s)` , 可以选择 `NE_BaseImpact` <br/>


#### 添加粒子发射器 {#添加粒子发射器}

双击打开 `NS_BaseImpact` <br/>

空白处右键 <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/niagara-add-emitter.png" width="400" /> <br/> <br/>

添加NE_BaseImpact <br/>

<img src="/pic/粒子系统/初识Cascade和Niagara/add-ne.png" width="400" /> <br/> <br/>

修改NE_BaseImpact在NS_BaseImpact中的设置而不影响NE_BaseImpact本身的设置 <br/>


### 添加Niagara粒子系统 {#添加niagara粒子系统}

