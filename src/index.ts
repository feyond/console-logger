const _LoggingLevels = ["debug", "info", "warn", "error"] as const;
type LoggingLevels = typeof _LoggingLevels[number];
type Logger = Record<LoggingLevels, (message: string, ...optionalParams: unknown[]) => void>;

interface SetLevel {
	setLevel: (level: LoggingLevels) => void;
}

interface Options {
	level?: LoggingLevels;
	module?: string;
}

const configs = {
	colors: {
		debug: "#0d6efd",
		info: "#198754",
		warn: "#ffc107",
		error: "#dc3545",
	},
	level: {
		format: (level: string) => `[${level.toUpperCase()}]`.padEnd(9, " "),
	},
	module: {
		format: (module?: string) => (!module ? "" : `[${module}]`.padStart(10, " ")),
	},
};

const getNormalizedMethod = function (method: LoggingLevels) {
	switch (method) {
		case "debug":
		case "info":
			return method;
		case "warn":
		case "error":
			return "log";
	}
	throw new Error("unexpect log level: " + method);
};

function now(): string {
	const _now = new Date();
	return [
		[_now.getFullYear().toString(), _now.getMonth().toString().padStart(2, "0"), _now.getDate().toString().padStart(2, "0")].join("-"),
		[_now.getHours().toString().padStart(2, "0"), _now.getMinutes().toString().padStart(2, "0"), _now.getSeconds().toString().padStart(2, "0")].join(":"),
	].join(" ");
}

function getLogLevel(logger: Logger & SetLevel): LoggingLevels {
	return Reflect.get(logger, "level") || getDefaultLevel();
}

function getDefaultLevel(): LoggingLevels {
	if (window && window.__LOG_LEVEL__) {
		return window.__LOG_LEVEL__;
	}
	return "info";
}

export function setDefaultLevel(defaultLevel: LoggingLevels) {
	if (window) {
		window.__LOG_LEVEL__ = defaultLevel;
	}
}

declare global {
	interface Window {
		__LOG_LEVEL__: LoggingLevels;
	}
}

export function getLogger(opts: Options = {}) {
	const logger = {} as Logger & SetLevel;
	const _module = configs.module.format(opts.module);
	Reflect.defineProperty(logger, "level", {
		value: opts.level,
		writable: true,
	});

	Reflect.defineProperty(logger, "setLevel", {
		value: (level: LoggingLevels) => {
			Reflect.set(logger, "level", level);
		},
		writable: true,
		configurable: false,
	});

	const shouldLog = (_current: number) => {
		const baseLevel = getLogLevel(logger);
		const userLevel = _LoggingLevels.findIndex((_level) => _level === baseLevel);
		return _current >= userLevel;
	};

	_LoggingLevels.forEach((method, level) => {
		Reflect.defineProperty(logger, method, {
			value: (message: string, ...optionalParams: unknown[]) => {
				if (shouldLog(level)) {
					const _level = configs.level.format(method);
					const _message = `%c${now()} ${_level}${_module} ${message}`;
					const normalizedMethod = getNormalizedMethod(method);
					console[normalizedMethod](_message, `color: ${configs.colors[method]};`, ...optionalParams);
				}
			},
		});
	});

	return logger;
}
