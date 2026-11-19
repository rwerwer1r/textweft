import { existsSync, lstatSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseDocument } from "yaml";

const docsDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "../docs");
const excludedFiles = new Set(["README.md", "AGENTS.md", "SKILL.md"]);

export function descriptionFrom(path) {
  const lines = readFileSync(path, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/);
  if (lines[0] !== "---") throw new Error(path + ": YAML frontmatter 시작 누락");
  const closing = lines.indexOf("---", 1);
  if (closing < 0) throw new Error(path + ": YAML frontmatter 종료 누락");
  const document = parseDocument(lines.slice(1, closing).join("\n"), { uniqueKeys: true });
  if (document.errors.length) throw new Error(path + ": 잘못된 YAML: " + document.errors[0].message);
  const metadata = document.toJS();
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata) || typeof metadata.description !== "string") {
    throw new Error(path + ": 문자열 description이 필요합니다");
  }
  const description = metadata.description.trim().replace(/\s+/gu, " ");
  if (!description) throw new Error(path + ": description이 비어 있습니다");
  return description;
}

function entries(directory) {
  return readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
}

function validateTree(root) {
  if (!existsSync(root) || !lstatSync(root).isDirectory()) throw new Error(root + ": docs 디렉터리가 없습니다");
  const descriptions = new Map();
  const visit = (directory) => {
    for (const entry of entries(directory)) {
      const path = join(directory, entry.name);
      if (entry.isSymbolicLink()) throw new Error(path + ": symlink는 인덱싱하지 않습니다");
      if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && entry.name.endsWith(".md")) descriptions.set(path, descriptionFrom(path));
    }
  };
  visit(root);
  return descriptions;
}

function tsvCell(value) {
  return /["\t\r\n]/u.test(value) ? '"' + value.replaceAll('"', '""') + '"' : value;
}

export function renderIndex(root = docsDirectory, maxDepth = 1) {
  if (!(maxDepth === Number.POSITIVE_INFINITY || Number.isInteger(maxDepth) && maxDepth >= 1)) throw new Error("depth는 양의 정수 또는 all이어야 합니다");
  const descriptions = validateTree(root);
  const rows = [];
  const visit = (directory, depth) => {
    for (const entry of entries(directory)) {
      const path = join(directory, entry.name);
      if (entry.isSymbolicLink()) throw new Error(path + ": symlink는 인덱싱하지 않습니다");
      if (entry.isDirectory()) {
        const readme = join(path, "README.md");
        if (descriptions.has(readme)) rows.push([relative(root, path).split(sep).join("/") + "/", descriptions.get(readme)]);
        if (depth + 1 < maxDepth) visit(path, depth + 1);
      } else if (entry.isFile() && entry.name.endsWith(".md") && !excludedFiles.has(entry.name)) {
        rows.push([relative(root, path).split(sep).join("/"), descriptions.get(path)]);
      }
    }
  };
  visit(root, 0);
  rows.sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
  return "path\tdescription\n" + rows.map(([path, description]) => tsvCell(path) + "\t" + tsvCell(description) + "\n").join("");
}

export function syncIndex(root = docsDirectory, check = false, maxDepth = 1) {
  const generated = renderIndex(root, maxDepth);
  const target = join(root, "INDEX.tsv");
  const current = existsSync(target) ? readFileSync(target, "utf8") : null;
  if (current === generated) return "current";
  if (check) throw new Error(target + ": INDEX.tsv가 없거나 오래되었습니다");
  writeFileSync(target, generated, "utf8");
  return "updated";
}

const help = "Usage: node scripts/generate-docs-index.mjs [--root DIRECTORY] [--depth N|all] [--check]\n       node scripts/generate-docs-index.mjs --validate FILE...";
export function main(args = process.argv.slice(2), defaultRoot = docsDirectory) {
  if (args.includes("--help") || args.includes("-h")) { console.log(help); return 0; }
  if (args[0] === "--validate") {
    if (args.length < 2 || args.slice(1).some((arg) => arg.startsWith("--"))) { console.error(help); return 2; }
    try { for (const path of args.slice(1)) descriptionFrom(resolve(path)); return 0; }
    catch (error) { console.error(error.message); return 1; }
  }
  let root = defaultRoot;
  let depth = 1;
  let check = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--check") check = true;
    else if (args[i] === "--root" && args[i + 1] && !args[i + 1].startsWith("--")) root = resolve(args[++i]);
    else if (args[i] === "--depth" && args[i + 1] && !args[i + 1].startsWith("--")) {
      const value = args[++i];
      if (value === "all") depth = Number.POSITIVE_INFINITY;
      else if (/^[1-9]\d*$/u.test(value)) depth = Number(value);
      else { console.error("잘못된 depth: " + value); return 2; }
    } else { console.error(help); return 2; }
  }
  try {
    const status = syncIndex(root, check, depth);
    console.log(status === "current" ? "INDEX.tsv 최신 상태" : "INDEX.tsv 생성 완료");
    return 0;
  } catch (error) { console.error(error.message); return 1; }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) process.exitCode = main();
