---
title: "使用ox-hugo导出博客"
date: 2023-08-12T16:36:21
lastmod: 2023-08-12T21:35:33+08:00
draft: false
weight: 2005
---

## 说明 {#说明}

| -        | 描述                        | 解决方法                    |
|----------|---------------------------|-------------------------|
| ox-hugo  | 安装                        |                             |
|          | 导出子树时, 整个文件的所有链接要求正确 | 提取options和子树文本       |
|          | 导出子树时, 自动计算weight, 需要保留其他子树 | 计算子树的weight            |
|          | 导出文件时, 若在临时文件, 需输入导出文件名 | 导出子树, 计算子树的导出路径 |
|          | 转换后的下划线无效          | 不用                        |
| Doks主题 | markdown文件图片链接无法正确解析 | 替换图片链接                |
|          | 会检查所有文本(包括代码块)的图片链接 | 分隔"{{"和"&lt; figure src..." |
|          | 图片链接后接文本, 会作为图片描述 | 图片链接和文本之间空一行    |
| org-roam | 希望能跳转到博客对应标题    | 将roam节点链接替换为博客+标题链接 |
| 时间戳链接 | 不需要                      | 删除                        |
| 源码链接 | 不需要跳转, 需提供说明      | 在文本块中显示相对路径      |


## ox-hugo-安装 {#ox-hugo-安装}

```elisp
(use-package ox-hugo
  :ensure t   ;Auto-install the package from Melpa
  :pin melpa  ;`package-archives' should already have ("melpa" . "https://melpa.org/packages/")
  :after ox
  :config
  ;; 不处理图片
  (setq org-hugo-external-file-extensions-allowed-for-copying nil))
```


## 子树路径 {#子树路径}


### 获取导出文件路径 {#获取导出文件路径}

-   保存到列表 <br/>
-   只能有全局SECTION, 子树使用SECTION_FRAG <br/>
-   缺乏子树从属判断 <br/>

<!--listend-->

```elisp
(defun my/compute-subtree-path (export-name)
  (interactive)
  (let ((base-dir)
        (section)
        (dir)
        (slotlist '())
        (cur-level)
        (frag)
        (new-level))
    (save-excursion
      (beginning-of-buffer)
      (when (re-search-forward (rx "#+HUGO_BASE_DIR: " (group (0+ (not "\n"))) "\n") nil t)
        (setq base-dir (string-join (mapcar #'string (match-string 1))))
        (beginning-of-buffer)
        (when (re-search-forward (rx "#+HUGO_SECTION: " (group (0+ (not "\n"))) "\n") nil t)
          (setq section (string-join (mapcar #'string (match-string 1))))
          (setq dir (concat base-dir "/content/" section))
          )
        )
      )
    (add-to-list 'slotlist export-name)
    (save-excursion
      (setq cur-level (funcall outline-level))
      (while (re-search-backward (rx ":EXPORT_HUGO_SECTION_FRAG: " (group (0+ (not "\n"))) "\n" ) nil t)
              (setq frag (string-join (mapcar #'string (match-string 1))))
              (setq new-level (funcall outline-level))
              (when (< new-level cur-level)
                ;;(message "%d %d %s" (funcall outline-level) ocur-level ofrag)
                ;;(sleep-for 5)
                (add-to-list 'slotlist frag)
                (setq cur-level new-level)
                )
              )
      )
    (add-to-list 'slotlist dir)          
    )
  )
```


### 获取导出文件路径的字符串 {#获取导出文件路径的字符串}

```elisp
(defun my/subtree-path-str (export-name)
  (interactive)
   (let ((slotlist (my/compute-subtree-path export-name))
         (slot))
     (dolist (item slotlist)
       (setq slot (concat slot "/" item))
       )
     (string-remove-prefix "/" slot)
     )
   )
```


## Doks主题 {#doks主题}


### 替换markdown文件图片链接格式 {#替换markdown文件图片链接格式}

```elisp
(defun my/replace-pic-link-format (file)
  (interactive)
  (with-current-buffer (find-file-noselect file)
    (beginning-of-buffer)
    (while (re-search-forward (rx "{{" "< figure src=\"" (group (0+ (not "\""))) "\" width=\"" (group (0+ (not "\""))) "\" >}}") nil t)
      (let ((src (string-join (mapcar #'string (match-string 1))))
            (width (string-join (mapcar #'string (match-string 2)))))
        (replace-match (format "<img src=\"/%s\" width=\"%s\" /> <br/>" src width))
       )
      )
    (save-buffer)
    (kill-buffer)
    )
  )
```


### 替换子树导出文件图片链接格式 {#替换子树导出文件图片链接格式}

```elisp
(defun my/amend-pic-link (export-name)
  (interactive)
  (my/replace-pic-link-format (concat (my/subtree-path-str export-name) ".md"))
  )
```


### 替换文件内所有子树导出文件图片链接格式 {#替换文件内所有子树导出文件图片链接格式}

```elisp
(defun my/amend-pic-link-for-all ()
  (interactive)
  (beginning-of-buffer)
  (while (re-search-forward (rx ":EXPORT_FILE_NAME: " (group (0+ (not "\n"))) "\n") nil t)
    (my/amend-pic-link (string-join (mapcar #'string (match-string 1))))
    )
  )
```


## org-roam {#org-roam}


### 需设置相对路径 {#需设置相对路径}

```elisp
;; (setq my/roam-prefix "hugo/content/")
```


### 将roam节点链接替换为博客+标题链接 {#将roam节点链接替换为博客-plus-标题链接}

相对路径计算采用去除前缀 <br/>

```elisp
(defun my/replace-roam-link ()
  (interactive)
  (save-excursion
    (beginning-of-buffer)
    (while (re-search-forward (rx "[[id:" (group (0+ (not "]"))) "][" (group (0+ (not "]"))) "]]") nil t)
      (let* ((id (string-join (mapcar #'string (match-string 1))))
             (title (string-join (mapcar #'string (match-string 2))))
             (title-downcase (string-replace "::" "-" (downcase title)))
             (node (org-roam-node-from-id id))
             (slot))
        (with-current-buffer (find-file-noselect (org-roam-node-file node))
          (goto-char (org-roam-node-point node))
          (outline-next-heading)
          (when (re-search-backward (rx ":EXPORT_FILE_NAME: " (group (0+ (not "\n"))) "\n") nil t)
            (setq slot (my/subtree-path-str (string-join (mapcar #'string (match-string 1)))))
            )
          )
        (when slot
          (save-excursion
            (beginning-of-buffer)
            (when (search-forward (format "[[id:%s][%s]]" id title) nil t)
              ;;(message (format "%s %s" slot title))
              ;;(sleep-for 1)
              (replace-match (format "[[file:/%s/#%s][%s]]"
                                     (downcase (string-remove-prefix my/roam-prefix slot))
                                     title-downcase
                                     title) nil t)
              )
            )
          )
        )
      )
    )
  )
```


## 时间戳链接 {#时间戳链接}


### 删除时间戳链接 {#删除时间戳链接}

```elisp
(defun my/delete-timestamp-link ()
  (interactive)
  (save-excursion
    (beginning-of-buffer)
    (while (re-search-forward (rx "[[timestamp:" (group (0+ (not "]"))) "][" (group (0+ (not "]"))) "]]") nil t)
      (replace-match "" nil t)
      )
    )
  )
```


## 源码链接 {#源码链接}


### 虚幻引擎项目源码 {#虚幻引擎项目源码}

```elisp
(defun my/replace-ue-project-file-link ()
  (interactive)
  (save-excursion
    (beginning-of-buffer)
    (while (re-search-forward (rx "[[uep:" (group (0+ (not "]"))) "][" (group (0+ (not ":"))) ":" (group (0+ (not "]"))) "]]" ) nil t)
      (let ((proj (string-join (mapcar #'string (match-string 2))))
            (file (string-join (mapcar #'string (match-string 3)))))
        (replace-match (format "=%s: %s=" proj file) nil t)
        )
      )
    )
  )
```


### 虚幻引擎源码 {#虚幻引擎源码}

```elisp
(defun my/replace-ue-engine-file-link ()
  (interactive)
  (save-excursion
    (beginning-of-buffer)
    (while (re-search-forward (rx "[[ue:" (group (0+ (not "]"))) "][虚幻引擎:" (group (0+ (not "]"))) "]]" ) nil t)
      (let ((file (string-join (mapcar #'string (match-string 1)))))
        (replace-match (format "=%s=" file) nil t)
        )
      )
    )
  )
```


### 虚幻引擎项目源码链接逆向恢复 {#虚幻引擎项目源码链接逆向恢复}

```elisp
;; (defun my/recover-ue-project-file-link ()
;;   (interactive)
;;   (beginning-of-buffer)
;;   (while (re-search-forward (rx "=ShootThemUp: " (group (0+ (not "="))) "=") nil t)
;;     (let ((filename (string-join (mapcar #'string (match-string 1))))
;;           (folder))
;;       (if (string-suffix-p ".h" filename)
;;           (setq folder "Public/"))
;;       (if (string-suffix-p ".cpp" filename)
;;           (setq folder "Private/"))
;;       (if (string-suffix-p ".cs" filename)
;;           (setq folder ""))
;;       (if (string-prefix-p "STUGameModeBase" filename)
;;           (setq folder ""))
;;       (replace-match (format "[[uep:%s%s][ShootThemUp:%s]]" folder filename filename) nil t)
;;       )
;;     )
;;   )
```


## 复制文本内容 {#复制文本内容}


### 选项 {#选项}

```elisp
(defun my/copy-org-options ()
  (interactive)
  (save-excursion
    (beginning-of-buffer)
    (let ((op-start (point)))
      (outline-next-heading)
      (buffer-substring-no-properties op-start (point))
      )
    )
  )
```


### 子树 {#子树}

```elisp
(defun my/copy-org-subtree ()
  (interactive)
  (save-excursion
    (outline-next-heading)
    (when (re-search-backward (rx ":EXPORT_FILE_NAME: " (group (0+ (not "\n"))) "\n") nil t)
      (outline-previous-heading)
      (org-copy-subtree)
      (current-kill 0)
      )
    )
  )
```


## 计算权重 {#计算权重}

```elisp
(defun my/backward-heading-same-level ()
  (interactive)
  (org-backward-heading-same-level 1)
  (point)
  )
(defun my/compute-weight ()
  (interactive)
  (let ((cur-pos)
        (weight 1001))
    (save-excursion
      (outline-next-heading)
      (when (re-search-backward (rx ":EXPORT_FILE_NAME: " (group (0+ (not "\n"))) "\n") nil t)
        (org-previous-visible-heading 1)
        (setq cur-pos (point))
        (while (/= cur-pos (my/backward-heading-same-level))
          (setq weight (+ weight 1))
          (setq cur-pos (point))
          )
        (message "%d" weight)
        )
      )
    )
  )
```


## 导出子树 {#导出子树}


### 光标所在子树 {#光标所在子树}

```elisp
(defun my/ox-hugo-export-subtree ()
  (interactive)
  (save-excursion
    (outline-next-heading)
    (when (re-search-backward (rx ":EXPORT_FILE_NAME: " (group (0+ (not "\n"))) "\n") nil t)
      (let* ((export-name (string-join (mapcar #'string (match-string 1))))
             (subtree (my/copy-org-subtree))
             (options (my/copy-org-options))
             (weight (my/compute-weight))
             (slotlist '())
             (slotlist (my/compute-subtree-path export-name))
             (slot)
             (section)
             (cur-level))
        (with-temp-buffer
          (insert options)
          (insert subtree)
          (org-mode)
          (my/delete-timestamp-link)
          (my/replace-ue-project-file-link)
          (my/replace-ue-engine-file-link)             
          (my/replace-roam-link)
          (pop slotlist)
          (setq slotlist (reverse slotlist))
          (pop slotlist)
          (setq slotlist (reverse slotlist))
          (dolist (item slotlist)
            (setq slot (concat slot "/" item))
            )
          (beginning-of-buffer)
          (when (re-search-forward (rx "+HUGO_SECTION: " (group (0+ (not "\n")))) nil t)
            (setq section (string-join (mapcar #'string (match-string 1))))
            (replace-match (format "+HUGO_SECTION: %s" (concat section slot)))
            )
          (beginning-of-buffer)
          (when (re-search-forward (rx "EXPORT_HUGO_WEIGHT: " (group (0+ (not "\n")))) nil t)
            (replace-match (format "EXPORT_HUGO_WEIGHT: %s" weight))
            )
          (beginning-of-buffer)
          (outline-next-heading)
          (setq cur-level (funcall outline-level))
          (while (/= 1 cur-level)
            (org-shiftmetaleft)
            (setq cur-level (funcall outline-level))
            )
          (org-hugo-export-wim-to-md)
          (my/amend-pic-link export-name)
          )
        )
      )
    )
  )
(global-set-key (kbd "C-c h s") 'my/ox-hugo-export-subtree)
```


### 文件内所有子树 {#文件内所有子树}

```elisp
(defun my/ox-hugo-export-all-subtrees ()
  (interactive)
  (save-excursion
    (let ((buf-content (buffer-string)))
      (with-temp-buffer
        (insert buf-content)
        (org-mode)
        (my/delete-timestamp-link)
        (my/replace-ue-project-file-link)
        (my/replace-ue-engine-file-link)             
        (my/replace-roam-link)
        (org-hugo-export-wim-to-md :all-subtrees)
        (my/amend-pic-link-for-all)
        )
      )
    )
  )
(global-set-key (kbd "C-c h a") 'my/ox-hugo-export-all-subtrees)     
```

