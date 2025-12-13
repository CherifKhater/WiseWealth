import { AuthLayout } from "@/components/auth/AuthLayout";
import { VerifyOtpForm } from "@/components/auth/VerifyOtpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Verify Email - Wise Wealth",
    description: "Verify your email address",
};

export default function VerifyEmailPage() {
    return (
        <AuthLayout
            title="Check your email"
            subtitle="We sent you a verification code. Please enter it below to verify your account."
        >
            <VerifyOtpForm />
        </AuthLayout>
    );
}
