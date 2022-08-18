import { LoggingEntry } from "../../src";
import { formats } from "../../src/format";
import { colors } from "../../src/levels";

describe("level format", () => {
	const logEntry: LoggingEntry = { level: "info", message: "test", params: [] };
	it("with default opts", () => {
		const _format = formats.level();
		expect(_format.transform(logEntry)).toMatchObject({
			value: logEntry.level,
			style: colors[logEntry.level]().capitalize.toString(),
		});
	});
});
