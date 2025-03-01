"use client";
import { useState } from "react";
import QRScannerEffect from "@/components/student/QrScannerEffect";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { markAttendance } from "@/actions/student/markAttendance";
import { useRouter } from "next/navigation";

const MarkAttendanceClient = ({ qrData, studentId, startsAt, validUntill }) => {
  const { id: qrCodeId, schedule_id: scheduleId, qr_data: qrImage } = qrData;
  const router = useRouter();

  const [isScanning, setIsScanning] = useState(false); // Scanning animation

  const handleMarkAttendance = async () => {
    setIsScanning(true);

    try {
      const response = await markAttendance(scheduleId, studentId, qrCodeId);
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
