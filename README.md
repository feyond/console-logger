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
    styles: LoggerStyle, // 自定义Font Color; Font Weight
    hack: boolean // 是否替换console.log console.debug console.info console.warn console.error
});
```