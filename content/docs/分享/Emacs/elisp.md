---
title: "elisp"
date: 2023-08-12T23:48:25
lastmod: 2023-08-14T13:17:22+08:00
draft: false
weight: 1003
---

## 便签 {#便签}

[Manual](https://www.gnu.org/software/emacs/manual/html_mono/elisp.html) <br/>


## 文件 {#文件}


### 打开文件 {#打开文件}

```elisp
(find-file "path/to/file")
```


### 使用打开链接的方式，打开指定文件 {#使用打开链接的方式-打开指定文件}

```elisp
(org-open-file "path/to/file")
```


### 打开链接 {#打开链接}

`C-c C-o` <br/>

```elisp
(org-open-at-point)
```


## 文本 {#文本}


### 在光标处插入 {#在光标处插入}

```elisp
(insert "Hello")
```


### 读取输入 {#读取输入}

```elisp
(read-string "Promots: ")
```


### 搜索并替换 {#搜索并替换}


#### 字符串replace-string {#字符串replace-string}

replace-string会跳过链接匹配 <br/>


#### 全文搜索并替换 {#全文搜索并替换}

```elisp
(while (search-forward "file:tt.txt" nil t)
  (replace-match "file:pp.txt" nil t))
```


### 字符串查找 {#字符串查找}


#### search-backward {#search-backward}

```elisp
(search-backward "=")

;; 查找成功返回t
(search-backward "[[ue:" nil t)
```


### 正则查找 {#正则查找}


#### re-search-forward {#re-search-forward}

-   目的字符串 <br/>
    ```text
    [[ue:UE_5.1/Engine/Source/Runtime/Core/Public/Math/Interval.h=
    ```
-   正则匹配 <br/>
    ```elisp
    (re-search-forward (rx "[[ue:" (group (0+ (not "]"))) "][虚幻引擎:" (group (0+ (not "]"))) "]]" ))
    
    ;; 匹配返回t
    (re-search-forward (rx "[[ue:" (group (0+ (not "]"))) "][虚幻引擎:" (group (0+ (not "]"))) "]]" ) nil t)
    ```


### 复制 {#复制}

```elisp
(copy-region-as-kill (point-min) (point-max))
```


## 光标 {#光标}


### 光标所在位置 {#光标所在位置}

```elisp
(point)
```


### 去到指定位置 {#去到指定位置}

```elisp
(goto-char (point))
```


### 光标信息 {#光标信息}

```elisp
(what-cursor-position)
```


### 记忆光标位置, 处理结束恢复 {#记忆光标位置-处理结束恢复}

```elisp
(save-excursion
  (insert "hello"))
```


### 获取光标间字符串 {#获取光标间字符串}

```elisp
(buffer-substring-no-properties (point-min) (point-max))
```


## 缓冲区 {#缓冲区}


### 获取buffer内容 {#获取buffer内容}

```elisp
(buffer-string)
```


### 在临时buffer中做处理 {#在临时buffer中做处理}

```elisp
(with-temp-buffer
  (insert "hello"))
```


### 保存buffer {#保存buffer}

```elisp
(save-buffer)
```


### 关闭buffer {#关闭buffer}

```elisp
(kill-buffer)
```


### 获取buffer对应的文件名 {#获取buffer对应的文件名}

```elisp
(buffer-name)
```


### 获取给定文件的buffer {#获取给定文件的buffer}

```elisp
(get-buffer (buffer-name))
```


## 控制语句 {#控制语句}


### 条件控制语句 {#条件控制语句}


#### if {#if}

-   缩进作为true和false的分支 <br/>
-   各一条语句 <br/>

<!--listend-->

```elisp
(if (= 3 5)
    (message "equal")
  (message "not equal"))
```


#### when：cond为true时继续 {#when-cond为true时继续}

```elisp
(when (< 3 5)
  (setq ooout '("less"))
  (message "%s" (cons "multi" ooout)))
```


#### unless：cond为false时继续 {#unless-cond为false时继续}

```elisp
(unless (> 3 4)
  (setq ooout '("false" "3 < 4" "is" "true" "!"))
  (pop ooout)
  (message "%s" ooout))
```


### 循环while {#循环while}


#### break {#break}

[Catch-and-Throw](https://www.gnu.org/software/emacs/manual/html_node/elisp/Catch-and-Throw.html) <br/>

```elisp
(let ((cnt 0))
  (catch 'break
    (while t
      (setq cnt (+ cnt 1))
      (sleep-for 1)
      (if (= cnt 5)
          (throw 'break t)              
        )
      )
    )
  )
```


## 功能函数 {#功能函数}


### 等待 {#等待}

```elisp
(sleep-for 2)
```


### hook {#hook}


#### 添加hook {#添加hook}

```elisp
(add-hook 'emms-player-started-hook (lambda () (emms-seek-to "05:05") (emms-pause)))
```


#### 移除hook {#移除hook}

```elisp
(remove-hook 'emms-player-started-hook (lambda () (emms-seek-to "05:05") (emms-pause)))
```


### 函数调用 {#函数调用}


#### funcall {#funcall}

第一个参数是函数，之后的组成参数列表，传入第一个参数对应的函数 <br/>

```elisp
(funcall (emms-player-get player 'start) track)

;; (emms-player-get player 'start)  查dictionary得到emms-player-mpv-start
;; (emms-player-mpv-start track)
```


#### apply-partially {#apply-partially}

-   类似C++的bind，预设函数调用的参数 <br/>
-   使用时，根据需求传入剩余参数 <br/>

<!--list-separator-->

-  返回函数

    将args作为func的前n个参数传入，调用函数时，和实际传参拼接，传给func <br/>
    
    ```elisp
    (defun apply-partially (func &rest args)
      ;;...
      )
    ```

<!--list-separator-->

-  定义函数

    ```elisp
    (defun emms-player-mpv-cmd (cmd &optional handler)
      ;;...
      )
    
    (setq func (apply-partially 'emms-player-mpv-cmd play-cmd
                                (lambda (_mpv-data mpv-error)
                                  (when (eq mpv-error 'connection-error)
                                    (emms-player-mpv-cmd play-cmd)))))
    
    (funcall func)
    ```


## 定义变量 {#定义变量}


### 使用let定义局部变量 {#使用let定义局部变量}

```elisp
(let ((x 10) (y 20) (z 30))
  (message (format "%d %d %d" x y z)))
```


#### 变量之间存在引用 {#变量之间存在引用}

```elisp
(let* ((x 10) (y (+ x 10)))
  (message (format "%d %d" x y)))
```


#### 使用setq对局部变量值进行修改 {#使用setq对局部变量值进行修改}


### 使用setq定义全局变量 {#使用setq定义全局变量}

可以使用 `C-h v` 查看变量值 <br/>


### buffer-local变量 {#buffer-local变量}

buffer内设置变量使用setq, 所有buffer生效使用setq-default <br/>


## 函数 {#函数}


### 返回值 {#返回值}

函数最后一条语句的执行结果作为返回值 <br/>


### 定义 {#定义}


#### 可选参数：传参时，arg1必须匹配，arg2可选 {#可选参数-传参时-arg1必须匹配-arg2可选}

```elisp
(defun test-func (arg1 &option arg2)
  ;;...
  )
```


#### 可变参数：传参时，arg1必须匹配，之后传入参数个数可变 {#可变参数-传参时-arg1必须匹配-之后传入参数个数可变}

必须放在参数列表最后 <br/>

```elisp
(defun test-func (arg1 &rest args)
  ;;...
  )
```


## 数据结构 {#数据结构}


### string {#string}


#### 删除空格 {#删除空格}

```elisp
(string-trim " Hello ")
```


#### 切分字符串成列表 {#切分字符串成列表}

```elisp
(split-string opath "/")

;; 不包含为空的元素
(split-string opath "/" t)
```


#### 判等 {#判等}

```elisp
(string= "hello" "Hello")
```


#### 不改变字符串, 返回去除前缀结果 {#不改变字符串-返回去除前缀结果}

```elisp
(string-remove-prefix "/" slot)
```


### list {#list}


#### 构造list {#构造list}

```elisp
(setq slotlist '())
```


#### 元素操作 {#元素操作}

<!--list-separator-->

-  将元素添加到列表(头插)

    ```elisp
    (add-to-list 'slotlist export-name)
    ```

<!--list-separator-->

-  删除首元素

    ```elisp
    (pop list)
    ```

<!--list-separator-->

-  获取指定元素

    ```elisp
    (nth N list)
    ```


#### list操作 {#list操作}

<!--list-separator-->

-  长度

    ```elisp
    (length list)
    ```

<!--list-separator-->

-  打印

    ```elisp
    (print list)
    ```

<!--list-separator-->

-  返回头插的新list

    ```elisp
    (cons x list)
    ```

<!--list-separator-->

-  返回拼接后的新list

    ```elisp
    (append list1 list2)
    ```

<!--list-separator-->

-  将list转换为字符串

    ```elisp
    (format "%s" list)
    ```

<!--list-separator-->

-  遍历列表

    ```elisp
    (dolist (item the-list)
      ;; 操作item
      )
    ```

<!--list-separator-->

-  将末尾元素组成列表

    ```elisp
    (last list)
    ```

<!--list-separator-->

-  获取首元素

    ```elisp
    (car list)
    ```

<!--list-separator-->

-  返回反转列表拷贝

    ```elisp
    (reverse slotlist)
    ```


### alist {#alist}

`Associate List` <br/>

```elisp
(setq list '(("mary" . 23) ("john" . 24) ("smith" . 33)))
```


#### 通过key获取键值对 {#通过key获取键值对}

```elisp
(assoc "john" list)
```


#### 通过value获取键值对 {#通过value获取键值对}

```elisp
(rassoc 24 list)
```


#### 获取键值对的key {#获取键值对的key}

```elisp
(car (assoc "john" x))    
```


#### 获取键值对的value {#获取键值对的value}

```elisp
(cdr (assoc "john" x))
```


## 运算符 {#运算符}


### 不等 {#不等}

```elisp
/=
```

