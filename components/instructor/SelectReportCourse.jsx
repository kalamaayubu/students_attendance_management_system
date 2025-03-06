"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { getUserId } from "@/utils/getUserId";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SelectReportCourse = ({ onSelect }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [courses, setCourses] = useState([]);
  const supabase = createClient();

  // Fetch the instructor's courses on mount
  useEffect(() => {
    const fetchInstructorCourses = async () => {
      const instructorId = await getUserId();

      const { data, error } = await supabase
        .from("instructor_courses")
        .select("course_id, courses(course_code, course_name)")
        .eq("instructor_id", instructorId);

      if (error) {
        console.log("Error fetching instructors courses:", error);
        toast.error("Failed to fetch instructor courses.");
        return;
      }
      console.log("INSTRUCTOR COURSES:", data);
      setCourses(data);
    };

    fetchInstructorCourses();
  }, []);

  return (
    <div>
      <Select onValueChange={onSelect}>
        <SelectTrigger className="bg-white border outline-none py-2 max-w-[300px] m-auto w-full">
          <SelectValue placeholder="Select course" />
        </SelectTrigger>
        <SelectContent>
          {courses?.length > 0 ? (
            courses.map((course) => (
              <SelectItem
                value={course.course_id}
                key={course.course_id}
                className="bg-white cursor-pointer text-[16px] w-[400px]"
              >
                <span>{course.courses.course_code}</span>{" "}
                <span>{course.courses.course_name}</span>
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-courses" disabled>
              Loading courses...
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectReportCourse;
