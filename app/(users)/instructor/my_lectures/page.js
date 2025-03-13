import { getCourses } from "@/actions/instructor/getMyLectures";
import AddACourse from "@/components/instructor/AddMyCoursesBtn";

const MyLectures = async () => {
  try {
    const { success, courses, message } = await getCourses();

    if (!success) {
      return <p className="text-red-600">Failed to load courses: {message}</p>;
    }

    return (
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <h1 className="gradient-text text-[19px]">My Courses</h1>
          <AddACourse />
        </div>
        {courses.length > 0 && (
          <div className="bg-white w-fit shadow-md border border-gray-200">
          <ol className="pt-2 pb-2">
            {courses.map((course, index) => (
              <div key={course.id}>
                <li className="flex gap-6 px-8 py-[6px]">
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
        )} 
      </div>
    );
  } catch (error) {
    console.error("Error loading courses:", error);
    return <p className="text-red-500">An error occurred while fetching courses. Please try again later.</p>;
  }
};

export default MyLectures;
