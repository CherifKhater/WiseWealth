"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordValues, resetPasswordSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { Eye, EyeOff, Loader2, ArrowLeft, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { resetPassword } from "@/app/actions/auth";

export function ResetPasswordForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    function onSubmit(values: ResetPasswordValues) {
        startTransition(async () => {
            const result = await resetPassword(values)

            if (result.success) {
                toast.success("Password Reset", {
                    description: result.message || "Your password has been successfully updated.",
                    className: "bg-primary/10 border-primary/20 text-foreground shadow-lg shadow-primary/10 backdrop-blur-xl",
                })
                router.push("/auth/login")
            } else {
                toast.error("Reset Failed", {
                    description: result.error || "Could not reset password.",
                    className: "bg-destructive/10 border-destructive/20 text-destructive shadow-lg shadow-destructive/10 backdrop-blur-xl",
                })
            }
        })
    }

    return (
        <div className="grid gap-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {/* New Password */}
                <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
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

                {/* Confirm New Password */}
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
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
                        {isPending ? "Resetting..." : "Reset Password"}
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
