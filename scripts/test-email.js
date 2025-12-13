
const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing env vars (SUPABASE_SERVICE_ROLE_KEY might be missing in .env.local?)")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testEmail() {
    const email = "antigravity.test.user.123@gmail.com"
    console.log(`Attempting to send OTP to ${email}...`)

    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: true // Create user if not exists for this test
        }
    })

    if (error) {
        console.error("❌ Error sending OTP:", error)
    } else {
        console.log("✅ OTP sent successfully. Request ID:", data)
    }
}

testEmail()
