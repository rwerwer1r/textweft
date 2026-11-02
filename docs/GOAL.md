# Project Goal

**Textweft는 바이브코더가 웹 게임을 만드는 데 사용하는 프레임워크**다. 게임 자체나 호스팅 서비스를 만드는 프로젝트가 아니다.

게임 개발자는 자연어 요구를 AI 코딩 도구와 함께 게임 정의로 만들고, 실행·검증·수정을 반복한다. 게임 플레이어는 완성된 게임을 브라우저에서 실행한다. 프레임워크 내부 구현을 몰라도 게임을 제작할 수 있어야 한다.

## Initial Focus

**현재 집중 범위는 텍스트와 정적 이미지로 이루어진 웹 게임**이다. 텍스트만 사용하는 게임도 가능해야 한다.

- 장면, 화자·대사, 선택지와 분기를 구성한다.
- 조건·변수·게임별 규칙으로 진행을 제어한다.
- 장면·인물·배경 등에 정적 이미지를 연결하고 표시한다.
- 진행 상태를 저장·복원하고, 잘못된 입력·정의·전이로 상태가 부분 손상되지 않도록 한다.
- 게임 제작자가 이해할 수 있는 스키마·오류·예제와 검증 경로를 제공한다.

간단한 **미연시(비주얼 노벨)** 는 초기 수용 시나리오의 예시다. 특정 장르의 호감도·전투·퀘스트 모델을 코어에 고정하지 않는다.

이 범위의 구체적인 설계·수용 조건은 [Engine Design Research](architecture/engine-research.md)에서 검토한다. 현재 코드가 이 목표를 모두 구현했다는 뜻은 아니다.

## Product Principles

- **Vibe-coder-first:** 자연어 → 게임 정의 → 실행 → 오류 수정의 반복을 쉽게 한다.
- **Data-first:** 설명·검증 가능한 콘텐츠를 우선하고, 필요한 게임별 규칙만 명시적으로 확장한다.
- **Headless core:** 게임 상태·규칙과 화면 표시·입출력·호스팅을 분리한다.
- **Reliable progress:** 약속한 범위에서 결정적인 상태 전이, 실패 시 원자성, 저장·복원을 검증한다.
- **Small and reusable:** 특정 장르에 종속되지 않는 가장 작은 검증 가능한 계약을 우선한다.

AI가 생성한 게임 정의와 코드도 테스트·실행 근거로 검증한다. 예제 게임은 프레임워크의 사용성·재사용성을 확인하기 위한 수단이다.

## Deferred Capabilities

효과음·BGM, 동영상, 외부 이미지 생성(예: ComfyUI), Spine 계열 2D 스켈레탈 애니메이션, 게임별 선택적 MOD 지원은 **추후 검토 후보**다. 현재는 해당 기능의 API·에셋 포맷·라이브러리·정책·구현 일정을 구체화하지 않는다.

AI 모델의 런타임 필수화, 범용 3D 엔진, 내장 비주얼 에디터·호스팅 서비스도 초기 목표가 아니다. 기능의 필요가 확인되면 별도 범위에서 판단한다.

## Document Ownership

- **이 문서:** 제품 목적, 사용자 경험, 현재·미래 범위
- **[Architecture Decision](architecture.md):** Rust 코어 등 채택된 기술 결정
- **[Engine Design Research](architecture/engine-research.md):** 미확정 초기 엔진 설계와 수용 조건
- **[Development Guide](development/README.md):** P0 → P1 → P2 작업 순서·검증
- **[README](../README.md):** 현재 구현·사용 방법

역할 정의는 [Glossary](GLOSSARY.md), 개발 방식은 [Vibe Coding Workflow](development/workflows/vibe-coding.md)를 따른다.
