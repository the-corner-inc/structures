import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, lazyPlugins } from "vite-plus";

import { version } from "./package.json";

export default defineConfig(({ mode }) => {
  return {
    test: {
      include: ["src/**/*.test.{ts,tsx}"],
      passWithNoTests: true,
    },
    fmt: {
      tabWidth: 2,
      semi: true,
      printWidth: 100,
      singleQuote: false,
      endOfLine: "lf",
      trailingComma: "all",
      sortImports: {},
      sortTailwindcss: {
        stylesheet: "./src/styles.css",
        attributes: ["class", "className"],
      },
      ignorePatterns: [
        "pnpm-lock.yaml",
        "routeTree.gen.ts",
        ".tanstack-start/",
        ".tanstack/",
        ".output/",
        "dist/",
        "public/assets/",
      ],
    },
    lint: {
      plugins: ["typescript", "react", "react-perf", "jsx-a11y"],
      env: { builtin: true, node: true, browser: true },
      options: { typeAware: true, typeCheck: true },
      jsPlugins: [
        { name: "eslint-tanstack-router", specifier: "@tanstack/eslint-plugin-router" },
        { name: "eslint-tanstack-query", specifier: "@tanstack/eslint-plugin-query" },
        { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
      ],
      categories: { correctness: "warn" },
      rules: {
        "vite-plus/prefer-vite-plus-imports": "warn",
        "typescript/no-floating-promises": "off",
        "jsx-a11y/prefer-tag-over-role": "off",
        "eslint-tanstack-router/create-route-property-order": "warn",
        "eslint-tanstack-query/exhaustive-deps": "warn",
        "eslint-tanstack-query/stable-query-client": "warn",
      },
      ignorePatterns: [".output", "dist", "scripts", "src/routeTree.gen.ts"],
    },
    define: {
      __APP_VERSION__: JSON.stringify(version),
    },
    server: {
      port: 3000,
    },
    plugins: lazyPlugins(() =>
      mode === "test"
        ? []
        : [
            tanstackStart(),
            nitro({ inlineDynamicImports: true }),
            viteReact({ compiler: true }),
            tailwindcss(),
          ],
    ),
  };
});
