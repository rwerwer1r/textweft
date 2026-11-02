---
description: PR 12 초경량 CI 자체 검토와 재검증 상태
updated: 2026-11-03T06:17:27+09:00
---

# PR 12 — lightweight CI

- **목표:** 개발에 실질적으로 필요한 테스트·타입 검사는 유지하면서 불필요한 CI 검사를 최소화한다.
- **제외:** 게임 기능 변경, 자동 병합, 별도 러너·외부 서비스·계정 사용.
- **대상:** `rwerwer1r/textweft` · `chore/lightweight-ci` · PR #12.
- **상태:** handoff (병합 승인 대기).
- **검증 기준점:** `87b6d4683abffe05ef4ada18b68ff09ee1198198` (CI 성공 커밋).
- **검증:** GitHub Actions `CI` 성공(run 41526806528). `npm ci --ignore-scripts --no-audit --no-fund`, `npm test`, `npm run typecheck`. 로컬 및 선택형 하네스 검사는 미실행.
- **검토:** `package-lock.json`의 패키지 5개에서 `hasInstallScript` 없음. `--ignore-scripts` 적용 및 PR 템플릿에서 선택 검사를 명확히 함. PR 전체 변경 파일 자체 리뷰에서 추가 중요 finding 없음. 독립 리뷰는 수행하지 않음.
- **위험/승인:** GitHub 계정은 `rwerwer1r`만 사용. 병합·배포 미승인; PR 브랜치 변경만 진행.
- **다음:** 최신 PR ref/CI/리뷰 재확인 후 사람의 명시적 병합 승인 시에만 병합. 임의 배포·자동 재호출 없음.
