import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"


export async function updateSession(request) {
    const { pathname } = request.nextUrl
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL, 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll: () =>  request.cookies.getAll(), // Returns all the cookies of the request, for session management
                setAll(cookiesToSet) {
                    // 1. Update the request cookies
                    cookiesToSet.forEach(({ name, value, options }) => {
                        request.cookies.set(name, value)
                    })
                    // 2. Create a new response object to ensure request cookies are retained
                    supabaseResponse = NextResponse.next({ request })
                    // 3. Apply updated cookies to the response so that client can get it
                    cookiesToSet.forEach(({ name, value, options }) => {
                        supabaseResponse.cookies.set( name, value, options )
                    });
                },
            },
        }
    );

    // Check for session cookie
    const sessionCookie = request.cookies.get('sb-access-token')
    if (!sessionCookie) {
        if (!pathname.startsWith("/auth")) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
        return supabaseResponse;
    }

    // Get the user role from authState cookie
    const authStateCookie = request.cookies.get('authState')?.value;
    let role = undefined
    if (authStateCookie) {
        try {
            const authState = JSON.parse(decodeURIComponent(authStateCookie))
            role = authState?.role
            if (!role) {
                return NextResponse.redirect(new URL('/auth/login'))
            }
        } catch (error) {
            console.error("Failed to parse authState cookie:", error);
        }
    }

    if (!role) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Role-based redirection
    if (pathname.startsWith('/admin') && role !== 'admin') {
        return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
    }
    if (pathname.startsWith('/instructor') && role !== 'instructor') {
        return NextResponse.redirect(new URL(`${role}/dashboard`, request.url))
    }
    if (pathname.startsWith('/student') && role !== 'student') {
        return NextResponse.redirect(new URL(`${role}/dashboard`, request.url))
    }

    return supabaseResponse;
}