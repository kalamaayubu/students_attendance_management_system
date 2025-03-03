"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import DateTimePicker from "../DateTimepicker";
import { Loader } from "lucide-react";
import { scheduleSession } from "@/actions/instructor/scheduleSession";
import { getUserId } from "@/utils/getUserId";
import { toast } from "react-toastify";
import { getInstructorInitialLocation } from "@/utils/geofencing/getInstructorInitalLocation";

const Scheduling = ({ courses }) => {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Get the instructor's current location
      const { latitude, longitude, error } =
        await getInstructorInitialLocation();
      if (error) {
        setIsProcessing(false);
        toast.error("Failed to get location. Please try again.");
      }

      // Get the instructorId
      const instructorId = await getUserId();
      console.log("USERID::", instructorId);
      console.log("COURSEID::", selectedCourseId);

      if (selectedCourseId && instructorId) {
        const response = await scheduleSession({
          courseId: selectedCourseId,
          instructorId,
          startTime,
          endTime,
          latitude,
          longitude,
        });
        toast.success(response.message);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error scheduling session:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleScheduleSubmit}
        className="flex flex-col lg:flex-row gap-4 lg:gap-10 items-start lg:items-center bg-white p-8 rounded-xl justify-between 2xl:justify-around"
      >
        <Select onValueChange={setSelectedCourseId}>
          <SelectTrigger className="bg-white border outline-none py-2 max-w-[300px] m-auto w-full">
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            {courses?.length > 0 ? (
              courses.map((course) => (
                <SelectItem
                  value={course.id}
                  key={course.id}
                  className="bg-white cursor-pointer text-[16px] w-[400px]"
                >
                  <span>{course.course_code}</span>{" "}
                  <span>{course.course_name}</span>
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-courses" disabled>
                No courses available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <DateTimePicker onFromChange={setStartTime} onToChange={setEndTime} />
        <div className="self-center">
          <button
            type="submit"
            className={`w-full bg-gradient-to-br from-blue-700 to-purple-600 text-white rounded-lg py-2 px-4 ${
              isProcessing ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={
              !selectedCourseId || !startTime || !endTime || isProcessing
            }
          >
            {isProcessing ? (
              <span className="flex items-center gap-4 animate-pulse">
                <Loader className="animate-spin size-5" />
                Scheduling...
              </span>
            ) : (
              "Schedule"
            )}
          </button>
        </div>
      </form>
      {message && <p className="text-green-600 mt-4">{message}</p>}
    </div>
  );
};

export default Scheduling;
