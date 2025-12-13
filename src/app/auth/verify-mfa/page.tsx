import { AuthLayout } from "@/components/auth/AuthLayout"
import { VerifyMfaForm } from "@/components/auth/VerifyMfaForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Device Verification - Wise Wealth",
    description: "Verify your new device",
}

export default function VerifyMfaPage() {
    return (
        <AuthLayout
            title="Device Verification"
            subtitle="Secure your account"
        >
            <VerifyMfaForm />
        </AuthLayout>
    )
}
