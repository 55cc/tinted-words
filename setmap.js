import { read, write } from './fs.js';

let bantxt = "./word/ban.txt";
let allowtxt = "./word/allow.txt";
let pctt = "./word/punctuation.txt";

let banjs = "./ban.js";
let allowjs = "./allow.js";

function stringify(data) {
	return JSON.stringify(data, null, 0);
}
function eachLine(src, addMap, rewrite) {
	let map = {};
	let list = null;
	let word = read(src);
	if (!word) {
		console.log("File is empty or does not exist", src);
		list = [];
	} else {
		list = Array.from(new Set(word.split("\n").filter(v => !!v)))
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
	}

	// word to map
	list.forEach((v, i) => {
		if (addMap) {
			v = addMap(map, v);
			if (v) { list[i] = v; }
		}
	});

	if (list.length > 0) {
		if (rewrite) rewrite(list);
	}

	list = null;
	return map;
}

// 1.get word and sort  2.addBan  3.rewrite
let map = eachLine(bantxt, addBan, (list) => write(bantxt, list.join("\n")));

let pmap = Object.fromEntries(
	(read(pctt) || "")
		.replace(/[<]/g, "") // html 中 < 不作为标点处理
		.split("").sort().map(s => [s, "^"])
);
// output map.js
write(banjs,
	`export const pctt = ${stringify(pmap)};\n` +
	`export const ban = ${stringify(map)};`
);
map = null;
pmap = null;


// 1.get word and sort  2.addAllow  3.rewrite
let amap = eachLine(allowtxt, addAllow, (list) => write(allowtxt, list.join("\n")));
// output allow.js
write(allowjs, `export const allow = ${stringify(amap)};`);
amap = null;

function addBan(map, word) {
	// word
	// bad|bad1|bad2|bad3:replace
	// bad^|bad1

	let [ban, green = null] = word.split(":");
	ban = ban.split("|").sort();
	ban.forEach((str) => {
		let site = map;
		for (let i = 0; i < str.length; i++) {
			let char = str[i];
			site[char] = site[char] || {};
			site = site[char];
		}
		if (green !== null) {
			site._g = green || "";
		}
		site._e = 1;
	});
	return ban.join("|") + (green !== null ? (":" + green) : "");
}

function addAllow(map, word) {
	// word
	// error:allow1|allow2|allow3

	let [err, allow] = word.split(":");
	map[err] = map[err] || { a: {}, b: {} };
	allow = allow.split("|").sort();
	allow.forEach((str, i) => {
		let [before = "", after = ""] = str.split(err);
		// console.log("before, after", str, err, before, after)
		let site = map[err].a;
		for (let i = 0; i < after.length; i++) {
			let char = after[i];
			site[char] = site[char] || {};
			site = site[char];
		}
		if (after.length) {
			site._e = 1;
		}

		site = map[err].b;
		for (let i = before.length - 1; i > -1; i--) {
			let char = before[i];
			site[char] = site[char] || {};
			site = site[char];
		}
		if (before.length) {
			site._e = 1;
		}
	});
	return err + ":" + allow.join("|");
}
