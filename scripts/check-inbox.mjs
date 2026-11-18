import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { isAbsolute, relative, resolve, sep } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const iso = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

export function validateText(text) {
  const lines = text.split(/\r?\n/);
  if (lines[0] !== '---') return ['YAML frontmatter 시작(---) 누락'];
  const end = lines.indexOf('---', 1);
  if (end < 0) return ['YAML frontmatter 종료(---) 누락'];
  const values = new Map(), errors = [];
  for (let i = 1; i < end; i++) {
    const match = /^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/.exec(lines[i]);
    if (!match || !['description', 'updated'].includes(match[1])) continue;
    const key = match[1];
    if (values.has(key)) errors.push(key + ' 중복');
    let value = match[2].split(/\s+#/, 1)[0].trim();
    if (value.length >= 2 && /^(["']).*\1$/.test(value)) value = value.slice(1, -1).trim();
    if (key === 'description' && ['>', '>-', '|', '|-'].includes(value)) {
      const parts = [];
      for (let j = i + 1; j < end; j++) {
        if (lines[j].trim() && !/^\s/.test(lines[j])) break;
        if (lines[j].trim()) parts.push(lines[j].trim());
      }
      value = parts.join(' ');
    }
    values.set(key, value);
  }
  if (!values.get('description')) errors.push('description 누락 또는 빈 값');
  const updated = values.get('updated') ?? '';
  if (!iso.test(updated) || Number.isNaN(Date.parse(updated))) errors.push('updated에 유효한 ISO 8601 타임존 일시 필요');
  return errors;
}

export function checkPaths(paths, base = root) {
  const inbox = resolve(base, '.inbox'), errors = [];
  for (const candidate of paths) {
    const path = resolve(base, candidate), rel = relative(inbox, path);
    if (isAbsolute(candidate) || rel === '..' || rel.startsWith('..' + sep) || isAbsolute(rel)) {
      errors.push(candidate + ': .inbox/ 밖 경로');
      continue;
    }
    if (rel === 'README.md' || rel === 'AGENTS.md' || rel.startsWith('.configs' + sep) || !rel.endsWith('.md')) continue;
    try {
      for (const error of validateText(readFileSync(path, 'utf8'))) errors.push(candidate + ': ' + error);
    } catch (error) { errors.push(candidate + ': 파일 읽기 실패 (' + error.code + ')'); }
  }
  return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.includes('--stdin0') && args.length !== 1) {
    console.error('--stdin0와 파일 인수는 함께 사용할 수 없습니다.');
    process.exitCode = 2;
  } else {
    const paths = args[0] === '--stdin0'
      ? readFileSync(0, 'utf8').split('\0').filter(Boolean) : args;
    if (!paths.length && args[0] !== '--stdin0') {
      console.error('사용법: node scripts/check-inbox.mjs <changed-paths...> 또는 --stdin0');
      process.exitCode = 2;
    } else {
      const errors = checkPaths(paths);
      for (const error of errors) console.error('ERROR:', error);
      process.exitCode = errors.length ? 1 : 0;
      if (!errors.length) console.log('인박스 변경 파일 메타데이터 검사 완료');
    }
  }
}
