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
            file: "cjs/index.js",
            format: 'cjs',
            name: pkg.name,
            banner,
        },
        {
            file: "cjs/index.min.js",
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
        {
            file: "dist/index.js",
            format: 'iife',
            name: "clog",
            banner,
        },
        {
            file: "dist/index.min.js",
            format: 'iife',
            name: "clog",
            banner,
            plugins: [terser()]
        }
    ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
        clear({
            targets: ['dist', 'cjs', 'esm']
        }),
        typescript({
            typescript: require('typescript'),
        })
    ]
};