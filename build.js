import { read, write } from 'fs.js';

let input = "./word";
let output = "./word";
var map = {};

// get word and sort
let word = read(input);
if (!word) console.error("File is empty or does not exist", input)
let list = Array.from(new Set(word.split("\n")))
	.sort(function (a, b) {
		let len = Math.max(a.length, b.length);
		let getCode = (s, i) => (s.charCodeAt(i) || -1)
		for (let i = 0; i < len; i++) {
			let bi = getCode(b, i), ai = getCode(a, i);
			if (bi == ai) { continue; }
			return (ai > bi ? 1 : -1);
		}
	})
	.reverse();

// word to map
list.forEach(v => {
	addWord(v);
});

write(output, list.join("\n"))

list = null;

// output map.js
write('./map.js', `export var map = ${JSON.stringify(map, null, 2)};`);

map = null;

function addWord(word) {

	var parent = map

	for (var i = 0; i < word.length; i++) {
		if (!parent[word[i]]) parent[word[i]] = {}
		parent = parent[word[i]]
	}
	parent.isEnd = true
}

