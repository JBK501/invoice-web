"use client"

import { useEffect } from "react"
import { TriangleAlertIcon } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function InvoiceError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <Badge variant="destructive">
        <TriangleAlertIcon />
        오류
      </Badge>
      <h1 className="text-2xl font-semibold tracking-tight">
        견적서를 불러오는 중 문제가 발생했다
      </h1>
      <p className="max-w-md text-muted-foreground">
        잠시 후 다시 시도한다. 문제가 계속되면 견적서를 발행한 담당자에게
        문의한다.
      </p>
      <Button onClick={() => unstable_retry()}>다시 시도</Button>
    </Container>
  )
}
