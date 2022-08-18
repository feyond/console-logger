import { LoggingEntry } from "../../src";
import { formats } from "../../src/format";
import styles from "../../src/styles";

describe("message format", () => {
	const logEntry: LoggingEntry = { level: "info", message: "test message format", params: [] };
	it("with default opts", () => {
		const _format = formats.message();
		expect(_format.transform(logEntry, _format.options)).toEqual(logEntry.message);
	});

	it("with specified style", () => {
		const _format = formats.message({ style: styles().underline.toString() });
		expect(_format.transform(logEntry, _format.options)).toMatchObject({
			value: logEntry.message,
			style: styles().underline.toString(),
		});
	});
});
