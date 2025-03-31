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
import { getUserId } from "@/utils/getUserId";
import { toast } from "react-toastify";
import { updateSchedule } from "@/actions/instructor/updateSchedule";
import { getInstructorInitialLocation } from "@/utils/geofencing/getInstructorInitalLocation";

const UpdatingSchedule = ({ courses, session, setIsUpdateDialogOpen }) => {
  const [selectedCourseId, setSelectedCourseId] = useState(session.course_id);
  const [isProcessing, setIsProcessing] = useState(false);
  const [startTime, setStartTime] = useState(session.start_time);
  const [endTime, setEndTime] = useState(session.end_time);
  const [isPast, setIsPast] = useState(false);
  const [isEndBeforeBeginning, setIsEndBeforeBeginning] = useState(false);

  // Handle schedule update submission
  const handleScheduleUpdateSubmission = async (
    e,
    scheduleId,
    startTime,
    endTime,
    courseId,
    courseCode
  ) => {
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

      if (selectedCourseId && instructorId) {
        const { success, error, message } = await updateSchedule(
          scheduleId,
          startTime,
          endTime,
          longitude,
          latitude,
          courseId,
          courseCode
        );
        // Show the error message incase of any error
        if (!success) {
          toast.error(error);
          return;
        }
        toast.success(`${message}`);
        setIsProcessing(false);
        setIsUpdateDialogOpen(false);
      }
    } catch (error) {
      console.error("Error updating session:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container">
      <form
        onSubmit={(e) =>
          handleScheduleUpdateSubmission(
            e,
            session.id,
            session.start_time,
            session.end_time,
            session.course_id,
            session.courses.course_code
          )
        }
        className="flex flex-col gap-4 items-start bg-white p-8 rounded-xl justify-between 2xl:justify-around"
      >
        {/* Course Selection */}
        <Select onValueChange={setSelectedCourseId} value={selectedCourseId}>
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
                Loading courses...
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <DateTimePicker
          onFromChange={setStartTime}
          onToChange={setEndTime}
          setIsEndBeforeBeginning={setIsEndBeforeBeginning}
          isEndBeforeBeginning={isEndBeforeBeginning}
          isPast={isPast}
          setIsPast={setIsPast}
          initialFrom={startTime} // Set initial values
          initialTo={endTime}
        />

        {/* Submit button */}
        <div className="self-center">
          <button
            type="submit"
            className={`w-full bg-gradient-to-br from-blue-700 to-purple-600 text-white rounded-lg py-2 px-4 ${
              isProcessing ? "cursor-not-allowed opacity-100" : ""
            } ${
              !selectedCourseId ||
              !startTime ||
              !endTime ||
              isPast ||
              isEndBeforeBeginning
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
            disabled={
              !selectedCourseId ||
              !startTime ||
              !endTime ||
              isProcessing ||
              isPast ||
              isEndBeforeBeginning
            }
          >
            {isProcessing ? (
              <span className="flex items-center gap-4 animate-pulse">
                <Loader className="animate-spin size-5" />
                Updating...
              </span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatingSchedule;
