'use server';
import { createClient } from "@/lib/supabase/server";

export async function getClasses() {
    const supabase = await createClient();

    const { data: scheduleData, error: scheduleDataError } = await supabase
        .rpc('get_student_schedules'); // ✅ Use RPC

    if (scheduleDataError) {
        console.error('❌ Error fetching upcoming classes:', scheduleDataError);
        return [];
    }

    return scheduleData || [];    
}
