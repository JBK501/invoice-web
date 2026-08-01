"use client"

import { MenuIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { label: "홈", href: "/" },
  { label: "문서", href: "/docs" },
  { label: "예제", href: "/examples" },
]

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="메뉴 열기">
            <MenuIcon />
          </Button>
        }
      />
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>메뉴</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            로그인
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export { MobileNav }
