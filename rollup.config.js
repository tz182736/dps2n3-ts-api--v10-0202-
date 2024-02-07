import rollup from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';  

export default {
  input: './src/main.ts',
  output: {
    file: 'bundle.cjs',
    format: 'cjs'
  },
  plugins: [
    rollup(),
    commonjs(),
    typescript(),
    json(), 
  ]
};
