/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve('src', 'lib/index.js'),
      name: 'ReactFormBuild',
      formats: ['es', 'umd'],
      fileName: (format) => `react-form-build.${format}.js`,
    },
  },
}));
