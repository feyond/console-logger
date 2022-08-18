import { TimestampFormat } from "./timestamp";
import { LabelFormat } from "./label";
import { CombineFormat } from "./combine";
import { LevelFormat } from "./level";
import { MessageFormat } from "./message";
import { ParamFormat } from "./params";

export * from "./format";

export interface Formats {
	timestamp: TimestampFormat;
	combine: CombineFormat;
	level: LevelFormat;
	label: LabelFormat;
	message: MessageFormat;
	params: ParamFormat;
}

export const formats: Formats = new (class implements Formats {
	private _timestamp!: TimestampFormat;
	private _combine!: CombineFormat;
	private _level!: LevelFormat;
	private _label!: LabelFormat;
	private _message!: MessageFormat;
	private _params!: ParamFormat;

	get timestamp() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		return this._timestamp || (this._timestamp = require("./timestamp").default);
	}

	get combine() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		return this._combine || (this._combine = require("./combine").default);
	}

	get level() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		return this._level || (this._level = require("./level").default);
	}

	get label() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		return this._label || (this._label = require("./label").default);
	}

	get message() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		return this._message || (this._message = require("./message").default);
	}

	get params() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		return this._params || (this._params = require("./params").default);
	}
})();
