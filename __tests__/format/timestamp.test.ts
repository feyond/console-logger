import { LoggingEntry } from "../../src";
import styles from "../../src/styles";
import { formats } from "../../src/format";
import fecha from "fecha";

describe("timestamp", () => {
	const logEntry: LoggingEntry = { level: "info", message: "test", params: [] };
	it("with default opts", () => {
		const _format = formats.timestamp();
		expect(_format.transform(logEntry, _format.options)).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
	});

	it("with specified format", () => {
		const mask = "YYYY-MM-DD";
		const _format = formats.timestamp({
			format: mask,
		});
		expect(_format.transform(logEntry, _format.options)).toEqual(fecha.format(new Date(), mask));
	});

	it("with specified style", () => {
		const mask = "YYYY-MM-DD";
		const style = styles().blue.bold.toString();
		const _format = formats.timestamp({
			format: mask,
			style,
		});
		expect(_format.transform(logEntry, _format.options)).toMatchObject({
			value: fecha.format(new Date(), mask),
			style: style,
		});
	});
});
