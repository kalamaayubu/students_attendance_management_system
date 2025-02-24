import { updateSession } from "./lib/supabase/middleware";

export async function middleware(req) {
    return await updateSession(req)
}

export const config = {
    matcher: [
        '/admin/:path*', '/student/:path*', '/instructor/:path*'
    ]
}