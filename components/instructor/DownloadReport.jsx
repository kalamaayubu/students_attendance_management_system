"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DownloadCloudIcon, LucideClockArrowDown } from "lucide-react";
import TooltipWrapper from "../TooltipWrapper";

const DownloadReport = () => {
  const generatePDF = async () => {
    const reportTable = document.getElementById("report-table"); // Target the ReportTable
    const downloadButton = document.getElementById("download-button"); // Get the button

    if (!reportTable) return;

    try {
      // Hide the button before capturing
      if (downloadButton) downloadButton.style.display = "none";

      // Capture the table as an image
      const canvas = await html2canvas(reportTable, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // Create a PDF document
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // PDF width
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("attendance_report.pdf"); // Save as PDF file
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <TooltipWrapper label={"Download Report"} margin="-mb-6 mr-12">
      <div
        id="download-button"
        onClick={generatePDF}
        className="bg-white rounded-full p-4 absolute top-4 right-4 hover:shadow-sm transform transition duration-300 ease-in-out cursor-pointer"
      >
        <DownloadCloudIcon />
      </div>
    </TooltipWrapper>
  );
};

export default DownloadReport;
