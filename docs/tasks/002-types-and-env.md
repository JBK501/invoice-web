# Task 002: 타입 정의 및 환경 변수 설계

## 개요

UI(Phase 2)와 Notion 데이터 계층(Task 005)이 공유할 도메인 타입 계약을 확정하고, Notion 시크릿을 서버에서만 안전하게 읽는 환경 변수 헬퍼와 포맷 유틸을 마련한다.

- **기능 매핑**: F001, F010
- **의존 관계**: 없음 (Task 001과 병렬 가능)
- **참조 문서**: `node_modules/next/dist/docs/01-app/02-guides/environment-variables.md`, `01-app/01-getting-started/05-server-and-client-components.md`

## 관련 파일

- `src/types/invoice.ts` (CREATE) — `Invoice`, `InvoiceItem`, `InvoiceStatus`, 매퍼 시그니처
- `src/lib/env.ts` (CREATE) — `getNotionApiKey()`, `getNotionDatabaseId()`
- `src/lib/format.ts` (CREATE) — `formatCurrency()`, `formatDate()`
- `.gitignore` 확인 — `.env*` 무시 (`.env.example`은 사용하지 않고 `.env.local`로 관리)
- `README.md` (MODIFY) — 환경 변수 설정 절차 보강

## 구현 단계

- [x] PRD 데이터 모델의 snake_case 필드를 그대로 반영해 도메인 타입을 정의한다.
- [x] Notion 원본 타입과 도메인 타입을 분리한다. 원본 타입은 SDK 미설치 상태이므로 제네릭 매퍼 시그니처(`InvoiceMapper`, `InvoiceItemMapper`)만 선언하고 구현은 Task 005에 위임한다.
- [x] `env.ts` 최상단에 `import "server-only"`를 두고, 값이 없거나 공백이면 변수명을 포함한 에러를 throw 한다.
- [x] `format.ts`에 KRW 통화 포맷과 `Asia/Seoul` 고정 날짜 포맷을 작성한다. 빈 값/잘못된 값에도 throw 하지 않는다.
- [x] `.gitignore`의 `.env*` 무시 확인. `.env.example` 대신 `.env.local`로 관리한다.

## 실제 노션 DB 대조 결과

CSV 내보내기와 읽기 전용 스키마 조회(`databases.retrieve`)로 확인했다.

| DB | 속성 | 노션 타입 |
| --- | --- | --- |
| Invoices | 견적서 번호 / 클라이언트명 / 발행일 / 유효기간 | title / rich_text / date / date |
| Invoices | 상태 | **status** (대기, 거절, 승인) — PRD의 Select가 아니다 |
| Invoices | 총 금액 / 항목 | number / relation → Items |
| Items | 항목명 / 수량 / 단가 / 금액 | title / number / number / formula(수량 × 단가) |
| Items | Invoices | relation → Invoices (PRD의 '견적서'가 아니다) |

- 속성명은 `src/types/invoice.ts`의 `NOTION_INVOICE_PROPERTIES`, `NOTION_ITEM_PROPERTIES`로 관리한다. 매퍼(Task 005)는 이 상수를 사용한다.
- Items DB ID 환경 변수는 추가하지 않는다. 견적서 페이지의 `항목` relation에서 항목 페이지를 개별 조회한다.

## 결정 사항

- `server-only`는 별도 설치하지 않는다. Next.js가 내부적으로 처리하며 타입 선언도 제공한다(`05-server-and-client-components.md`).
- 날짜 포맷은 `timeZone: "Asia/Seoul"`로 고정해 서버(UTC)와 브라우저 간 하이드레이션 불일치 및 날짜 밀림을 방지한다.

## 수락 기준

- [x] `npx tsc --noEmit`, `npm run build`, `eslint` 통과.
- [x] 환경 변수 누락 시 `환경 변수 NOTION_API_KEY이(가) 설정되지 않았다...` 에러가 발생한다.
- [x] `env.ts`가 `server-only`를 import 해 클라이언트 번들에서 사용 시 빌드 에러가 난다.
- [x] `.env.local`이 `git status`에 노출되지 않는다(gitignore).
