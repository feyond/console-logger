const _LoggingLevels = ['trace', 'debug', 'info', 'warn', 'error'] as const;
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
    styles?: Partial<LoggerStyle>
}
const _configs: LoggerStyle = {
    colors: {
        trace: '#212529',
        debug: '#0d6efd',
        info: '#198754',
        warn: '#ffc107',
        error: '#dc3545',
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
        format: (level: string) => `[${level}]`.padEnd(7, ' '),
    },
    module: {
        color: '#aaa',
        weight: 400,
        format: (module: string) => module.padStart(12, ' '),
    }
}
const noop = function () {}

export function getLogger(opts: Options = {level: "info"}) {
    const logger: Logger = {} as Logger;
    const userLevel = _LoggingLevels.findIndex(_level => _level === (opts.level || "info"));
    const shouldLog = (level: number) => {
        return userLevel >= level;
    }

    const configs: LoggerStyle = {
        colors: {..._configs.colors, ...opts.styles?.colors || {}},
        weights: {..._configs.weights, ...opts.styles?.weights || {}},
        level: {..._configs.level, ...opts.styles?.level || {}},
        module: {..._configs.module, ...opts.styles?.module || {}},
    }

    const getStyle = (level: LoggingLevels, type?: 'level' | 'module') => {
        if (!type) {
            return `color: ${configs.colors[level]}; font-weight: ${configs.weights[level]};`
        }
        const color = configs[type].color || configs.colors[level];
        const weight = configs[type].weight || configs.weights[level];
        return `color: ${color}; font-weight: ${weight};`
    }

    const _module = !opts.module ? "": configs.module.format!(opts.module);
    _LoggingLevels.forEach((method, level) => {
        const log = (message?: string, ...optionalParams: any[]) => {
            const _level = configs.level.format!(method);
            const _date = new Date().toISOString();
            const _message = `%c${_level}%c${_date}%c${_module} %c${message}`;
            let style = getStyle(method);
            console[method](_message,
                getStyle(method, 'level'),
                style,
                getStyle(method, 'module'),
                style,
                ...optionalParams);
        }
        logger[method] = shouldLog(level) ? log : noop
    })
    return logger
}

export default getLogger({
    level: "error"
});
