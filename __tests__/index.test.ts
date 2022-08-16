import { createLogger, LoggingEntry } from "../src";
import * as winston from "winston";

const _console = winston.createLogger({
	transports: [new winston.transports.Console()],
});

it("log 默认级别 info", () => {
	const mockTransport = jest.fn();
	const logger = createLogger({
		transport: mockTransport,
	});

	logger.debug("test");
	expect(mockTransport).not.toBeCalled();

	logger.info("test");
	expect(mockTransport).toBeCalled();
	expect(mockTransport).toBeCalledWith({ level: "info", message: "test", params: [] });
});

it("log string", (done) => {
	const logger = createLogger({
		meta: { service: "test" },
		transport: (info: LoggingEntry) => {
			// eslint-disable-next-line no-console
			console.log(info);
			_console.log(info);
			expect(info.service).toEqual("test");
			expect(info.level).toEqual("info");
			expect(info.params.length).toEqual(0);
			expect(info.message).toEqual("test level info");
			done();
		},
	});
	logger.info("test level info");
});

it("log error", (done) => {
	const error = new Error("test");
	const logger = createLogger({
		meta: { service: "test" },
		transport: (info: LoggingEntry) => {
			// eslint-disable-next-line no-console
			expect(info.service).toEqual("test");
			expect(info.level).toEqual("error");
			expect(info.stack).toEqual(error.stack);
			expect(info.params.length).toEqual(0);
			expect(info.message).toEqual(error.message);
			done();
		},
	});

	logger.error(error);
});

it("log object", (done) => {
	const logger = createLogger({
		meta: { service: "test" },
		transport: (info: LoggingEntry) => {
			// eslint-disable-next-line no-console
			console.log(info);
			_console.info({ x: 1, y: "aa" });
			expect(info.service).toEqual("test");
			expect(info.level).toEqual("info");
			expect(info.params.length).toEqual(0);
			expect(info.message).toEqual({ x: 1, y: "aa" });
			done();
		},
	});

	logger.info({ x: 1, y: "aa" });
});
