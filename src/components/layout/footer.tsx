import { Container } from "@/components/layout/container"

function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container className="flex h-14 items-center justify-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Invoice. All rights reserved.</p>
      </Container>
    </footer>
  )
}

export { Footer }
