import { SearchXIcon } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"

export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <Badge variant="destructive">
        <SearchXIcon />
        404
      </Badge>
      <h1 className="text-2xl font-semibold tracking-tight">
        견적서를 찾을 수 없다
      </h1>
      <p className="max-w-md text-muted-foreground">
        요청한 견적서가 존재하지 않거나 링크가 잘못됐다. 견적서를 발행한
        담당자에게 올바른 링크를 다시 요청한다.
      </p>
    </Container>
  )
}
