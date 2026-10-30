import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildIndexes,frontmatter} from '../scripts/agent-route-index.mjs';

test('현재 Rule과 Skill 색인',()=>{
 const indexes=buildIndexes();
 const row=JSON.parse(indexes['.agents/route/rules.jsonl'].trim());
 assert.equal(row.name,'typescript');
 assert.equal(row.path,'.rulesync/rules/typescript.md');
 assert.equal(indexes['.agents/route/skills.jsonl'],'');
});

test('frontmatter 오류 판별',()=>{
 assert.throws(()=>frontmatter('plain'),/frontmatter/);
 assert.throws(()=>frontmatter('---\nname: x\n---'),/description/);
 assert.throws(()=>frontmatter('---\ndescription: a\ndescription: b\n---','x'),/중복/);
});
