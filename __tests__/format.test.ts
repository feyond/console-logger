import { format, formats } from "../src/format";
import { LoggingEntry } from "../src";

describe("format", () => {
	it("has the expected default formats", () => {
		expect(format).toEqual(expect.any(Function));
		expect(formats.timestamp).toEqual(expect.any(Function));
		expect(formats.combine).toEqual(expect.any(Function));
	});
});

describe("timestamp", () => {
	const _format = formats.timestamp();
	const logEntry: LoggingEntry = { level: "info", message: "test", params: [] };
	it("has the expected default formats", () => {
		expect(_format.transform(logEntry, {})).toMatchObject({
			style: expect.any(String),
			value: expect.any(String),
		});
	});
});
