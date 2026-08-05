import { Logo } from "@/components/common/logo"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { Container } from "@/components/layout/container"

function Header() {
  return (
    <header className="border-b bg-background">
      <Container className="flex h-14 items-center justify-between">
        <Logo />
        <ThemeToggle />
      </Container>
    </header>
  )
}

export { Header }
