"use client";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ReportTable = ({ report }) => {
  // Extract all unique attendance dates
  const allDates = [
    ...new Set(
      report.flatMap(
        (student) =>
          student.attendance?.map((record) =>
            format(new Date(record.schedules.start_time), "yyyy-MM-dd")
          ) || []
      )
    ),
  ];

  return (
    <div className="overflow-x-auto">
      <Table className="border border-collapse border-black w-full">
        <TableCaption className="font-semibold">
          {`${report[0]?.courses?.course_code} Attendance List`}
        </TableCaption>

        {/* WEEK Row */}
        <TableHeader>
          <TableRow className="border-black border">
            <TableHead className="w-10"></TableHead>
            <TableHead className="w-60"></TableHead>
            <TableHead className="w-10 text-center border border-black">
              WEEK
            </TableHead>

            {/* Empty placeholders for dynamic attendance dates */}
            {allDates.map((_, index) => (
              <TableHead
                key={index}
                className="w-32 border border-black"
              ></TableHead>
            ))}
          </TableRow>

          {/* DATE Row */}
          <TableRow className="border-black border">
            <TableHead className="w-10"></TableHead>
            <TableHead className="w-60"></TableHead>
            <TableHead className="w-32 text-center border border-black">
              DATE
            </TableHead>

            {/* Display all extracted unique attendance dates */}
            {allDates.map((date, index) => (
              <TableHead
                key={index}
                className="text-center border border-black"
              >
                {date}
              </TableHead>
            ))}
          </TableRow>

          {/* Main Headers */}
          <TableRow className="border-black border">
            <TableHead className="w-10 text-center border border-black">
              S/NO
            </TableHead>
            <TableHead className="w-60 text-left border border-black">
              NAME
            </TableHead>
            <TableHead className="w-32 text-center border border-black">
              REG NO
            </TableHead>

            {/* Attendance Status Headers (Dynamic per date) */}
            {allDates.map((_, index) => (
              <TableHead
                key={index}
                className="text-center border border-black"
              >
                Present
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Table Body - Student Attendance Data */}
        <TableBody>
          {report.map((student, index) => {
            // Extract this student's attendance dates
            const studentAttendance = new Set(
              student.attendance?.map((record) =>
                format(new Date(record.schedules.start_time), "yyyy-MM-dd")
              ) || []
            );

            return (
              <TableRow
                key={student.student_id}
                className="border border-black"
              >
                {/* Serial Number */}
                <TableCell className="text-center max-w-10 border-black border-r">
                  {index + 1}
                </TableCell>

                {/* Student Name */}
                <TableCell className="border-r border-black">
                  {student.students?.profiles?.first_name}{" "}
                  {student.students?.profiles?.second_name}
                </TableCell>

                {/* Registration Number */}
                <TableCell className="text-center w-28">
                  {student.students?.reg_no}
                </TableCell>

                {/* Attendance Status (Check if student was present on each date) */}
                {allDates.map((date, i) => (
                  <TableCell
                    key={i}
                    className={`text-center border border-black ${
                      studentAttendance.has(date)
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {studentAttendance.has(date) ? "✔" : "✘"}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportTable;
