# @feyond/console-logging
浏览器控制台日志打印控制

## Usage

1. 内置`logger`, `level = info`
```ts
import logger from '@feyond/console-logging';
```

2. 自定义`logger`
```ts
import {getLogger} from '@feyond/console-logging';
const logger = getLogger({
    level: 'trace' | 'debug' | 'info' | 'warn' | 'error', // 必填(required)
    module: string, // default ''
    styles: LoggerStyle // 自定义Font Color; Font Weight
});
```
- `LoggerStyle`
```ts
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
}
```