import path from "path";

export default {
	moduleDirectories: ["src", "node_modules"],
	testEnvironment: "jsdom",
	verbose: true,
	collectCoverage: true,
	coverageDirectory: path.resolve(__dirname, "coverage"),
	collectCoverageFrom: ["src/**"],
	testMatch: ["<rootDir>/__tests__/*.test.ts", "<rootDir>/__tests__/**/*.test.ts"],
};
