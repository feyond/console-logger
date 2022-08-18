import { LoggingEntry } from "../../src";
import { formats } from "../../src/format";
import { colors } from "../../src/levels";

describe("message format", () => {
	const logEntry: LoggingEntry = { level: "info", message: "test message format", params: [] };
	it("with default opts", () => {
		expect(() => {
			formats.combine();
		}).toThrow("at least one or more formats required");
	});

	it("combine string format", () => {
		const _format = formats.combine(formats.timestamp());
		expect(_format.transform(logEntry)).toMatchObject([expect.stringMatching(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)]);
	});

	it("combine string format and StyleInfo format", () => {
		const _format = formats.combine(formats.timestamp(), formats.level());
		expect(_format.transform(logEntry)).toMatchObject([
			expect.stringMatching(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} %cinfo$/),
			colors[logEntry.level]().capitalize.toString(),
		]);
	});

	it("combine string StyleInfo and array format", () => {
		const entryWithParams: LoggingEntry = { ...logEntry, params: ["A", 2] };
		const _format = formats.combine(formats.timestamp(), formats.level(), formats.params());
		expect(_format.transform(entryWithParams)).toMatchObject([
			expect.stringMatching(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} %cinfo$/),
			colors[logEntry.level]().capitalize.toString(),
			"A",
			2,
		]);
	});
});
