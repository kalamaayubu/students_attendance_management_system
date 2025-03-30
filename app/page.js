import Footer from "@/components/general/Footer";
import Hero from "@/components/general/Hero";
import HowItWorks from "@/components/general/HowItWorks";
import NavBar from "@/components/general/NavBar";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
    return (
      <div>
        <NavBar/>
        <div className="w-[85%] m-auto">
          <Hero/>
          
            <section className="flex flex-col lg:flex-row w-full gap-8 items-center justify-between">
              <div className="m-auto lg:m-0 w-full lg:max-w-[500px] max-w-[400px] rounded-lg flex flex-col items-center justify-between self-start">
                <h1 className="text-center text-4xl flex lg:hidden mt-14 mb-4">How does AttendMe work</h1>
                <Image src={'/assets/howItWorks.jpeg'} width={500} height={500} alt="Image" className="w-full object-cover rounded-xl"/>
                <Link href={"/"} className="mt-4 self-start hidden lg:flex">
                  <button className="bg-gradient-to-br from-blue-700 from-20% to bg-purple-600 to-90% text-white rounded-md px-4 py-2 hover:bg-gradient-to-tl hover:from-blue-700 hover:to-purple-600 mt-8 m-auto">
                    Start Tracking Attendance
                  </button>
                </Link>
              </div>

              {/* On large screens */}
              <div className="flex flex-col max-w-[550px]">
                <h1 className="text-center text-4xl hidden lg:flex mb-10">How does AttendMe work?</h1>
                <div className="">
                  <HowItWorks/>
                  <Link href={"/"} className="mt-4 flex lg:hidden">
                    <button className="bg-gradient-to-br from-blue-700 from-20% to bg-purple-600 to-90% text-white rounded-md px-4 py-2 hover:bg-gradient-to-tl hover:from-blue-700 hover:to-purple-600 mt-8 m-auto">
                      Start Tracking Attendance
                    </button>
                  </Link>
                </div>
              </div>
            </section>


            <section className=" mt-28">
          <h1 className="text-center lg:text-start">{`••• How it works`}</h1>
          <div className="flex flex-col lg:flex-row w-full gap-8 items-center justify-between">
            <div className="flex flex-col gap-4 ">
              <p className="text-xl text-gray-600 md:max-w-[500px]">On the instructor’s side, AttendMe makes attendance tracking seamless. 
                Instructors can schedule sessions, and for each session, the system generates a unique QR code. 
                Notifications are then sent to enrolled students as reminders. 
                During the session, students scan the QR code to mark their attendance, eliminating the need for manual roll calls. 
                Afterward, instructors can generate attendance reports for each course, providing a clear overview of student participation across all scheduled sessions. 
                This simplifies the process, saves time, and ensures accurate records.
              </p>
              <Link href={"/"} className="hidden lg:flex self-start">
                  <button className="bg-gradient-to-br from-blue-700 from-20% to bg-purple-600 to-90% text-white rounded-md px-4 py-2 hover:bg-gradient-to-tl hover:from-blue-700 hover:to-purple-600 mt-8 m-auto">
                    Start Tracking Attendance
                  </button>
                </Link>
              </div>
              <div className="flex flex-col gap-6">
              <Image src={'/assets/howItWorksInstructors.jpeg'} width={500} height={500} alt="Image" className="w-full object-cover rounded-xl max-w-[550px] "/>
                <Link href={"/"} className=" flex lg:hidden">
                  <button className="bg-gradient-to-br from-blue-700 from-20% to bg-purple-600 to-90% text-white rounded-md px-4 py-2 hover:bg-gradient-to-tl hover:from-blue-700 hover:to-purple-600 mt-8 m-auto">
                    Start Tracking Attendance
                  </button>
                </Link>
              </div>
            </div>
          </section>

        </div>
        <Footer/>
      </div>
    );
}

// ✅ ISR: Regenerate the page in the background every hour if content changes, without blocking user
export const revalidate = 3600; 
