# Rulesync Tooling

이 문서는 Textweft 에이전트 자산의 **저작 원본·생성물·검증·업데이트 경계**를 정의합니다. 기본 도구 옵션은 [Rulesync 공식 문서](https://rulesync.dyoshikawa.com/guide/configuration)를 참조합니다.

## Ownership

| 항목 | 역할 | Git 관리 |
| --- | --- | --- |
| [AGENTS.md](../../../AGENTS.md), [CHATBOT.md](../../../CHATBOT.md) | 공통 권한 계약·챗 진입점, Rulesync 생성물 아님 | 직접 관리 |
| [TypeScript Rule](../../../.rulesync/rules/typescript.md) | 경로별 Rule 정본 | 직접 관리 |
| [프로젝트 Skill](../../../.rulesync/skills/README.md) | 독립적인 재사용 절차의 원본 | 직접 관리 |
| [rulesync.jsonc](../../../rulesync.jsonc), [rulesync.lock](../../../rulesync.lock) | 타깃·소스 선언과 버전 고정 | 직접 관리 |
| [라우터](../../../.agents/route/ROUTE.md)의 JSONL | 원본에서 생성하는 발견용 색인 | 생성 후 Git 추적 |
| `.github/instructions/`, `.github/skills/`, `.agents/rules/` 등 | 도구별 로컬 복사본 | Git 무시 |

루트 `AGENTS.md`와 `CHATBOT.md`는 Rulesync로 생성·덮어쓰지 않습니다. 다른 도구가 소유하는 경로를 침범하지 않는지 확인합니다.

## Lifecycle

Textweft는 [실행 래퍼](../../../scripts/rulesync)에서 **Rulesync 40.2.0**을 고정합니다. 처음 실행할 때 공식 바이너리를 받아 플랫폼별 SHA-256을 확인하고 `.cache/textweft/`에 저장합니다. Rulesync는 **개발 도구**이며 게임 런타임 의존성이 아닙니다.

```sh
bash scripts/rulesync-assets install   # 버전 고정된 소스 설치 (현재 외부 소스 없음)
bash scripts/rulesync-assets generate  # 도구별 로컬 복사본 및 라우팅 JSONL 생성
bash scripts/rulesync-assets check     # strict 진단·소유권·라우팅 색인 일치 검사
node scripts/agent-route-index.mjs check # Rulesync 바이너리 없이 원본/색인 비교
```

`generate`·`check`는 로컬 생성물을 만들 수 있습니다. 해당 도구를 실제 실행하지 않았다면 Rulesync 동기화가 검증됐다고 주장하지 않습니다.

## External Sources

초기 `sources: []` 및 빈 `rulesync.lock`을 사용하며 **외부 Skill·Subagent를 설치하지 않습니다**. 향후 다른 계정이나 저장소의 자산 도입은 계정 경계·라이선스·버전 고정·신뢰 범위를 별도 승인·검토한 뒤 확장합니다. 현재 `update` 명령은 의도적으로 비활성화되어 있습니다.

## Route Indexes

[rules.jsonl](../../../.agents/route/rules.jsonl)과 [skills.jsonl](../../../.agents/route/skills.jsonl)은 `name`·`path`·`description`으로 이루어진 한 줄당 하나의 JSON입니다. [색인 생성기](../../../scripts/agent-route-index.mjs)가 원본을 읽어 재생성·일치성 검사를 수행합니다. 색인은 직접 수정하지 않습니다.

실제 Rule의 `globs`·선택 조건은 [라우터](../../../.agents/route/ROUTE.md)에서 원본을 읽어 검토합니다. 정적 검사가 통과해도 특정 코딩 에이전트가 규칙을 자동 적용했다는 증거는 아닙니다.
