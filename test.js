import { read, write } from './fs.js';

let input = "./word/a.txt";
let output = "./word/b.txt";

let word = read(input);
console.log("read", word);
write(output, "text");