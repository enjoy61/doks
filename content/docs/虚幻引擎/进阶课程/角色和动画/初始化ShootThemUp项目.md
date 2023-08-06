---
title: "初始化ShootThemUp项目"
date: 2023-06-11T06:14:49
lastmod: 2023-08-05T14:43:42+08:00
draft: false
weight: 1002
---

## 说明 {#说明}

`虚幻编辑器`      <br/>

将 `ShooterGame` 作为内容包，基于此开发 `ShootThemUp` 。好比室内设计师提供游戏资料，我们在此之上开发游戏。 <br/>


## 创建ShootThemUp项目 {#创建shootthemup项目}

`Blank` <br/>
`Blueprint` <br/>


## 配置ShootThemUp {#配置shootthemup}


### 添加版权信息 {#添加版权信息}

`项目设置 > Project > Description > Legal > Copyright Notice` <br/>

```text
Shoot Them Up Game, All Rights Reserved.
```


### 关卡设置 {#关卡设置}

1.  添加关卡文件夹 `Content/Levels` <br/>
2.  创建关卡 <br/>
    -   新建关卡 <br/>
        
        <img src="/pic/角色和动画/初始化ShootThemUp项目/创建关卡.png" width="200" /> <br/> <br/>
    -   选择 `Basic` <br/>
        
        <img src="/pic/角色和动画/初始化ShootThemUp项目/创建关卡-Basic.png" width="400" /> <br/> <br/>
    -   保存到Content/Levels/，命名为DefaultMap <br/>
3.  设置 `EditorStartupMap` 和 `GameDefaultMap` 使用 `DefaultMap` <br/>
    `项目设置 > Project > Maps & Modes` <br/>


## 从ShooterGame导入资产 {#从shootergame导入资产}


### ShooterGame导出 {#shootergame导出}

1.  `打开ShooterGame项目 > 在内容浏览器选中Content/Animations/TTP_Animations，右键 > Migrate` <br/>
    
    <img src="/pic/角色和动画/初始化ShootThemUp项目/ContentBrowser-Migrate.png" width="500" /> <br/> <br/>
2.  取消Sounds勾选 <br/>
    
    <img src="/pic/角色和动画/初始化ShootThemUp项目/Migrate-取消Sounds勾选.png" width="400" /> <br/> <br/>
    
    _默认勾选的文件夹里的内容都与 `TTP_Animations` 相关_ <br/>
3.  保存到 `ShootThemUp/Content` 目录下 <br/>
    不能直接迁移到 `5.1.1/ShootThemUp/Content/ExternalContent` ，虚幻引擎会检查目录，要求这些资产的上级目录是 `Content` ，即使根目录是 `Content` 也无法通过检查 <br/>


### ShootThemUp导入 {#shootthemup导入}

1.  添加外部资产文件夹和本章资产文件夹 <br/>
    `Content/ExternalContent` <br/>
    `Content/ExternalContent/Animation` <br/>
2.  通过虚幻编辑器，将 `Content` 目录下的 `Animations` `Characters` `Environment` 移动到 `ExternalContent/Animation` 目录下 <br/>
    不能在外部直接将三个文件夹移动到目的文件夹中，会导致资产之间的相互引用路径出错 <br/>
3.  为 `ExternalContent` 设置文件夹颜色 <br/>
    `选中Content/ExternalContent，右键 > Set Color` <br/>
    
    <img src="/pic/角色和动画/初始化ShootThemUp项目/ContentBrowser-Folder-SetColor.png" width="400" /> <br/> <br/>
4.  为 `ExternalContent/Animation` 设置文件夹颜色 <br/>
5.  效果图 <br/>
    
    <img src="/pic/角色和动画/初始化ShootThemUp项目/ContentBrowser-Folder-SetColor-Result.png" width="200" /> <br/> <br/>


## 基于蓝图创建C++项目 {#基于蓝图创建c-plus-plus-项目}

-   添加C++类即可 <br/>
-   创建蓝图项目的时间开销明显小于创建C++项目的时间开销 <br/>


### 创建GameModeBase类 {#创建gamemodebase类}

1.  `Tools > New C++ Class..` <br/>
    
    <img src="/pic/角色和动画/初始化ShootThemUp项目/新建C++类.png" width="300" /> <br/> <br/>
2.  `STUGameModeBase` `不设置类类型` <br/>
    
    <img src="/pic/角色和动画/初始化ShootThemUp项目/STUGameModeBase.png" width="800" /> <br/> <br/>
3.  `Content同级目录出现C++ Classes文件夹` <br/>
    
    <img src="/pic/角色和动画/初始化ShootThemUp项目/ContentBrowser-C++Classes.png" width="500" /> <br/> <br/>


### 设置关卡使用STUGameModeBase {#设置关卡使用stugamemodebase}

<img src="/pic/角色和动画/初始化ShootThemUp项目/WorldSettings-STUGameModeBase.png" width="500" /> <br/> <br/>


## 查看项目源码中的版权信息 {#查看项目源码中的版权信息}

<img src="/pic/角色和动画/初始化ShootThemUp项目/版权注释.png" width="400" /> <br/> <br/>


## 不使用预编译头文件 {#不使用预编译头文件}

`ShootThemUp: ShootThemUp.Build.cs` <br/>

```csharp
// PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
PCHUsage = PCHUsageMode.NoPCHs;
```


## 脚本 {#脚本}


### 编译项目 {#编译项目}

`Build.sh` <br/>

```bash
#!/bin/bash

Project="Projects/5.1.1/ShootThemUp/ShootThemUp.uproject"
BuildScript="EpicGames/UE_5.1/Engine/Build/BatchFiles/Mac/Build.sh"
Target="ShootThemUpEditor"

$BuildScript $Target Mac Development $Project -waitmutex -NoHotReload
```


### 打开虚幻编辑器 {#打开虚幻编辑器}

`Editor.sh` <br/>

```bash
#!/bin/bash

Project="Projects/5.1.1/ShootThemUp/ShootThemUp.uproject"
UnrealEditor="EpicGames/UE_5.1/Engine/Binaries/Mac/UnrealEditor.app"

open -a $UnrealEditor $Project
```


### 生成项目文件 {#生成项目文件}

`ProjectFiles.sh` <br/>

```bash
#!/bin/bash

Project="Projects/5.1.1/ShootThemUp/ShootThemUp.uproject"
GenerateProjectFilesScript="EpicGames/UE_5.1/Engine/Build/BatchFiles/Mac/GenerateProjectFiles.sh"

EngineCCDst="EpicGames/UE_5.1/compile_commands.json"
EngineCCSrc="EpicGames/UE_5.1/.vscode/compileCommands_Default.json"
ProjectCCDst="Projects/5.1.1/ShootThemUp/compile_commands.json"
ProjectCCSrc="Projects/5.1.1/ShootThemUp/.vscode/compileCommands_ShootThemUp.json"

GenerateXCode()
{
    $GenerateProjectFilesScript -projectfiles -project=$Project -game -rocket -progress -XCodeProjectFiles
}

GenerateVSCode()
{
    $GenerateProjectFilesScript -projectfiles -project=$Project -game -rocket -progress -VSCode
    cp $EngineCCSrc $EngineCCDst
    cp $ProjectCCSrc $ProjectCCDst
}

# GenerateXCode
GenerateVSCode
```

