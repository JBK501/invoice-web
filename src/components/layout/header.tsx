import Link from "next/link"

import { Logo } from "@/components/common/logo"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { MobileNav } from "@/components/layout/mobile-nav"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "홈", href: "/" },
  { label: "문서", href: "/docs" },
  { label: "예제", href: "/examples" },
]

function Header() {
  return (
    <header className="border-b bg-background">
      <Container className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:block">
            <Button render={<Link href="/login" />} nativeButton={false}>
              로그인
            </Button>
          </div>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  )
}

export { Header }
