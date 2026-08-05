import { FileTextIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/layout/container"

export default function Home() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-6 py-24 text-center">
      <Badge>
        <FileTextIcon />
        견적서 시스템
      </Badge>
      <h1 className="max-w-xl text-3xl font-semibold tracking-tight">
        견적서는 전달받은 고유 링크로 확인할 수 있다
      </h1>
      <p className="max-w-md text-muted-foreground">
        이메일이나 메신저로 받은 견적서 링크를 클릭하면 견적서 내용을 확인하고
        PDF로 다운로드할 수 있다.
      </p>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-base">견적서 링크가 없다면?</CardTitle>
          <CardDescription>
            견적서를 발행한 담당자에게 링크 재전달을 요청한다.
          </CardDescription>
        </CardHeader>
      </Card>
    </Container>
  )
}
