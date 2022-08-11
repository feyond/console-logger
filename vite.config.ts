import { ConfigEnv, defineConfig, loadEnv } from "vite";
import { resolve } from "path";

export default ({ mode }: ConfigEnv) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	const idDev = mode === "development";
	return defineConfig({
		root: "src",
		build: {
			outDir: resolve(__dirname, "lib"),
			emptyOutDir: idDev,
			lib: {
				fileName: (format) => (idDev ? `index.${format}.js` : `index.${format}.min.js`),
				entry: resolve(__dirname, "src", "index.ts"),
				formats: ["es", "cjs"],
			},
			minify: !idDev,
		},
		plugins: [],
	});
};
