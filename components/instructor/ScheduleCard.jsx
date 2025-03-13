"use client";

const ScheduleCard = ({ session, status }) => {
  return (
    <div className="shadow-md rounded-lg p-4 bg-white flex flex-col gap-2 w-[250px]">
      <p className="font-bold">{session.courses.course_code}</p>
      <p className="">{session.courses.course_name}</p>
    </div>
  );
};

export default ScheduleCard;
