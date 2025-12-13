"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background/90 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-foreground group-[.toaster]:border-border/40 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl font-medium",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group-[.toaster]:!bg-primary/10 group-[.toaster]:!border-primary/20 group-[.toaster]:!text-primary-foreground group-[.toaster]:shadow-lg group-[.toaster]:shadow-primary/10",
          error:
            "group-[.toaster]:!bg-destructive/10 group-[.toaster]:!border-destructive/20 group-[.toaster]:!text-destructive-foreground group-[.toaster]:shadow-lg group-[.toaster]:shadow-destructive/10",
          warning:
            "group-[.toaster]:!bg-amber-500/10 group-[.toaster]:!border-amber-500/20 group-[.toaster]:!text-amber-500 group-[.toaster]:shadow-lg group-[.toaster]:shadow-amber-500/10",
          info:
            "group-[.toaster]:!bg-blue-500/10 group-[.toaster]:!border-blue-500/20 group-[.toaster]:!text-blue-500 group-[.toaster]:shadow-lg group-[.toaster]:shadow-blue-500/10",
        },
      }}
      icons={{
        success: <CircleCheckIcon className="size-5 text-primary" />,
        info: <InfoIcon className="size-5 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-5 text-amber-500" />,
        error: <OctagonXIcon className="size-5 text-destructive" />,
        loading: <Loader2Icon className="size-5 animate-spin text-muted-foreground" />,
      }}
      {...props}
    />
  )
}

export { Toaster }
