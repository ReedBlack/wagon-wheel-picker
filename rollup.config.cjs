const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const dts = require('rollup-plugin-dts');

const packageJson = require('./package.json');

// Only generate source maps in development (not for published package)
const isProduction = process.env.NODE_ENV === 'production' || process.env.NPM_PUBLISH === 'true';

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: !isProduction,
        exports: 'named',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: !isProduction,
        exports: 'named',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve.default({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      }),
      typescript.default({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationMap: !isProduction,
        declarationDir: './dist',
        exclude: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx', 'examples/**'],
      }),
      babel.default({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react', '@babel/preset-typescript'],
        babelHelpers: 'bundled',
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      }),
      commonjs(),
    ],
    external: ['react', 'react-dom', 'framer-motion'],
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
];
