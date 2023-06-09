/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';
import viteTsConfigPaths from 'vite-tsconfig-paths';
const root = resolve(__dirname, 'src');
const pagesDir = resolve(root, 'pages');

const isDev = true;
const isProduction = !isDev;

export default defineConfig({
  cacheDir: '../../node_modules/.vite/share-gpt',
  plugins: [
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],
  test: {
    ...{
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
    ...{
      globals: true,
      cache: { dir: '../../node_modules/.vitest' },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  },
  build: {
    minify: isProduction,
    reportCompressedSize: isProduction,
    rollupOptions: {
      input: {
        devtools: resolve(pagesDir, 'devtools', 'index.html'),
        panel: resolve(pagesDir, 'panel', 'index.html'),
        content: resolve(pagesDir, 'content', 'index.ts'),
        background: resolve(pagesDir, 'background', 'index.ts'),
        contentStyle: resolve(pagesDir, 'content', 'style.scss'),
        popup: resolve(pagesDir, 'popup', 'index.html'),
        newtab: resolve(pagesDir, 'newtab', 'index.html'),
        options: resolve(pagesDir, 'options', 'index.html'),
      },
      watch: {
        include: ['src/**', 'vite.config.ts'],
        exclude: ['node_modules/**', 'src/**/*.spec.ts'],
      },
      output: {
        entryFileNames: 'src/pages/[name]/index.js',
        chunkFileNames: isDev
          ? 'assets/js/[name].js'
          : 'assets/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = path.parse(assetInfo.name);
          const assetFolder = dir.split('/').at(-1);
          const name = assetFolder + firstUpperCase(_name);
          return `assets/[ext]/${name}.chunk.[ext]`;
        },
      },
    },
  },
});

function firstUpperCase(str: string) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, 'g');
  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
}
