import fecha from "fecha";
import format, { Format } from "./format";

export interface TimestampOptions {
	format?: string;
	style?: string;
}

export interface TimestampFormat {
	(opts?: TimestampOptions): Format<TimestampOptions>;
}
const DEFAULT_DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
const timestamp: TimestampFormat = format<TimestampOptions | undefined>((info, opts) => {
	const timestamp = fecha.format(new Date(), opts?.format || DEFAULT_DATETIME_FORMAT);
	return !opts?.style ? timestamp : { value: timestamp, style: opts.style };
});

export default timestamp;
