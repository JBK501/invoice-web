# 노션 기반 견적서 관리 시스템

노션을 데이터베이스로 활용해 견적서를 관리하고, 클라이언트가 웹에서 조회하고 PDF로 다운로드할 수 있는 공개 웹 서비스다.

## 🎯 프로젝트 개요

**목적**: 견적서 발행자가 노션 데이터베이스에 견적서를 작성하면, 클라이언트가 고유 URL로 접속해 내용을 확인하고 PDF로 저장할 수 있게 한다.
**범위**: 별도 관리자 페이지/인증 없이 노션 데이터베이스를 직접 데이터 소스로 사용하는 MVP.
**사용자**: 견적서를 발행하는 프리랜서/소규모 기업, 견적서를 받는 클라이언트.

## 📱 주요 페이지

1. **견적서 조회 페이지** (`/invoice/[notionPageId]`) - 노션 API로 견적서 데이터를 조회해 표시하고, PDF 다운로드 버튼을 제공한다. 인증 없이 공개 URL로 접근한다.
2. **404 페이지** - 존재하지 않는 견적서 ID로 접근 시 안내 메시지를 표시한다.

## ⚡ 핵심 기능

- 노션 데이터베이스 연동: Notion API를 통한 견적서 데이터 조회 (F001)
- 견적서 조회: 고유 URL로 특정 견적서 내용 표시 (F002)
- PDF 다운로드: 견적서를 PDF 파일로 변환 및 다운로드 (F003)
- 견적서 유효성 검증: 존재하지 않는 견적서 접근 시 에러 처리 (F011)
- 반응형 레이아웃: 모바일/태블릿/데스크톱 대응 (F012)

## 🛠️ 기술 스택

- Framework: Next.js 16 (App Router)
- Runtime: React 19
- Language: TypeScript
- Styling: Tailwind v4
- UI Components: shadcn/ui (Base UI 기반)
- 외부 API: Notion API (`@notionhq/client`, 추후 설치)
- PDF 생성: `@react-pdf/renderer` 또는 Puppeteer (추후 설치)

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

`.env.local`에 다음 환경 변수를 설정한다.

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxx
```

## 📋 개발 상태

- ✅ 기본 프로젝트 구조 설정 (스타터킷 정리 완료)
- 🔄 노션 API 연동 및 견적서 조회 페이지 구현
- ⏳ PDF 다운로드 기능
- ⏳ 견적서 유효성 검증 및 404 처리 고도화

## 📖 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항
- [개발 가이드](./CLAUDE.md) - 개발 지침
