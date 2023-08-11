---
title: "HUD类"
date: 2023-06-21T21:50:34
lastmod: 2023-08-08T19:25:36+08:00
draft: false
weight: 1001
---

## AHUD {#ahud}

`Head Up Display` <br/>

-   在世界设置中，可设置关卡使用HUD类 <br/>
-   负责渲染接口，使之始终显示在游戏的最上方, 属于UI范畴 <br/>
-   其功能很多都可被widget代替 <br/>

`UE_5.1/Engine/Source/Runtime/Engine/Classes/GameFramework/HUD.h` <br/>


## AHUD::DrawHUD {#ahud-drawhud}

-   HUD类主要循环函数，负责渲染，每帧调用 <br/>
-   我们在其中绘制所需元素，线，长方形，显示纹理和文本，等等 <br/>

<img src="/pic/API/关卡设置/AHUD/DrawHUD.png" width="700" /> <br/> <br/>


## AHUD::DrawLine {#ahud-drawline}

在屏幕上绘制线条 <br/>

<img src="/pic/API/关卡设置/AHUD/DrawLine.png" width="700" /> <br/> <br/>


### 参数 {#参数}

| -                          |             |
|----------------------------|-------------|
| StartScreenX, StartScreenY | 起点在屏幕的X和Y坐标 |
| EndScreenX，EndScreenY     | 终点在屏幕的X和Y坐标 |
| LineColor                  | 线条颜色    |
| LineThickness              | 线条粗细    |


## AHUD::Canvas {#ahud-canvas}

-   指针，可绘制HUD的画布（当前屏幕） <br/>
-   获取屏幕相关信息，或直接通过Canvas绘制图元 <br/>

<img src="/pic/API/关卡设置/AHUD/Canvas.png" width="600" /> <br/> <br/>

