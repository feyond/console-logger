import { Format } from "./format";

const _LoggingLevels = ["debug", "verbose", "info", "warn", "error"] as const;
export type LoggingLevelName = typeof _LoggingLevels[number];

export const LoggingLevels = _LoggingLevels.reduce(function (result, item, index) {
	result[item] = index + 1;
	return result;
}, {} as Record<LoggingLevelName, number>);

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
	[index: string]: any;

	level: LoggingLevelName;
	message: any;
	stack?: any;
	params: any[];
}

interface ConsoleLog {
	(info: LoggingEntry): void;
}

export interface LoggerOptions {
	level?: LoggingLevelName;
	format?: Format;
	meta?: Record<string, any>;
	transport?: ConsoleLog;
}

export class Logger {
	meta?: Record<string, any>;
	format!: Format;
	transport!: ConsoleLog;
	private readonly _level?: LoggingLevelName;

	constructor(options: LoggerOptions) {
		this.configure(options);
	}

	private configure(options: LoggerOptions) {
		this.meta = options.meta || {};
		this.transport = options.transport || ({} as ConsoleLog);
	}

	log(level: LoggingLevelName, msg: any, ...params: any[]) {
		if (LoggingLevels[level] < LoggingLevels[this.level]) {
			return;
		}
		if (msg instanceof Error) {
			return this.transport({ ...this.meta, level, message: msg.message, stack: msg.stack, params });
		}
		if (typeof msg === "object" && msg.message) {
			return this.transport({ ...this.meta, level, ...msg, params });
		}

		this.transport({ ...this.meta, level, message: msg, params });
	}

	get level(): LoggingLevelName {
		return this._level || getDefaultLevel();
	}
}

let __DEFAULT_LOGGING_LEVEL__: LoggingLevelName = "info";

declare global {
	interface Window {
		__DEFAULT_LOGGING_LEVEL__: LoggingLevelName;
	}
}

export function getDefaultLevel(): LoggingLevelName {
	try {
		if (typeof window !== undefined && window != undefined && window.__DEFAULT_LOGGING_LEVEL__) {
			return window.__DEFAULT_LOGGING_LEVEL__;
		}
	} catch (e) {}
	return __DEFAULT_LOGGING_LEVEL__;
}

export function setDefaultLevel(defaultLevel: LoggingLevelName) {
	try {
		if (typeof window !== undefined && window != undefined) {
			return (window.__DEFAULT_LOGGING_LEVEL__ = defaultLevel);
		}
	} catch (e) {}
	__DEFAULT_LOGGING_LEVEL__ = defaultLevel;
}
