"use client";
import { useState } from "react";
import QRScannerEffect from "@/components/student/QrScannerEffect";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { markAttendance } from "@/actions/student/markAttendance";
import { useRouter } from "next/navigation";
import { getInstructorLocation } from "@/actions/student/getInstructorLocation";
import {
  checkStudentProximity,
  getStudentLocation,
} from "@/utils/geofencing/trackStudent";

const MarkAttendanceClient = ({
  qrData,
  courseId,
  studentId,
  startsAt,
  validUntill,
}) => {
  const { id: qrCodeId, schedule_id: scheduleId, qr_data: qrImage } = qrData;
  const [isScanning, setIsScanning] = useState(false); // Scanning animation
  const router = useRouter();

  const handleMarkAttendance = async () => {
    setIsScanning(true);

    try {
      // Get the instructor's location from the storage
      const {
        data: { id, latitude: instructorLat, longitude: instructorLon },
        error: instructorLocationError,
      } = await getInstructorLocation(scheduleId);
      if (instructorLocationError) {
        console.error("Error:", instructorLocationError);
        toast.error(instructorLocationError);
        return;
      }

      // Get the student's current location
      const {
        latitude: studentLat,
        longitude: studentLon,
        error: studentLocationError,
      } = await getStudentLocation();
      if (studentLocationError) {
        console.error("Error:", studentLocationError);
        toast.error(studentLocationError);
        return;
      }

      // Check if the distance between instructor and student exceeds the defined radius
      const isWithinRange = await checkStudentProximity(
        studentLat,
        studentLon,
        instructorLat,
        instructorLon
      );
      if (!isWithinRange) {
        toast.error(
          "Failed to mark attendance. Please check your internet connection and try again."
        );
        return;
      }

      // Mark attendance
      const response = await markAttendance(
        scheduleId,
        courseId,
        studentId,
        qrCodeId
      );
      if (!response.success) {
        toast.error(`${response.error}`);
        return;
      }

      toast.success("Attendance Marked Successfully");
      router.push("/student/schedules");
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* QR Scanner with scanning effect */}
      <QRScannerEffect qrCodeSrc={qrImage} isScanning={isScanning} />
      <div className="mt-4">
        <span className="font-semibold text-center">Validity</span>
        <span className="block">
          {startsAt} - {validUntill}
        </span>
      </div>

      {/* Button to trigger scanning */}
      <button
        onClick={handleMarkAttendance}
        className={`${
          isScanning ? "cursor-not-allowed" : ""
        } bg-gradient-to-br my-8 px-6 py-2 from-blue-700 to-purple-600 text-white rounded-xl disabled:opacity-90`}
        disabled={isScanning} // Disable button while scanning
      >
        {isScanning ? (
          <span className="animate-pulse flex gap-4 items-center">
            <Loader className="animate-spin" />
            Processing...
          </span>
        ) : (
          "Mark Attendance"
        )}
      </button>
    </div>
  );
};

export default MarkAttendanceClient;
