"use client";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Loader, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "react-toastify";
import { getCourses } from "@/actions/admin/getCourses";
import Cookies from "js-cookie";
import { assignCourse } from "@/actions/instructor/assignCourse";

const AddACourse = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courses, setCourses] = useState([]);

  // Fetch all the courses when instructor clicks the add a new course button
  const handleGetCourses = async () => {
    try {
      const res = await getCourses();
      if (res.error) {
        toast.error(res.error);
      } else {
        setCourses(res || []);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Submit instructor's course choice
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // ✅ Get instructorId from the authState cookie
      const authState = Cookies.get("authState");
      const instructorId = authState ? JSON.parse(authState).user?.id : null;

      if (!instructorId) {
        toast.error("Instructor ID not found. Please log in again.");
        return;
      }

      if (!selectedCourseId) {
        toast.error("Please select a course");
        return;
      }
      const res = await assignCourse(selectedCourseId, instructorId);

      if (res.error) {
        toast.error(res.error);
      } else if (res.success) {
        toast.success("Course assigned successfully!");
        setIsDialogOpen(false);
      }
    } catch (error) {
      toast.error("Failed to submit request");
      console.error("Error submiting instructor course choice:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div>
      {/* Dialog with TooltipWrapper */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* Dialog Trigger (Clickable Button) */}
        <DialogTrigger asChild>
          <div>
            <TooltipWrapper label="Add a course" margin="lg:mr-12 mr-8 -mb-4">
              <button
                onClick={handleGetCourses}
                className="p-3 bg-white rounded-full cursor-pointer shadow-md shadow-blue-700"
              >
                <Plus className="size-6" />
              </button>
            </TooltipWrapper>
          </div>
        </DialogTrigger>

        {/* Dialog Content (Modal) */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Choose from below</DialogTitle>
          </DialogHeader>
          <form className="flex flex-col">
            <Select onValueChange={setSelectedCourseId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Courses" />
              </SelectTrigger>
              <SelectContent>
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <SelectItem
                      value={course.id}
                      key={course.id}
                      className="bg-white cursor-pointer"
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
            <div className={`flex gap-8 self-end mt-2`}>
              <button
                type="button"
                onClick={() => {
                  setIsDialogOpen(false);
                }}
                className="bg-gray-400 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                disabled={isProcessing}
                className={`${
                  isProcessing && "cursor-not-allowed"
                } bg-blue-700 px-8 rounded-lg`}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader className="h-5 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddACourse;
