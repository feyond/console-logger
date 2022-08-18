
# Usage

## Install
```npm
npm install @feyond/console-logging
```

## Import `createLogger`(level = info)
```ts
import { createLogger } from '@feyond/console-logging';

const logger = createLogger({
    // level?: LoggingLevelName
    // label?: string
    // timestamp?: boolean | string
    // format?: Format
    // transport?: Transport
});

logger.debug("test debug", { x: 1 });
logger.info("test info", { y: "aaa" });
logger.warn("test warn", { ss: true });
logger.error("test error", { z: { e: 8 } });
```


