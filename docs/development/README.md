# Textweft Development

Textweft는 아직 공개 패키지가 아닌 비공개 v0.1 TypeScript 프로토타입입니다. 런타임 동작과 실행 명령은 루트 [README](../../README.md)에서 확인합니다.

## Project direction

- [프로젝트 목표](../GOAL.md): 바이브코더 타깃, 프레임워크 목표·원칙·비목표
- [용어집](../GLOSSARY.md): 프레임워크 개발자·게임 개발자·게임 플레이어
- [언어 규칙](../LANGUAGE.md): 문서 및 협업 언어 기준

## Agent and contributor guidance

- [공통 에이전트 계약](../../AGENTS.md): 저장소·계정 경계, 권한, 승인, 진입점
- [제한 런타임 챗봇 하네스](../../CHATBOT.md): 코딩 실행 환경이 없거나 제한된 챗봇에서 동일한 절차·근거·인계를 재현하는 진입점 (코딩 에이전트 기본 진입점 아님)
- [자산 라우터](../../.agents/route/ROUTE.md): 선택형 Rule·Skill 탐색
- [Rulesync 운영](tooling/rulesync.md): 저작 원본, 도구별 생성물, 버전 고정·검증
- [에이전트 거버넌스](ai-agent/README.md): 의사결정 및 위임 범위
- [워크플로 선택](workflows/choosing.md): 준비·구현·PR·병합 단계
- [일상 작업 루프](workflows/routine-loop.md): 개발·검증·리뷰·완료 조건
- [바이브코딩 워크플로](workflows/vibe-coding.md): 자연어 의도, AI 주도 변경, 검증, 사람의 방향 결정
- [인박스 정책](../../inbox/README.md): 최소한의 복원 가능한 작업 상태

## Project checks

의존성을 설치한 후 `npm test`와 `npm run typecheck`로 런타임과 타입을 확인합니다. `npm run harness:check`는 에이전트 문서 구조와 등록 자산 경로를 확인합니다. 각 검사의 대상은 서로 다르며, 하네스 검사 성공이 게임 런타임 검증을 뜻하지는 않습니다.
