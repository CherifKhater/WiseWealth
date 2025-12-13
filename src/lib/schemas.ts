import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
    rememberMe: z.boolean().default(false).optional(),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
        .string()
        .min(12, { message: "Password must be at least 12 characters" })
        .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type SignupValues = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(12, { message: "Password must be at least 12 characters" })
        .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const verifyOtpSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    token: z.string().min(6, { message: "OTP must be at least 6 digits" }).max(8, { message: "OTP must be at most 8 digits" }),
})

export type VerifyOtpValues = z.infer<typeof verifyOtpSchema>
