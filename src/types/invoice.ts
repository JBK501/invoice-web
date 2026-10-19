// 견적서 도메인 타입 (PRD 데이터 모델의 snake_case 필드를 그대로 유지한다)

type InvoiceStatus = "대기" | "승인" | "거절"

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unit_price: number
  // Notion Formula(수량 × 단가) 결과
  amount: number
  invoice_id: string
}

interface Invoice {
  id: string
  invoice_number: string
  client_name: string
  // ISO 8601 날짜 문자열 (예: "2026-10-15")
  issue_date: string
  valid_until: string
  items: InvoiceItem[]
  total_amount: number
  status: InvoiceStatus
}

// Notion 원본 응답과 도메인 타입의 경계.
// 실제 원본 타입(@notionhq/client)과 매퍼 구현은 Task 005의 src/lib/notion/invoice.ts에서 담당한다.
// 여기서는 매퍼 시그니처만 선언해 UI와 데이터 계층이 공유하는 계약으로 삼는다.
// 실제 노션 DB의 속성명 (Invoices/Items 데이터베이스 스키마 확인 결과).
// 매퍼가 문자열을 하드코딩하지 않도록 한 곳에서 관리한다.
const NOTION_INVOICE_PROPERTIES = {
  invoice_number: "견적서 번호", // title
  client_name: "클라이언트명", // rich_text
  issue_date: "발행일", // date
  valid_until: "유효기간", // date
  status: "상태", // status (옵션: 대기/승인/거절)
  total_amount: "총 금액", // number
  items: "항목", // relation → Items
} as const

const NOTION_ITEM_PROPERTIES = {
  description: "항목명", // title
  quantity: "수량", // number
  unit_price: "단가", // number
  amount: "금액", // formula (수량 × 단가)
  invoice_id: "Invoices", // relation → Invoices
} as const

type InvoiceMapper<TInvoicePage, TItemPage> = (
  page: TInvoicePage,
  itemPages: TItemPage[]
) => Invoice

type InvoiceItemMapper<TItemPage> = (page: TItemPage) => InvoiceItem

export {
  NOTION_INVOICE_PROPERTIES,
  NOTION_ITEM_PROPERTIES,
}
export type {
  Invoice,
  InvoiceItem,
  InvoiceItemMapper,
  InvoiceMapper,
  InvoiceStatus,
}
