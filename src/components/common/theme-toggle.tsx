"use client"

import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import { useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"

const emptySubscribe = () => () => {}

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  if (!mounted) {
    return <Button variant="ghost" size="icon" disabled aria-label="테마 전환" />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="테마 전환"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="scale-100 dark:scale-0" />
      <MoonIcon className="absolute scale-0 dark:scale-100" />
    </Button>
  )
}

export { ThemeToggle }
