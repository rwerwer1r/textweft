import { existsSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { run } from './agent-route-index.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const required = [
 'AGENTS.md', 'CHATBOT.md', 'CLAUDE.md', 'GEMINI.md',
 '.agents/route/ROUTE.md', '.agents/route/rules.jsonl', '.agents/route/skills.jsonl',
 '.rulesync/rules/typescript.md', 'rulesync.jsonc', 'rulesync.lock',
 'docs/GOAL.md', 'docs/GLOSSARY.md', 'docs/LANGUAGE.md',
 'docs/development/README.md', 'docs/development/ai-agent/README.md',
 'docs/development/tooling/rulesync.md',
 'docs/development/workflows/choosing.md', 'docs/development/workflows/routine-loop.md',
 'docs/development/workflows/vibe-coding.md', 'inbox/README.md',
 '.github/pull_request_template.md', 'scripts/rulesync', 'scripts/rulesync-assets',
 'scripts/agent-route-index.mjs', 'scripts/check-inbox.mjs',
];
const docs = ['README.md', ...required.filter(path => path.endsWith('.md'))];
const errors = [];
function inside(path) {
 const rel=relative(root,path);
 return rel===''||(rel!=='..'&&!rel.startsWith('..'+sep)&&!isAbsolute(rel));
}
for(const path of required)if(!existsSync(resolve(root,path)))errors.push('필수 파일 누락: '+path);
for(const path of docs) {
 const file=resolve(root,path);
 if(!existsSync(file))continue;
 const content=readFileSync(file,'utf8');
 for(const match of content.matchAll(/\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g)){
  const link=match[1].split('#',1)[0];
  if(!link||/^[a-z][a-z0-9+.-]*:/i.test(link)||link.startsWith('/'))continue;
  let target;
  try{target=resolve(dirname(file),decodeURIComponent(link));}
  catch{errors.push('상대 링크 오류: '+path+' -> '+link);continue;}
  if(!inside(target)||!existsSync(target))errors.push('깨진 상대 링크: '+path+' -> '+link);
 }
}
try{if(run('check').length)errors.push('Rulesync 라우팅 색인 불일치');}
catch(e){errors.push('라우팅 검사 실패: '+e.message);}
for(const issue of errors)console.error('ERROR:',issue);
process.exitCode=errors.length?1:0;
if(!errors.length)console.log('하네스 구조, 링크, Rule/Skill 색인 원본 일치 검사 완료 (Rulesync CLI 검사는 별도).');
