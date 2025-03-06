import { getAttendanceReport } from "@/actions/instructor/getAttendanceReport"
import ReportTable from "@/components/instructor/ReportTable"

const CourseReportPage = async ({params}) => {
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
        return (
            <div className="bg-white p-4">
                <h1 className="font-bold text-3xl mb-4 text-start mt-10">
                    <p className="text-center mb-4">KIBABII UNIVERSITY</p>
                    <p className="text-center text-[22px] font-semibold mb-4">LECTURE SESSION ATTENDANCE FORM</p>
                    <div className="flex gap-10 items-center justify-center text-[20px]">
                        <p className="font-semibold">COURSE CODE: <span className="underline">{report[0]?.courses?.course_code}</span></p>
                        <p className="font-semibold">COURSE TITLE: <span className="underline">{report[0]?.courses?.course_name}</span></p>
                    </div>
                </h1>  

                <ReportTable report={report}/>

                <div className="flex gap-4">
                    <p className="">{`LECTURER'S NAME:`}</p>
                    <p className="text-[18px] mb-4 my-auto items-center justify-center underline underline-offset-2 inline-block whitespace-nowrap">
                        {report[0]?.courses?.instructor_courses?.instructors?.profiles?.first_name}&nbsp;&nbsp;
                        {report[0]?.courses?.instructor_courses?.instructors?.profiles?.second_name}
                    </p>
                </div>
            </div>
        )

    } catch (error) {
        console.error('Error getting attendance records:', error)     
    }
}

export default CourseReportPage