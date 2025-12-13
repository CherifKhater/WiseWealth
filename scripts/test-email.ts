
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role to bypass some restrictions if needed, but for auth we should use anon usually or service for admin.
// ActuallysignInWithOtp is client-side usually, or server-side.

const supabase = createClient(supabaseUrl, supabaseKey)

async function testEmail() {
    const email = "antigravity_test_13dec_v1@example.com"
    console.log(`Attempting to send OTP to ${email}...`)

    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: false
        }
    })

    if (error) {
        console.error("❌ Error sending OTP:", error)
    } else {
        console.log("✅ OTP sent successfully (supposedly). Check Supabase logs if not received.")
        console.log("Data:", data)
    }
}

testEmail()
