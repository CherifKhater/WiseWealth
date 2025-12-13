import { AuthLayout } from "@/components/auth/AuthLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password - Wise Wealth",
    description: "Reset your password",
};

export default function ForgotPasswordPage() {
    return (
        <AuthLayout
            title="Reset password"
            subtitle="Enter your email to receive a reset link"
        >
            <ForgotPasswordForm />
        </AuthLayout>
    );
}
