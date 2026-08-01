import Link from "next/link"

import { Container } from "@/components/layout/container"

function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container className="flex h-14 items-center justify-between text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Starter. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com" className="hover:text-foreground">
            GitHub
          </a>
          <Link href="/docs" className="hover:text-foreground">
            문서
          </Link>
        </div>
      </Container>
    </footer>
  )
}

export { Footer }
