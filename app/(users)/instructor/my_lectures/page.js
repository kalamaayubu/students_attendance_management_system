import { getCourses } from "@/actions/instructor/getMyLectures";
import AddACourse from "@/components/instructor/AddMyCoursesBtn";

const MyLectures = async () => {
  try {
    const { success, courses, message } = await getCourses();
    console.log("Courses data:", courses); // Debugging step

    if (!success) {
      return <p className="text-red-600">Failed to load courses: {message}</p>;
    }

    if (courses.length === 0) {
      return <p className="text-red-600">{message || "No courses found."}</p>;
    }

    return (
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl xl:text-4xl">My Courses</h1>
          <AddACourse />
        </div>
        <div className="bg-white p-4 w-fit rounded-lg">
          <ol className="list-decimal pl-6">
            {courses.map((course, index) => (
              <div key={course.id}>
              <li className="flex gap-6 mb-2">
                <span className="font-semibold">{course.course_code}</span>
                <span>{course.course_name}</span>
              </li>
              {index !== courses.length - 1 && ( // Add separator ONLY if not the last item
                <div className="my-2 h-[1px] w-full bg-gray-300" />
              )}              
              </div>
            ))}
          </ol>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading courses:", error);
    return <p className="text-red-500">An error occurred while fetching courses. Please try again later.</p>;
  }
};

export default MyLectures;
