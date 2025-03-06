import { getQrCode } from "@/actions/student/getQrCode";
import MarkAttendanceClient from "@/components/student/MarkAttendanceClient";

const AttendanceMarkingPage = async ({ params, searchParams }) => {
  const { attendanceMarkingId } = await params;
  const { courseId, courseName, studentId, startsAt, validUntill } = await searchParams;

  try {
    // Fetch QR code data on the server
    const qrCodeData = await getQrCode(attendanceMarkingId, studentId);

    return (
      <div className="flex items-center justify-center h-full flex-col p-8 bg-white">
        <h1 className="text-[25px] text-center mb-4 mt-6">{courseName}</h1>

        {/* Pass data to the Client Component */}
        <MarkAttendanceClient
          qrData={qrCodeData?.qr_data}
          courseId={courseId}
          studentId={studentId}
          startsAt={startsAt}
          validUntill={validUntill}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching QR Code:", error);
    return <p className="text-red-500">Failed to load QR Code.</p>;
  }
};

export default AttendanceMarkingPage;
