import format, { Format } from "./format";

export interface ParamFormat {
	(): Format<void>;
}

const params: ParamFormat = format<void>((info) => {
	return [...info.params];
});

export default params;
