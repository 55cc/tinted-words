## Tinted Words
	敏感词,脏话 屏蔽替换等

### install

[quickjs](https://bellard.org/quickjs/):
```
wget https://github.com/bellard/quickjs
cd quickjs
make && make install
```
可以自行替换其他js引擎,支持`文件读写`,支持`ES Modules`的都可以.

文件读写封装在`fs.js`,可以统一修改.

### run

```
./run.sh
```
1.setmap.js // 更新词库,生成 `ban.js`,`allow.js`

2.example.js // 运行样例

```
run example.js:

输入:曹操的24口交换机被刘备砸了,急得曹操破口大骂:"操,这他妈的刘备啊".
结果:曹操的24口交换机被刘备砸了,急得曹操破口大骂:"呵,这刘备啊".

输入:伤心欲绝之下他想起了他妈的嘱咐:碰到问题就找你大爷,他牛逼着呢!
结果:伤心欲绝之下他想起了他妈的嘱咐:碰到问题就找你大爷,他厉害着呢!

输入:大爷,牛逼啊
结果:大爷,厉害啊

输入:你大爷,牛逼啊
结果:呵呵呵,厉害啊

输入:草,你大爷,这有一颗草
结果:呵,呵呵呵,这有一颗草

输入:卧槽!滚开,你怎么能这样
结果:呵呵!走开,你怎么能这样

输入:生儿子煤屁眼
结果:生儿子煤**

输入:坑爹啊坑爹啊小瘪三啊小瘪三啊小赤佬小赤佬哎哟妈呀小瘪三小瘪三
结果:好坑啊好坑啊***啊***啊******哎哟啊呀******

run end
```

### 使用

```
import { filter } from "./filter.js";
let result = filter(text);
```
直接在html中使用:

```
<script type="module">
import { filter } from "https://cdn.jsdelivr.net/gh/0x018/tinted-words/filter.js";
var text = document.body.innerHTML||"";
text=filter(text)
document.body.innerHTML=text;
</script>
```
或者:

```
<script src="https://cdn.jsdelivr.net/gh/0x018/tinted-words/index.js"></script>
```

### 词库txt说明

词库txt文件有变更时,需要手动运行`setmap.js`

运行`setmap.js`会读取以下文件:

`ban.txt`,`allow.txt`,`punctuation.txt`

会对 `ban.txt`,`allow.txt` 内容重新排序,

不要在没保存的情况下运行`setmap.js`

./word/ban.txt:
```
aaa:bbb // 把aaa替换为bbb
aaa|aaA|AaA:bbb // 把aaa,aaA,AaA,等价,替换为bbb
a^   // 匹配a+标点,标点只支持单个匹配
aaa  // 屏蔽aaa为***
aaa: // 删除aaa,当成""
```

./word/allow.txt:
```
aa:baa // 如果屏蔽aa,那么不屏蔽baa中的aa
aa:aac|caa // 如果屏蔽aa,那么不屏蔽aac,caa中的aa

```
