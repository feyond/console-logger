import styles, { Style } from "./styles";

export const _LoggingLevels = ["debug", "verbose", "info", "warn", "error"] as const;
export type LoggingLevelName = typeof _LoggingLevels[number];
export const LoggingLevels = _LoggingLevels.reduce(function (result, item, index) {
	result[item] = index + 1;
	return result;
}, {} as Record<LoggingLevelName, number>);

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

export const colors: Record<LoggingLevelName, () => Style> = {
	debug: () => styles().blue,
	verbose: () => styles().black,
	info: () => styles().green,
	warn: () => styles().gold,
	error: () => styles().red,
};
