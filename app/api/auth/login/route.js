import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers" // Import cookies from next/headers
import { NextResponse } from "next/server"

export async function POST(req) {
    const { email, password } = await req.json()
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
        console.error('Error loging in:', error.stack)
        return NextResponse.json({ success: false, error: error.message })
    }

    // Fetch the user's role after successful login
    const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

    if (profileError) {
        console.error('Error fetching profile:', profileError.message)
        return NextResponse.json({ success: false, error: 'Could not fetch user profile.'})
    }

    if (!profileData?.role) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Role based redirection
    const role = profileData.role
    let redirectUrl;
    if (role === "admin") {
        redirectUrl = '/admin/dashboard'
    }
    if (role === "instructor") {
        redirectUrl = '/instructor/dashboard'
    }
    if (role === "student") {
        redirectUrl = '/student/dashboard'
    }

    // If successful, manually set cookies if needed
    const { access_token, refresh_token } = data.session

    // Use cookies from next/headers to set the cookie on the server-side
    const cookieStore = await cookies()

    // The access token
    cookieStore.set('sb-access-token', access_token, {
        path: '/', 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict', // You might want to include SameSite for additional security
        maxAge: 60 * 60 * 5 // Five hours
    })

    // The refresh token
    cookieStore.set("sb-refresh-token", refresh_token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Response object to the client
    return NextResponse.json({
            success: true, 
            role: profileData.role, 
            user:data.user,   
            redirectUrl, 
            message: 'Successfully logged in'
    })
}