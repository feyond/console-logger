declare const _LoggingLevels: readonly ["trace", "debug", "info", "warn", "error"];
export declare type LoggingLevels = typeof _LoggingLevels[number];
declare type Logger = Record<LoggingLevels, (message?: string, ...optionalParams: any[]) => void>;
declare type RGB = `rgb(${number}, ${number}, ${number})`;
declare type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
declare type HEX = `#${string}`;
declare type Color = RGB | RGBA | HEX;
declare type LoggerStyle = {
    colors: Partial<Record<LoggingLevels, Color>>;
    weights: Partial<Record<LoggingLevels, number>>;
    level: {
        weight?: number;
        color?: Color;
        format?: (level: string) => string;
    };
    module: {
        weight?: number;
        color?: Color;
        format?: (level: string) => string;
    };
};
interface Options {
    level: LoggingLevels;
    module?: string;
    styles?: Partial<LoggerStyle>;
}
export declare function getLogger(opts?: Options): Logger;
declare const logger: Logger;
export default logger;
