---
title: "Windows上使用Sublime进行Unreal开发"
date: 2023-08-25T12:27:04
lastmod: 2023-08-25T18:48:01+08:00
draft: false
weight: 2002
---

## 便签 {#便签}

[Unreal Engine C++ Project Setup, From Scratch](https://www.youtube.com/watch?v=94FvzO1HVzY&list=PLjri7a1yVSW6BgWS2b9Fqh3dU79y5rznc)     <br/>


## 说明 {#说明}

| -                                       |       |
|-----------------------------------------|-------|
| [Cmder](https://cmder.app/)             | 终端模拟器 |
| [Sublime](https://www.sublimetext.com/) |       |

[虚幻引擎5.1版本说明](https://docs.unrealengine.com/5.1/zh-CN/unreal-engine-5.1-release-notes/): 依赖.NET 6.0 <br/>


## 概览 {#概览}

-   [X] 从零创建Unreal项目 <br/>
-   [X] 在命令行编译和运行项目, 封装在脚本中 <br/>
-   [X] 创建Actor派生类 <br/>
-   [X] 查看引擎代码 <br/>


## Cmder {#cmder}

1.  显示/隐藏窗口: C-\` <br/>
2.  在文件资源管理器打开Cmder当前路径 <br/>
    ```bash
    cd /d C:\Projects
    explorer .
    ```


## Sublime {#sublime}

使用以下插件 <br/>

| -                  |                                                  |
|--------------------|--------------------------------------------------|
| Project Manager    |                                                  |
| Switch File Deluxe | 在源文件和头文件之间切换; Windows `Alt-O` ; macOS `Option-O` |
| Unreal Snippets    | UP主提供                                         |


## 从零创建Unreal项目 {#从零创建unreal项目}

创建项目文件夹Dirk <br/>


### 创建项目 {#创建项目}

1.  Sublime &gt; 命令行 &gt; Project Manager: Add New Project <br/>
2.  命名为Dirk <br/>


### 添加文件夹 {#添加文件夹}

1.  Sublime &gt; 命令行 &gt; Project: Add Folder <br/>
2.  选择Dirk <br/>


### 创建Unreal项目文件 {#创建unreal项目文件}

`Dirk/Dirk.uproject` <br/>
包含项目对应的引擎版本, 以及打开该项目所需的动态库 <br/>

1.  插入代码段: uuproj &gt; TAB <br/>
2.  修改 `Modules Name` <br/>
    ```json
    {
        "FileVersion": 3,
        "EngineAssociation": "4.25",
        "Category": "",
        "Description": "",
        "Modules": [
            {
                "Name": "DirkCore",
                "Type": "Runtime",
                "LoadingPhase": "Default"
            }
        ]
    }
    ```


### 创建Target文件 {#创建target文件}

-   指示如何编译Target <br/>
    `Target Rules Definition` <br/>
-   有两个Target, 游戏实例和虚幻编辑器 <br/>


#### 游戏实例 {#游戏实例}

`Dirk/Source/Dirk.Target.cs` <br/>

1.  插入代码段: umt &gt; TAB <br/>
2.  给出需要构造的模块 <br/>
    ```csharp
    using UnrealBuildTool;
    
    public class DirkTarget : TargetRules
    {
        public DirkTarget(TargetInfo Target) : base(Target)
        {
            Type = TargetType.Game;
            DefaultBuildSettings = BuildSettingsVersion.V2;
            ExtraModuleNames.AddRange( new string[] { "DirkCore" } );
        }
    }
    ```


#### 虚幻编辑器 {#虚幻编辑器}

`Dirk/Source/DirkEditor.Target.cs` <br/>

1.  插入代码段: umt &gt; TAB <br/>
2.  填写Target类型为Editor <br/>
3.  给出需要构造的模块 <br/>
    ```csharp
    using UnrealBuildTool;
    
    public class DirkEditorTarget : TargetRules
    {
        public DirkEditorTarget(TargetInfo Target) : base(Target)
        {
            Type = TargetType.Editor;
            DefaultBuildSettings = BuildSettingsVersion.V2;
            ExtraModuleNames.AddRange( new string[] { "DirkCore" } );
        }
    }
    ```


### 创建游戏主模块DirkCore {#创建游戏主模块dirkcore}

`Primary Game Module` <br/>
一个项目只有一个游戏主模块; 创建文件夹Dirk/Source/DirkCore <br/>


#### 创建源码文件夹 {#创建源码文件夹}

|                              | -                               |
|------------------------------|---------------------------------|
| Dirk/Source/DirkCore/Public  | 存放对其他模块可见的头文件      |
| Dirk/Source/DirkCore/Private | 存放实现  `Implementataion` 和模块内部逻辑 |


#### 模块编译规则 {#模块编译规则}

`Module Build Rules` <br/>
`Dirk/Source/DirkCore/DirkCore.Build.cs` <br/>

1.  插入代码段: umb &gt; TAB <br/>
2.  填写依赖模块: 已填写最少依赖 <br/>
    
    | -           |
    |-------------|
    | Core        |
    | CoreUObject |
    | Engine      |

<!--listend-->

```csharp
using UnrealBuildTool;

public class DirkCore : ModuleRules
{
    public DirkCore(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
        bEnforceIWYU = true;

        PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine" });
        PrivateDependencyModuleNames.AddRange(new string[] { });
    }
}
```

<!--list-separator-->

-  虚幻引擎由各个模块组成

    -   查看 `C:\Epic Games\UE_5.1\Engine\Source` ，组织方式为模块类型 <br/>
    -   Runtime模块：引擎代码，不包含虚幻编辑器和开发工具; 包含各种运行时模块, 如Core、CoreUObject和Engine <br/>
        如果想要开发VR游戏, 则需添加依赖模块HeadMountedDisplay <br/>


#### 模块实现 {#模块实现}

模块定义和模块同名 <br/>

<!--list-separator-->

-  DirkCore.h

    `Dirk/Source/DirkCore/Public/DirkCore.h`        <br/>
    
    1.  插入代码段: umh &gt; TAB <br/>
    2.  定义了模块入口 <br/>
    3.  加载模块之后, 调用StartupModule; 卸载模块之前, 调用ShutdownModule <br/>
    
    <!--listend-->
    
    ```cpp
    #pragma once
    
    #include "CoreMinimal.h"
    #include "Modules/ModuleInterface.h"
    
    class FDirkCore : public IModuleInterface
    {
    public:
        static inline FDirkCore& Get()
        {
            return FModuleManager::LoadModuleChecked<FDirkCore>("DirkCore");
        }
    
        static inline bool IsAvailable()
        {
            return FModuleManager::Get().IsModuleLoaded("DirkCore");
        }
    
        virtual void StartupModule() override;
        virtual void ShutdownModule() override;
    };
    ```

<!--list-separator-->

-  DirkCore.cpp

    `Dirk/Source/DirkCore/Private/DirkCore.cpp`        <br/>
    插入代码段: umcp &gt; TAB <br/>
    
    ```cpp
    #include "DirkCore.h"
    #include "Modules/ModuleManager.h"
    
    #include "Log.h"
    
    void FDirkCore::StartupModule()
    {
        UE_LOG(LogDirkCore, Log, TEXT("DirkCore module starting up"));
    }
    
    void FDirkCore::ShutdownModule()
    {
        UE_LOG(LogDirkCore, Log, TEXT("DirkCore module shutting down"));
    }
    
    IMPLEMENT_PRIMARY_GAME_MODULE(FDirkCore, DirkCore, "DirkCore");
    ```


#### 创建日志类别 {#创建日志类别}

只在DirkCore内部使用, 头文件和源文件均存放在Dirk/Source/DirkCore/Private中 <br/>

1.  Log.h <br/>
    插入代码段: ulh &gt; TAB <br/>
    ```cpp
    #pragma once
    
    #include "Logging/LogMacros.h"
    
    DECLARE_LOG_CATEGORY_EXTERN(LogDirkCore, All, All);
    ```
2.  Log.cpp <br/>
    插入代码段: ulc &gt; TAB <br/>
    ```cpp
    #include "Log.h"
    
    DEFINE_LOG_CATEGORY(LogDirkCore);
    ```
3.  插入日志语句: ull &gt; TAB <br/>


## 编译项目 {#编译项目}

虚幻引擎有自己的交叉编译系统 `Cross-Platform` , 我们通过C#文件配置Target和模块的编译规则 <br/>


### 编译虚幻编辑器使用的动态库 {#编译虚幻编辑器使用的动态库}

|         | 脚本路径                                               |
|---------|----------------------------------------------------|
| Windows | Epic Games\UE_5.1\Engine\Build\BatchFiles\Build.bat    |
| macOS   | Epic Games\UE_5.1\Engine\Build\BatchFiles\Mac\Build.sh |

-   Build脚本包括UnrealBuildTool的调用, 和一些参数配置 <br/>
-   运行Build脚本, 指定Target、Platform和Build Configuration, 给出uproject文件路径 <br/>
-   最终, 模块被链接成动态库, 供虚幻编辑器加载 <br/>

| -      |                                 |
|--------|---------------------------------|
| Target | DirkEditor                      |
| 平台   | Mac                             |
| 编译配置 | Development, 介于Debug和Shipping之间 |


#### Windows {#windows}

```bash
"C:\Epic Games\UE_5.1\Engine\Build\BatchFiles\Build.bat" DirkEditor Win64 Development "C:\Dirk\Dirk.uproject" -waitmutex -NoHotReload
```


#### macOS {#macos}

```bash
#!/bin/bash

Project="Dirk/Dirk.uproject"
BuildScript="UE_5.1/Engine/Build/BatchFiles/Mac/Build.sh"
Target="DirkEditor"

$BuildScript $Target Mac Development $Project -waitmutex -NoHotReload
```


#### 虚幻头文件工具 {#虚幻头文件工具}

`Unreal Header Tool` <br/>
虚幻引擎源码里使用了很多宏，在编译之前，需要进行解析，在源码文件中进行替换 <br/>


#### 新增文件夹 {#新增文件夹}

| -            |      |
|--------------|------|
| Binaries     |      |
| Intermediate | 生成文件 |

| -                                      |                                        |
|----------------------------------------|----------------------------------------|
| Dirk/Binaries/Mac/UnrealEditor.modules | 元数据 `Meta Data` , 说明该模块所需的动态库文件, 和引擎版本 |
|                                        | 打开虚幻编辑器, 会比对引擎版本和项目对应的引擎版本是否一致 |
| Dirk/Binaries/Mac/DirkEditor.target    | 元数据                                 |

<!--list-separator-->

-  Windows

    | -                                             |        |
    |-----------------------------------------------|--------|
    | Dirk/Binaries/Win64/UnrealEditor-DirkCore.dll | 模块动态库 |
    | Dirk/Binaries/Win64/UnrealEditor-DirkCore.pdb | 存放调试信息 |

<!--list-separator-->

-  macOS

    | -                                             |       |
    |-----------------------------------------------|-------|
    | Dirk/Binaries/Mac/UnrealEditor-DirkCore.dylib | 模块动态库 |


### 使用虚幻编辑器打开项目 {#使用虚幻编辑器打开项目}


#### Windows {#windows}

```bash
"C:\Epic Games\UE_5.1\Engine\Binaries\Win64\UnrealEditor.exe" "C:\Dirk\Dirk.uproject" -log
```


#### macOS {#macos}

```bash
#!/bin/bash

Project="Dirk/Dirk.uproject"
UnrealEditor="UE_5.1/Engine/Binaries/Mac/UnrealEditor.app"

open -a $UnrealEditor $Project
```


#### 新增文件夹 {#新增文件夹}

| -                |                       |
|------------------|-----------------------|
| Saved            | 存放日志和运行时 `Runtime` 生成 |
| DerivedDataCache | 虚幻编辑器导入资产时的缓存 |
| Content          | 存放各种资产          |
| Config           | 项目配置              |


### 使用虚幻编辑器运行游戏实例, 不加载编辑器本身 {#使用虚幻编辑器运行游戏实例-不加载编辑器本身}

使用-game选项 <br/>


#### Windows {#windows}

```bash
"C:\Epic Games\UE_5.1\Engine\Binaries\Win64\UnrealEditor.exe" "C:\Dirk\Dirk.uproject" -game -log -windowed -resx=1280 -rexy=720       
```


#### macOS {#macos}

```bash
#!/bin/bash

Project="Dirk/Dirk.uproject"
UnrealEditor="UE_5.1/Engine/Binaries/Mac/UnrealEditor.app/Contents/MacOS/UnrealEditor"

$UnrealEditor $Project -game -log -windowed -resx=1280 -rexy=720
```


### 编译游戏实例 {#编译游戏实例}


#### 编译游戏实例 {#编译游戏实例}

-   使用游戏实例Target, 得到项目的独立运行版本 `Standalone Version` <br/>
-   不再把模块链接成动态库, 将项目和引擎源码链接在一起, 生成一个可执行游戏, 不包含虚幻编辑器的特定功能 <br/>

<!--list-separator-->

-  Windows

    ```bash
    "C:\Epic Games\UE_5.1\Engine\Build\BatchFiles\build.bat" Dirk Win64 Development "C:\Dirk\Dirk.uproject" -waitmutex -NoHotReload
    ```

<!--list-separator-->

-  macOS

    ```bash
    #!/bin/bash
    
    Project="Dirk/Dirk.uproject"
    BuildScript="UE_5.1/Engine/Build/BatchFiles/Mac/Build.sh"
    Target="Dirk"
    
    $BuildScript $Target Mac Development $Project -waitmutex -NoHotReload
    ```


#### 烘培资产 {#烘培资产}

`Windows` <br/>
`Cook Content` <br/>

-   虚幻编辑器使用未烘培资产, 而游戏实例直接将压缩纹理加载到GPU <br/>
-   Saved/Cooked存放游戏实例运行时所需资产 <br/>
-   macOS无UnrealEditor-cmd程序 <br/>

<!--listend-->

```bash
"C:\Epic Games\UE_5.1\Engine\Binaries\Win64\UnrealEditor-cmd.exe" "C:\Dirk\Dirk.uproject" -run=cook -targetplatform=Windows
```


#### 运行游戏实例 {#运行游戏实例}

`Windows` <br/>
构建时使用了Development参数, 运行时可以使用开发工具 <br/>

```bash
"C:\Dirk\Binaries\Win64\Dirk.exe" -log -windowed -resx=1280 -resy=720
```


## 运行脚本 {#运行脚本}

和Dirk文件夹同级 <br/>


### 变量 {#变量}

`vars.bat` <br/>

```bash
@echo off 
Rem 不打印命令

set ROOTDIR=%~dp0
Rem ~dp0为脚本所在目录

set ROOTDIR=%ROOTDIR:~0,-1% 
Rem  ~0,-1% 去除目录最后的/

set PROJECT=Dirk
set PROJECT_DIR=%ROOTDIR%\%PROJECT%
set UPROJECT_PATH=%PROJECT_DIR%\%PROJECT%.uproject

set UE5_DIR=C:\Epic Games\UE_5.1
set UE5EDITOR_EXE=%UE5_DIR%\Engine\Binaries\Win64\UnrealEditor.exe
set BUILD_BAT=%UE5_DIR%\Engine\Build\BatchFiles\Build.bat
```


### 编译 {#编译}

`build.bat` <br/>

```bash
@echo off

call %~dp0\vars.bat

call "%BUILD_BAT%" %PROJECT%Editor Win64 Development "%UPROJECT_PATH%" -waitmutex -NoHotReload
```


### 在虚幻编辑器中打开项目 {#在虚幻编辑器中打开项目}

`editor.bat` <br/>

```bash
@echo off

call %~dp0\vars.bat

start "%UE5EDITOR_EXE%" "%UPROJECT_PATH%" %*
```


### 运行脚本 {#运行脚本}

-   在虚幻编辑器中打开项目 <br/>
    ```bash
    editor
    editor -log
    ```
-   编译成功则在虚幻编辑器中打开 <br/>
    ```bash
    build && editor
    ```


## 创建C++类 {#创建c-plus-plus-类}


#### TestActor.h {#testactor-dot-h}

`Dirk/Source/DirkCore/Public/TestActor.h`       <br/>

<!--list-separator-->

-  插入代码段

    1.  定义Actor派生类: uca &gt; TAB <br/>
    2.  添加组件: upc &gt; TAB <br/>
        `protected` <br/>
        ```cpp
        class UBillboardComponent;
        
        UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category="Components")
        class UBillboardComponent* BillboardComponentSprite;	
        ```
    3.  添加蓝图可编辑属性: upe &gt; TAB <br/>
        `protected` <br/>
        ```cpp
        UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Test")
        int32 Value;
        ```
    4.  覆写BeginPlay <br/>
        `public` <br/>
        ```cpp
        virtual void BeginPlay() override;
        ```
    5.  构造函数: ufc &gt; TAB <br/>
        `public` <br/>
        ```cpp
        ATestActor(const FObjectInitializer& ObjectInitializer);
        ```

<!--list-separator-->

-  完整代码

    ```cpp
    #pragma once
    
    #include "CoreMinimal.h"
    #include "GameFramework/Actor.h"
    
    #include "TestActor.generated.h"
    
    class UBillboardComponent;
    
    UCLASS()
    class ATestActor : public AActor
    {
        GENERATED_BODY()
    
    public:
        ATestActor(const FObjectInitializer& ObjectInitializer);
        virtual void BeginPlay() override;
    
    protected:
        UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category="Components")
        class UBillboardComponent* Sprite;	
    
        UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Test")
        int32 Value;
    };
    ```


#### TestActor.cpp {#testactor-dot-cpp}

`Dirk/Source/DirkCore/Private/TestActor.cpp`       <br/>

```cpp
#include "TestActor.h"
#include "Components/SceneComponent.h"
#include "Components/BillboardComponent.h"
#include "Log.h"

ATestActor::ATestActor(const FObjectInitializer& ObjectInitializer)
    : Super(ObjectInitializer)
{
    Value = 42;

    RootComponent = ObjectInitializer.CreateDefaultSubobject<USceneComponent>(this, TEXT("RootComponent"));

    Sprite = ObjectInitializer.CreateDefaultSubobject<UBillboardComponent>(this, TEXT("Sprite"));
    Sprite->SetupAttachment(RootComponent);
}

void ATestActor::BeginPlay()
{
    Super::BeginPlay();

    UE_LOG(LogDirkCore, Log, TEXT("%s: on BeginPlay, Value is %d"), *GetName(), Value);
}
```


## 查看引擎代码 {#查看引擎代码}

1.  添加引擎源码文件夹 <br/>
    命令行 &gt; Project: Add Folder &gt; Epic Games\UE_5.1\Engine\Source\Runtime <br/>
2.  项目内查找: 查找派生类 <br/>
    -   Find <br/>
        ```text
        : public FPrimitiveSceneProxy
        ```
    -   Where <br/>
        ```text
        C:\Epic Games\UE_5.1\Engine\Plugins,*.h,*.cpp,*.inl         
        ```
3.  文件内查找 <br/>
    支持正则匹配 <br/>
    -   去到文件Actor.h <br/>
    -   Set.\*Tranform <br/>


## 总结 {#总结}


### Visual Studio {#visual-studio}

MSVC++提供cl.exe和link.exe, 作为编译器 `Compiler` 和链接器 `Linker` <br/>


### Unreal Engine {#unreal-engine}

提供UnrealBuildTool.exe, UnrealHeaderTool.exe和UnrealEditor.exe <br/>


### 虚幻引擎项目 {#虚幻引擎项目}

1.  项目文件: Dirk.uproject <br/>
2.  蓝图项目: 没有模块项 <br/>
    ```json
    {
        "FileVersion": 3,
        "EngineAssociation": "5.1",
        "Category": "",
        "Description": ""
    }
    ```
3.  C++项目: <br/>
    -   虚幻编辑器需加载指定模块 <br/>
        ```json
        {
            "FileVersion": 3,
            "EngineAssociation": "5.1",
            "Category": "",
            "Description": "",
            "Modules": [
                {
                    "Name": "DirkCore",
                    "Type": "Runtime",
                    "LoadingPhase": "Default"
                }
            ]
        
        }
        ```


### 项目编译 {#项目编译}

1.  模块定义在Dirk/Source, 每个模块的构造规则在Build.cs文件中说明 <br/>
2.  每个项目有两个Target.cs文件, 说明其依赖的模块 <br/>
3.  UnrealBuildTool根据Target构造规则编译依赖模块, 模块编译则依据模块编译规则 <br/>


#### 模块编译 {#模块编译}

1.  解析头文件得到生成代码，保存在Intermediate文件夹 <br/>
    `Unreal Header Tool` <br/>
    DirkCore.init.gen.cpp <br/>
    TestActor.gen.cpp <br/>
    TestActor.generated.h <br/>
2.  编译解析完的单元, 生成目标文件 <br/>
    `Unreal Build Tool` <br/>
    DirkCore.cpp.obj <br/>
    DirkCore.init.gen.cpp.obj <br/>
    TestActor.cpp.obj <br/>
    TestActor.gen.cpp.obj <br/>
3.  将代码链接到一起，根据编译规则 `Build Rules` 提供的依赖名单解决模块见交叉引用 <br/>
    `Unreal Build Tool` <br/>
4.  最后, 得到编辑器所需的动态库 <br/>
    UEEditor-DirkCore.dll <br/>
    UEEditor-DirCore.pdb <br/>
5.  给出uproject文件，可以在编辑器中编辑或运行未烘培资产的项目 <br/>
6.  也可以使用编辑器为项目烘培资产, 之后, 可以运行独立游戏 <br/>

