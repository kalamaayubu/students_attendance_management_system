export async function rollbackUser(supabase, userId) {
    let attempts = 3;
    while (attempts > 0) {
        const { error } = await supabase.auth.admin.deleteUser(userId);
        if (!error) return true; // Successfully deleted the user
        console.error(`Rollback attempt failed (${3 - attempts + 1}/3):`, error.message);
        attempts--;
        await new Promise((res) => setTimeout(res, 1000)); // Wait 1 sec before retrying
    }
    console.error("Rollback failed: Could not delete user after multiple attempts.");
    return false;
}
