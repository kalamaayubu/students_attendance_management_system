import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { deleteUser } from "@/utils/deleteUser";

export async function POST(req) {
    try {
        const supabase = await createClient();
        const { firstName, secondName, email, phone, password } = await req.json(); // Get form data

        // Step 1: Create user using Supabase Auth API
        const { data: user, error: authError } = await supabase.auth.signUp({ email, password });

        if (authError || !user) {
            console.error("Auth Error:", authError?.message);
            return NextResponse.json({ success: false, error: authError?.message || "Auth failed" }, { status: 400 });
        }

        const userId = user.user?.id;
        console.log(`User id: ${userId}`)

        // Step 2: Check if profiles is empty to determine role
        const { count, error: countError } = await supabase
            .from("profiles")
            .select("*", { count: "exact", head: true })
        
        if (countError) {
            console.error("Error checking profiles count:", countError.message);
            // Delete the user in auth.users for data consistency
            const deleteResponse = await deleteUser(userId)
            if (!deleteResponse.success) {
                return NextResponse.json(deleteResponse, { status: 500 });
            }
            return NextResponse.json({ success: false, error: countError.message }, { status: 500 });
        }

        const role = (count ?? 0) === 0 ? 'admin' : 'student'
        console.log('Role assignemnt made successfully.')

        // Step 3: Insert user to the profiles table
        const { data: insertProfileData, error: insertProfileError } = await supabase
            .from('profiles')
            .insert([
                {
                    id: userId,
                    first_name: firstName,
                    second_name: secondName,
                    email: email,
                    phone: phone,
                    role: role,
                }
            ])

        if (insertProfileError) {
            console.error("Profile insertion failed:", insertProfileError.message);
            // Delete the user in auth.users for data consistency
            const deleteResponse = await deleteUser(userId)
            if (!deleteResponse.success) {
                return NextResponse.json(deleteResponse, { status: 500 });
            }
            return NextResponse.json({ success: false, error: insertProfileError.message }, { status: 500 });
        }

        console.log("Successfully signed up:", user);
        return NextResponse.json({ success: true, user, message: "Check your email for verification." }, { status: 200 });
    } catch (err) {
        console.error("API Error:", err);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
