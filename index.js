var t = `
import { filter } from "https://cdn.jsdelivr.net/gh/0x018/tinted-words/filter.js";
Array.from(document.querySelectorAll("*"))
  .flatMap(e => Array.from(e.childNodes).filter(n => n.nodeType == 3)).forEach(e => {
    e.data = filter(e.data);
  });
`;
var s = document.createElement("script");
s.type = "module";
s.text = t;
document.body.append(s);