import { formats, Format } from "./format";
import { STYLE_PREFIX } from "./format/combine";
import { getDefaultLevel, LoggingLevelName, LoggingLevels } from "./levels";
import styles from "./styles";

interface LoggingMethod {
	(message: string, ...params: any[]): void;
	(infoObject: object): void;
}

export function createLogger(options: Partial<LoggerOptions> = {}) {
	const logger = new Logger({ ...options });
	return new Proxy(logger, {
		get: (_, method: LoggingLevelName) => {
			if (!(method in LoggingLevels)) {
				throw new Error(`Level "${method}" not defined`);
			}

			return (...args: any[]) => {
				if (args.length === 0) {
					return logger.log(method, "");
				}
				const [message, ...splat] = args;
				logger.log(method, message, ...splat);
			};
		},
	}) as any as Record<LoggingLevelName, LoggingMethod>;
}

export interface LoggingEntry {
	level: LoggingLevelName;
	message: any;
	params: any[];
}

interface Transport {
	(info: LoggingEntry, format: Format): void;
}

const BrowserConsole: Transport = (info, format) => {
	// [datetime] [label] [level] message, {...args}
	const entry = format.transform(info, format.options);
	if (typeof entry === "string") {
		// eslint-disable-next-line no-console
		console.log(entry);
	} else if (Array.isArray(entry)) {
		// eslint-disable-next-line no-console
		console.log(...entry);
	} else {
		// eslint-disable-next-line no-console
		entry.style && !entry.value.startsWith(STYLE_PREFIX) ? console.log(STYLE_PREFIX + entry.value, entry.style) : console.log(entry.value);
	}
};

export interface LoggerOptions {
	level?: LoggingLevelName;
	format?: Format;
	label?: string;
	timestamp?: boolean | string;
	transport?: Transport;
}

export class Logger {
	format!: Format;
	transport!: Transport;
	private _level?: LoggingLevelName;

	constructor(options: LoggerOptions) {
		this.configure(options);
	}

	private configure(options: LoggerOptions) {
		this._level = options.level;
		this.transport = options.transport || BrowserConsole;
		const fmtList: Format[] = [];
		if (!("timestamp" in options) || options.timestamp) {
			fmtList.push(
				formats.timestamp({
					format: typeof options.timestamp === "string" ? options.timestamp : undefined,
				})
			);
		}
		fmtList.push(formats.level());

		if (options.label) {
			fmtList.push(
				formats.label({
					value: options.label,
					style: styles().bgBlack.gray.bold.toString(),
				})
			);
		}

		fmtList.push(formats.message({ style: styles().underline.toString() }));
		fmtList.push(formats.params());
		this.format = options.format || formats.combine(...fmtList);
	}

	log(level: LoggingLevelName, msg: any, ...params: any[]) {
		if (LoggingLevels[level] < LoggingLevels[this.level]) {
			return;
		}
		// if (msg instanceof Error) {
		// 	return this.transport({ level, message: msg.message, params }, this.format);
		// }
		if (typeof msg === "object") {
			return this.transport({ level, message: "", params: [msg] }, this.format);
		}

		this.transport({ level, message: msg, params }, this.format);
	}

	get level(): LoggingLevelName {
		return this._level || getDefaultLevel();
	}
}
