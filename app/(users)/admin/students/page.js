import { getStudents } from "@/actions/admin/getStudents"
import StudentsTable from "@/components/admin/Table"

const StudentsOperations = async () => {
  const students = await getStudents()

  if (students.length === 0) {
    return <p>Failed to fetch students. Please try again later.</p>
  }
  return (
    <div>
        <h1>Students</h1>
        <div className="bg-white max-w-[800px] p-8 rounded-lg m-auto">
          <StudentsTable students={students}/>
        </div>
    </div>
  )
}

export default StudentsOperations