import { LoggingEntry } from "../index";

export interface StyleInfo {
	value: string;
	style: string;
}

export interface TransformFunction<T> {
	(info: LoggingEntry, opts: T): StyleInfo | string | any[];
}

export abstract class Format<T = any> {
	options?: T;
	abstract transform: TransformFunction<T>;

	constructor(opts?: T) {
		this.options = opts;
	}
}

export function format<T = any>(fn: TransformFunction<T>) {
	return (opts: T) =>
		new (class extends Format {
			transform = fn;
		})(opts);
}

export default format;
