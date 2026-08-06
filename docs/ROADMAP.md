# 노션 기반 견적서 시스템 개발 로드맵

노션을 데이터베이스로 활용해 견적서를 조회하고 PDF로 다운로드하는 인증 없는 공개 웹 서비스를 구축한다.

## 개요

이 프로젝트는 견적서를 발행하는 프리랜서/소규모 기업과 견적서를 받는 클라이언트를 위한 최소 기능 견적서 조회 서비스로 다음 기능을 제공한다.

- **노션 데이터베이스 연동 (F001)**: Notion API로 견적서 및 견적 항목 데이터를 실시간 조회한다.
- **견적서 조회 (F002)**: `/invoice/[notionPageId]` 고유 URL로 견적서 내용을 렌더링한다.
- **PDF 다운로드 (F003)**: 조회 중인 견적서를 PDF 파일로 생성해 즉시 내려받는다.
- **유효성 검증 (F011)**: 존재하지 않거나 잘못된 견적서 ID 접근 시 404 안내를 표시한다.
- **반응형 레이아웃 (F012)**: 모바일/태블릿/데스크톱 전 구간에서 정상 동작한다.

## 현재 코드베이스 상태

로드맵은 아래 상태를 기준으로 작성했다. Phase 1의 일부 항목은 이미 스타터킷 정리 단계에서 완료된 상태다.

| 항목 | 상태 |
| --- | --- |
| Next.js 16.2 App Router + React 19.2 + TypeScript 5 | 설치 완료 |
| TailwindCSS v4 + shadcn/ui (`base-nova`, `@base-ui/react`) | 설치 완료 |
| `src/app/layout.tsx` (ThemeProvider / Header / Footer / Toaster) | 구현 완료 |
| `src/app/not-found.tsx` (견적서 404 문구 반영) | 구현 완료 |
| `src/components/ui/*` (alert, badge, button, card, dialog, separator, skeleton 등 14종) | 설치 완료 |
| `src/components/layout/*` (container, header, footer), `src/components/common/*` | 구현 완료 |
| `@notionhq/client` | 미설치 (Task 003에서 도입) |
| PDF 생성 라이브러리 (`@react-pdf/renderer` 등) | 미설치 (Task 007에서 도입) |
| `NOTION_API_KEY`, `NOTION_DATABASE_ID` | 미설정 (Task 002에서 설정) |
| `src/app/invoice/[notionPageId]/` 라우트 | 미생성 (Task 001에서 생성) |

## ⚠️ Next.js 16 작업 규칙 (필수)

`AGENTS.md` 지침에 따라 **이 버전의 Next.js는 기존 지식과 다를 수 있다.** 코드를 작성하기 전에 반드시 `node_modules/next/dist/docs/` 의 해당 가이드를 먼저 읽고, deprecation 안내를 준수한다. 각 Task에는 참조해야 할 문서 경로를 명시했다.

주요 참조 경로는 다음과 같다.

| 주제 | 문서 경로 |
| --- | --- |
| 라우트/레이아웃/동적 세그먼트 | `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md` |
| 서버/클라이언트 컴포넌트 경계 | `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` |
| 데이터 페칭 | `node_modules/next/dist/docs/01-app/01-getting-started/06-fetching-data.md` |
| 캐싱 (Cache Components / `use cache`) | `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md` |
| 에러 처리 / `not-found` | `node_modules/next/dist/docs/01-app/01-getting-started/10-error-handling.md` |
| Route Handlers | `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md` |
| 메타데이터 | `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md` |
| 환경 변수 | `node_modules/next/dist/docs/01-app/02-guides/environment-variables.md` |
| 배포 | `node_modules/next/dist/docs/01-app/01-getting-started/17-deploying.md` |
| 패키지 번들링 (서버 전용 패키지) | `node_modules/next/dist/docs/01-app/02-guides/package-bundling.md` |

특히 주의할 변경점은 다음과 같다.

- **동적 라우트의 `params`는 Promise다.** `params: Promise<{ notionPageId: string }>` 로 타이핑하고 `await params` 로 구조 분해한다.
- **캐싱 모델이 Cache Components 기준으로 바뀌었다.** `use cache` 디렉티브 사용 여부를 `08-caching.md` 로 확인하고, 미사용 시 `02-guides/caching-without-cache-components.md` 를 따른다.
- 서버 전용 패키지(`@notionhq/client`, Puppeteer 등)는 번들링 설정이 필요할 수 있으므로 `package-bundling.md` 를 확인한다.

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악한다.
   - 새로운 작업을 포함하도록 `docs/ROADMAP.md`를 업데이트한다.
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입한다.

2. **작업 생성**
   - `/tasks` 디렉토리에 새 작업 파일을 생성한다. 명명 형식은 `XXX-description.md`다 (예: `001-routing-skeleton.md`).
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계를 포함한다.
   - API/비즈니스 로직 작업에는 **"## 테스트 체크리스트" 섹션을 필수로 포함**하고 Playwright MCP 테스트 시나리오를 작성한다.
   - 직전 완료 작업 파일을 예시로 참조한다. 새 작업 문서는 빈 체크박스 상태이며 변경 사항 요약이 없어야 한다.

3. **작업 구현**
   - 작업 파일 명세를 따라 구현한다.
   - 코드 작성 전 위 표의 Next.js 16 문서를 먼저 읽는다.
   - **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트를 수행한다.**
   - 각 단계 후 작업 파일 내 진행 상황을 업데이트하고, 단계 완료 시 중단해 추가 지시를 기다린다.

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 ✅로 표시한다.

## 상태 표기 규칙

- `✅ - 완료`: 완료된 작업. 완료 시 `See: /tasks/XXX-xxx.md` 참조를 추가한다.
- `- 우선순위`: 즉시 시작해야 할 작업.
- 표기 없음: 대기 중인 작업.

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축

전체 라우트 구조와 타입 정의를 먼저 확정해 UI와 데이터 계층이 병렬로 진행되도록 한다.

- [ ] **Task 001: 라우트 구조 및 페이지 골격 생성** - 우선순위
  - **기능 매핑**: F002, F011, F012
  - **의존 관계**: 없음 (병렬 시작 가능)
  - **참조 문서**: `01-app/01-getting-started/03-layouts-and-pages.md`, `10-error-handling.md`
  - 구현 사항
    - [ ] `src/app/invoice/[notionPageId]/page.tsx` 동적 라우트 생성. `params: Promise<{ notionPageId: string }>` 로 타이핑하고 `await params` 로 읽는다.
    - [ ] `src/app/invoice/[notionPageId]/loading.tsx` 생성 (Skeleton 기반 로딩 UI 자리표시자).
    - [ ] `src/app/invoice/[notionPageId]/error.tsx` 생성 (렌더링 오류 경계).
    - [ ] `src/app/invoice/[notionPageId]/not-found.tsx` 생성 또는 루트 `not-found.tsx` 재사용 여부 결정.
    - [ ] `src/app/page.tsx` 를 서비스 안내용 랜딩으로 정리한다 (MVP에서 목록 기능은 제공하지 않음).
    - [ ] `generateMetadata` 로 견적서 번호가 제목에 반영되도록 골격만 배치한다.
  - **완료 조건(DoD)**
    - [ ] `/invoice/test-id` 접근 시 빈 껍데기 페이지가 200으로 렌더링된다.
    - [ ] `npm run build` 와 `npm run lint` 가 오류 없이 통과한다.
    - [ ] `params` 를 동기 접근하는 코드가 없다.

- [ ] **Task 002: 타입 정의 및 환경 변수 설계**
  - **기능 매핑**: F001, F010
  - **의존 관계**: 없음 (Task 001과 병렬 가능)
  - **참조 문서**: `01-app/02-guides/environment-variables.md`
  - 구현 사항
    - [ ] `src/types/invoice.ts` 에 `Invoice`, `InvoiceItem`, `InvoiceStatus` 타입 정의. PRD 데이터 모델(`invoice_number`, `client_name`, `issue_date`, `valid_until`, `items`, `total_amount`, `status`)을 그대로 반영한다.
    - [ ] `InvoiceItem` 에 `description`, `quantity`, `unit_price`, `amount`(Formula 결과), `invoice_id` 를 정의한다.
    - [ ] Notion 원본 응답 타입과 앱 도메인 타입을 분리하고 매핑 함수 시그니처를 선언한다.
    - [ ] `src/lib/env.ts` 에서 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 를 검증해 읽는 헬퍼를 작성한다 (서버 전용, `NEXT_PUBLIC_` 접두사 금지).
    - [ ] `.env.example` 작성 및 `.gitignore` 에 `.env.local` 포함 여부 확인.
    - [ ] `src/lib/format.ts` 에 통화(KRW) 및 날짜 포맷 유틸을 작성한다.
  - **완료 조건(DoD)**
    - [ ] 모든 타입이 `strict` 모드에서 컴파일된다.
    - [ ] 환경 변수 누락 시 명확한 에러 메시지가 발생한다.
    - [ ] API 키가 클라이언트 번들에 포함되지 않는다.

### Phase 2: UI/UX 완성 (더미 데이터 활용)

실제 Notion 연동 전에 더미 데이터로 화면을 완성해 데이터 계층 작업과 병렬 진행한다.

- [ ] **Task 003: 견적서 UI 컴포넌트 및 더미 데이터 구현**
  - **기능 매핑**: F002, F012
  - **의존 관계**: Task 002 (타입 정의 필요)
  - **참조 문서**: `01-app/01-getting-started/05-server-and-client-components.md`, `11-css.md`
  - 구현 사항
    - [ ] `src/lib/mock/invoice.ts` 에 타입을 만족하는 더미 견적서 데이터를 작성한다 (항목 다수, 장문 항목명, 금액 0원 등 엣지 케이스 포함).
    - [ ] `src/components/invoice/invoice-header.tsx` — 견적서 번호, 클라이언트명, 발행일, 유효기간, 상태 배지.
    - [ ] `src/components/invoice/invoice-items-table.tsx` — 항목명/수량/단가/금액 테이블. 모바일에서는 카드 형태로 전환한다.
    - [ ] `src/components/invoice/invoice-summary.tsx` — 총액 요약.
    - [ ] `src/components/invoice/invoice-skeleton.tsx` — `loading.tsx` 에서 사용할 스켈레톤.
    - [ ] 기존 `src/components/ui/*` (card, badge, separator, skeleton, button) 를 재사용하고 신규 shadcn 컴포넌트가 필요하면 `table` 을 추가한다.
    - [ ] 상태값(대기/승인/거절)에 대응하는 배지 variant 매핑을 구현한다.
  - **완료 조건(DoD)**
    - [ ] 더미 데이터만으로 견적서 화면 전체가 렌더링된다.
    - [ ] 불필요한 `"use client"` 없이 서버 컴포넌트를 기본으로 유지한다.
    - [ ] 다크모드에서 대비가 깨지지 않는다.

- [ ] **Task 004: 반응형 레이아웃 및 404 페이지 완성**
  - **기능 매핑**: F011, F012
  - **의존 관계**: Task 003
  - **참조 문서**: `01-app/01-getting-started/10-error-handling.md`
  - 구현 사항
    - [ ] 모바일(375px) / 태블릿(768px) / 데스크톱(1280px) 브레이크포인트 대응을 완료한다.
    - [ ] 인쇄 스타일(`@media print`)을 적용해 브라우저 인쇄 시에도 견적서가 정상 출력되게 한다.
    - [ ] `not-found.tsx` 에 발행자 문의 안내 문구와 재요청 가이드를 보강한다.
    - [ ] `error.tsx` 에 재시도 버튼과 사용자 친화적 메시지를 구현한다.
    - [ ] 헤더/푸터가 견적서 페이지 맥락에 맞는지 검토하고 불필요한 내비게이션을 정리한다.
  - **테스트 체크리스트 (Playwright MCP)**
    - [ ] 3개 뷰포트에서 가로 스크롤이 발생하지 않는지 확인한다.
    - [ ] 404 페이지가 의도한 문구로 표시되는지 확인한다.
  - **완료 조건(DoD)**
    - [ ] MVP 성공 기준 4번(모바일/태블릿/데스크톱 정상 작동)을 더미 데이터 기준으로 충족한다.
    - [ ] 콘솔 경고 및 하이드레이션 오류가 없다.

### Phase 3: 핵심 기능 구현

더미 데이터를 실제 Notion 데이터로 교체하고 PDF 다운로드를 구현한다.

- [ ] **Task 005: Notion API 클라이언트 및 데이터 계층 구축**
  - **기능 매핑**: F001, F010
  - **의존 관계**: Task 002
  - **참조 문서**: `01-app/01-getting-started/06-fetching-data.md`, `08-caching.md`, `02-guides/package-bundling.md`
  - 구현 사항
    - [ ] `npm install @notionhq/client` 로 공식 SDK를 설치한다.
    - [ ] `src/lib/notion/client.ts` 에 서버 전용 Notion 클라이언트 싱글턴을 구성한다 (`import "server-only"` 적용).
    - [ ] `src/lib/notion/invoice.ts` 에 `getInvoice(pageId)` 구현: 페이지 조회 후 `items` Relation 을 따라 항목 데이터를 조회한다.
    - [ ] Notion 프로퍼티 응답을 Task 002의 도메인 타입으로 변환하는 매퍼를 구현한다 (title/rich_text/date/number/select/relation/formula 각각 처리).
    - [ ] Relation 항목 조회의 N+1 문제를 배치 조회 또는 Items DB 필터 쿼리로 완화한다.
    - [ ] Notion API 오류(404, 401, rate limit)를 도메인 에러로 정규화한다.
    - [ ] 캐싱 전략을 `08-caching.md` 기준으로 결정한다. Cache Components 활성화 여부를 확인하고 `use cache` 또는 대체 방식 중 하나를 명시적으로 채택한다.
  - **테스트 체크리스트 (Playwright MCP)**
    - [ ] 실제 Notion 페이지 ID로 접근 시 견적서 데이터가 화면에 정확히 표시되는지 검증한다.
    - [ ] 항목 금액 합계가 `total_amount` 와 일치하는지 검증한다.
  - **완료 조건(DoD)**
    - [ ] MVP 성공 기준 1번(노션 데이터 정상 조회)을 충족한다.
    - [ ] `@notionhq/client` 가 클라이언트 번들에 포함되지 않는다.
    - [ ] 항목이 0개인 견적서도 오류 없이 렌더링된다.

- [ ] **Task 006: 견적서 조회 페이지 실데이터 연동 및 유효성 검증**
  - **기능 매핑**: F002, F011
  - **의존 관계**: Task 003, Task 004, Task 005
  - **참조 문서**: `01-app/01-getting-started/10-error-handling.md`, `03-api-reference/04-functions/not-found.md`
  - 구현 사항
    - [ ] `src/app/invoice/[notionPageId]/page.tsx` 에서 더미 데이터를 `getInvoice()` 호출로 교체한다.
    - [ ] `notionPageId` 형식(UUID/32자 hex)을 사전 검증해 잘못된 형식은 API 호출 없이 `notFound()` 처리한다.
    - [ ] Notion 404 및 권한 없음 응답을 `notFound()` 로 매핑한다.
    - [ ] 일시적 오류(rate limit, 네트워크)는 `error.tsx` 경계로 전달해 404와 구분한다.
    - [ ] `generateMetadata` 에서 견적서 번호/클라이언트명을 제목에 반영하고, 공개 URL이므로 `robots: noindex` 를 설정한다.
  - **테스트 체크리스트 (Playwright MCP)**
    - [ ] 유효한 URL 접근 시 견적서 항목/금액/날짜가 Notion 원본과 일치하는지 확인한다.
    - [ ] 존재하지 않는 ID 접근 시 404 페이지가 표시되는지 확인한다.
    - [ ] 형식이 잘못된 ID(`abc`, 빈 문자열, 특수문자) 접근 시 500이 아닌 404가 반환되는지 확인한다.
    - [ ] Integration 이 연결되지 않은 페이지 접근 시 내부 오류 메시지가 노출되지 않는지 확인한다.
  - **완료 조건(DoD)**
    - [ ] MVP 성공 기준 2번(고유 URL 조회 정확 표시)과 5번(잘못된 URL 에러 처리)을 충족한다.
    - [ ] 어떤 경로로도 Notion API 키나 스택 트레이스가 클라이언트에 노출되지 않는다.

- [ ] **Task 007: PDF 생성 및 다운로드 구현**
  - **기능 매핑**: F003
  - **의존 관계**: Task 006
  - **참조 문서**: `01-app/01-getting-started/15-route-handlers.md`, `02-guides/package-bundling.md`, `01-app/01-getting-started/17-deploying.md`
  - 구현 사항
    - [ ] PDF 라이브러리를 선정한다. `@react-pdf/renderer`(서버리스 친화적, 한글 폰트 등록 필요) 를 1안, Puppeteer(레이아웃 재현도 우수, Vercel 번들 크기 제약) 를 2안으로 비교해 결정 근거를 작업 파일에 기록한다.
    - [ ] `src/components/pdf/invoice-document.tsx` 에 PDF 문서 컴포넌트를 구현한다.
    - [ ] 한글 폰트를 등록해 글자 깨짐을 방지한다.
    - [ ] `src/app/api/invoice/[notionPageId]/pdf/route.ts` Route Handler 를 구현한다. 클라이언트가 보낸 데이터를 신뢰하지 않고 **서버에서 pageId로 재조회**해 PDF를 생성한다.
    - [ ] `Content-Type: application/pdf` 및 `Content-Disposition: attachment; filename="견적서-{invoice_number}.pdf"` 헤더를 설정한다(파일명 인코딩 처리 포함).
    - [ ] `src/components/invoice/download-pdf-button.tsx` 클라이언트 컴포넌트를 구현한다 (로딩 상태, 실패 시 sonner 토스트).
  - **테스트 체크리스트 (Playwright MCP)**
    - [ ] 다운로드 버튼 클릭 시 PDF 파일이 실제로 내려받아지는지 확인한다.
    - [ ] 다운로드된 PDF의 항목/금액/총액이 웹 화면과 일치하는지 확인한다.
    - [ ] 한글 클라이언트명과 항목명이 깨지지 않는지 확인한다.
    - [ ] 존재하지 않는 pageId로 PDF API 호출 시 404가 반환되는지 확인한다.
    - [ ] 다운로드 중 버튼 중복 클릭이 방지되는지 확인한다.
    - [ ] 연속 재다운로드가 정상 동작하는지 확인한다.
  - **완료 조건(DoD)**
    - [ ] MVP 성공 기준 3번(PDF 다운로드 동작)을 충족한다.
    - [ ] 항목 수가 많아 다중 페이지가 되어도 표 헤더와 총액이 정상 출력된다.

- [ ] **Task 008: 핵심 기능 통합 테스트**
  - **기능 매핑**: F001, F002, F003, F011, F012
  - **의존 관계**: Task 007
  - 구현 사항
    - [ ] 전체 사용자 플로우(링크 접속 → 견적서 확인 → PDF 다운로드) E2E 시나리오를 작성한다.
    - [ ] MVP 성공 기준 5가지를 각각 검증하는 테스트 케이스를 매핑한다.
    - [ ] 에러 핸들링 및 엣지 케이스를 검증한다.
  - **테스트 체크리스트 (Playwright MCP)**
    - [ ] 성공 기준 1: 노션 데이터가 정상 조회된다.
    - [ ] 성공 기준 2: 고유 URL로 견적서가 정확히 표시된다.
    - [ ] 성공 기준 3: PDF 다운로드가 동작한다.
    - [ ] 성공 기준 4: 375px / 768px / 1280px 에서 정상 동작한다.
    - [ ] 성공 기준 5: 잘못된 URL에서 적절한 에러 메시지가 표시된다.
    - [ ] 엣지 케이스: 항목 0개, 항목 50개 이상, 금액 0원, 유효기간 만료, 상태값 누락, 필수 프로퍼티 누락.
    - [ ] Notion API 지연/실패 시 화면이 무한 로딩에 빠지지 않는다.
  - **완료 조건(DoD)**
    - [ ] MVP 성공 기준 5가지가 모두 통과 기록으로 남는다.
    - [ ] 발견된 결함이 모두 수정되거나 백로그로 등록된다.

### Phase 4: 배포 및 최적화

- [ ] **Task 009: Vercel 배포 및 운영 설정**
  - **기능 매핑**: F010
  - **의존 관계**: Task 008
  - **참조 문서**: `01-app/01-getting-started/17-deploying.md`, `02-guides/deploying-to-platforms.md`, `02-guides/environment-variables.md`
  - 구현 사항
    - [ ] Vercel 프로젝트를 연결하고 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 를 Production/Preview 환경에 등록한다.
    - [ ] PDF 생성 Route Handler 의 런타임(Node.js)과 실행 시간 제한을 확인해 설정한다.
    - [ ] 프로덕션 도메인 기준 `/invoice/[notionPageId]` URL 생성 규칙을 문서화한다 (F010).
    - [ ] `robots.txt` 로 견적서 경로 크롤링을 차단한다.
    - [ ] 보안 헤더를 검토하고 오류 응답에 내부 정보가 노출되지 않는지 확인한다.
  - **테스트 체크리스트 (Playwright MCP)**
    - [ ] 프로덕션 URL에서 조회와 PDF 다운로드가 모두 동작하는지 확인한다.
  - **완료 조건(DoD)**
    - [ ] 프로덕션 배포가 성공하고 실제 링크 공유로 견적서 조회가 가능하다.
    - [ ] 환경 변수가 코드에 하드코딩되지 않았다.

- [ ] **Task 010: 성능 최적화 및 문서화**
  - **기능 매핑**: F001, F002
  - **의존 관계**: Task 009
  - **참조 문서**: `01-app/01-getting-started/08-caching.md`, `09-revalidating.md`, `02-guides/analytics.md`
  - 구현 사항
    - [ ] Notion 조회 캐싱/재검증 주기를 설정해 API 호출량과 최신성의 균형을 맞춘다.
    - [ ] Lighthouse 로 성능/접근성/SEO 를 측정하고 개선한다.
    - [ ] 폰트 및 번들 크기를 점검하고 PDF 라이브러리의 클라이언트 유입 여부를 확인한다.
    - [ ] `README.md` 에 Notion Integration 생성, DB 연결, 환경 변수 설정 절차를 정리한다.
    - [ ] 에러 로깅/모니터링을 구성한다.
  - **완료 조건(DoD)**
    - [ ] Lighthouse 성능 점수 90 이상, 접근성 90 이상을 달성한다.
    - [ ] 신규 개발자가 README만 보고 로컬 실행이 가능하다.

---

## MVP 이후 로드맵 (참고)

MVP 범위에서 제외되며 별도 로드맵으로 분리한다.

### Phase 5: 관리 기능 (PRD Phase 2)
- 관리자 대시보드 (발행 견적서 목록)
- 견적서 상태 관리 (승인/거절 추적)
- 견적서 검색 및 필터링
- 관리 영역 접근을 위한 인증 도입

### Phase 6: 자동화 (PRD Phase 3)
- 이메일 자동 발송 (Resend/SendGrid)
- 견적서 만료 알림
- 클라이언트 응답 트래킹

### Phase 7: 고급 기능 (PRD Phase 4)
- 다중 템플릿 지원
- 다국어 견적서
- 전자 서명
- 견적서 버전 관리 및 히스토리

---

## 기능 ID ↔ Task 매핑

| 기능 ID | 기능명 | 관련 Task |
| --- | --- | --- |
| F001 | 노션 데이터베이스 연동 | Task 002, 005, 008, 010 |
| F002 | 견적서 조회 | Task 001, 003, 006, 008, 010 |
| F003 | PDF 다운로드 | Task 007, 008 |
| F010 | 견적서 URL 생성 | Task 002, 005, 009 |
| F011 | 견적서 유효성 검증 | Task 001, 004, 006, 008 |
| F012 | 반응형 레이아웃 | Task 001, 003, 004, 008 |

## 의존 관계 요약

```
Task 001 (라우트 골격) ─┐
                        ├─→ Task 003 (UI 컴포넌트) ─→ Task 004 (반응형/404) ─┐
Task 002 (타입/환경변수)─┤                                                   ├─→ Task 006 (실데이터 연동)
                        └─→ Task 005 (Notion 데이터 계층) ──────────────────┘
                                                                             ↓
                                                      Task 007 (PDF) → Task 008 (통합 테스트)
                                                                             ↓
                                                      Task 009 (배포) → Task 010 (최적화/문서화)
```

Task 001과 Task 002는 의존성이 없어 동시에 시작할 수 있다. Phase 2(UI)와 Task 005(데이터 계층)는 Task 002의 타입 정의를 공유 계약으로 삼아 병렬 진행한다.
