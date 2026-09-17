import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";

const repository = process.cwd();
const frameworks = process.argv.slice(2);
if (!frameworks.length) frameworks.push("vite", "next", "tanstack");
assert(frameworks.every((name) => ["vite", "next", "tanstack"].includes(name)));
const directory = process.env.REGISTRY_TEST_DIR
  ? resolve(process.env.REGISTRY_TEST_DIR)
  : await mkdtemp(join(tmpdir(), "structures-registry-"));
await run(process.execPath, ["scripts/check-registry.mjs"], repository);
const artifact = await readFile(".registry-build/structure-explorer.json");
const server = createServer((_request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.end(artifact);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const registryUrl = `http://127.0.0.1:${server.address().port}/structure-explorer.json`;
try {
  for (const framework of frameworks) await testConsumer(framework);
} finally {
  server.close();
}
console.log(`Consumer projects retained at ${directory}`);

async function testConsumer(framework) {
  const cwd = join(directory, framework);
  await mkdir(cwd, { recursive: true });
  assert.equal((await readdir(cwd)).length, 0, `Consumer directory must be empty: ${cwd}`);
  const prefix = framework === "vite" ? "~" : "@";
  const alias = `${prefix}/widgets`;
  const dependencies = { react: "19.2.8", "react-dom": "19.2.8", tailwindcss: "4.3.3" };
  const devDependencies = {
    typescript: "6.0.3",
    "@types/react": "19.2.18",
    "@types/react-dom": "19.2.5",
    "@types/node": "26.2.0",
  };
  const scripts = { typecheck: "tsc --noEmit" };
  if (framework === "next") {
    dependencies.next = "16.3.5";
    devDependencies["@tailwindcss/postcss"] = "4.3.3";
    scripts.build = "next build --webpack";
    scripts.dev = "next dev --hostname 127.0.0.1";
  } else {
    Object.assign(devDependencies, {
      vite: "8.2.2",
      "@vitejs/plugin-react": "6.1.0",
      "@tailwindcss/vite": "4.3.3",
    });
    scripts.build = "vite build";
    scripts.dev = "vite --host 127.0.0.1";
    if (framework === "tanstack")
      Object.assign(dependencies, {
        "@tanstack/react-start": "1.168.49",
        "@tanstack/react-router": "1.170.32",
      });
  }
  await put(
    cwd,
    "package.json",
    JSON.stringify(
      {
        name: `structures-${framework}-consumer`,
        private: true,
        type: "module",
        scripts,
        dependencies,
        devDependencies,
      },
      null,
      2,
    ),
  );
  await put(
    cwd,
    "tsconfig.json",
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          lib: ["DOM", "DOM.Iterable", "ES2022"],
          jsx: "react-jsx",
          module: "ESNext",
          moduleResolution: "Bundler",
          strict: true,
          skipLibCheck: true,
          noEmit: true,
          esModuleInterop: true,
          resolveJsonModule: true,
          types: ["node"],
          paths: { [`${prefix}/*`]: ["./src/*"] },
        },
        include: ["src", "next-env.d.ts"],
      },
      null,
      2,
    ),
  );
  await put(
    cwd,
    "components.json",
    JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "new-york",
        rsc: framework === "next",
        tsx: true,
        tailwind: { config: "", css: "src/style.css", baseColor: "neutral", cssVariables: true },
        aliases: {
          components: alias,
          ui: `${alias}/ui`,
          utils: `${prefix}/lib/utils`,
          lib: `${prefix}/lib`,
          hooks: `${prefix}/hooks`,
        },
      },
      null,
      2,
    ),
  );
  const css = `@import "tailwindcss";
:root { --background: #fff; --foreground: #17202b; --border: #d9dee5; --muted: #f1f5f9; --muted-foreground: #667085; --accent: #edf2f7; --accent-foreground: #17202b; --primary: #2563eb; --ring: #2563eb; --radius: 0.5rem; }
.dark { --background: #0d1117; --foreground: #f0f6fc; --border: #30363d; --muted: #161b22; --muted-foreground: #8b949e; --accent: #21262d; --accent-foreground: #f0f6fc; --primary: #58a6ff; }
body { margin: 0; padding: 24px; font-family: system-ui; background: var(--background); color: var(--foreground); }
#host-sentinel { color: rgb(180, 30, 60); font-size: 23px; border: 3px dotted; padding: 7px; }
`;
  await put(cwd, "src/style.css", css);
  await put(
    cwd,
    "src/demo.tsx",
    `"use client";
import { useState } from "react";
import { StructureExample } from "${alias}/structures/structure-example";
import { StructureExplorer } from "${alias}/structures/structure-explorer";
export default function Demo() {
  const [dark, setDark] = useState(false);
  return <div className={dark ? "dark" : ""} style={{ maxWidth: 1100, margin: "auto", padding: 12, background: "var(--background)", color: "var(--foreground)" }}>
    <button type="button" onClick={() => setDark(!dark)}>Toggle theme</button>
    <p id="host-sentinel">Host page stays unchanged</p>
    <h1>Structure Explorer · ${framework}</h1>
    <StructureExample />
    <h2>Independent tree</h2>
    <StructureExplorer label="Second project" items={[{ name: "README.md", type: "file" }]} />
  </div>;
}
`,
  );
  if (framework === "next") {
    await put(
      cwd,
      "postcss.config.mjs",
      'export default { plugins: { "@tailwindcss/postcss": {} } };',
    );
    await put(
      cwd,
      "src/app/layout.tsx",
      'import "../style.css"; export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }',
    );
    await put(cwd, "src/app/page.tsx", 'export { default } from "../demo";');
    await put(
      cwd,
      "next-env.d.ts",
      '/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n',
    );
  } else {
    await put(cwd, "src/vite-env.d.ts", '/// <reference types="vite/client" />\n');
    await put(
      cwd,
      "vite.config.ts",
      `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
${framework === "tanstack" ? 'import { tanstackStart } from "@tanstack/react-start/plugin/vite";' : ""}
export default defineConfig({ resolve: { alias: { "${prefix}": new URL("./src", import.meta.url).pathname } }, plugins: [${framework === "tanstack" ? "tanstackStart(), " : ""}react(), tailwind()] });`,
    );
    if (framework === "vite") {
      await put(
        cwd,
        "index.html",
        '<html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1" /></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>',
      );
      await put(
        cwd,
        "src/main.tsx",
        'import { createRoot } from "react-dom/client"; import Demo from "./demo"; import "./style.css"; createRoot(document.getElementById("root")!).render(<Demo />);',
      );
    } else {
      await put(
        cwd,
        "src/routes/__root.tsx",
        'import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router"; import css from "../style.css?url"; export const Route = createRootRoute({ head: () => ({ meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }], links: [{ rel: "stylesheet", href: css }] }), component: () => <html lang="en"><head><HeadContent /></head><body><Outlet /><Scripts /></body></html> });',
      );
      await put(
        cwd,
        "src/routes/index.tsx",
        'import { createFileRoute } from "@tanstack/react-router"; import Demo from "../demo"; export const Route = createFileRoute("/")({ component: Demo });',
      );
      await put(
        cwd,
        "src/router.tsx",
        'import { createRouter } from "@tanstack/react-router"; import { routeTree } from "./routeTree.gen"; export function getRouter() { return createRouter({ routeTree }); } declare module "@tanstack/react-router" { interface Register { router: ReturnType<typeof getRouter> } }',
      );
      await put(cwd, "src/vite-env.d.ts", '/// <reference types="vite/client" />\n');
    }
  }
  await run("npm", ["install", "--no-audit", "--no-fund"], cwd);
  await run(
    join(repository, "node_modules/.bin/shadcn"),
    ["add", registryUrl, "--yes", "--cwd", cwd],
    repository,
  );
  assert.equal(
    await readFile(join(cwd, "src/style.css"), "utf8"),
    css,
    "Registry changed host stylesheet",
  );
  assert(
    (await readFile(join(cwd, "src/widgets/structures/structure-explorer.tsx"), "utf8")).includes(
      "StructureExplorer",
    ),
    "Consumer component alias was ignored",
  );
  await run("npm", ["run", "build"], cwd);
  await run("npm", ["run", "typecheck"], cwd);
  console.log(
    `PASS: ${framework} — real CLI install, custom aliases, untouched host styles, production build, strict types.`,
  );
}
async function put(cwd, path, content) {
  const target = join(cwd, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content);
}
function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} ${args.join(" ")} failed (${code})`)),
    );
  });
}
