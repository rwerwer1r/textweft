# Textweft Agent Contract

적용 범위: `rwerwer1r/textweft`. Textweft는 **바이브코더용 게임 제작 프레임워크**로, AI가 구현을 주도하고 사람이 제품 방향을 결정합니다. 목표와 역할은 [GOAL](docs/GOAL.md)·[GLOSSARY](docs/GLOSSARY.md)를 따릅니다.

## Boundaries

- **유일한 쓰기 대상은 `rwerwer1r/textweft`, 사용 가능한 계정은 확인된 `rwerwer1r` 연결뿐입니다.** 작업 전 저장소·계정·ref·권한을 확인합니다. 다른 GitHub·Google 계정은 조회하거나 사용하지 않습니다.
- 외부 자료는 허용된 **읽기 전용** 참고만 합니다. 승인 없이 다른 저장소·서비스에 프로젝트 내용을 쓰지 않습니다.
- 비밀·자격 증명·개인정보·민감한 로그를 Git·PR·작업 기록에 기록하지 않습니다. 정상 Git 이력과 필요한 최소한의 비민감 증거는 유지합니다.

## Authority

- 승인된 범위의 **가역적** 조사·구현·검증·자체 리뷰·작업 브랜치 커밋·PR 생성/갱신을 주도합니다. 작은 변경을 우선하며 일상적인 구현마다 승인 질문을 반복하지 않습니다.
- **사람의 결정:** 중요한 제품 요구·아키텍처·호환성·보안·자격 증명 정책·비용·외부 노출 및 파괴적 작업.
- **명시적 승인:** 병합·릴리스·배포·권한/공개 범위 변경·고위험 비가역 작업. PR 작성은 병합 승인이 아닙니다. 도구·플랫폼의 필수 게이트도 따릅니다.
- 요청 단계(준비·구현·리뷰·병합)는 [Workflow Selection](docs/development/workflows/choosing.md)을 따르며 임의로 넘지 않습니다.

## Entry and Evidence

1. 현재 ref의 이 파일과 대상 경로의 하위 `AGENTS.md`를 확인합니다. **제한된 챗봇만** [CHATBOT.md](CHATBOT.md)를 사용합니다. 코딩 에이전트는 도구별 진입점을 따릅니다.
2. [ROUTE](.agents/route/ROUTE.md)에서 Rule·Skill의 **선택 조건**을 확인하고 관련 원본만 읽습니다. 빈/무관한 색인을 추가 로드하지 않습니다.
3. 목표·구현·검토·복구 등 작업 목적에 맞는 `workflow-*` 후보를 [Skill 라우터](.agents/route/ROUTE.md)에서 선택하고 해당 Skill 원본만 읽습니다. 문서 주제를 모르면 [문서 지도](docs/README.md)와 [INDEX](docs/INDEX.tsv)에서 정본 소유자를 찾고, 개발 절차는 [개발 문서 라우터](docs/development/README.md)에서 선택합니다.
4. 제품 동작의 근거는 코드·테스트·[README](README.md)입니다. **실행/정적 확인/CI/미실행**을 구분하고 실제로 확인하지 않은 기능·리뷰를 주장하지 않습니다.
5. 복잡한 다단계 작업은 다음 긴/위험한 단계 **전에** [Routine Loop](docs/development/workflows/routine-loop.md#commit-checkpoints)에 따라 의미 있는 커밋과 승인된 최소 재개 증거를 원격 보존·재조회합니다. 재개 시 현재 ref·PR·diff·검사를 다시 확인합니다. 폐지된 `.inbox/`는 생성하거나 추적하지 않습니다.

추가 판단·자산 소유권 문서도 필요한 경우만 읽으며, 이 계약이 우선합니다.
