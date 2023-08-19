---
title: "FABRIK"
date: 2023-08-19T10:40:38
lastmod: 2023-08-19T14:12:26+08:00
draft: false
weight: 1003
---

## 逆运动学 {#逆运动学}

`Inverse Kinematics` <br/>

给出子骨骼的位置, 反求推导出其所在骨骼链上n级父骨骼位置, 从而确定整条骨骼链的方法 <br/>


### 末端执行器 {#末端执行器}

`End Effector` <br/>
位于机械臂末端、与外界环境进行物理交互的工具, 也称作臂端工具 `End-of-Arm Tooling` , 缩写为EOAT <br/>

FABRIK的设置, 就是给出末端执行器的描述, 给出骨骼链, 计算骨骼链各关节变换 <br/>


## 在动画蓝图中使用FABRIK {#在动画蓝图中使用fabrik}

`AnimGraph` <br/>

末端执行器默认作为针脚 <br/>

<img src="/pic/专题/FABRIK/FABRIK.png" width="300" /> <br/> <br/>


### 允许对末端执行器变换进行设置 {#允许对末端执行器变换进行设置}

1.  Details &gt; End Effector &gt; Effector Transform &gt; 左键Pin, 取消Expose As Pin的勾选 <br/>
    
    <img src="/pic/专题/FABRIK/NOPin.png" width="300" /> <br/> <br/>
2.  FABRIK <br/>
    
    <img src="/pic/专题/FABRIK/FABRIKNoPin.png" width="280" /> <br/> <br/>
3.  Effector Transform <br/>
    
    <img src="/pic/专题/FABRIK/FABRIKDetails.png" width="400" /> <br/> <br/>


### 配置末端执行器 {#配置末端执行器}

| -                        |                                                |
|--------------------------|------------------------------------------------|
| Effector Target          | 在动画蓝图绑定的骨骼树中选取目标骨骼           |
| Effector Transform Space | 与Target类型有关, 默认Component Space, 骨骼对应Bone Space |
| Effector Transform       | 相对于Target的变换                             |


### 配置Solver {#配置solver}

设置骨骼链 <br/>

| -         |         |
|-----------|---------|
| Tip Bone  | 机械臂末端骨骼 |
| Root Bone | 机械臂根骨骼 |

