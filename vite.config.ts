import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, lazyPlugins, type Plugin } from "vite-plus";

import { version } from "./package.json";

const materialIconDirectory = fileURLToPath(
  new URL("./node_modules/material-icon-theme/icons", import.meta.url),
);
const materialIconUrlPrefix = "/material-icon-theme/icons/";

function materialIconDevServer(): Plugin {
  return {
    name: "structures-material-icon-theme",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        if (!request.url) return next();

        const pathname = new URL(request.url, "http://structures.local").pathname;
        if (!pathname.startsWith(materialIconUrlPrefix)) return next();

        const iconName = decodeURIComponent(pathname.slice(materialIconUrlPrefix.length));
        if (basename(iconName) !== iconName || !iconName.endsWith(".svg")) return next();

        try {
          const icon = await readFile(join(materialIconDirectory, iconName));
          response.statusCode = 200;
          response.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
          response.setHeader("Cache-Control", "no-cache");
          response.end(icon);
        } catch {
          next();
        }
      });
    },
  };
}

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
            materialIconDevServer(),
            tanstackStart(),
            nitro({
              inlineDynamicImports: true,
              publicAssets: [
                {
                  dir: materialIconDirectory,
                  baseURL: "/material-icon-theme/icons",
                  maxAge: 60 * 60 * 24 * 30,
                },
              ],
            }),
            viteReact({ compiler: true }),
            tailwindcss(),
          ],
    ),
  };
});
