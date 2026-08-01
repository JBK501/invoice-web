import { RocketIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Container } from "@/components/layout/container"
import { ToastTriggerButton } from "@/components/common/toast-trigger-button"

const stack = [
  "Next.js 16",
  "TypeScript",
  "TailwindCSS v4",
  "shadcn/ui",
  "lucide-react",
]

export default function Home() {
  return (
    <Container className="flex flex-1 flex-col gap-10 py-16">
      <section className="flex flex-col items-start gap-4">
        <Badge>
          <RocketIcon />
          Starter Kit
        </Badge>
        <h1 className="max-w-xl text-4xl font-semibold tracking-tight">
          바로 시작하는 Next.js 스타터킷
        </h1>
        <p className="max-w-lg text-muted-foreground">
          헤더, 푸터, 다크모드, 반응형 내비게이션과 shadcn/ui 컴포넌트가 미리
          구성되어 있어 새 기능부터 바로 개발할 수 있다.
        </p>
        <div className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <Badge key={item} variant="secondary">
              {item}
            </Badge>
          ))}
        </div>
        <ToastTriggerButton message="스타터킷이 정상적으로 동작합니다.">
          토스트 확인하기
        </ToastTriggerButton>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>다크모드</CardTitle>
            <CardDescription>
              헤더의 토글 버튼으로 라이트/다크 테마를 즉시 전환한다.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>반응형 내비게이션</CardTitle>
            <CardDescription>
              데스크톱에서는 드롭다운 메뉴, 모바일에서는 시트 메뉴로 전환된다.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <Alert>
          <AlertTitle>안내</AlertTitle>
          <AlertDescription>
            이 카드들은 shadcn/ui 컴포넌트 조합 예시다. 필요에 맞게 자유롭게
            교체해서 사용하면 된다.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </section>
    </Container>
  )
}
