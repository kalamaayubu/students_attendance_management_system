"use client";

import { Loader, MoreHorizontal } from "lucide-react";
import Dropdown from "../Dropdown";
import { useState } from "react";
import { deleteSchedule } from "@/actions/instructor/deleteSchedule";
import { toast } from "react-toastify";
import ReusableDialog from "../ReusableDialog";
import UpdatingSchedule from "./UpdatingSchedule";

const ScheduleCard = ({ session, status, courses }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  // Schedule card menu items
  const menuItems = [
    {
      title: "Update session",
      onClick: () => setIsUpdateDialogOpen(true), // Open update confirmation dialog
    },
    {
      title: "Delete session",
      onClick: () => setIsDeleteDialogOpen(true), // Open delete confirmation dialog
    },
  ];

  // Handle schedule removal
  const handleDeleteSchedule = async (scheduleId, courseCode) => {
    setIsProcessing(true);

    try {
      const { error, message, success } = await deleteSchedule(
        scheduleId,
        courseCode
      );
      if (!success) {
        toast.error(error);
        return;
      }
      toast.success(message);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting schedule:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="border group hover:shadow-md rounded-lg p-4 bg-white flex flex-col gap-2 w-[250px] transition-all duration-300">
      <div className="flex gap-4">
        <p className="font-bold">{session.courses.course_code}</p>
        {/* More horizontal icon to open a dropdown menu */}
        <Dropdown
          trigger={
            isProcessing ? (
              <Loader className="animate-spin" />
            ) : (
              <MoreHorizontal className="group-hover:opacity-100 opacity-0 cursor-pointer" />
            )
          }
          menuItems={menuItems}
        />
      </div>
      <p className="">{session.courses.course_name}</p>
      <p></p>

      {/* Dialog to confirm deletion of a session */}
      <ReusableDialog
        title="Are you sure?"
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <p className="text-gray-700">
          This action cannot be undone. You are about to delete this{" "}
          {session.courses.course_code} schedule permanently.
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setIsDeleteDialogOpen(false)}
            className="bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              handleDeleteSchedule(session.id, session.courses.course_code)
            }
            disabled={isProcessing}
            className="bg-red-500 rounded-md"
          >
            {isProcessing ? (
              <sapn className="animate-pulse flex items-center gap-4 text-white">
                <Loader className="animate-spin" />
                Deleting...
              </sapn>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </ReusableDialog>

      {/* Dialog for updating a scheduled session */}
      <ReusableDialog
        title=""
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
      >
        <div>
          <h3 className="gradient-text text-2xl">
            Update {session.courses.course_code} session
          </h3>
        </div>
        <UpdatingSchedule
          courses={courses}
          session={session}
          setIsUpdateDialogOpen={setIsUpdateDialogOpen}
        />
      </ReusableDialog>
    </div>
  );
};

export default ScheduleCard;
