import type { Metadata } from "next"

import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { FileTextIcon } from "lucide-react"

type PageProps = {
  params: Promise<{ notionPageId: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { notionPageId } = await params

  return {
    title: `견적서 조회 - ${notionPageId}`,
    robots: { index: false, follow: false },
  }
}

export default async function InvoicePage({ params }: PageProps) {
  const { notionPageId } = await params

  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <Badge>
        <FileTextIcon />
        견적서 조회
      </Badge>
      <h1 className="text-2xl font-semibold tracking-tight">
        견적서 화면을 준비 중이다
      </h1>
      <p className="max-w-md text-muted-foreground">
        요청한 견적서 ID: {notionPageId}
      </p>
    </Container>
  )
}
