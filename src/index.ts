const _LoggingLevels = ["trace", "debug", "info", "warn", "error"] as const;
export type LoggingLevels = typeof _LoggingLevels[number];

type Logger = Record<LoggingLevels, (message?: string, ...optionalParams: any[]) => void>

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

type LoggerStyle = {
    colors: Partial<Record<LoggingLevels, Color>>,
    weights: Partial<Record<LoggingLevels, number>>,
    level: {
        weight?: number,
        color?: Color,
        format?: (level: string) => string
    }
    module: {
        weight?: number,
        color?: Color,
        format?: (level: string) => string
    }
};
interface Options {
    level: LoggingLevels,
    module?: string,
    styles?: Partial<LoggerStyle>,
}
const _configs: LoggerStyle = {
	colors: {
		trace: "#212529",
		debug: "#0d6efd",
		info: "#198754",
		warn: "#ffc107",
		error: "#dc3545",
	},
	weights: {
		trace: 350,
		debug: 350,
		info: 400,
		warn: 400,
		error: 400,
	},
	level: {
		weight: 400,
		format: (level: string) => `%c[${level.toUpperCase()}]`.padEnd(9, " "),
	},
	module: {
		color: "#aaa",
		weight: 400,
		format: (module: string) => `%c[${module}]: `.padStart(12, " "),
	}
};
const noop = function () {};

export function getLogger(opts: Options = {level: "info"}) {
	const logger: Logger = {} as Logger;
	const userLevel = _LoggingLevels.findIndex(_level => _level === (opts.level || "info"));
	const shouldLog = (level: number) => {
		return level >= userLevel;
	};

	const configs: LoggerStyle = {
		colors: {..._configs.colors, ...opts.styles?.colors || {}},
		weights: {..._configs.weights, ...opts.styles?.weights || {}},
		level: {..._configs.level, ...opts.styles?.level || {}},
		module: {..._configs.module, ...opts.styles?.module || {}},
	};

	const getStyle = (level: LoggingLevels, type?: "level" | "module") => {
		if (!type) {
			return `color: ${configs.colors[level]}; font-weight: ${configs.weights[level]};`;
		}
		const color = configs[type].color || configs.colors[level];
		const weight = configs[type].weight || configs.weights[level];
		return `color: ${color}; font-weight: ${weight};`;
	};
	const _module = !opts.module ? "": configs.module.format!(opts.module);
	const getStyles = (method: LoggingLevels, _level: string) => {
		const style = getStyle(method);
		const styles: string[] = [];
		styles.push(style);
		if (_level && _level.trim() && _level.trim().startsWith("%c")) {
			styles.push(getStyle(method, "level"));
		}
		if (_module && _module.trim() && _module.trim().startsWith("%c")) {
			styles.push(getStyle(method, "module"));
		}
		styles.push(style);
		return styles;
	};

	_LoggingLevels.forEach((method, level) => {
		const log = (message?: string, ...optionalParams: any[]) => {
			const _level = configs.level.format!(method);
			const _date = new Date().toISOString();
			const _message = `%c${_date} ${_level}${_module}%c${message}`;
			const styles = getStyles(method, _level);
			console[method](_message, ...styles, ...optionalParams);
		};
		logger[method] = shouldLog(level) ? log : noop;
	});
	return logger;
}

export default getLogger({
	level: "info"
});
