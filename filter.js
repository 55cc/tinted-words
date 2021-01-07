import { map } from "./map.js";
let c = "呵";
function ifContinue(s, c) {
	return (s == c) || /[^\w\u4e00-\u9fa5]/.test(s);
}
export function filter(str, char) {
	char = char || c;
	let here = map;

	for (var i = 0; i < str.length; i++) {
		let s = str[i];
		if (ifContinue(s, char)) {
			continue;
		}

		var found = null;
		var skip = 0;
		var match = '';

		for (var j = i; j < str.length; j++) {
			let s2 = str[j];
			if (!here[s2]) {
				skip = j - i;
				here = map;
				break;
			}

			match = match + s2;
			if (here[s2].isEnd) {
				found = match;
				skip = j - i;
			}
			here = here[s2];
		}

		if (skip > 1) {
			i += skip - 1;
		}

		if (!found) {
			continue;
		}

		if (found) {
			let newWord = found.replace(/[a-z\u4e00-\u9fa5]/ig, char);
			console.log("replace", "color:red;", found, newWord);
			str = str.replace(found, newWord);
			found = null;
		}
	}


	return str;
}
