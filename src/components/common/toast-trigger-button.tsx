"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

type ToastTriggerButtonProps = React.ComponentProps<typeof Button> & {
  message: string
}

function ToastTriggerButton({ message, ...props }: ToastTriggerButtonProps) {
  return <Button onClick={() => toast.success(message)} {...props} />
}

export { ToastTriggerButton }
