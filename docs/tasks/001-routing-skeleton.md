# Task 001: 라우트 구조 및 페이지 골격 생성

## 개요

견적서 조회 서비스의 핵심 라우트인 `/invoice/[notionPageId]`의 골격을 생성한다. 실제 Notion 데이터 연동 없이 페이지, 로딩, 에러 UI 구조만 확정해 이후 Phase에서 UI/데이터 작업이 병렬로 진행될 수 있도록 한다.

- **기능 매핑**: F002, F011, F012
- **의존 관계**: 없음 (병렬 시작 가능)
- **참조 문서**: `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`, `10-error-handling.md`

## 관련 파일

- `src/app/invoice/[notionPageId]/page.tsx` (CREATE)
- `src/app/invoice/[notionPageId]/loading.tsx` (CREATE)
- `src/app/invoice/[notionPageId]/error.tsx` (CREATE)
- `src/app/not-found.tsx` (REFERENCE, 재사용)
- `src/app/page.tsx` (REFERENCE, 변경 없음)

## 구현 단계

- [ ] `src/app/invoice/[notionPageId]/page.tsx` 동적 라우트 생성. `params: Promise<{ notionPageId: string }>` 로 타이핑하고 `await params` 로 읽는다.
- [ ] `src/app/invoice/[notionPageId]/loading.tsx` 생성 (Skeleton 기반 로딩 UI 자리표시자).
- [ ] `src/app/invoice/[notionPageId]/error.tsx` 생성 (렌더링 오류 경계, `"use client"` + `unstable_retry`).
- [ ] 세그먼트 전용 `not-found.tsx`는 생성하지 않고 루트 `not-found.tsx` 재사용을 결정한다.
- [ ] `src/app/page.tsx` 서비스 안내 랜딩 상태를 확인한다 (변경 불필요).
- [ ] `generateMetadata` 로 견적서 ID가 제목에 반영되도록 골격만 배치한다.

## 수락 기준

- [ ] `/invoice/test-id` 접근 시 빈 껍데기 페이지가 200으로 렌더링된다.
- [ ] `npm run build` 와 `npm run lint` 가 오류 없이 통과한다.
- [ ] `params` 를 동기 접근하는 코드가 없다.
- [ ] `error.tsx` 가 `"use client"` 로 시작하고 `unstable_retry` 를 사용한다.
