import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkDocLinks } from '../scripts/doc-links.mjs';

test('상대 파일·제목 링크 및 코드 블록 제외', () => {
  const root = mkdtempSync(join(tmpdir(), 'textweft-links-'));
  try {
    mkdirSync(join(root, 'docs'));
    writeFileSync(join(root, 'docs/guide.md'), '# Guide\n## Quick Start\n## Quick Start\n[내부 제목](#quick-start-1)\n');
    writeFileSync(join(root, 'README.md'), [
      '# Home', '[파일](docs/guide.md)', '[제목](docs/guide.md#quick-start)',
      '[외부](https://example.org)', '\x60\x60\x60md', '[예시](missing.md)', '\x60\x60\x60',
    ].join('\n'));
    const ok = checkDocLinks(root);
    assert.equal(ok.documents, 2);
    assert.equal(ok.links, 3);
    assert.deepEqual(ok.errors, []);

    writeFileSync(join(root, 'docs/extra.md'), [
      '# Extra', '[깨짐](missing.md)', '[제목 없음](guide.md#not-a-heading)',
      '[외부 경로](../../outside.md)',
    ].join('\n'));
    const broken = checkDocLinks(root);
    assert.equal(broken.documents, 3);
    assert.equal(broken.errors.length, 3);
    assert.ok(broken.errors.some(e => e.includes('없는 파일')));
    assert.ok(broken.errors.some(e => e.includes('없는 문서 제목')));
    assert.ok(broken.errors.some(e => e.includes('저장소 밖')));
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('인박스 하위 문서까지 검사', () => {
  const root = mkdtempSync(join(tmpdir(), 'textweft-inbox-links-'));
  try {
    mkdirSync(join(root, 'inbox/2026-10-31'), { recursive: true });
    writeFileSync(join(root, 'inbox/2026-10-31/note.md'), '[깨짐](unknown.md)');
    const result = checkDocLinks(root);
    assert.equal(result.documents, 1);
    assert.equal(result.errors.length, 1);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
