"use client";
import { format } from "date-fns";
import {
  Table,
  TableBody,
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
            format(new Date(record.schedules.start_time), "yyyy-MM-dd HH:mm")
          ) || []
      )
    ),
  ];

  return (
    <div className="">
      <Table className="border border-collapse border-black w-full m-auto">
        {/* WEEK Row */}
        <TableHeader>
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
                className="text-center border border-black pb-2"
              >
                {date}
              </TableHead>
            ))}
          </TableRow>

          {/* Main Headers */}
          <TableRow className="border-black border">
            <TableHead className="w-6 text-center border border-black">
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
            <TableHead>%age</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body - Student Attendance Data */}
        <TableBody>
          {report.map((student, index) => {
            // Extract this student's attendance dates
            const studentAttendance = new Set(
              student.attendance?.map((record) =>
                format(
                  new Date(record.schedules.start_time),
                  "yyyy-MM-dd HH:mm"
                )
              ) || []
            );
            const attendedClasses = studentAttendance.size;
            const totalClasses = allDates.length;

            return (
              <TableRow
                key={student.student_id}
                className="border border-black"
              >
                {/* Serial Number */}
                <TableCell className="text-center max-w-6 border-black border-r">
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
                        ? "text-green-700"
                        : "text-red-600"
                    }`}
                  >
                    {studentAttendance.has(date) ? "✔" : "✘"}
                  </TableCell>
                ))}
                <TableCell className="text-center">
                  {totalClasses > 0
                    ? `${((attendedClasses / totalClasses) * 100).toFixed()}`
                    : "0"}{" "}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportTable;
