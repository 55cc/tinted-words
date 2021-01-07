import { pctt, ban } from "./ban.js";
import { allow } from "./allow.js";
let replace = "*";
export function filter(str) {

	for (let start = 0; start < str.length;) {

		let here = ban;
		let match = null;
		let end = 0;

		// ban匹配
		for (let i = start; i < str.length; i++) {
			let s = str[i];
			// console.log("s", s)
			here = here[s] || here[pctt[s] || s];
			if (!here) {
				break;
			}
			if (here._e) {
				end = i + 1;
				match = here;
			}

		}
		// allow 匹配 去除已匹配项
		let old = str.slice(start, end);
		// console.log("old", old)
		if (match) {
			let map = allow[old.replace("^", "")];
			// console.log("old", old.replace("^", ""), map);
			if (map) {
				let a = map.a;
				let b = map.b;
				// old == "口交" && console.log("old1", old, Object.keys(a))
				if (a) {
					for (let i = end; i < str.length; i++) {
						// old == "口交" && console.log("old2", old, Object.keys(a), start, end, i, str[i])
						a = a[str[i]];
						if (!a) break;
						if (a._e) {
							match = null;
							start = i;
							b = null;
							break;
						}
					}

				}
				if (b) {
					for (let i = start - 1; i > -1; i--) {
						b = b[str[i]];
						if (!b) break;
						if (b._e) {
							match = null;
							break;
						}
					}

				}
			}
		}

		if (match) {
			let [p1, p2] = [str.slice(0, start), str.slice(end)];
			let char = match._g;
			if (char !== undefined) {
				let i = char.indexOf("^");
				if (i > -1) {
					char = char.replace("^", old[i]);
				}
				str = p1 + char + p2;
				// console.log("set start1", start, end, char.length)
				// start = end + char.length - 1 - (end - start);
				start = start + char.length - 1;
				// console.log("set start2", start, end, char.length)
			} else {
				let newWord = old.replace(/[a-z\u4e00-\u9fa5]/ig, replace);
				// console.log("replace", str.slice(start, end), newWord);
				str = p1 + newWord + p2;
				start = end;
			}
		} else {
			start++;
		}

	}


	return str;
}
