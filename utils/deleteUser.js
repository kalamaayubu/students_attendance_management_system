import supabaseAdmin from "@/lib/supabase/supabaseAdmin";

export async function deleteUser(userId) {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
    if (error) {
        console.error("Error deleting user:", error.message);
        return { success: false, error: "Error occurred while deleting user. Please contact support." };
    }

    return { success: true };
}