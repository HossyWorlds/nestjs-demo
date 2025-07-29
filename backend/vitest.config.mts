import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: true,
    root: './',
    include: ["src/**/*.spec.ts"],
    exclude: ["node_modules", "dist"],
    coverage: {
      reporter: ["text", "json", "html"],
      reportsDirectory: resolve(__dirname, "../coverage"),
      include: ["**/*.(t|j)s"],
    },
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite(),
  ],
});
