import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="hero_section flex flex-col lg:flex-row lg:justify-between m-auto mb-20 mt-16">
      <div className="flex flex-col items-center lg:items-start lg:mt-4 lg:gap-2">
        <h1 className="text-4xl sm:text-[2.7rem] lg:text-5xl font-bold leading-tight lg:leading-tight max-w-[500px] mb-5 text-center lg:text-start">
          Track Attendance, Gain <span className="italic">Insights</span>,
          <span className=" bg-gradient-to-br from-blue-700 from-20% via-purple-600 via-90% bg-clip-text text-transparent">
            {" "}
            <span className="inline-block">Boost Efficiency</span>
          </span>
          .
        </h1>
        <p className="text-gray-700 lg:max-w-[600px] sm:max-w-[780px] text-xl text-center lg:text-start px-2 lg:px-0 mb-8">
          AttendMe makes attendance tracking effortless for students and
          instructors. Students check in seamlessly, while instructors eliminate
          manual roll calls and paperwork. With automated records, real-time
          insights, and instant reports, managing attendance has never been
          easier. Focus on learning—let AttendMe handle the rest!
        </p>
        <button className="bg-gradient-to-br from-blue-700 from-20% to bg-purple-600 to-90% text-white rounded-md px-4 py-2 hover:bg-blue-600 hidden lg:flex">
          Start Tracking Attendance
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div>
          <div className="w-80 h-[450px] lg:w-80 rounded-lg transition-transform hover:rotate-12 transform-gpu -rotate-0 hover:scale-95 drop-shadow-[20px_50px_10px_rgba(0,0,0,0.7)] hover:drop-shadow-[-20px_50px_10px_rgba(0,0,0,0.7)] mt-3">
            <img
              src="/assets/markingAttendance.png"
              alt="Hero"
              className="object-cover w-full h-full shadow-md rounded-lg"
            />
          </div>
        </div>
        <Link href={"/"} className="mt-14">
          <button className="bg-gradient-to-br from-blue-700 from-20% to bg-purple-600 to-90% text-white rounded-md px-4 py-2 hover:bg-gradient-to-tl hover:from-blue-700 hover:to-purple-600 mt-8 m-auto lg:hidden">
            Start Tracking Attendance
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
