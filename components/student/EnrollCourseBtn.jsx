"use client";
import { Loader, MoreHorizontal } from "lucide-react";
import ReusableDialog from "../ReusableDialog";
import TooltipWrapper from "../TooltipWrapper";
import { useState } from "react";
import { enrollCourse } from "@/actions/student/enrollCourse";
import { getUserId } from "@/utils/getUserId";
import { toast } from "react-toastify";

const EnrollCourseBtn = ({ courseCode, courseId }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [regNumber, setRegNumber] = useState("");

  // Handle course enrollement submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const studentId = getUserId();
      const res = await enrollCourse(
        await studentId,
        regNumber,
        courseId,
        courseCode
      );
      if (res?.success) {
        setIsDialogOpen(false);
        setRegNumber("");
        toast.success(`${res.message}`);
      } else {
        toast.error(`${res.error}`);
      }
    } catch (error) {
      toast.error(`Unexpected error occured.`);
      console.error("Enrollment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <ReusableDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={`Enroll to ${courseCode}?`}
        trigger={
          <div>
            <TooltipWrapper label={"Enroll course"} margin="ml-14 -mb-1">
              <MoreHorizontal className="opacity-0 transition-all duration-300 group-hover:opacity-80 cursor-pointer" />
            </TooltipWrapper>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
            minLength={8}
            required
            placeholder="Enter your Reg no..."
            className="rounded-lg focus:border-gray-400"
          />
          <div className="flex gap-8 sm:self-end self-center mt-2">
            <button
              type="button"
              onClick={() => {
                setRegNumber("");
                setIsDialogOpen(false);
              }}
              className="bg-gray-400 rounded-lg px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-700 px-8 rounded-lg text-white"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="animate-pulse flex items-center gap-4">
                  <Loader className="animate-spin h-5" />
                  Enrolling...
                </span>
              ) : (
                "Enroll"
              )}
            </button>
          </div>
        </form>
      </ReusableDialog>
    </div>
  );
};

export default EnrollCourseBtn;
