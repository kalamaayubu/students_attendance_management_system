'use server'
import { createClient } from "@/lib/supabase/server"

export async function getAttendanceData(instructorId) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("attendance")
      .select(`
        schedule_id,
        student_id,
        schedules!inner(
          start_time,
          course_id,
          courses!inner(
            course_code
          )
        )
      `)
      .eq("schedules.instructor_id", instructorId); // Filter by logged-in instructor

    if (error) {
      console.error("Error fetching attendance data:", error);
      return [];
    }


    // Step 1: Count attendance per schedule_id
    const scheduleMap = new Map(); // Keeps order of insertion as opposed to []
    data.forEach(({ schedule_id, schedules}) => {
      const courseCode = schedules.courses.course_code;
      const startTime = schedules.start_time;

      // Add the schedule to the map if it doesn't exist
      if (!scheduleMap.has(schedule_id)) {
        scheduleMap.set(schedule_id, { schedule_id, courseCode, startTime, count: 0})
      }
      scheduleMap.get(schedule_id).count += 1; // Increment the count for the schedule
    })


    // Step 2: Group schedules by course
    const courseScheduleMap = new Map();
    Array.from(scheduleMap.values()).forEach(({ schedule_id, courseCode, startTime, count}) => {
      // Add the course to the map(courseScheduleMap) if it doesn't exist already
      if (!courseScheduleMap.has(courseCode)) {
        courseScheduleMap.set(courseCode, [])
      }
      courseScheduleMap.get(courseCode).push({ schedule_id, startTime, count })
    })


    // Step 3: Sort schedules per course and assign session numbers
    const transformedData = []
    courseScheduleMap.forEach((schedules, courseCode) => {
      schedules.sort((a,b) => new Date(a.startTime) - new Date(b.startTime));

      schedules.forEach((schedule, index) => {
        transformedData.push({
          session: index + 1,
          courseCode,
          count: schedule.count
        });
      });
    });


    // Step 4: Merge sessions by session number
    const mergedData = [];
    transformedData.forEach(({ session, courseCode, count}) => {
      let sessionObj = mergedData.find(obj => obj.session === session);

      // If session object is not in the mergedData
      if (!sessionObj) {
        sessionObj = { session } // Example: { session: 1 }
        mergedData.push(sessionObj) // Example: [{ session: 1 }]
      }

      // Adding the courseCode key and it value(count)
      sessionObj[courseCode] = count; // Example: { session: 1, CS101: 10 } 
    });

  return mergedData
}
