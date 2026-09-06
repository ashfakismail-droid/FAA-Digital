import fs from "node:fs";
const s = fs.readFileSync("src/components/studio/demo-manager.tsx", "utf8");
const part1 = fs.readFileSync("replacement-part1.txt", "utf8");
const part2 = fs.readFileSync("replacement-part2.txt", "utf8");
const startMarker = "  const inspectDirectoryHandle = async (dir: LocalDirectoryHandle): Promise<Analysis> => {";
const endMarker = "  const selectFolder = (folder: Folder) => {";
const start = s.indexOf(startMarker);
const end = s.indexOf(endMarker);
if (start < 0 || end < 0) { console.error("ERR markers", start, end); process.exit(1); }
const out = s.slice(0, start) + part1 + part2 + "\n" + s.slice(end);
fs.writeFileSync("src/components/studio/demo-manager.tsx", out);
console.log("OK len=" + out.length + " start=" + start + " end=" + end);
import { execSync } from "node:child_process";
for (const f of ["replacement-part1.txt", "replacement-part2.txt", "refactor-analyzer.mjs"]) {
  try { fs.unlinkSync(f); } catch {}
}