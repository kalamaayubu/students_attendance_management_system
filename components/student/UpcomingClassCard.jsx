"use client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

import ReusableDialog from "../ReusableDialog";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2Icon, X } from "lucide-react";

const UpcomingClassCard = ({
  scheduleData,
  studentId,
  attendanceRecords,
  status,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  // Check if attendance is already marked
  const isAttendanceMarked = attendanceRecords.some(
    (entry) => String(entry.schedule_id) === String(scheduleData.schedule_id)
  );

  const start = dayjs
    .utc(scheduleData.start_time)
    .format("MMM D, YYYY, h:mm A");
  const end = dayjs.utc(scheduleData.end_time).format("h:mm A");

  // Define the dialog message as per the status of the schedule
  let dialogMessage = "";
  if (status === "upcoming") {
    dialogMessage = "The scheduled time is not yet.";
  } else if (status === "past") {
    dialogMessage = "The scheduled time is over.";
  } else {
    dialogMessage = isAttendanceMarked
      ? "Attendance already marked."
      : "Proceed to mark attendance?";
  }

  return (
    <>
      <ReusableDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogMessage}
        trigger={
          <div className="p-4 mb-2 cursor-pointer bg-white rounded-lg shadow-md shadow-gray-400 hover:shadow-lg border hover:shadow-gray-400 transition-all duration-300">
            <div className="mb-4">
              <p className="font-bold flex items-center justify-between">
                <span>{scheduleData.course_code}</span>
                <span>
                  {isAttendanceMarked && (
                    <CheckCircle2Icon className="text-green-600" />
                  )}
                  {!isAttendanceMarked && status === "past" && (
                    <X className="text-red-700" />
                  )}
                </span>
              </p>
              <p className="">{scheduleData.course_name}</p>
            </div>
            <div className=""></div>
            <div className="font-semibold">
              By. {scheduleData.first_name} {scheduleData.second_name}
            </div>
            <p className="font-extralight">
              {start} - {end}
            </p>
          </div>
        }
      >
        {status === "ongoing" && !isAttendanceMarked && (
          <Link
            href={{
              pathname: `/student/schedules/${scheduleData.schedule_id}`,
              query: {
                studentId: studentId,
                courseId: scheduleData.course_id,
                courseName: scheduleData.course_name,
                scheduleId: scheduleData.schedule_id,
                startsAt: start,
                validUntill: end,
              },
            }}
            className="flex"
          >
            <button className="m-auto w-fit text-white px-8 py-2 rounded-lg bg-gradient-to-br from-blue-700 to-purple-600">
              Proceed
            </button>
          </Link>
        )}
      </ReusableDialog>
    </>
  );
};

export default UpcomingClassCard;
