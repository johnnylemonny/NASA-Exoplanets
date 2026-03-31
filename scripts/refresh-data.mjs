import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const rawDir = path.join(rootDir, "data", "raw");
const rawCsvPath = path.join(rawDir, "nasa-exoplanets-ps.csv");
const csvUrl = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+ps&format=csv";

function sha(input) {
  return createHash("sha256").update(input).digest("hex");
}

async function main() {
  await fs.mkdir(rawDir, { recursive: true });

  const response = await fetch(csvUrl, {
    headers: {
      "user-agent": "nasa-exoplanets-demo/1.0"
    }
  });

  if (!response.ok) {
    throw new Error(`NASA archive refresh failed with ${response.status}`);
  }

  const nextCsv = await response.text();
  const previousCsv = await fs.readFile(rawCsvPath, "utf8").catch(() => "");

  if (previousCsv && sha(previousCsv) === sha(nextCsv)) {
    console.log("NASA archive data unchanged.");
    return;
  }

  await fs.writeFile(rawCsvPath, nextCsv, "utf8");
  console.log("NASA archive data refreshed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
