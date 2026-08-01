import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ToastTriggerButton } from "@/components/common/toast-trigger-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function ExamplesPage() {
  return (
    <Container className="flex flex-1 flex-col gap-10 py-16">
      <section className="flex flex-col gap-2">
        <Badge variant="secondary">Examples</Badge>
        <h1 className="text-4xl font-semibold tracking-tight">예제</h1>
        <p className="max-w-lg text-muted-foreground">
          프로젝트에 미리 설치된 shadcn/ui 컴포넌트의 사용 예시를 모아봤다.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Button</h2>
        <Card>
          <CardContent className="flex flex-wrap items-center gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <ToastTriggerButton message="버튼이 클릭되었습니다.">
              토스트 실행
            </ToastTriggerButton>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Badge</h2>
        <Card>
          <CardContent className="flex flex-wrap items-center gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Card 예시</CardTitle>
            <CardDescription>
              헤더와 설명, 본문으로 구성된 기본 카드 레이아웃이다.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>ST</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">스타터킷</p>
              <p className="text-muted-foreground">shadcn/ui 컴포넌트 조합</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dialog 예시</CardTitle>
            <CardDescription>
              버튼 클릭으로 열리는 모달 다이얼로그다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                다이얼로그 열기
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>알림</DialogTitle>
                  <DialogDescription>
                    이것은 예제 다이얼로그 컴포넌트다.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Form</h2>
        <Card>
          <CardContent className="flex max-w-sm flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="example-email">이메일</Label>
              <Input id="example-email" type="email" placeholder="you@example.com" />
            </div>
            <Separator />
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="example-name">이름</Label>
              <Input id="example-name" placeholder="홍길동" />
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Alert</h2>
        <div className="flex flex-col gap-3">
          <Alert>
            <AlertTitle>안내</AlertTitle>
            <AlertDescription>
              일반적인 정보를 전달하는 기본 알림이다.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>오류</AlertTitle>
            <AlertDescription>
              문제가 발생했을 때 사용하는 경고성 알림이다.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Skeleton</h2>
        <Card>
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      </section>
    </Container>
  )
}
