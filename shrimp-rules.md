# Development Guidelines

이 문서는 **AI Agent 전용 작업 규칙**이다. 일반 개발 지식은 포함하지 않는다. 이 저장소에서 코드를 생성·수정하기 전에 반드시 이 규칙을 적용한다.

## 프로젝트 개요

- **목적**: 노션을 데이터베이스로 사용하는 견적서 조회 + PDF 다운로드 공개 웹 서비스 (MVP).
- **인증 없음**: 로그인/세션/미들웨어 인증을 구현하지 않는다. 접근 제어는 `notionPageId` 추측 불가성에만 의존한다.
- **관리자 UI 없음**: 견적서 작성/수정은 노션에서 직접 수행한다. 앱은 **읽기 전용**이다.
- **핵심 스택**: Next.js 16.2 App Router / React 19.2 / TypeScript 5 (`strict`) / TailwindCSS v4 / shadcn/ui `base-nova` (**`@base-ui/react` 기반**) / npm.
- **패키지 매니저는 npm 고정**. `pnpm`, `yarn`, `bun` 명령을 생성하지 않는다.

## 코드 작성 전 필수 참조 (위반 금지)

`AGENTS.md` 규정에 따라 **이 버전의 Next.js는 학습 데이터와 다르다.** 아래 주제의 코드를 작성하기 전에 해당 문서를 **먼저 Read** 한다. 기억에 의존해 작성하지 않는다.

| 작업 주제 | 반드시 먼저 읽을 파일 (`node_modules/next/dist/docs/` 기준) |
| --- | --- |
| 라우트/레이아웃/동적 세그먼트 | `01-app/01-getting-started/03-layouts-and-pages.md` |
| 서버/클라이언트 컴포넌트 경계 | `01-app/01-getting-started/05-server-and-client-components.md` |
| 데이터 페칭 | `01-app/01-getting-started/06-fetching-data.md` |
| 캐싱 (`use cache` / Cache Components) | `01-app/01-getting-started/08-caching.md` |
| 재검증 | `01-app/01-getting-started/09-revalidating.md` |
| 에러 처리 / `not-found` | `01-app/01-getting-started/10-error-handling.md` |
| 메타데이터 | `01-app/01-getting-started/14-metadata-and-og-images.md` |
| Route Handlers | `01-app/01-getting-started/15-route-handlers.md` |
| 배포 | `01-app/01-getting-started/17-deploying.md` |
| 환경 변수 | `01-app/02-guides/environment-variables.md` |
| 서버 전용 패키지 번들링 | `01-app/02-guides/package-bundling.md` |

- 문서에 deprecation 표시가 있으면 **무조건 신규 API를 채택**한다.
- 라이브러리(Notion SDK, PDF 라이브러리 등) API가 필요하면 **Context7 MCP(`resolve-library-id` → `query-docs`)로 최신 문서를 조회**한 뒤 작성한다. 추측 금지.

### Next.js 16 필수 준수 사항

- 동적 라우트의 `params`와 `searchParams`는 **Promise**다.
  - ✅ `export default async function Page({ params }: { params: Promise<{ notionPageId: string }> }) { const { notionPageId } = await params }`
  - ❌ `function Page({ params }: { params: { notionPageId: string } }) { params.notionPageId }`
- `next.config.ts`의 `turbopack.root` 설정을 제거하지 않는다.

## 디렉터리 구조 및 파일 배치

기존 구조:

```
src/
├── app/                       # App Router 전용. 컴포넌트 구현체를 두지 않는다
│   ├── layout.tsx             # ThemeProvider/Header/Footer/Toaster 조립부
│   ├── page.tsx               # 서비스 안내 랜딩 (목록 기능 금지)
│   ├── not-found.tsx          # 루트 404
│   └── globals.css            # Tailwind v4 토큰 정의 위치
├── components/
│   ├── ui/                    # shadcn/ui CLI 생성물 전용
│   ├── layout/                # container / header / footer
│   └── common/                # logo / theme-provider / theme-toggle
└── lib/utils.ts               # cn() 전용
```

신규 파일은 **아래 경로에만** 생성한다. 임의의 새 최상위 디렉터리를 만들지 않는다.

| 생성할 것 | 경로 | 비고 |
| --- | --- | --- |
| 견적서 조회 페이지 | `src/app/invoice/[notionPageId]/page.tsx` | 세그먼트명 `[notionPageId]` 고정 |
| 로딩/에러 UI | `src/app/invoice/[notionPageId]/loading.tsx`, `error.tsx` | `error.tsx`는 `"use client"` 필수 |
| PDF Route Handler | `src/app/api/invoice/[notionPageId]/pdf/route.ts` | |
| 도메인 타입 | `src/types/invoice.ts` | |
| Notion 클라이언트/조회 | `src/lib/notion/client.ts`, `src/lib/notion/invoice.ts` | |
| 환경 변수 접근 | `src/lib/env.ts` | |
| 포맷 유틸 | `src/lib/format.ts` | 통화/날짜 |
| 더미 데이터 | `src/lib/mock/invoice.ts` | |
| 견적서 UI | `src/components/invoice/*.tsx` | |
| PDF 문서 컴포넌트 | `src/components/pdf/*.tsx` | |
| 작업 명세 | `tasks/XXX-description.md` | 3자리 번호 + 케밥케이스 |

- `src/lib/utils.ts`에 `cn` 외 함수를 추가하지 않는다. 포맷 함수는 `src/lib/format.ts`에 둔다.
- import는 항상 `@/` 별칭을 사용한다. ❌ `../../components/ui/button`

## 코드 표준

### export 패턴 (전 파일 강제)

`src/app/**`의 페이지·레이아웃·라우트 파일을 제외한 모든 컴포넌트/유틸은 **하단 named export**를 사용한다. 이 저장소의 모든 기존 컴포넌트가 이 형식이다.

- ✅
  ```tsx
  function InvoiceSummary({ className, ...props }: React.ComponentProps<"div">) {
    return <div className={cn("...", className)} {...props} />
  }

  export { InvoiceSummary }
  ```
- ❌ `export default function InvoiceSummary()` (단, `app/` 하위 `page.tsx` / `layout.tsx` / `error.tsx` / `not-found.tsx` / `loading.tsx`는 default export 필수)
- ❌ `export const InvoiceSummary = () => {}` (화살표 함수 컴포넌트 금지)

### 명명 규칙

- 파일명: **케밥케이스** (`invoice-items-table.tsx`, `download-pdf-button.tsx`). ❌ `InvoiceItemsTable.tsx`
- 컴포넌트/타입: PascalCase. 함수/변수: camelCase.
- 도메인 타입 필드는 **PRD 데이터 모델의 snake_case를 그대로 유지**한다: `invoice_number`, `client_name`, `issue_date`, `valid_until`, `total_amount`, `unit_price`, `invoice_id`. 임의로 camelCase 변환하지 않는다.

### 한국어 문체

- UI 노출 문구, 주석, 커밋 메시지, 문서는 **한국어**로 작성한다.
- **존칭을 쓰지 않는 '~다' 서술체**를 사용한다. 기존 `src/app/page.tsx`, `src/app/not-found.tsx`의 문체를 따른다.
  - ✅ `견적서를 찾을 수 없다`
  - ❌ `견적서를 찾을 수 없습니다`
- 변수명/함수명은 영어를 유지한다.

## UI 구현 표준

### shadcn/ui + Base UI

- 이 프로젝트의 shadcn은 **Radix UI가 아니라 `@base-ui/react`** 기반이다. Radix 전제 코드를 작성하지 않는다.
  - ❌ `import * as DialogPrimitive from "@radix-ui/react-dialog"`
  - ❌ `asChild` prop 사용 (Base UI는 `render` prop 계열이다 — 사용 전 해당 `src/components/ui/*.tsx` 구현을 Read 해 확인한다)
  - ✅ `import { Button as ButtonPrimitive } from "@base-ui/react/button"`
- 신규 UI 프리미티브가 필요하면 **직접 작성하지 말고 CLI로 추가**한다: `npx shadcn@latest add table`. 생성 결과는 `src/components/ui/`에 둔다.
- `src/components/ui/*` 파일은 **직접 수정하지 않는다.** 변형이 필요하면 `src/components/invoice/`에 래퍼 컴포넌트를 만든다.
- 컴포넌트 props 타입은 프리미티브 타입을 그대로 확장한다: `ButtonPrimitive.Props & VariantProps<typeof buttonVariants>` 또는 `React.ComponentProps<"div">`.
- variant는 `cva`로 정의하고 클래스 병합은 항상 `cn()`을 거친다. ❌ 템플릿 리터럴로 className 직접 결합.
- 아이콘은 `lucide-react`만 사용한다. 다른 아이콘 패키지를 설치하지 않는다.

### TailwindCSS v4

- **`tailwind.config.ts` / `tailwind.config.js`를 생성하지 않는다.** 이 프로젝트에 존재하지 않으며 v4는 CSS-first 설정이다.
- 색상/반경 토큰은 `src/app/globals.css`의 `@theme inline` 및 `:root` / `.dark` 블록에서만 추가·수정한다.
- 하드코딩 색상(`#ffffff`, `bg-white`, `text-black`) 대신 시맨틱 토큰(`bg-background`, `text-muted-foreground`, `border-border`)을 사용한다. 다크모드 대비가 깨진다.
- 반응형 기준: 375px / 768px / 1280px에서 가로 스크롤이 발생하지 않아야 한다.

### 서버/클라이언트 경계

- **기본은 서버 컴포넌트**다. `"use client"`는 아래 경우에만 추가한다: 이벤트 핸들러, `useState`/`useEffect` 등 훅, `next-themes` 사용, `error.tsx`.
- `"use client"` 파일에서 `src/lib/notion/*`, `src/lib/env.ts`를 import 하지 않는다.
- 테마 의존 렌더링은 `theme-toggle.tsx`의 `useSyncExternalStore` 기반 `useMounted` 패턴을 따라 하이드레이션 불일치를 피한다.

## Notion 연동 표준

- SDK는 **`@notionhq/client`** 만 사용한다. `fetch`로 Notion REST를 직접 호출하지 않는다.
- `src/lib/notion/client.ts` 최상단에 `import "server-only"` 를 넣고 클라이언트 싱글턴을 정의한다. 페이지/컴포넌트에서 `new Client()`를 직접 생성하지 않는다.
- Notion 원본 응답 타입과 앱 도메인 타입(`src/types/invoice.ts`)을 **분리**하고, 변환은 `src/lib/notion/invoice.ts`의 매퍼 함수에서만 수행한다. 컴포넌트에 Notion 프로퍼티 구조(`properties.xxx.rich_text[0].plain_text`)를 노출하지 않는다.
  - ❌ `<p>{page.properties.클라이언트명.rich_text[0].plain_text}</p>`
  - ✅ `<p>{invoice.client_name}</p>`
- 항목(Relation) 조회는 페이지별 개별 조회를 반복하지 않는다. Items DB 필터 쿼리 또는 배치 조회로 N+1을 피한다.
- Notion 오류는 도메인 에러로 정규화한다: 404/권한없음 → `notFound()`, rate limit/네트워크 → `error.tsx` 경계로 전파. **원본 에러 메시지와 스택 트레이스를 클라이언트에 노출하지 않는다.**
- 항목 0개, 금액 0원, 프로퍼티 누락 시에도 throw 하지 않고 렌더링되어야 한다.

## PDF 구현 표준

- PDF 생성은 **서버에서 pageId로 데이터를 재조회**해 수행한다. 클라이언트가 보낸 견적서 본문을 신뢰하지 않는다.
  - ❌ `POST /api/pdf` 바디의 `invoiceData`를 그대로 렌더링
  - ✅ Route Handler에서 `getInvoice(notionPageId)` 재호출
- 한글 폰트를 명시적으로 등록한다. 미등록 시 한글이 깨진다.
- 응답 헤더에 `Content-Type: application/pdf` 와 `Content-Disposition: attachment; filename*=UTF-8''...` (한글 파일명 인코딩) 를 설정한다.
- PDF 라이브러리를 **클라이언트 컴포넌트에서 import 하지 않는다.** 다운로드 버튼은 API 호출만 담당한다.
- 다운로드 실패 알림은 `sonner` 토스트를 사용한다 (`Toaster`는 `layout.tsx`에 이미 배치됨).

## 환경 변수 및 보안

- 환경 변수는 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 두 개다. 접근은 **`src/lib/env.ts` 경유로만** 한다. 컴포넌트에서 `process.env`를 직접 읽지 않는다.
- **`NEXT_PUBLIC_` 접두사를 Notion 관련 변수에 절대 붙이지 않는다.** 클라이언트 번들에 시크릿이 노출된다.
- 키 값을 코드·문서·커밋에 하드코딩하지 않는다.
- ⚠️ `.gitignore`가 `.env*` 전체를 무시한다. `.env.example`을 만들면 **반드시 `.gitignore`에 `!.env.example` 예외를 추가**한다. 그렇지 않으면 커밋되지 않는다.
- 기존 `.env`에는 `SLACK_WEBHOOK_URL`, `CONTEXT7_API_KEY`(도구용)가 있다. **삭제하거나 덮어쓰지 않는다.** 추가만 한다.

## 파일 동시 수정 규칙

| 변경한 것 | 반드시 함께 갱신할 것 |
| --- | --- |
| Task 구현 완료 | `docs/ROADMAP.md`의 해당 체크박스 → `[x]`, 상태 `✅ - 완료`, `See: /tasks/XXX-xxx.md` 참조 추가 |
| 새 Task 착수 | `tasks/XXX-description.md` 생성 + `docs/ROADMAP.md`에 항목 추가 |
| 기능 범위 변경 (F00X 추가/삭제) | `docs/PRD.md` 기능 명세표 + `docs/ROADMAP.md`의 "기능 ID ↔ Task 매핑" 표 |
| 신규 의존성 설치 | `docs/ROADMAP.md`의 "현재 코드베이스 상태" 표 갱신 |
| 환경 변수 추가 | `src/lib/env.ts` + `.env.example` + `README.md` 설정 절차 + `.gitignore` 예외 |
| `src/types/invoice.ts` 수정 | `src/lib/notion/invoice.ts` 매퍼 + `src/lib/mock/invoice.ts` 더미 데이터 + 관련 `src/components/invoice/*` |
| 새 shadcn 컴포넌트 추가 | 없음 (`components.json`은 수정하지 않는다) |

- `docs/ROADMAP.md`의 상태 표기는 기존 규칙을 유지한다: `✅ - 완료` / `- 우선순위` / 표기 없음(대기).
- `command-log/`, `shrimp_data/`, `.next/`, `node_modules/`는 수정하지 않는다.

## AI 의사결정 기준

**작업 시작 시:**

1. 요청이 코드 변경인가? → `docs/ROADMAP.md`에서 해당 Task를 찾아 참조 문서 목록과 DoD를 먼저 확인한다.
2. Next.js API를 쓰는가? → 위 표의 `node_modules/next/dist/docs/` 파일을 Read 한다.
3. 외부 라이브러리 API를 쓰는가? → Context7 MCP로 문서를 조회한다.
4. UI 프리미티브가 필요한가? → `src/components/ui/`에 이미 있는지 확인 → 없으면 `npx shadcn@latest add <name>` → 그래도 없으면 `src/components/invoice/`에 조합 컴포넌트 작성.

**모호할 때의 우선순위** (충돌 시 위가 이긴다):

1. `AGENTS.md` (Next.js 16 문서 선행 참조)
2. `shrimp-rules.md` (이 문서)
3. `docs/PRD.md` (기능 범위·데이터 모델)
4. `docs/ROADMAP.md` (실행 순서)
5. 기존 코드 패턴

**범위 판단:**

- 요청 기능이 PRD "MVP 이후 기능 (제외)" 목록(관리자 대시보드, 상태 관리, 이메일 발송, 다국어, 템플릿 커스터마이징, 버전 관리)에 해당하면 **구현하지 않고 사용자에게 확인**한다.
- 계획 승인이 필요한 작업(신규 기능, 아키텍처 변경, 다중 파일 리팩터링, 기존 동작 변경)은 구현 전 계획을 제시한다. 오타·1~2줄 수정은 바로 진행한다.

## 금지 사항

- ❌ `tailwind.config.*` 파일 생성
- ❌ `@radix-ui/*` 패키지 설치 또는 import
- ❌ `src/components/ui/*` 직접 수정
- ❌ 컴포넌트 `export default` (`app/` 하위 라우트 파일 제외)
- ❌ `params` / `searchParams` 를 `await` 없이 접근
- ❌ 클라이언트 컴포넌트에서 `@notionhq/client`, PDF 라이브러리, `process.env.NOTION_*` 참조
- ❌ `NEXT_PUBLIC_NOTION_*` 형태의 변수 정의
- ❌ 인증/로그인/미들웨어 기반 접근 제어 구현
- ❌ 견적서 목록 페이지 또는 관리자 화면 추가
- ❌ 앱에서 Notion 데이터 쓰기(생성·수정·삭제) 호출
- ❌ npm 외 패키지 매니저 명령 생성
- ❌ 사용자 명시 요청 없는 `git push`, `git commit --amend`, force push
- ❌ 사용자 확인 없는 `rm -rf`, `.env` 덮어쓰기
- ❌ `src/app/globals.css`의 `@import "shadcn/tailwind.css"` 및 `@custom-variant dark` 제거
