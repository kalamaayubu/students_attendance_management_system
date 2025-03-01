'use server';
import { createClient } from "@/lib/supabase/server";

export async function getClasses(studentId) {
    const supabase = await createClient();

    const { data: scheduleData, error: scheduleDataError } = await supabase
        .rpc('get_student_schedules', { student_id: studentId }); // ✅ Use RPC

    if (scheduleDataError) {
        console.error('❌ Error fetching upcoming classes:', scheduleDataError);
        return [];
    }

    // console.log('✅ Scheduled classes fetched successfully:', scheduleData);
    return scheduleData || [];    
}
