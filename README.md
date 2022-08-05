
# Usage

1. Install
```npm
npm install @feyond/console-logging
```

2. Import default logger(level = debug)
```ts
import { logger } from '@feyond/console-logging';

logger.debug("test debug", { x: 1 });
logger.info("test info", { y: "aaa" });
logger.warn("test warn", { ss: true });
logger.error("test error", { z: { e: 8 } });
```

2. Custom `logger`
```ts
import { getLogger } from '@feyond/console-logging';
const logger = getLogger({
    level: 'info', //'debug' | 'info' | 'warn' | 'error',
    module: string
});
logger.debug("test debug", { x: 1 }); // print nothing
logger.info("test info", { y: "aaa" });
```
