import { getAttendanceReport } from "@/actions/instructor/getAttendanceReport"
import CourseReportWrapper from "@/components/instructor/CourseReportWrapper"
import DownloadReport from "@/components/instructor/DownloadReport"
import ReportTable from "@/components/instructor/ReportTable"
import Image from "next/image"

const CourseReportPage = async ({ params }) => {
    const { reportId } = await params

    try {
        const res = await getAttendanceReport(reportId)
        if (!res.success) {
            console.error(res.error)
            return
        }

        const report = res.data

        if (!report || report.length === 0) {
            return <div className="text-gray-500">No attendance records found.</div>
        }
        return <CourseReportWrapper report={report} />

    } catch (error) {
        console.error('Error getting attendance records:', error)
        return <div className="text-red-500">Failed to load attendance report.</div>;    
    }
}

export default CourseReportPage