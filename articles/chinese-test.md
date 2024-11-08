---
title: "中文测试"
excerpt: "JavaScript 有一个基于事件循环的并发模型，
事件循环负责执行代码、收集和处理事件以及执行队列中的子任务。
这个模型与其它语言中的模型截然不同，比如 C 和 Java。"
date: "2020-03-14 6:30"
author:
  name: Yggdrasil
tags:
  - shit
  - hello
---

---

## 1. Markdown

> HTML(HyperText Markup Language)作为一种超文本标记语言(markup language)应运而生，无数的网页从此有了主次分明，层次清晰的格式。如果将 HTML 比作一架重机枪，那么 Markdown 就是一把手枪，满足了主要的文本格式标记的需求，可是操作性却大大简化。秉承**「易读易写」**的宗旨，Markdown 作为一种轻量级标记语言(lightweight markup language)，让无数的程序猿和文字工作者爱不释手。

### 1.1 Markdown 的优点

- 专注你的文字内容而不是排版样式，安心写作。
- 轻松的导出 HTML、PDF 和本身的 .md 文件。
- 纯文本内容，兼容所有的文本编辑器与字处理软件。
- 随时修改你的文章版本，不必像字处理软件生成若干文件版本导致混乱。
- 可读、直观、学习成本低。

### 1.2 对 Markdown 的误解

> **We believe that writing is about content, about what you want to say – not about fancy formatting.**
> 我们坚信写作写的是内容，所思所想，而不是花样格式。 ---- Ulysses for Mac

Markdown 旨在简洁、高效，也由于 Markdown 的易读易写，人们用不同的编程语言实现了多个版本的解析器和生成器。这就导致了目前不同的 Markdown 工具集成了不同的功能（基础功能大致相同），例如流程图与时序图，复杂表格与复杂公式的呈现。

虽然功能的丰富并没有什么本质的缺点，但终归有些背离初衷，何况在编写的过程中很费神，不如使用专业的工具撰写来的更有效率，所以如果你需实现复杂功能，专业的图形界面工具会更加方便。

当然，如果你对折腾这些不同客户端对 Markdown 的定制所带来高阶功能感到愉悦的话，那也是无可厚非的。

### 1.3 Markdown 官方文档

官方的 Markdown 语法规则文档，当然，后文我也会用自己的方式，阐述这些语法在实际使用中的用法。

- [创始人 John Gruber 的 Markdown 语法说明](http://daringfireball.net/projects/markdown/syntax)
- [Markdown 中文版语法说明](http://wowubuntu.com/markdown/#list)

---

## 2. 使用 Markdown

### 2.1 标题

Markdown 通过在行首添加 1-6 个`#`符号来定义不同级别的标题，最多到六级标题。注意`#`后需要加一个空格。

**书写格式如下：**

```
#h1一级标题
##h2二级标题
###h3三级标题
######h6六级标题
```

**解析效果如下：**

# h1 一级标题

## h2 二级标题

### h3 三级标题

#### h4 四级标题

##### h5 五级标题

###### h6 六级标题

特别的，还可使用`=`(高阶标题)和`-`(次阶标题)标记一级和二级标题。

**书写格式如下：**

```
这是高阶标题(效果和一级标题一样)
=
这是次阶标题(效果和二级标题一样)
-
```

**解析效果如下：**

# 这是高阶标题(效果和一级标题一样)

## 这是次阶标题(效果和二级标题一样)

**注意：**
`=`和`-`标记标题时，`=`和`-`的个数在不同的编辑器中都有不同，只要 1 个或者大于等于两个又或者必须要三个(含三个)以上的才可以表示，这倒不是多大的问题了，简单试试就知道了。

### 2.2 加粗、斜体和删除线

- markdown 使用`*`和`_`来强调文本，使用一个`*`和`_`包围的文本会被转化为斜体，而用两个`*`和`_`包围的文本则会被转化成加粗，使用两个`~`包围的文本会被转化为删除线。
- 但是如果你的 `*` 、` _`和 `~` 两边都有空白的话，它们就只会被当成普通的符号
- 如果要在文字前后直接插入普通的星号或底线，你可以用反斜线

**书写格式如下：**

```
*斜体文字*
_斜体文字_
**加粗文字**
__加粗文字__
~~删除内容~~
```

**解析效果如下：**  
_斜体文字_  
_斜体文字_  
**加粗文字**  
**加粗文字**  
~~删除内容~~

### 2.3 列表

Markdown 支持无序列表和有序列表。无序列表可以使用`*`，`+`，`-`三者中任意符号来标记；有序列表则使用`数字`加`.`来标记。**注意标记后面需要加上一个空格，有序列表的数字会被按顺序自动更正**。

**书写格式如下：**

```
**有序列表**

1. 第一点
2. 第二点
4. 第三点

**无序列表**

- 这是无序列表项目
+ 这是无序列表项目
* 这是无序列表项目
```

**解析效果如下：**
**有序列表**

1. 第一点
2. 第二点
3. 第三点

**无序列表**

- 这是无序列表项目

* 这是无序列表项目

- 这是无序列表项目

两个列表之间不能相邻，否则会解释为嵌套的列表。下面这个是嵌套的列表

**书写格式如下：**

```
* 呵呵
    + 嘉嘉
    + 嘻嘻
    + 吼吼
        - 嘎嘎
        - 桀桀
* 哈哈
```

**解析效果如下：**

- 呵呵
  - 嘉嘉
  - 嘻嘻
  - 吼吼
    - 嘎嘎
    - 桀桀
- 哈哈

**注意：**

- 标记后面最少有一个空格或制表符。
- 若不在引用区块中，必须和前方段落之间存在空行，后面最好还是空一行，否则会解释为嵌套的列表。
- 有序列表标记不是按照你写的数字进行显示的，而是根据当前有序列表标记所在位置显示的，如示例 1 所示。
- 无序列表的项目符号是按照实心圆、空心圆、实心方格的层级关系递进的。通常情况下，同一层级使用同一种标记表示，便于自己查看和管理。

### 2.4 引用

在段落前添加一个`>`符号即可将该段落标记为引用，注意`>`后需要添加一个空格。

**书写格式如下：**

```
> 这是引用
```

**解析效果如下：**

> 这是引用

繁琐一点，你也可以在引用段落的每一行都加上`>`符号。并且`>`可以迭代使用，表示引用中的引用效果。

**书写格式如下：**

```
> 这是一级引用
>> 这是二级引用
>>> 这是三级引用

> 这是一级引用
```

**解析效果如下：**

> 这是一级引用
>
> > 这是二级引用
> >
> > > 这是三级引用

> 这是一级引用

再如：**书写格式若如下：**

```
> 这是一级引用
>> 这是二级引用
>>> 这是三级引用
> 这是一级引用
```

**解析效果则：**

> 这是一级引用
>
> > 这是二级引用
> >
> > > 这是三级引用
> > > 这是一级引用

- 从上面两例可看出，如果>、>>和>>>等嵌套使用的话，从>>>退到>时，必须之间要加上一个空行作为过渡，否则默认为下一行和上一行是同一级别的引用。如上例所示。
- 引用完之后，必须再空一行，重新一个新的开始，否则，以后的文字都将在引用的范围内，不要问我为什么，实践出真知。
- 引用的区块内也可以使用其他的 Markdown 语法，包括标题、列表、代码区块等(见下面的解析效果)：

即，**书写格式如下：**

```
> ## 这是一个标题。
>
> 1.   这是第一行列表项。
> 2.   这是第二行列表项。
>
> 给出一些例子代码：
>
>     return shell_exec("echo $input | $markdown_script");
```

**解析效果则：**

> ## 这是一个标题。
>
> 1.  这是第一行列表项。
> 2.  这是第二行列表项。
>
> 给出一些例子代码：
>
>       return shell_exec("echo $input | $markdown_script");

### 2.5 分割线

分割线最常使用就是三个或以上\*，还可以使用-和\_。

**书写格式如下：**

```
***
___

---
```

**解析效果如下\***

---

---

---

**注意：**

- 只要`*`或者`-`大于等于三个就可组成一条平行线。
- 使用`---`作为水平分割线时，要在它的前后都空一行，防止`---`被当成标题标记的表示方式。

### 2.6 插入链接

markdown 文本中插入链接非常方便，有文内链接和引用链接两种方式。注意如果链接的是本地资源，则链接地址为当地资源的路径。

**书写格式如下：**

```
**文内链接**
这是一个文内链接的[例子](http://example.com/ "鼠标悬浮此处显示的标题")。
[这个](http://example.net/)链接在鼠标悬浮时没有标题。
[这个](/about/)链接是本地资源。

**引用链接**
这是一个引用链接的[例子][id]。
[id]: http://example.com/  "鼠标悬浮标题（可选）"

**注意，这里的id没有大小写区分，如果省略id，则前面方括号的内容会被用作id。**

我常用的网站包括[Google][1] ，[Yahoo][2] 和 [MSN][3]。
[1]:	http://google.com/        "Google"
[2]:	http://search.yahoo.com/  "Yahoo Search"
[3]:	http://search.msn.com/    "MSN Search"

**也可以写成**

我常用的网站包括[Google][]，[Yahoo][]和[MSN][]。
[google]: http://google.com/        "Google"
[yahoo]:  http://search.yahoo.com/  "Yahoo Search"
[msn]:    http://search.msn.com/    "MSN Search"
```

**解析效果如下：**

**文内链接**  
这是一个文内链接的[例子](http://example.com/ "鼠标悬浮此处显示的标题")。  
[这个](http://example.net/)链接在鼠标悬浮时没有标题。  
[这个](/about/)链接是本地资源。

**引用链接**  
这是一个引用链接的[例子][id]。  
[id]: http://example.com/ "鼠标悬浮标题（可选）"

**注意，这里的 id 没有大小写区分，如果省略 id，则前面方括号的内容会被用作 id。**

我常用的网站包括[Google] [1] ，[Yahoo] [2] 和 [MSN] [3]。  
[1]: http://google.com/ "Google"  
[2]: http://search.yahoo.com/ "Yahoo Search"  
[3]: http://search.msn.com/ "MSN Search"

**也可以写成**

我常用的网站包括[Google][]，[Yahoo][]和[MSN][]。

[google]: http://google.com/ "Google"
[yahoo]: http://search.yahoo.com/ "Yahoo Search"
[msn]: http://search.msn.com/ "MSN Search"

**注意：**

- 上述的`[1]: http://google.com/ "Google"、[google]: http://google.com/ "Google"`等等之类不会出现在区块中。
- 文内链接和引用链接显示效果是一样的。但是在编辑状态下的使用情况不一样。文内链接紧跟链接文字，可以在看到链接文字的同时清楚的知道链接地址，但是不便于多次重复利用。引用链接可以重复使用，但一般都是将一些链接放在一起统一管理，如一段文字后面或文章结尾，因此在找到链接和链接文字的对应关系上有些麻烦。各有利弊了，分情况使用。
- 我原以为所有 Markdown 编辑器都支持这种引用链接的，经过测试，发现 CSDN 中是支持的，但后来惊奇地发现，引用链接这种方式在[简书](https://www.jianshu.com/)的 Markdown 编辑工具下以及在我的这个 GitHub Pages 中是无法解析的。

### 2.7 插入图片

- 插入图片和插入链接非常类似，只是在方括号前多一个`!`。

插入图片**语法**：`![Alt text](/path/to/img.jpg "Optional title")`

> - Alt text 为如果图片无法显示时显示的文字。
> - /path/to/img.jpg 为图片所在路径。
> - Optional title 为显示标题。显示效果为在你将鼠标放到图片上后，会显示一个小框提示，提示的内容就是 Optional title。

**书写格式如下：**

```
**文内链接：**
![图灵社区](http://www.turingbook.com/Content/img/Turing.Gif)

**引用链接**
[图灵社区][1]
![图灵社区Logo][2]
[1]: http://www.ituring.com.cn
[2]: http://www.turingbook.com/Content/img/Turing.Gif
```

**解析效果如下：**  
**文内链接：**  
![图灵社区](http://www.turingbook.com/Content/img/Turing.Gif)

**引用链接**  
[图灵社区][1]  
![图灵社区Logo][2]  
[1]: http://www.ituring.com.cn  
[2]: http://www.turingbook.com/Content/img/Turing.Gif

**注意：**

- 同上节链接一样，引用链接这种方式在[简书](https://www.jianshu.com/)的 Markdown 编辑工具下以及我的这个 GitHub Pages 中是无法解析的。
- 同时，注意一点：到目前为止， Markdown 还没有办法指定图片的宽高。

### 2.8 表格

表格的书写格式一目了然，还是很方便简洁的。

**书写格式如下：**

```
| 左对齐 | 中间对齐 | 右对齐 |
| :-     |  :-:     |   -:   |
| 左1    |  中1     |  右1   |
| 左2    |  中2     |  右3   |
```

**解析效果如下：**

| 左对齐 | 中间对齐 | 右对齐 |
| :----- | :------: | -----: |
| 左 1   |   中 1   |   右 1 |
| 左 2   |   中 2   |   右 3 |

**注意：**

- 简书、CSDN 中都是能够完整正确解析出表格的；
- 但不知道为什么，CSDN 中表格中的居中、居右不能正确解析出来...sad

### 2.9 脚标 (脚注)

不同于链接，这里的脚标内容会被放在文末，点击可以实现跳转，使用`[^]`来定义脚注。

**书写格式如下：**

```
使用 Markdown[^1]可以效率的书写文档, 可以使用 Leanote[^Le] 编辑器进行书写.
[^1]:Markdown是一种纯文本标记语言
[^Le]:开源笔记平台，支持Markdown和笔记直接发为博文
```

**解析效果如下：**  
使用 Markdown[^1]可以效率的书写文档,可以使用 Leanote[^le] 编辑器进行书写.

[^1]: Markdown 是一种纯文本标记语言
[^le]: 开源笔记平台，支持 Markdown 和笔记直接发为博文

### 2.10 其他

#### 2.10.1 上下标

**书写格式如下：**

```
E = mc<sup>2</sup>
Water: H<sub>2</sub>O
```

**解析效果如下：**

E = mc<sup>2</sup> <br>
Water: H<sub>2</sub>O

#### 2.10.2 直接链接与邮箱

在 markdown 中将链接地址或邮箱地址用`<>`包围，则会被自动转换成可点击的链接。

**书写格式如下：**

```
<http://haoeric.com>
<haoeric0520@gmail.com>
```

**解析效果如下：**

<http://haoeric.com>  
<haoeric0520@gmail.com>

**注意：**
之前在简书、CSDN 中测试都是没有问题的，现在我在 Cmd Mardown 中重新编辑测试，这里的邮箱竟然会出问题（显示不出来），可能这就是不同平台编辑器下的区别吧...

#### 2.10.3 换行

使用 html 标签`<br/>`、`<br>`换行

**书写格式如下：**

```
第一行hahaha<br/>第二行6666
```

**解析效果如下：**  
第一行 hahaha<br/>第二行 6666

#### 2.10.4 反斜杠

如果需要避免文本中的符号被当做 markdown 标识符而发生不必要的格式转化，可以在符号前加`\`来避免。

**书写格式如下：**

```
\*不是斜体\*
```

**解析效果如下：**

\* 不是斜体 \*

给出**Markdown 支持的转义字符列表：**

```
\   反斜线
`   反引号
*   星号
_   底线
{}  花括号
[]  方括号
()  括弧
#   井字号
+   加号
-   减号
.   英文句点
!   惊叹号
```

#### 2.10.5 代码高亮

使用栅栏标记代码块的一个好处是可以标明代码的语种，然后实现代码的高亮。

**书写格式如下：**

> \```ruby

    require 'redcarpet'
    markdown = Redcarpet.new("Hello World!")
    puts markdown.to_html

\```

**解析效果如下：**

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

**注意：**

- 貌似目前[简书](https://www.jianshu.com/)还没有支持代码高亮....sad

#### 2.10.6 关于锚点

网页中，`锚点`其实就是页内超链接，也就是链接本文档内部的某些元素，实现当前页面中的跳转，**可参考 Github**。比如我这里写下一个锚点，点击回到目录，就能跳转到目录。 在目录中点击这一节，就能跳过来。在`Github`的`md` 文件中，会为每个`h1~h6`标签，自动塞入一个`a`标签，并渲染好`id`。

**比如：**

```
# h1
```

**以上 md 语言被渲染成 html 如下：**

```HTML
<h1>
	<a id="user-content-h1" class="anchor" href="#h1" aria-hidden="true">
		<svg aria-hidden="true" class="octicon octicon-link" height="16" role="img" version="1.1" viewBox="0 0 16 16" width="16">
			<path d="M4 9h1v1h-1c-1.5 0-3-1.69-3-3.5s1.55-3.5 3-3.5h4c1.45 0 3 1.69 3 3.5 0 1.41-0.91 2.72-2 3.25v-1.16c0.58-0.45 1-1.27 1-2.09 0-1.28-1.02-2.5-2-2.5H4c-0.98 0-2 1.22-2 2.5s1 2.5 2 2.5z m9-3h-1v1h1c1 0 2 1.22 2 2.5s-1.02 2.5-2 2.5H9c-0.98 0-2-1.22-2-2.5 0-0.83 0.42-1.64 1-2.09v-1.16c-1.09 0.53-2 1.84-2 3.25 0 1.81 1.55 3.5 3 3.5h4c1.45 0 3-1.69 3-3.5s-1.5-3.5-3-3.5z">
			</path>
		</svg>
	</a>
	h1
</h1>
```

不去管`svg`部分，可以看到`h1`标签内嵌入了一个`id`为 `"user-content-h1"`的`a`标签，如果标题为`# h5`，那么 id 就会是 `user-content-h5 `。这样就可以用类似下面的语句对其进行跳转定位：

[快点我](#user-content-h1)，我要跳转到 h1 所在的位置

**效果:** 一点击`快点我，我要跳转到h1所在的位置`,即跳转到 h1 所在的位置。

**还有一种常见的书写格式如下：**

```
 ## <span id=a> 标题a </span>
跳转到[标题a](#a)
```

**解析效果如下：**

## <span id=a> 标题 a </span>

跳转到[标题 a](#a)

**注意：**

- 尽管在某些 Markdown 编辑工具下是无法解析的，比如[简书](https://www.jianshu.com/)。
- 我已经分别在 GitHub 和 CSDN 上测试过以上两种锚点方式，结果**可行**！

### 2.11 Markdown 的局限性

- Markdown 没有居中和右对齐功能，除非做扩展.
- **不同的 Markdown 工具功能会不一样，高级功能并不是都有的.**
- 部分 Markdown 工具不支持语法高亮，不显示代码行号.
- 目录索引很重要，写技术类文章条理很重要，在开篇有个目录，非常有必要.
- 部分 Markdown 工具不支持编辑 LaTex 数学公式，这是非常必要的功能.

### 2.12 细节要点（updating...）

- 首行缩进：在段首加入`&emsp;`、`&ensp;`、`&nbsp;`来输入空格，其中，`&emsp;`是一个中文字符，`&ensp;`是半个中文字符 ，`&nbsp;`是 1/4 中文字符。
- [数字] + `.` + [空格]的形式会呼出有序的项目列表。因此如果你在正文中恰好出现这种形式，那么可以在`.`的前面加上`\`来避免出现有序列表。
- 引用区块`>`和代码区块` ``` `有不同的用途：`>`引用区块中的文本保留 Markdown 语法，而` ``` `代码块中的文本不保留 Markdown 语法。

### 2.13 补充（updating...）

#### 2.13.1 图片图床

插入图片的地址需要图床(什么是图床呢???)，这里推荐[围脖图床修复计划](https://link.jianshu.com/?t=http://weibotuchuang.sinaapp.com/)与[CloudApp](https://link.jianshu.com/?t=https://www.getcloudapp.com/)的服务，生成 URL 地址即可。
**图床**，顾名思义，图片床，即大量图片汇聚地，每一张图片都有一个 url,供所需站点使用。

**推荐工具**

- [七牛云](https://link.jianshu.com/?t=http://www.qiniu.com/)
- [围脖图床修复计划](https://link.jianshu.com/?t=http://weibotuchuang.sinaapp.com/)
- [CloudApp](https://link.jianshu.com/?t=https://www.getcloudapp.com/)

#### 2.13.2 LaTeX 公式

> `$`表示行内公式

**例子如下：**

```
爱因斯坦发明的质能方程是：$E=mc^2$
```

**显示效果：**
爱因斯坦发明的质能方程是：$E=mc^2$

> `$$`表示整行公式

**例子如下：**

```
$$\sum_{i=1}^n a_i=0$$
$$f(x_1,x_x,\ldots,x_n) = x_1^2 + x_2^2 + \cdots + x_n^2 $$
$$\sum^{j-1}_{k=0}{\widehat{\gamma}_{kj} z_k}$$
```

**显示效果：**

$$\sum_{i=1}^n a_i=0$$  
$$f(x_1,x_x,\ldots,x_n) = x_1^2 + x_2^2 + \cdots + x_n^2 $$  
$$\sum^{j-1}_{k=0}{\widehat{\gamma}_{kj} z_k}$$

**注意：**

- 访问[MathJax](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)参考更多使用方法；
- CSDN、Cmd Markdown 这里都是可以解析的，But 在某些 Markdown 编辑工具下是无法解析的，比如[简书](https://www.jianshu.com/)、我的这个 GitHub Pages 中。

#### 2.13.3 流程图

**例子如下：**

```
flow
st=>start: Start:>https://www.zybuluo.com
io=>inputoutput: verification
op=>operation: Your Operation
cond=>condition: Yes or No?
sub=>subroutine: Your Subroutine
e=>end
st->io->op->cond
cond(yes)->e
cond(no)->sub->io
```

**显示效果：**  
flow  
st=>start: Start:>[https://www.zybuluo.com](https://link.jianshu.com?t=https://www.zybuluo.com)  
io=>inputoutput: verification  
op=>operation: Your Operation  
cond=>condition: Yes or No?  
sub=>subroutine: Your Subroutine  
e=>end  
st->io->op->cond  
cond(yes)->e  
cond(no)->sub->io

**注意：**

- **更多语法参考**: [流程图语法参考](http://adrai.github.io/flowchart.js/)；
- 在某些 Markdown 编辑工具下是无法解析的，比如 CSDN、Cmd Markdown、[简书](https://www.jianshu.com/)。

#### 2.13.4 其他某些平台特有语法(updating...)

> Github 中的 emoji 表情  
> Github 的 Markdown 语法支持添加 emoji 表情，输入不同的符号码（两个冒号包围的字符）可以显示出不同的表情。  
> 比如 `:blush:`，可以显示 :blush:
> **更多表情符号点这里：**[emoji 表情列表](Emoji_CN.md)

---

## 3. Markdown 工具的选择

### 3.1 Mac 平台

在 Mac OS X 上，用 [Mou](http://25.io/mou/) 这款免费且十分好用的 Markdown 编辑器，它支持实时预览，既左边是你编辑 Markdown 语言，右边会实时的生成预览效果。

其次还有很多同类选择。如果你是个编辑作者，建议你购买 [Ulysses Ⅲ](http://www.ulyssesapp.com/)，这款应用入围了苹果 2013 年 Mac App Store 的 The Best of 2013，相比 Mou 它支持更多的写作格式、多文档的支持。Mou、iA Writer 这些应用都是基于单文档的管理方式，而 Ulysses Ⅲ 支持 Folder、Filter 的管理，一个 Folder 里面可以创建多个 Sheet，Sheet 之间还可以进行 Combine 处理。

### 3.2 Linux 平台

ReText、[Cmd Markdown](https://www.zybuluo.com/cmd/)、vim、 [Mango](https://github.com/egrcc/Mango)、[Haroopad](http://pad.haroopress.com/user.html)

> **以 vim 为例** ><br>
> 在 vim 中写 markdown，首先安装语法高亮的插件－－[vim-markdown](https://github.com/plasticboy/vim-markdown)．至于预览，则有很多方式：
>
> 1.  使用 vim 插件－－[vim-instant-markdown](https://github.com/suan/vim-instant-markdown)

    此方法可以实现markdown实时预览，不过得首先安装nodejs和npm．详细的安装过程见[vim插件汇总－－Markdown插件](http://blog.csdn.net/u012948976/article/details/48227713)．

> 2.  vim 其他插件－－[python-vim-instant-markdown](https://github.com/isnowfy/python-vim-instant-markdown)
> 3.  通过＂Markdown.pl＂转换成 html 在浏览器预览

    见博文[ vim与markdown ](http://blog.chinaunix.net/uid-20147410-id-3611957.html)．该方式得手动预览．

> 4.  使用 Pandoc

    [利用 Pandoc 预览 VIM 中书写的 Markdown](http://www.jmlog.com/use-pandoc-to-preview-markdown-in-vim/)

> 5.  chrome 插件－－Markdown Preview Plus

    [vim编辑markdown时实现预览](http://howiefh.github.io/2013/05/16/vim-markdown-preview/)

> <br>  
>  关于产生文章目录的几种方式
>
> 1.  安装完插件－－[vim-markdown](https://github.com/plasticboy/vim-markdown)后，在 vim 中直接输入命令`:Toc`即可打开显示目录的窗口。
> 2.  安装插件－－[tagbar](https://github.com/majutsushi/tagbar)，并参考[markdown 配置](https://github.com/majutsushi/tagbar/wiki#markdown)设置即可，注意  
>     g:tagbar_type_markdown 和 ‘ctagstype’: ‘markdown’ 这两个地方需要和你的 vim 所识别的 markdown 格式匹配。检测自己的 vim 所识别的 markdown 文本的格式的方式是在 vim 中输入 :set filetype? ，所显示的 filetype= 后面的内容如果不是 markdown，则需要用来替换上面两个地方。
>
> 并且`'ctagsbin' : '/path/to/markdown2ctags.py',`中的`/path/to`必须替换成自己的路径。
>
> 3.  安装插件－－[VOoM](https://github.com/vim-voom/VOoM)和[VOoM(原 VOOF)：vim 实现带折叠双栏树状文本管理](https://xbeta.info/vim-voof.htm)。
> 4.  如果想将 markdown 转为带目录的 html 文件并在浏览器中预览，可使用 githhub 项目－－[i5ting_ztree_toc](https://github.com/i5ting/i5ting_ztree_toc)。

### 3.3 Window 平台

Windows 下的 Markdown 工具，有两款还算不错，一款叫 [MarkdownPad](http://markdownpad.com/) ，另一款叫 [MarkPad](http://markpad.fluid.impa.br/)。

就我知道的，还有[马克飞象](https://maxiang.io/client_zh "马克飞象，专为印象笔记打造的 Markdown 编辑器")、[Cmd Markdown](https://www.zybuluo.com/mdeditor)相关编辑器。

### 3.4 IOS 平台

iOS 端已有相当多的 app 支持 Markdown 语法编辑，例如 Drafts、Day One、iA Writer 等。

### 3.5 Web 平台

Web 端上，推荐 [简书](https://www.jianshu.com/ "创作你的创作，一个优质创作社区")这款产品，上面有无数热爱文字的人在不停的创造、分享。简书的 Web 端使用 Markdown 很舒服，它同样支持左右两栏的实时预览，字体优雅、简洁。

同样是 Web 端， [Draftin](https://draftin.com/) 、 [马克飞象](http://maxiang.info/ "马克飞象，专为印象笔记打造的 Markdown 编辑器")、 [Dillinger.io](http://dillinger.io/) 、[Cmd Markdown](https://www.zybuluo.com/mdeditor)、[Markable.in](https://markable.in/)这些在线 MD 编辑器也还都不错。

### 3.6 高级应用

当然，这里不能少了一款非常精巧的文本编辑器，适合编写代码、做笔记、写文章。它用户界面十分整洁，功能非同凡响，性能快得出奇。它就是 [Sublime](http://www.sublimetext.com/)！！！
具体可阅览 Sublime 通过插件实现自如编辑 Markdown 文档的 [教程](https://blog.csdn.net/jave_f/article/details/79894028)。

**如有更好的 Markdown 免费编辑器推荐，请到[这里留言反馈](https://github.com/Javef/Markdown/issues)，谢谢！**

---

## 4. 更多链接

- [MarkDown 学习笔记](https://www.jianshu.com/p/564bdf3a9462?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)
- [首次使用 MarkDown 好激动](https://www.zybuluo.com/liayun/note/371635)
- [让你的 Markdown 用起来得心应手](https://www.jianshu.com/p/d7d6da4b7c60?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)
- [一段 JS 代码让 Markdown 自动生成侧边栏目录](https://www.jianshu.com/p/34c92cbd0aaf/)
- [Markdown 语法说明 (简体中文版)](http://wowubuntu.com/markdown/index.html)
