import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { descriptionFrom, renderIndex, syncIndex } from "../scripts/generate-docs-index.mjs";

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "textweft-docs-index-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const docs = join(root, "docs");
  mkdirSync(docs);
  const write = (path, content) => {
    const target = join(docs, path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content, "utf8");
    return target;
  };
  return { docs, write };
}

test("creates a deterministic shallow index and supports deeper scopes", (t) => {
  const { docs, write } = fixture(t);
  write("README.md", '---\ndescription: "Documentation entrypoint"\n---\n');
  write("GOAL.md", '---\ndescription: "Project goals"\n---\n');
  write("area/README.md", '---\ndescription: "Area entrypoint"\n---\n');
  write("area/deep/guide.md", '---\ndescription: "Deep guide"\n---\n');
  assert.equal(renderIndex(docs), "path\tdescription\nGOAL.md\tProject goals\narea/\tArea entrypoint\n");
  assert.match(renderIndex(docs, Number.POSITIVE_INFINITY), /area\/deep\/guide.md\tDeep guide/);
});

test("parses YAML folded descriptions and UTF-8 BOM", (t) => {
  const { write } = fixture(t);
  const path = write("guide.md", "\uFEFF---\ndescription: >-\n  Read when reviewing\n  a test result.\n---\n");
  assert.equal(descriptionFrom(path), "Read when reviewing a test result.");
});

test("rejects missing, invalid, duplicate, and empty descriptions", (t) => {
  const { docs, write } = fixture(t);
  write("bad.md", "# Missing metadata\n");
  assert.throws(() => renderIndex(docs), /frontmatter/);
  write("bad.md", "---\ndescription: [\n---\n");
  assert.throws(() => renderIndex(docs), /잘못된 YAML/);
  write("bad.md", "---\ndescription: first\ndescription: second\n---\n");
  assert.throws(() => renderIndex(docs), /잘못된 YAML/);
  write("bad.md", '---\ndescription: "   "\n---\n');
  assert.throws(() => renderIndex(docs), /비어 있습니다/);
});

test("check mode detects drift without modifying the index", (t) => {
  const { docs, write } = fixture(t);
  write("guide.md", '---\ndescription: "First"\n---\n');
  assert.equal(syncIndex(docs), "updated");
  const index = join(docs, "INDEX.tsv");
  const original = readFileSync(index, "utf8");
  assert.equal(syncIndex(docs, true), "current");
  write("guide.md", '---\ndescription: "Changed"\n---\n');
  assert.throws(() => syncIndex(docs, true), /오래되었습니다/);
  assert.equal(readFileSync(index, "utf8"), original);
});

test("rejects symlinks and does not follow them", (t) => {
  const { docs, write } = fixture(t);
  const source = write("source.md", '---\ndescription: "Valid"\n---\n');
  symlinkSync(source, join(docs, "link.md"));
  assert.throws(() => renderIndex(docs), /symlink/);
});

test("the committed documentation index matches all current docs", () => {
  const root = fileURLToPath(new URL("../docs", import.meta.url));
  assert.equal(readFileSync(join(root, "INDEX.tsv"), "utf8"), renderIndex(root));
});
