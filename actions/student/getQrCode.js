'use server'

import { createClient } from "@/lib/supabase/server"

export async function getQrCode(scheduleId, studentId) {
    const supabase = await createClient()

    // Get the qr code of the schedule
    const { data, error } = await supabase
        .from('qr_codes')
        .select('id, schedule_id, qr_data')
        .eq('schedule_id', scheduleId)
        .single()

    if (error) {
        console.error('Error fetching schedule qr code:', error)
        return { success: false, error: error.message }
    }

    // console.log('Qr code data:::', data)
    return { qr_data: data, studentId: studentId }
}