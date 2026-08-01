import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const sections = [
  {
    title: "시작하기",
    description:
      "npm install로 의존성을 설치하고 npm run dev로 개발 서버를 실행한다.",
  },
  {
    title: "폴더 구조",
    description:
      "src/app에는 라우트별 페이지를, src/components/ui에는 shadcn/ui 컴포넌트를, src/components/layout에는 헤더·푸터 등 레이아웃 컴포넌트를 둔다.",
  },
  {
    title: "다크모드",
    description:
      "next-themes를 사용해 라이트/다크 테마를 지원한다. 헤더의 토글 버튼으로 전환할 수 있다.",
  },
  {
    title: "UI 컴포넌트",
    description:
      "Button, Card, Dialog 등 shadcn/ui 기반 컴포넌트가 미리 설치되어 있다. 실제 사용 예시는 예제 페이지에서 확인할 수 있다.",
  },
]

export default function DocsPage() {
  return (
    <Container className="flex flex-1 flex-col gap-10 py-16">
      <section className="flex flex-col gap-2">
        <Badge variant="secondary">Docs</Badge>
        <h1 className="text-4xl font-semibold tracking-tight">문서</h1>
        <p className="max-w-lg text-muted-foreground">
          이 스타터킷의 구성과 사용법을 간단히 정리했다.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </Container>
  )
}
