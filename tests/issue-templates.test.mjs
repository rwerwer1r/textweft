import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseDocument } from "yaml";
import test from "node:test";

const templates = ["bug_report.yml", "feature_request.yml", "investigation.yml"];

test("GitHub Issue forms are valid YAML with unique field IDs", () => {
  for (const name of templates) {
    const source = readFileSync(new URL("../.github/ISSUE_TEMPLATE/" + name, import.meta.url), "utf8");
    const document = parseDocument(source, { uniqueKeys: true });
    assert.deepEqual(document.errors, [], name);
    const form = document.toJS();
    assert.equal(typeof form.name, "string", name);
    assert.equal(typeof form.description, "string", name);
    assert.ok(Array.isArray(form.body) && form.body.length > 0, name);
    const ids = form.body.filter((field) => field.id).map((field) => field.id);
    assert.equal(new Set(ids).size, ids.length, name + ": duplicate field ID");
    assert.ok(!ids.includes("agent_author"), name + ": no model/user identity collection");
  }
});
