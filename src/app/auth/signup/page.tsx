import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up - Wise Wealth",
    description: "Create your Wise Wealth account",
};

export default function SignupPage() {
    return (
        <AuthLayout
            title="Create an account"
            subtitle="Enter your details to get started"
        >
            <SignupForm />
        </AuthLayout>
    );
}
