import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import clear from 'rollup-plugin-clear'
import {terser} from "rollup-plugin-terser";

const banner = `
  /**
   * @license
   * author: ${pkg.author}
   * ${pkg.name}.js v${pkg.version}
   * Released under the ${pkg.license} license.
   */
`;
export default {
    input: 'src/index.ts',
    output: [
        {
            file: "dist/index.js",
            format: 'cjs',
            name: pkg.name,
            banner,
        },
        {
            file: "dist/index.min.js",
            format: 'cjs',
            name: pkg.name,
            banner,
            plugins: [terser()]
        },
        {
            file: "esm/index.js",
            format: 'esm',
            name: pkg.name,
            banner,
        },
        {
            file: "esm/index.min.js",
            format: 'esm',
            name: pkg.name,
            banner,
            plugins: [terser()]
        },
        // {
        //     file: "dist/index.browser.js",
        //     format: 'iife',
        //     name: pkg.name,
        //     plugins: [terser()]
        // }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
        clear({
            targets: ['dist', 'es']
        }),
        typescript({
            typescript: require('typescript')
        })
    ]
};