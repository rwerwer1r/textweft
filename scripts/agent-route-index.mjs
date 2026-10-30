import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const slug = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/;

export function frontmatter(text, fallback = '') {
  const lines = text.split(/\r?\n/);
  if (lines[0] !== '---') throw new Error('frontmatter 시작 누락');
  const end = lines.indexOf('---', 1);
  if (end < 0) throw new Error('frontmatter 종료 누락');
  const fields = {};
  for (const line of lines.slice(1, end)) {
    const match = /^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/.exec(line);
    if (!match || !['name','description'].includes(match[1])) continue;
    const [, key, raw] = match;
    if (Object.hasOwn(fields,key)) throw new Error(key + ' 중복');
    let value = raw.trim();
    if (value.startsWith('"')) value = JSON.parse(value);
    else if (value.startsWith("'")) {
      if (!value.endsWith("'")) throw new Error(key + ' 따옴표 오류');
      value = value.slice(1,-1).replace(/''/g,"'");
    }
    if (typeof value !== 'string') throw new Error(key + ' 문자열 필요');
    fields[key] = value.trim();
  }
  const name = fields.name || fallback;
  if (!slug.test(name) || !fields.description) throw new Error('name/description 누락');
  return { name, description: fields.description };
}

function listRules(base) {
  const start = join(base, '.rulesync/rules');
  const result = [];
  if (!existsSync(start)) return result;
  function walk(dir) {
    for (const item of readdirSync(dir,{withFileTypes:true})) {
      if (item.name.startsWith('.')) continue;
      const path = join(dir,item.name);
      if (item.isDirectory()) { walk(path); continue; }
      if (!item.isFile() || !item.name.endsWith('.md') || item.name === 'README.md') continue;
      const expected = basename(item.name,'.md');
      const {name,description} = frontmatter(readFileSync(path,'utf8'), expected);
      if (name !== expected) throw new Error('Rule 이름 불일치: ' + path);
      result.push({name,path:relative(base,path).split(sep).join('/'),description});
    }
  }
  walk(start);
  return result;
}

function listSkills(base) {
  const start = join(base,'.rulesync/skills');
  const result = [];
  if (!existsSync(start)) return result;
  for (const item of readdirSync(start,{withFileTypes:true})) {
    if (!item.isDirectory() || item.name.startsWith('.')) continue;
    const path = join(start,item.name,'SKILL.md');
    if (!existsSync(path)) continue;
    const {name,description} = frontmatter(readFileSync(path,'utf8'));
    if (name !== item.name) throw new Error('Skill 이름 불일치: ' + path);
    result.push({name,path:relative(base,path).split(sep).join('/'),description});
  }
  return result;
}

export function buildIndexes(base=root) {
  const encode=(entries,kind)=>{
    const names=new Set();
    for (const entry of entries) {
      if (names.has(entry.name)) throw new Error(kind+' 중복: '+entry.name);
      names.add(entry.name);
    }
    return entries.sort((a,b)=>a.name.localeCompare(b.name))
      .map(entry=>JSON.stringify(entry)+'\n').join('');
  };
  return {
    '.agents/route/rules.jsonl':encode(listRules(base),'Rule'),
    '.agents/route/skills.jsonl':encode(listSkills(base),'Skill')
  };
}

export function run(action,base=root) {
  if (!['generate','check'].includes(action)) throw new Error('generate 또는 check를 지정하세요');
  const stale=[];
  for (const [path,expected] of Object.entries(buildIndexes(base))) {
    const dest=resolve(base,path);
    const current=existsSync(dest)?readFileSync(dest,'utf8'):null;
    if (current===expected) continue;
    if (action==='generate') writeFileSync(dest,expected);
    else stale.push(path);
  }
  return stale;
}

if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const stale=run(process.argv[2]);
    if (stale.length) {
      console.error('오래된 라우팅 색인: '+stale.join(', '));process.exitCode=1;
    } else console.log('라우팅 색인 '+process.argv[2]+' 완료');
  } catch(error) {console.error('ERROR: '+error.message);process.exitCode=2;}
}
