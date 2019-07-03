import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { main, module, dependencies, peerDependencies } from './package.json';

const commonjsOptions = {
  namedExports: {
    'node_modules/prop-types/index.js': ['string', 'node'],
  },
};

export default [
  {
    input: 'src/index.js',
    output: {
      file: main,
      format: 'cjs',
      indent: false,
    },
    external: [
      ...Object.keys(dependencies || {}),
      ...Object.keys(peerDependencies || {}),
    ],
    plugins: [babel(), resolve(), commonjs(commonjsOptions)],
  },
  {
    input: 'src/index.js',
    output: {
      file: module,
      format: 'es',
      indent: false,
    },
    external: [
      ...Object.keys(dependencies || {}),
      ...Object.keys(peerDependencies || {}),
    ],
    plugins: [resolve(), babel(), commonjs(commonjsOptions)],
  },
];
