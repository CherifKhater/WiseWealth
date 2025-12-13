'use server'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import {
    loginSchema,
    signupSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    verifyOtpSchema
} from '@/lib/schemas'

export type ActionResponse = {
    success: boolean
    error?: string
    message?: string
    requires2FA?: boolean
}

import { cookies } from 'next/headers'
import { TRUSTED_DEVICE_COOKIE_NAME, TRUSTED_DEVICE_MAX_AGE } from '@/lib/security'

export async function login(data: z.infer<typeof loginSchema>): Promise<ActionResponse> {
    const supabase = await createClient()

    const validation = loginSchema.safeParse(data)
    if (!validation.success) {
        return { success: false, error: "Invalid data format" }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
    })

    if (error) {
        return { success: false, error: error.message }
    }

    // Check for Trusted Device Cookie
    const cookieStore = await cookies()
    const isTrusted = cookieStore.has(TRUSTED_DEVICE_COOKIE_NAME)

    if (isTrusted) {
        return { success: true }
    }

    // Unknown Device: Enforce 2FA
    // 1. Sign out the password-based session (so they aren't fully logged in yet)
    await supabase.auth.signOut()

    // 2. Trigger Email OTP
    const { error: otpError } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: {
            shouldCreateUser: false,
        }
    })

    if (otpError) {
        console.error("MFA Trigger Error (signInWithOtp):", otpError)
        return { success: false, error: otpError.message }
    }
    console.log("MFA OTP sent successfully to:", data.email)

    return {
        success: true,
        requires2FA: true,
        message: "New device detected. Please verify your identity."
    }
}

export async function verifyLoginOtp(data: z.infer<typeof verifyOtpSchema>): Promise<ActionResponse> {
    const supabase = await createClient()

    const validation = verifyOtpSchema.safeParse(data)
    if (!validation.success) {
        return { success: false, error: "Invalid data format" }
    }

    const { error } = await supabase.auth.verifyOtp({
        email: data.email,
        token: data.token,
        type: 'email', // Corresponds to signInWithOtp
    })

    if (error) {
        return { success: false, error: error.message }
    }

    // Mark device as trusted
    (await cookies()).set(TRUSTED_DEVICE_COOKIE_NAME, 'true', {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        maxAge: TRUSTED_DEVICE_MAX_AGE,
    })

    return { success: true, message: "Device verified and logged in." }
}

export async function signup(data: z.infer<typeof signupSchema>): Promise<ActionResponse> {
    const supabase = await createClient()

    const validation = signupSchema.safeParse(data)
    if (!validation.success) {
        return { success: false, error: "Invalid data format" }
    }

    const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                full_name: data.email.split('@')[0], // Default name from email
            },
        },
    })

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, message: "Check your email to confirm your account." }
}

export async function forgotPassword(data: z.infer<typeof forgotPasswordSchema>): Promise<ActionResponse> {
    const supabase = await createClient()

    const validation = forgotPasswordSchema.safeParse(data)
    if (!validation.success) {
        return { success: false, error: "Invalid data format" }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/auth/reset-password`,
    })

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, message: "Password reset link sent to your email." }
}

export async function resetPassword(data: z.infer<typeof resetPasswordSchema>): Promise<ActionResponse> {
    const supabase = await createClient()

    const validation = resetPasswordSchema.safeParse(data)
    if (!validation.success) {
        return { success: false, error: "Invalid data format" }
    }

    const { error } = await supabase.auth.updateUser({
        password: data.password
    })

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, message: "Password updated successfully." }
}

export async function signout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
}

export async function oauthLogin(provider: 'google' | 'apple') {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
        },
    })

    if (error) {
        throw new Error(error.message)
    }

    if (data.url) {
        return { url: data.url }
    }
}

export async function verifyOtp(data: z.infer<typeof verifyOtpSchema>): Promise<ActionResponse> {
    const supabase = await createClient()

    const validation = verifyOtpSchema.safeParse(data)
    if (!validation.success) {
        return { success: false, error: "Invalid data format" }
    }

    const { error } = await supabase.auth.verifyOtp({
        token: data.token,
        type: 'signup',
        email: data.email,
    })

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, message: "Email verified successfully." }
}

export async function resendOtp(email: string, type: 'signup' | 'email' = 'signup'): Promise<ActionResponse> {
    const supabase = await createClient()

    // Map 'email' type to 'magiclink' or 'signup' etc? 
    // Actually supabase.auth.resend takes specific types.
    // For signInWithOtp (magiclink/otp), we usually use signInWithOtp again to satisfy "resend".
    // But 'supabase.auth.resend' supports 'signup', 'recovery', 'magiclink', 'sms', 'email_change'.
    // If we used signInWithOtp with email, the type for resend is likely 'magiclink' (if passing type to resend)
    // OR just call signInWithOtp again.

    // However, since we want a unified "Resend" action:
    if (type === 'email') {
        // Re-trigger signInWithOtp for Login MFA
        const { error } = await supabase.auth.signInWithOtp({
            email: email,
            options: { shouldCreateUser: false }
        })
        if (error) return { success: false, error: error.message }
        return { success: true, message: "Verification code resent." }
    }

    const { error } = await supabase.auth.resend({
        type: type,
        email: email,
    })

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true, message: "Verification code resent." }
}
