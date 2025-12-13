"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordValues, forgotPasswordSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { useTransition, useState } from "react";
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { forgotPassword } from "@/app/actions/auth";
import { z } from "zod";

export function ForgotPasswordForm() {
    const [isPending, startTransition] = useTransition()
    const [isSubmitted, setIsSubmitted] = useState(false)

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        startTransition(async () => {
            const result = await forgotPassword(values)

            if (result.success) {
                setIsSubmitted(true)
                toast.success("Reset Link Sent", {
                    description: result.message || "Check your email for the password reset link.",
                    className: "bg-primary/10 border-primary/20 text-foreground shadow-lg shadow-primary/10 backdrop-blur-xl",
                })
            } else {
                toast.error("Request Failed", {
                    description: result.error || "Could not send reset link.",
                    className: "bg-destructive/10 border-destructive/20 text-destructive shadow-lg shadow-destructive/10 backdrop-blur-xl",
                })
            }
        })
    }

    if (isSubmitted) {
        return (
            <div className="space-y-6 text-center">
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-foreground">Check your email</h3>
                    <p className="text-sm text-muted-foreground">
                        We sent a password reset link to <span className="font-medium text-foreground">{form.getValues("email")}</span>
                    </p>
                </div>
                <Button
                    variant="outline"
                    className="w-full bg-white/5 border-white/10 hover:bg-white/10"
                    onClick={() => setIsSubmitted(false)}
                >
                    Try another email
                </Button>
                <div className="text-center">
                    <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            className="pl-9 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                            {...form.register("email")}
                            disabled={isPending}
                        />
                    </div>
                    {form.formState.errors.email && (
                        <p className="text-destructive text-xs">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                        type="submit"
                        className="w-full h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-medium shadow-[0_0_20px_-5px_var(--color-primary)] hover:shadow-primary/50 transition-all duration-300 rounded-xl cursor-pointer"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        {isPending ? "Sending Link..." : "Send Reset Link"}
                    </Button>
                </motion.div>
            </form>

            <div className="text-center">
                <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to login
                </Link>
            </div>
        </div>
    );
}
