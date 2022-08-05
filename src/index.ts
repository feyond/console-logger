const _LoggingLevels = ["debug", "info", "warn", "error"] as const;
type LoggingLevels = typeof _LoggingLevels[number];
type Logger = Record<LoggingLevels, (message: string, ...optionalParams: unknown[]) => void>;

interface Options {
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
		format: (module?: string) => (!module ? "" : `[${module}]`.padStart(12, " ")),
	},
};
const noop = () => {};
const getNormalizedMethod = function (method: LoggingLevels) {
	switch (method) {
		case "debug":
		case "info":
			return method;
		case "warn":
		case "error":
			return "log";
	}
	return assertUnreachable(method);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function assertUnreachable(x: never): never {
	throw new Error("Didn't expect to get here");
}

function now(): string {
	const _now = new Date();
	return [
		[_now.getFullYear().toString(), _now.getMonth().toString().padStart(2, "0"), _now.getDate().toString().padStart(2, "0")].join("-"),
		[_now.getHours().toString().padStart(2, "0"), _now.getMinutes().toString().padStart(2, "0"), _now.getSeconds().toString().padStart(2, "0")].join(":"),
	].join(" ");
}

export function getLogger(level: LoggingLevels = "debug", opts: Options = {}) {
	const logger: Logger = {} as Logger;
	const userLevel = _LoggingLevels.findIndex((_level) => _level === level);
	const shouldLog = (level: number) => {
		return level >= userLevel;
	};

	const _module = configs.module.format(opts.module);

	_LoggingLevels.forEach((method, level) => {
		const log = (message: string, ...optionalParams: unknown[]) => {
			const _level = configs.level.format(method);
			const _message = `%c${now()} ${_level}${_module} ${message}`;
			const normalizedMethod = getNormalizedMethod(method);
			console[normalizedMethod](_message, `color: ${configs.colors[method]};`, ...optionalParams);
		};
		logger[method] = shouldLog(level) ? log : noop;
	});
	return logger;
}

export const logger = getLogger();
