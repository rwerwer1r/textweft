# Chat Runtime Entry

이 문서는 Textweft 저장소의 기존 하네스로 연결하는 **얇은 챗 런타임 진입점**입니다. 별도의 권한·절차 정본이 아닙니다.

## Read order

1. 현재 저장소·ref·요청 단계·GitHub 계정을 확인하고 [AGENTS.md](AGENTS.md) 및 대상 경로에 적용되는 하위 지침을 읽습니다.
2. [자산 라우터](.agents/route/ROUTE.md)에서 작업과 관련된 등록 자산만 선택하고 실제 원본을 읽습니다.
3. 변경 작업에서는 [워크플로 선택](docs/development/workflows/choosing.md), [바이브코딩 워크플로](docs/development/workflows/vibe-coding.md), [일상 작업 루프](docs/development/workflows/routine-loop.md)를 확인합니다. 복원할 상태가 있는 작업은 [인박스 정책](inbox/README.md)도 따릅니다.

## Vibe Coding Bridge

- 자연어 요청에서 프레임워크 사용 경험과 검증 가능한 수용 조건을 도출합니다. 역할 용어는 [용어집](docs/GLOSSARY.md)을 따릅니다. 작은 작업에는 불필요한 명세나 승인 질문을 늘리지 않고 구현을 주도합니다.
- 실제 소스·예제·테스트를 근거로 작게 변경하고 **의도 → 결과 → 검증/미실행 → 사람이 결정할 사항**을 보고합니다.
- 바이브코더가 프레임워크를 이해하고 재사용할 수 있는지 평가합니다. AI 생성 코드를 검증 없이 통과한 것으로 간주하지 않습니다.

## Platform entrypoints

- **ChatGPT:** ChatGPT 대화·프로젝트 환경은 Rulesync의 별도 `chatgpt` 타깃이 아닙니다. 이 파일을 진입 안내로 연결하고 실제로 저장소 파일을 읽었는지 확인합니다. 자동 발견을 전제하지 않습니다.
- **Codex CLI:** 직접 관리하는 [AGENTS.md](AGENTS.md)를 기준으로 작업하며 Rulesync는 Skill 투영만 담당합니다.
- **Claude Code:** [CLAUDE.md](CLAUDE.md) 진입점에서 [AGENTS.md](AGENTS.md)를 읽고, Rulesync가 별도로 생성하는 경로별 Rule을 적용합니다.
- **Gemini CLI:** [GEMINI.md](GEMINI.md) 진입점에서 같은 정본을 읽습니다. Antigravity IDE/CLI는 Rulesync의 별도 지원 타깃입니다.

## Capability bridge

- 셸·원격 클론·CI·편집기·스크립트 실행 도구·Subagent 위임 기능이 존재한다고 가정하지 않습니다. 사용 가능한 역량을 먼저 확인합니다.
- 지원되는 대체 실행 환경에서 검토된 범위의 검증 단계를 재현할 수 있지만 **대체 실행**임을 밝힙니다. 원래 명령이나 타깃 환경에서 실행했다고 주장하거나 샌드박스·계정·권한을 우회하지 않습니다.
- 등록된 Subagent가 필요하나 위임할 수 없다면 실제 역할 계약을 읽고, 적절할 경우 이 챗에서 역할별로 구분하여 분석합니다. **단일 에이전트의 대체 수행**이라고 밝히며 독립 리뷰라고 주장하지 않습니다.
- 원본 파일·권한·런타임 기능에 접근할 수 없다면 미확인 부분을 명시합니다. 없는 절차를 추측하거나 다른 저장소를 임의로 대체하지 않습니다.
