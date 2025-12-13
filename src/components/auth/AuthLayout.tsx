"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center p-4 md:p-8">
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen opacity-50" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full mix-blend-screen opacity-30" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[420px]"
            >
                {/* Logo */}
                <div className="flex justify-center mb-10">
                    <Link href="/" className="flex items-center gap-3 group">
                        {/* Premium Logo Container */}
                        <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 shadow-[0_0_20px_-5px_var(--color-primary)] shadow-primary/30 group-hover:scale-105 group-hover:shadow-primary/50 transition-all duration-300">
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Logo className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                        </div>

                        {/* Premium Title Typography */}
                        <span className="text-2xl font-bold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent drop-shadow-sm group-hover:to-white transition-all duration-300">
                            Wise Wealth
                        </span>
                    </Link>
                </div>

                {/* Card */}
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl ring-1 ring-black/5">
                    <div className="p-6 md:p-8 space-y-6">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                                {title}
                            </h1>
                            <p className="text-sm text-muted-foreground">{subtitle}</p>
                        </div>
                        {children}
                    </div>
                </div>

                {/* Footer Links */}
                <p className="mt-6 text-center text-xs text-muted-foreground">
                    By continuing, you agree to our{" "}
                    <Link href="/terms" className="underline hover:text-primary">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline hover:text-primary">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </motion.div>
        </div>
    );
}
