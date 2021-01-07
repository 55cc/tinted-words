import { read, write } from './fs.js';

let input = "./word/aaa.txt";
let output = "./word/ban.txt";

let word = read(input);
console.log("read", word)