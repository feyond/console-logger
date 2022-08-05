import { logger, getLogger } from "index";

describe("index.js", () => {
	test("logger[trace, debug, info, warn, error]", () => {
		expect(logger).toMatchObject({
			debug: expect.any(Function),
			info: expect.any(Function),
			warn: expect.any(Function),
			error: expect.any(Function),
		});
	});

	const log = getLogger("debug", {
		module: "test",
	});

	test("debug", () => {
		log.debug("test debug", { debug: true });
	});

	test("info", () => {
		log.info("test info", { x: 1 });
	});

	test("warn", () => {
		log.warn("test warn", { y: true });
	});

	test("error", () => {
		log.error("test error", { z: { i: 0 } });
	});
});
