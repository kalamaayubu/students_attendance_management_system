"use client";

import TooltipWrapper from "@/components/TooltipWrapper";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { addCourse } from "@/actions/admin/addCourse";
import { toast } from "react-toastify";

const AddCourseButton = () => {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await addCourse(courseCode, courseName);
      if (res.success) {
        toast.success(res.message);
        setIsDialogOpen(false);
        setCourseCode("");
        setCourseName("");
      }
      toast.error(res.error);
    } catch (error) {
      toast.error(error);
      console.error(error);
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
            <TooltipWrapper label="Add new course" margin="lg:mr-12 mr-8 -mb-4">
              <button className="p-3 bg-white rounded-full cursor-pointer shadow-md shadow-blue-700">
                <Plus className="size-6" />
              </button>
            </TooltipWrapper>
          </div>
        </DialogTrigger>

        {/* Dialog Content (Modal) */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Add New Course</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="Enter course code"
              required
              className="focus:border-gray-400 rounded-lg"
            />
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter course name"
              required
              className="focus:border-gray-400 rounded-lg"
            />
            <div className={`flex gap-8 sm:self-end self-center mt-2`}>
              <button
                type="button"
                onClick={() => {
                  setCourseCode("");
                  setCourseName("");
                  setIsDialogOpen(false);
                }}
                className="bg-gray-400 rounded-lg"
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-700 px-8 rounded-lg">
                {isProcessing ? (
                  <span className="animate-pulse">Registering...</span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCourseButton;
