import { format, formats } from "../../src/format";

describe("format", () => {
	it("has the expected default formats", () => {
		expect(format).toEqual(expect.any(Function));
		expect(formats.combine).toEqual(expect.any(Function));
		expect(formats.timestamp).toEqual(expect.any(Function));
		expect(formats.level).toEqual(expect.any(Function));
		expect(formats.label).toEqual(expect.any(Function));
		expect(formats.message).toEqual(expect.any(Function));
		expect(formats.params).toEqual(expect.any(Function));
	});
});
