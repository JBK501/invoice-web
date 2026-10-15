// 통화/날짜 포맷 유틸

const currencyFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
})

// 서버(UTC)와 브라우저의 타임존 차이로 날짜가 하루 밀리지 않도록 한국 시간으로 고정한다
const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Seoul",
})

function formatCurrency(amount: number): string {
  return currencyFormatter.format(Number.isFinite(amount) ? amount : 0)
}

// 값이 비었거나 파싱할 수 없어도 throw 하지 않는다 (프로퍼티 누락 시에도 렌더링 유지)
function formatDate(date: string): string {
  if (!date) return "-"

  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date

  return dateFormatter.format(parsed)
}

export { formatCurrency, formatDate }
