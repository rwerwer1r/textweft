# Agent Governance

권한·계정·승인의 정본은 [AGENTS.md](../../../AGENTS.md)입니다. 이 문서는 중요한 결정과 리뷰 기준만 보충하며 새 권한을 부여하지 않습니다.

## Decision Boundary

| 작업 | 담당 |
| --- | --- |
| 범위 내 작은 코드·테스트·문서 변경, PR 준비 | AI 주도·검증 근거 보고 |
| 제품 방향·공개 API/호환성·보안·구조·외부 노출·중요 비용 | 프레임워크 개발자 결정 |
| 병합·릴리스·배포·권한 변경 | 명시적 승인 및 플랫폼 게이트 |

## Review Evidence

diff에서 **계약·회귀·보안·문서 불일치·검증 공백**을 점검합니다. 같은 모델의 반복 검토는 독립 리뷰가 아닙니다. 테스트·CI·정적 확인·미실행을 구분합니다.

실제 제품 계약은 코드·테스트·[README](../../../README.md), AI 협업은 [Vibe Coding](../workflows/vibe-coding.md), 작업 절차는 [Routine Loop](../workflows/routine-loop.md), 기록은 [Inbox](../../../inbox/README.md)를 따릅니다.
