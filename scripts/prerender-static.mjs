import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const port = 4173;
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["--env-file-if-exists=.env", ".output/server/index.mjs"], {
  env: {
    ...process.env,
    AUTH_ENABLED: "false",
    HOST: "127.0.0.1",
    PORT: String(port),
  },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverOutput = "";
server.stdout.on("data", (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  serverOutput += chunk.toString();
});

try {
  await waitForServer(`${origin}/folders`);
  const routes = await builtInRoutes();

  for (const route of routes) {
    await renderRoute(route);
  }

  console.log(`Rendered ${routes.length} static routes for the FTP deployment.`);
} finally {
  server.kill("SIGTERM");
}

async function builtInRoutes() {
  const routes = new Set(["/", "/folders", "/issues"]);
  const libraries = [
    { kind: "folders", library: "angular" },
    { kind: "folders", library: "go" },
    { kind: "issues", library: "software" },
  ];

  for (const { kind, library } of libraries) {
    routes.add(`/${kind}/${library}`);
    const settings = JSON.parse(
      await readFile(`.output/public/assets/${library}/settings.json`, "utf8"),
    );

    for (const name of structureNames(settings.structures)) {
      // A route named index.html conflicts with the parent directory's own static index.
      if (name.toLowerCase() === "index.html") continue;
      routes.add(`/${kind}/${library}/${encodeURIComponent(name)}`);
    }
  }

  return [...routes];
}

function structureNames(items) {
  return items.flatMap((item) => [
    item.name,
    ...(Array.isArray(item.children) ? structureNames(item.children) : []),
  ]);
}

async function renderRoute(route) {
  const response = await fetch(`${origin}${route}`);
  if (!response.ok) {
    throw new Error(`Unable to render ${route} (${response.status}).`);
  }

  const html = await response.text();
  if (!html.includes("<title>Structures")) {
    throw new Error(`The built server returned an unexpected document for ${route}.`);
  }

  const outputPath = staticOutputPath(route);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
}

function staticOutputPath(route) {
  if (route === "/") return ".output/public/index.html";

  const segments = route
    .slice(1)
    .split("/")
    .map((segment) => decodeURIComponent(segment));

  if (
    segments.some(
      (segment) => !segment || segment === "." || segment === ".." || segment.includes("/"),
    )
  ) {
    throw new Error(`Unsafe static route: ${route}`);
  }

  return join(".output/public", ...segments, "index.html");
}

async function waitForServer(url) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`The built server exited before rendering.\n${serverOutput}`);
    }
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for the built server.\n${serverOutput}`);
}
