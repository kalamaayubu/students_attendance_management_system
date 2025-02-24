const CoursesList = ({ courses }) => {
  return (
    <ol>
      {courses?.map((course) => (
        <li key={course.id} className="flex gap-8 list-decimal">
          <span>{course.course_code}</span>
          <span>{course.course_name}</span>
        </li>
      ))}
    </ol>
  );
};

export default CoursesList;
