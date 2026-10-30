import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, isAbsolute, join, relative, resolve, sep } from 'node:path';

// Project-authored Markdown only; skip caches and generated tool projections.
const sections = ['docs', 'inbox', '.agents/route', '.rulesync/rules', '.rulesync/skills'];

export function markdownFiles(root) {
  const files = [];
  function visit(dir) {
    if (!existsSync(dir)) return;
    for (const item of readdirSync(dir, { withFileTypes: true })) {
      const file = join(dir, item.name);
      if (item.isDirectory()) visit(file);
      else if (item.isFile() && item.name.endsWith('.md')) files.push(file);
    }
  }
  for (const item of readdirSync(root, { withFileTypes: true })) {
    if (item.isFile() && item.name.endsWith('.md')) files.push(join(root, item.name));
  }
  for (const section of sections) visit(join(root, section));
  const template = join(root, '.github/pull_request_template.md');
  if (existsSync(template)) files.push(template);
  return files.sort();
}

function slug(text) {
  return text.toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~\x60]/g, '')
    .replace(/[^\p{L}\p{N}_\-\s]/gu, '')
    .trim().replace(/\s+/g, '-');
}

function anchors(markdown) {
  const result = new Set(), repeated = new Map();
  let inFence = false;
  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*(?:\x60{3,}|~{3,})/.test(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const match = /^ {0,3}#{1,6}\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const id = slug(match[1]);
    const seen = repeated.get(id) ?? 0;
    repeated.set(id, seen + 1);
    result.add(id + (seen ? '-' + seen : ''));
  }
  return result;
}

export function checkDocLinks(root) {
  const base = resolve(root), errors = [], docs = markdownFiles(base);
  const cache = new Map();
  const read = file => {
    if (!cache.has(file)) cache.set(file, readFileSync(file, 'utf8'));
    return cache.get(file);
  };
  let links = 0;
  for (const file of docs) {
    const source = relative(base, file).split(sep).join('/');
    let fenced = false;
    for (const line of read(file).split(/\r?\n/)) {
      if (/^\s*(?:\x60{3,}|~{3,})/.test(line)) { fenced = !fenced; continue; }
      if (fenced) continue;
      for (const match of line.matchAll(/\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g)) {
        const href = match[1];
        if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) continue;
        links++;
        const [raw, fragment] = href.split('#', 2);
        let target;
        try { target = raw ? resolve(dirname(file), decodeURIComponent(raw)) : file; }
        catch { errors.push(source + ': 잘못된 경로 ' + href); continue; }
        const rel = relative(base, target);
        if (raw.startsWith('/') || rel === '..' || rel.startsWith('..' + sep) || isAbsolute(rel)) {
          errors.push(source + ': 저장소 밖 링크 ' + href);
          continue;
        }
        if (!existsSync(target)) {
          errors.push(source + ': 없는 파일 ' + href);
          continue;
        }
        if (statSync(target).isDirectory()) target = join(target, 'README.md');
        if (!fragment || extname(target).toLowerCase() !== '.md') continue;
        try {
          if (!existsSync(target) || !anchors(read(target)).has(decodeURIComponent(fragment).toLowerCase()))
            errors.push(source + ': 없는 문서 제목 ' + href);
        } catch { errors.push(source + ': 잘못된 문서 제목 ' + href); }
      }
    }
  }
  return { documents: docs.length, links, errors };
}
