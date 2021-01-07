import { filter } from "./filter.js";
var text = `曹操的24口交换机发生了故障,急得他破口大骂:"操,这他妈的交换机不行啊.我曹操命苦啊".伤心欲绝之下他想起了他妈的嘱咐:碰到问题就找你大爷,他牛逼着呢!`;
text = filter(text);
console.log(text);
