import { createLogger, LoggingEntry } from "../src";
import { Format } from "../src/format";

it("log 默认级别 info", () => {
	const mockTransport = jest.fn();
	const logger = createLogger({
		transport: mockTransport,
	});

	logger.debug("test");
	expect(mockTransport).not.toBeCalled();

	logger.info("test");
	expect(mockTransport).toBeCalled();
	expect(mockTransport).toBeCalledWith({ level: "info", message: "test", params: [] }, expect.any(Format));
});

it("log info string", (done) => {
	const logger = createLogger({
		transport: (info: LoggingEntry) => {
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
		transport: (info: LoggingEntry) => {
			expect(info.level).toEqual("error");
			expect(info.params).toEqual([error]);
			expect(info.message).toEqual("");
			done();
		},
	});

	logger.error(error);
});

it("log warn object", (done) => {
	const obj = { x: 1, y: "aa" };
	const logger = createLogger({
		transport: (info: LoggingEntry) => {
			expect(info.level).toEqual("warn");
			expect(info.params).toEqual([obj]);
			expect(info.message).toEqual("");
			done();
		},
	});

	logger.warn(obj);
});

it("log verbose empty", (done) => {
	const logger = createLogger({
		level: "debug",
		transport: (info: LoggingEntry) => {
			expect(info.level).toEqual("verbose");
			expect(info.params).toEqual([]);
			expect(info.message).toEqual("");
			done();
		},
	});

	Reflect.get(logger, "verbose")();
});

it("log unknown level", () => {
	const transport = jest.fn();
	const logger = createLogger({
		transport: transport,
	});

	const unknownLevel = "test";
	expect(() => {
		Reflect.get(logger, unknownLevel)();
	}).toThrow(`Level "${unknownLevel}" not defined`);

	expect(transport).not.toBeCalled();
});
