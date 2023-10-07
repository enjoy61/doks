---
title: "使用C++实现游戏角色生命条"
date: 2023-10-06T23:30:32
lastmod: 2023-10-07T17:44:12+08:00
draft: false
weight: 2003
---

## 概览 {#概览}

-   [X] 创建C++类: 窗口部件; 返回生命值百分比 <br/>
-   [X] 在STUGameHUD中创建并添加窗口部件 <br/>
-   [X] 修改WBP_PlayerHUD基类; 使用STUPlayerHUDWidget提供的接口获取生命值百分比 <br/>
-   [X] 移除BP_STUGameHUD中创建并添加窗口部件逻辑; 配置窗口部件类属性 <br/>


## C++类: 窗口部件 {#c-plus-plus-类-窗口部件}


### 在虚幻编辑器中创建C++类 {#在虚幻编辑器中创建c-plus-plus-类}

| -  |                    |
|----|--------------------|
| 基类 | UserWidget         |
| 名称 | STUPlayerHUDWidget |
| 路径 | UI/                |
|    | Public             |

<img src="/pic/虚幻运动图表/使用C++实现游戏角色生命条/create-STUPlayerHUDWidget.png" width="800" /> <br/> <br/>


### 添加接口: 获取生命值百分比 {#添加接口-获取生命值百分比}

`ShootThemUp: UI/STUPlayerHUDWidget.h` <br/>
`public` <br/>

```cpp
UFUNCTION(BlueprintCallable)
float GetHealthPercent() const;
```

`ShootThemUp: UI/STUPlayerHUDWidget.cpp` <br/>
使用Cast转换空指针得到空指针 <br/>

```cpp
#include "Components/STUHealthComponent.h"

float USTUPlayerHUDWidget::GetHealthPercent() const
{
    const auto Player = GetOwningPlayerPawn();
    if (!Player) return 0.0f;

    const auto Component = Player->GetComponentByClass(USTUHealthComponent::StaticClass());
    const auto HealthComponent = Cast<USTUHealthComponent>(Component);
    if (!HealthComponent) return 0.0f;

    return HealthComponent->GetHealthPercent();
}
```


## 在STUGameHUD中创建并添加窗口部件 {#在stugamehud中创建并添加窗口部件}


### 添加数据成员: 保存窗口部件类 {#添加数据成员-保存窗口部件类}

`ShootThemUp: UI/STUGameHUD.h` <br/>
`protected` <br/>

```cpp
class UUserWidget;

UPROPERTY(EditDefaultsOnly, BlueprintReadWrite)
TSubclassOf<UUserWidget> PlayerHUDWidgetClass;
```


### 创建窗口部件并添加到视口 {#创建窗口部件并添加到视口}

通常, 在蓝图中使用的函数和C++中提供同样功能的函数一一对应, 甚至同名 <br/>


#### 创建窗口部件 {#创建窗口部件}

头文件 `Blueprint/UserWidget.h` 提供CreateWidget函数 <br/>


#### 添加到视口 {#添加到视口}

使用AddToViewport函数 <br/>

添加到视口时可以设置景深 `Z-order` 参数, 涉及到窗口部件的渲染顺序, 默认为0 <br/>


#### 在BeginPlay中完成 {#在beginplay中完成}

`ShootThemUp: UI/STUGameHUD.h` <br/>
`protected` <br/>

```cpp
virtual void BeginPlay() override;
```

`ShootThemUp: UI/STUGameHUD.cpp` <br/>

```cpp
#include "Blueprint/UserWidget.h" // Provide CreateWidget: Template function

void ASTUGameHUD::BeginPlay()
{
    Super::BeginPlay();
    auto PlayerHUDWidget = CreateWidget<UUserWidget>(GetWorld(), PlayerHUDWidgetClass);
    if (PlayerHUDWidget)
    {
        PlayerHUDWidget->AddToViewport();
    }
}
```


## 修改WBP_PlayerHUD {#修改wbp-playerhud}


### 将基类从UserWidget改为STUPlayerHUDWidget {#将基类从userwidget改为stuplayerhudwidget}

打开WBP_PlayerHUD, `File > Reparent Blueprint` <br/>

<img src="/pic/虚幻运动图表/使用C++实现游戏角色生命条/WBP_PlayerHUD-set-parent.png" width="1000" /> <br/> <br/>

选择STUPlayerHUDWidget <br/>

<img src="/pic/虚幻运动图表/使用C++实现游戏角色生命条/reparent.png" width="400" /> <br/> <br/>

右上角查看当前基类 <br/>

<img src="/pic/虚幻运动图表/使用C++实现游戏角色生命条/new-parent.png" width="1000" /> <br/> <br/>


### 修改蓝图GetHealthPercent实现 {#修改蓝图gethealthpercent实现}

去到 `Graph` <br/>

-   添加节点: `GetHealthPercent` <br/>
    
    <img src="/pic/虚幻运动图表/使用C++实现游戏角色生命条/add-node-STUPlayerHUDWidget-GetHealthPercent.png" width="400" /> <br/> <br/>
-   蓝图实现 <br/>
    
    <img src="/pic/虚幻运动图表/使用C++实现游戏角色生命条/bp.png" width="700" /> <br/> <br/>
    
    窗口部件的逻辑和功能封装在C++中, 在虚幻运动图表编辑器, 我们可以从设计的角度装饰窗口部件 <br/>


## 修改BP_STUGameHUD {#修改bp-stugamehud}

已在C++中实现创建并添加窗口部件到关卡, 移除 `Event Graph` 操作 <br/>

点击按钮 `Class Defaults` <br/>

<img src="/pic/虚幻运动图表/使用C++实现游戏角色生命条/class-default.png" width="700" /> <br/> <br/>

设置PlayerHUDWidgetClass为WBP_PlayerHUD <br/>

<img src="/pic/虚幻运动图表/使用C++实现游戏角色生命条/configure-PlayerHUDWidgetClass.png" width="400" /> <br/> <br/>

