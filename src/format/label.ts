import { Format, format } from "./format";

export interface LabelFormat {
	(opts: LabelOptions): Format<LabelOptions>;
}

export interface LabelOptions {
	value: string;
	style?: string;
}

const label: LabelFormat = format<LabelOptions>((info, opts) => {
	return opts.style ? { value: `[${opts.value}]`, style: opts.style } : `[${opts.value}]`;
});

export default label;
