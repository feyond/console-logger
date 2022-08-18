import { LoggingEntry } from "../../src";
import { formats } from "../../src/format";
import styles from "../../src/styles";

describe("label format", () => {
	const logEntry: LoggingEntry = { level: "info", message: "test", params: [] };
	it("with default opts", () => {
		const _format = formats.label({ value: "TestModule" });
		expect(_format.transform(logEntry, _format.options)).toEqual(`[${_format.options.value}]`);
	});

	it("with specified style", () => {
		const _format = formats.label({ value: "TestModule", style: styles().bold.underline.bgYellow.toString() });
		expect(_format.transform(logEntry, _format.options)).toMatchObject({
			value: `[${_format.options.value}]`,
			style: styles().bold.underline.bgYellow.toString(),
		});
	});
});
