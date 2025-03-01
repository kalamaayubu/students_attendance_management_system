import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { userId, playerId } = await req.json();
    const supabase = await createClient();

    if (!userId || !playerId) {
        return NextResponse.json({ success: false, error: "Missing userId or playerId" });
    }

    // Update the user's playerId
    const { error } = await supabase
        .from("profiles")
        .update({ player_id: playerId })
        .eq("id", userId);

    if (error) {
        return NextResponse.json({ success: false, error: error.message || "Failed to save Player ID" });
    }

    return NextResponse.json({ success: true, message: "Player ID saved successfully" });
}
