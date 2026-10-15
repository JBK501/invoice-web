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
type InvoiceMapper<TInvoicePage, TItemPage> = (
  page: TInvoicePage,
  itemPages: TItemPage[]
) => Invoice

type InvoiceItemMapper<TItemPage> = (page: TItemPage) => InvoiceItem

export type {
  Invoice,
  InvoiceItem,
  InvoiceItemMapper,
  InvoiceMapper,
  InvoiceStatus,
}
