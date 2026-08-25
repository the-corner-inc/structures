import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";

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
  const response = await waitForServer(`${origin}/folders`);
  const html = await response.text();
  if (!html.includes("<title>Structures")) {
    throw new Error("The built server returned an unexpected document.");
  }
  await writeFile(".output/public/index.html", html, "utf8");
  console.log("Rendered .output/public/index.html for the FTP deployment.");
} finally {
  server.kill("SIGTERM");
}

async function waitForServer(url) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`The built server exited before rendering.\n${serverOutput}`);
    }
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for the built server.\n${serverOutput}`);
}
