// file read and write
import * as std from 'std';

export function write(src, text) {
	var file = std.open(src, 'w');
	file.puts(text);
	file.close();
}

export function read(src) {
	return std.loadFile(src);
	// if error return null
}