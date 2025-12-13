"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupValues, signupSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import React, { useTransition } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signup, oauthLogin } from "@/app/actions/auth";
import { z } from "zod";

export function SignupForm() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

    // 1. Define your form.
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof signupSchema>) {
        startTransition(async () => {
            const result = await signup(values)

            if (result.success) {
                toast.success("Account Created", {
                    description: "Please check your email for the verification code.",
                    className: "bg-primary/10 border-primary/20 text-foreground shadow-lg shadow-primary/10 backdrop-blur-xl",
                })
                router.push(`/auth/verify?email=${encodeURIComponent(values.email)}`)
            } else {
                toast.error("Signup Failed", {
                    description: result.error || "Could not create account.",
                    className: "bg-destructive/10 border-destructive/20 text-destructive shadow-lg shadow-destructive/10 backdrop-blur-xl",
                })
            }
        })
    }

    const handleOAuthLogin = async (provider: 'google' | 'apple') => {
        try {
            const result = await oauthLogin(provider)
            if (result?.url) {
                window.location.href = result.url
            }
        } catch (error) {
            toast.error("Social Login Failed", {
                description: "Could not connect to provider.",
                className: "bg-destructive/10 border-destructive/20 text-destructive shadow-lg shadow-destructive/10 backdrop-blur-xl",
            })
        }
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

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="password"
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            className="pl-9 pr-10 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                            {...form.register("password")}
                            disabled={isPending}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                    {form.formState.errors.password && (
                        <p className="text-destructive text-xs">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="confirmPassword"
                            placeholder="••••••••"
                            type={showConfirmPassword ? "text" : "password"}
                            className="pl-9 pr-10 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                            {...form.register("confirmPassword")}
                            disabled={isPending}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                    {form.formState.errors.confirmPassword && (
                        <p className="text-destructive text-xs">
                            {form.formState.errors.confirmPassword.message}
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
                        {isPending ? "Creating account..." : "Create Account"}
                    </Button>
                </motion.div>
            </form>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-2 text-muted-foreground backdrop-blur-sm">
                        Or continue with
                    </span>
                </div>
            </div>

            {/* Social Auth */}
            <div className="grid gap-4">
                <Button
                    variant="outline"
                    className="w-full h-11 bg-white/5 border-white/10 hover:bg-white hover:border-white hover:text-black transition-all duration-300 group cursor-pointer"
                    type="button"
                    onClick={() => handleOAuthLogin('google')}
                >
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    Continue with Google
                </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:text-primary/80 underline-offset-4 hover:underline font-semibold transition-colors">
                    Sign in
                </Link>
            </div>
        </div>
    );
}
