var t = `
import { filter } from "https://cdn.jsdelivr.net/gh/0x018/tinted-words/filter.js";
var text = document.body.innerHTML||"";
text=filter(text)
document.body.innerHTML=text;
`;
var s = document.createElement("script");
s.type = "module";
s.text = t;
document.body.append(s);