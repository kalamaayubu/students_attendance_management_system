'use server'

import supabaseAdmin from "@/lib/supabase/supabaseAdmin";


export async function resetPassword(newPassword, accessToken) {
    if (!accessToken) {
        return { success: false, error: "Access token is required!" };
    }

    // Get the user associated with the token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(accessToken)

    if (userError || !user) {
        console.error("Error fetching user with access token:", userError);
        return { success: false, error: "Invalid or expired access token!" };
    }

    // Update the password using the Supabase Admin API
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
        password: newPassword
    })

    if (error) {
        console.error('Error updating password:', error)
        return { success: false, error: error.message}
    }
    
    console.log('Password upated successfully.')
    return { success: true, message: 'Password upated successfully' }
}