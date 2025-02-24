'use server'

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
    // Signout from supabase
    const supabase = await createClient()
    await supabase.auth.signOut()

    // Clear session cookies
    const cookieStore = await cookies()
    cookieStore.delete('sb-access-token') // Delete access token
    cookieStore.delete('sb-refresh-token') // Delete access token
    cookieStore.delete('authState'); // Delete the authState cookie to remove user session data

    // Redirect to the login page
    redirect('/auth/login')
}