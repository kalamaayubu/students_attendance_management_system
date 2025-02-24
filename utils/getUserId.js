'use server';
import { cookies } from "next/headers";

export const getUserId = async () => {
    const cookieStore = await cookies();
    const authState = cookieStore.get("authState"); // Get authState cookie

    if (!authState) {
        console.error("Auth cookie missing");
        return null;
    }

    // Parse the value of the authState cookie
    const userId = JSON.parse(authState.value)?.user?.id;
    if (!userId) {
        console.error("User ID not found in cookie");
        return null;
    }

    return userId;
};
