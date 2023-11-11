---
title: "Sublime使用clang-format"
date: 2023-11-11T14:53:10
lastmod: 2023-11-11T15:43:50+08:00
draft: false
weight: 2003
---

## 说明 {#说明}

1.  需要安装clang-format程序 <br/>
2.  对所有项目生效 <br/>


## 安装clang-format {#安装clang-format}

`macOS` <br/>

```bash
where clang-format
brew search clang-format
brew install clang-format
```

查看clang-format路径 <br/>

```bash
where clang-format      
```

```text
/usr/local/bin/clang-format
```


## Sublime安装clang-format插件 {#sublime安装clang-format插件}

可以这么理解, 在Sublime和clang-format之间建立桥梁 <br/>

1.  包管理器安装clang-format <br/>
    `Command-Shift-P` <br/>
2.  配置路径 <br/>
    `Sublime Text > Preferences > Package Settings > Clang Format` <br/>
    
    | 参照                    |                                                      |
    |-----------------------|------------------------------------------------------|
    | `CustomStyle - Default` | clang_format_custom.sublime-settings -- Clang Format |
    | `Settings - Default`    | clang_format.sublime-settings -- Clang Format        |
    
    | 用户设置             |                                              |
    |------------------|----------------------------------------------|
    | `CustomStyle - User` | clang_format_custom.sublime-settings -- User |
    | `Settings - User`    | clang_format.sublime-settings -- User        |
    
    将参照拷贝到用户设置 <br/>


## 设置clang-format {#设置clang-format}

1.  使用默认配置 <br/>
    打开 `Settings - User` <br/>
    
    |                | -         |        |
    |----------------|-----------|--------|
    | binary         | 程序路径  | 默认   |
    | style          | 样式      | Custom |
    | format_on_save | 保存时对文件格式化 | true   |
    | languages      | 格式化语言 | 默认   |
    
    ```json
    {
        // This is the path to the binary for clang-format. If it is in your path,
        // it should just work out-of-the-box. Otherwise, you can set the full path,
        // which will look like this: 
        //    "binary": "/path/to/clang/bin/clang-format"
        // Note that you can set this from within ST directly through the Command
        // Palette. 
    
        "binary": "clang-format",
    
        // We use the Google style by default. This can be selected from ST using
        // the Command Palette. Choosing 'Custom' means that the settings will
        // be loaded from the Sublime Text settings file (which is accessed
        // from within ST through preferences. Choosing 'File' will look in the 
        // local directories from a clang-format settings file. See the clang-format
        // documentation to see how this works. 
    
        "style": "Custom",
    
        // Setting this to true will run the formatter on every save. If you want to
        // only enable this for a given project, try checking out the package
        // "Project-Specific".
    
        "format_on_save": true,
    
        // If format_on_save is set to true, ClangFormat checks if the current file
        // has its syntax set to a language in the list below. If it is in the list,
        // then the file will be formatted by ClangFormat.
    
        "languages": ["C", "C++", "C++11", "JavaScript", "Objective-C", "Objective-C++"]
    }
    ```
2.  自定义样式 <br/>
    屏蔽所有内容, 并添加以下内容 <br/>
    ```json
    {
        "BasedOnStyle": "Microsoft",
        "IndentWidth": "4",
        "UseTab": "Never",
        "BreakBeforeBraces": "Allman",
        "ColumnLimit": "140",
        "AccessModifierOffset": "-4",
        "SortIncludes": false,
        "AllowShortBlocksOnASingleLine": true,
        "AlignAfterOpenBracket": "Align",
        "AllowShortFunctionsOnASingleLine": "Inline",
        "PointerAlignment": "Right",
    }
    ```
    AllowShortBlocksOnASingleLine不生效 <br/>

