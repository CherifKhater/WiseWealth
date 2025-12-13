"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { verifyOtpSchema } from "@/lib/schemas"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { verifyLoginOtp, resendOtp } from "@/app/actions/auth"
import { useTransition } from "react"
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

export function VerifyMfaForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get('email') as string

    const [isPending, startTransition] = useTransition()
    const [isResending, startResendTransition] = useTransition()

    // 1. Define your form.
    const form = useForm<z.infer<typeof verifyOtpSchema>>({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: {
            email: email || "",
            token: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof verifyOtpSchema>) {
        startTransition(async () => {
            const result = await verifyLoginOtp(values)

            if (result.success) {
                toast.success("Device Verified", {
                    description: "You have been logged in successfully.",
                    className: "bg-primary/10 border-primary/20 text-foreground shadow-lg shadow-primary/10 backdrop-blur-xl",
                })
                router.push("/dashboard")
            } else {
                toast.error("Verification Failed", {
                    description: result.error || "Invalid code. Please try again.",
                    className: "bg-destructive/10 border-destructive/20 text-destructive shadow-lg shadow-destructive/10 backdrop-blur-xl",
                })
            }
        })
    }

    function onResend() {
        if (!email) {
            toast.error("Error", { description: "Missing email address." })
            return
        }

        startResendTransition(async () => {
            const result = await resendOtp(email, 'email')
            if (result.success) {
                toast.success("Code Sent", {
                    description: "A new verification code has been sent to your email.",
                    className: "bg-primary/10 border-primary/20 text-foreground shadow-lg shadow-primary/10 backdrop-blur-xl",
                })
            } else {
                toast.error("Failed to Resend", {
                    description: result.error || "Please wait before trying again.",
                    className: "bg-destructive/10 border-destructive/20 text-destructive shadow-lg shadow-destructive/10 backdrop-blur-xl",
                })
            }
        })
    }

    if (!email) {
        return (
            <div className="text-center space-y-4">
                <p className="text-destructive">Invalid or missing email address.</p>
                <Button asChild variant="ghost">
                    <a href="/auth/login">Back to Login</a>
                </Button>
            </div>
        )
    }

    return (
        <div className="grid gap-6">
            <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                    </div>
                </div>
                <p className="text-sm text-muted-foreground">
                    We detected a new login. Please enter the code sent to <span className="font-medium text-foreground">{email}</span>
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="token"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4">
                                <FormLabel className="sr-only">One-Time Password</FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={8} {...field}>
                                        <InputOTPGroup className="gap-2">
                                            <InputOTPSlot
                                                index={0}
                                                className="w-8 h-10 bg-white/5 border-white/10 text-base font-semibold focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 first:rounded-l-lg last:rounded-r-lg rounded-md"
                                            />
                                            <InputOTPSlot
                                                index={1}
                                                className="w-8 h-10 bg-white/5 border-white/10 text-base font-semibold focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 first:rounded-l-lg last:rounded-r-lg rounded-md"
                                            />
                                            <InputOTPSlot
                                                index={2}
                                                className="w-8 h-10 bg-white/5 border-white/10 text-base font-semibold focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 first:rounded-l-lg last:rounded-r-lg rounded-md"
                                            />
                                            <InputOTPSlot
                                                index={3}
                                                className="w-8 h-10 bg-white/5 border-white/10 text-base font-semibold focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 first:rounded-l-lg last:rounded-r-lg rounded-md"
                                            />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup className="gap-2">
                                            <InputOTPSlot
                                                index={4}
                                                className="w-8 h-10 bg-white/5 border-white/10 text-base font-semibold focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 first:rounded-l-lg last:rounded-r-lg rounded-md"
                                            />
                                            <InputOTPSlot
                                                index={5}
                                                className="w-8 h-10 bg-white/5 border-white/10 text-base font-semibold focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 first:rounded-l-lg last:rounded-r-lg rounded-md"
                                            />
                                            <InputOTPSlot
                                                index={6}
                                                className="w-8 h-10 bg-white/5 border-white/10 text-base font-semibold focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 first:rounded-l-lg last:rounded-r-lg rounded-md"
                                            />
                                            <InputOTPSlot
                                                index={7}
                                                className="w-8 h-10 bg-white/5 border-white/10 text-base font-semibold focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 first:rounded-l-lg last:rounded-r-lg rounded-md"
                                            />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            type="submit"
                            className="w-full h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-medium shadow-[0_0_20px_-5px_var(--color-primary)] hover:shadow-primary/50 transition-all duration-300 rounded-xl cursor-pointer"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            {isPending ? "Verifying..." : "Verify Device"}
                        </Button>
                    </motion.div>
                </form>
            </Form>

            <div className="text-center space-y-4">
                <div className="text-sm text-muted-foreground">
                    Didn&apos;t receive the code?{" "}
                    <button
                        type="button"
                        onClick={onResend}
                        disabled={isResending}
                        className="text-primary hover:text-primary/80 underline-offset-4 hover:underline font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isResending ? "Resending..." : "Resend"}
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                </div>

                <div className="text-center">
                    <a href="/auth/login" className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to login
                    </a>
                </div>
            </div>
        </div>
    )
}
