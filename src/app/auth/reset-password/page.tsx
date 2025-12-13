import { AuthLayout } from "@/components/auth/AuthLayout";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Reset Password - Wise Wealth",
    description: "Set a new password",
};

export default function ResetPasswordPage() {
    return (
        <AuthLayout
            title="Set new password"
            subtitle="Enter your new password below"
        >
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </AuthLayout>
    );
}
