const _LoggingLevels = ['trace', 'debug', 'info', 'warn', 'error'] as const;
export type LoggingLevels = typeof _LoggingLevels[number];

type Logger = Record<LoggingLevels, (message?: string, ...optionalParams: any[]) => void>

interface Options {
    level: LoggingLevels
}

const noop = function () {}

export function getLogger(opts: Options = {level: "info"}) {
    const logger: Logger = {} as Logger;
    const shouldLog = function (level: LoggingLevels) {
        return opts.level >= level;
    }

    for (let level in _LoggingLevels) {
        const method = level as LoggingLevels;
        const log = (message?: string, ...optionalParams: any[]) => {
            if(!(level in console)) throw new Error(`Function[console.${level}] does not exist`);
            const _message = `${level}: ${new Date().toISOString()}: ${message}`;
            console[method](_message, ...optionalParams);
        }
        logger[method] = shouldLog(method) ? log : noop
    }
    return logger
}

export default getLogger({
    level: "error"
});
