import format, { Format } from "./format";

export interface MessageFormat {
	(opts?: MessageOptions): Format<MessageOptions>;
}
export interface MessageOptions {
	style?: string;
}

const message: MessageFormat = format<MessageOptions | undefined>((info, opts) => {
	return opts?.style ? { value: info.message, style: opts.style } : info.message;
});

export default message;
