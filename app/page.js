'use client'
import Footer from "@/components/general/Footer";
import Hero from "@/components/general/Hero";
import HowItWorks from "@/components/general/HowItWorks";
import NavBar from "@/components/general/NavBar";
import Image from "next/image";
import Link from "next/link";

export default function NotificationSetup() {
    return (
      <div>
        <NavBar/>
        <div className="w-[85%] m-auto">
          <Hero/>
            <div className="flex flex-col lg:flex-row w-full gap-8 items-center">
              <div className="m-auto w-full md:max-w-[450px] rounded-lg flex flex-col items-center">
                <h1 className="text-center text-4xl flex lg:hidden mt-14 mb-4">How does AttendMe work</h1>
                <Image src={'/assets/howItWorks.webp'} width={500} height={500} alt="Image" className="w-full object-cover rounded-xl"/>
                <Link href={"/"} className="mt-4 self-start hidden lg:flex">
                  <button className="bg-gradient-to-br from-blue-700 from-20% to bg-purple-600 to-90% text-white rounded-md px-4 py-2 hover:bg-gradient-to-tl hover:from-blue-700 hover:to-purple-600 mt-8 m-auto">
                    Start Tracking Attendance
                  </button>
                </Link>
              </div>

                <div className="flex flex-col">
                  <h1 className="text-center text-4xl hidden lg:flex">How does AttendMe work?</h1>
                  <div className="">
                    <HowItWorks/>
                    <Link href={"/"} className="mt-4 flex lg:hidden">
                      <button className="bg-gradient-to-br from-blue-700 from-20% to bg-purple-600 to-90% text-white rounded-md px-4 py-2 hover:bg-gradient-to-tl hover:from-blue-700 hover:to-purple-600 mt-8 m-auto">
                        Start Tracking Attendance
                      </button>
                    </Link>
                  </div>
                </div>
            </div>
        </div>
        <Footer/>
      </div>
    );
}
