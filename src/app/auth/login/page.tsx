import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login - Wise Wealth",
    description: "Sign in to your Wise Wealth account",
};

export default function LoginPage() {
    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Enter your credentials to access your account"
        >
            <LoginForm />
        </AuthLayout>
    );
}
