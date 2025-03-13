"use client";

import { logout } from "@/actions/auth/logout";
import {
  Bell,
  BookAudio,
  CalendarClock,
  ChartLine,
  ChevronUp,
  LayoutDashboard,
  Library,
  LogOut,
  Settings,
  User,
  UserPen,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import TooltipWrapper from "../TooltipWrapper";
import ReusableDialog from "../ReusableDialog";
import SelectReportCourse from "./SelectReportCourse";
import { getUserId } from "@/utils/getUserId";
import { getUserBio } from "@/utils/getUserBio";

const Sidebar = ({ isOpen, setSidebarOpen, isSmallScreen }) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null); // Track selected course
  const logoutRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const [userBio, setUserBio] = useState({
    first_name: "Username",
    second_name: "",
    email: "Email",
  });

  // Get user bio on component mount for personalization
  useEffect(() => {
    const fetchUserBio = async () => {
      const userId = await getUserId();
      const { data } = await getUserBio(userId);
      setUserBio(data);
    };

    fetchUserBio();
  }, []);

  // Close the logout div when user clicks outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (logoutRef.current && !logoutRef.current.contains(e.target)) {
        setIsLogoutOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Hide the sidebar when user navigates to another page in mobile view
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully loged out.");
    } catch (error) {
      toast.success("Successfully loged out.");
      console.error("Error during logout", error);
    }
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      name: "Dashboard",
      url: "/instructor/dashboard",
    },
    {
      icon: BookAudio,
      name: "My Lectures",
      url: "/instructor/my_lectures",
    },
    {
      icon: Library,
      name: "Courses",
      url: "/instructor/courses",
    },
    {
      icon: UserPen,
      name: "Instructors",
      url: "/instructor/dashboard",
    },
    {
      icon: ChartLine,
      name: "Reports",
      url: "/instructor/reports",
    },
    {
      icon: CalendarClock,
      name: "Schedules",
      url: "/instructor/schedules",
    },
  ];

  // Handle "Reports" link click
  const handleReportsClick = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  return (
    <div
      className={`${
        isOpen ? "w-52" : "w-0 md:w-[52px] pt-2"
      } transition-all duration-50 relative flex flex-col h-full z-40`}
    >
      <div className="p-3">
        {menuItems?.map((item) => (
          <TooltipWrapper
            key={item.name}
            label={item.name}
            isSidebarOpen={isOpen}
          >
            <div
              onClick={(e) => {
                if (
                  item.name === "Reports" &&
                  pathname !== "/instructor/reports"
                ) {
                  handleReportsClick(e);
                } else {
                  router.push(item.url);
                }
              }}
              className={`${
                isOpen
                  ? "px-3 py-1 hover:rounded-lg hover:bg-lightGray"
                  : "mb-[24px]"
              } cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                <item.icon className="text-gray-800 size-5 items-center" />
                <button className={`${!isOpen && "hidden"}`}>
                  {item.name}
                </button>
              </div>
            </div>
          </TooltipWrapper>
        ))}
      </div>

      {/* Dialog for Reports */}
      <ReusableDialog
        title="Get Attendance Report?"
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <SelectReportCourse onSelect={setSelectedCourseId} />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setIsDialogOpen(false)}
            className="px-5 py-2 bg-gray-300 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              router.push(`/instructor/reports/${selectedCourseId}`);
              setIsDialogOpen(false);
            }}
            className="px-5 py-2 bg-blue-500 text-white rounded-xl"
          >
            Proceed
          </button>
        </div>
      </ReusableDialog>

      {/* The sidebar footer */}
      <div
        className={`absolute bottom-0 w-full overflow-y-clip ${
          isLogoutOpen ? "pt-12" : "h-12"
        } ${isOpen ? "" : "-translate-x-10"}`}
      >
        <TooltipWrapper
          label={`${userBio.first_name} ${userBio.second_name}`}
          isSidebarOpen={isOpen}
        >
          <div
            onClick={() => setIsLogoutOpen(!isLogoutOpen)}
            className={`${
              isOpen ? "px-2" : "pl-[13px] p-[6px]"
            } flex w-full cursor-pointer bg-white z-20 rounded-md gap-2 items-center absolute bottom-0 hover:bg-gray-50`}
          >
            <User className={`${isOpen ? "" : "size-5"}`} />
            <button className={`${isOpen ? "" : "hidden"}`}>
              {userBio.first_name}
            </button>
            <ChevronUp
              className={`${isOpen ? "" : "hidden"} ${
                isLogoutOpen ? "rotate-0" : "rotate-180"
              } -translate-y-[6px] transition-all duration-300 self-end`}
            />
          </div>
        </TooltipWrapper>

        <div
          ref={logoutRef}
          className={`${isLogoutOpen ? "block" : "translate-y-40"} ${
            isOpen ? `shadow-lg mx-2 p-2` : "gap-1 shadow-md p-[4px]"
          } flex flex-col z-10 rounded-md bg-white border transition-all duration-300 -translate-y-[40px]`}
        >
          <TooltipWrapper label="Settings" isSidebarOpen={isOpen}>
            <button
              className={` ${
                isOpen ? "px-3 py-2" : ""
              } whitespace-nowrap hover:bg-lightGray rounded-md flex items-center gap-2`}
            >
              <Settings className={`size-4`} />
              <span className={`${isOpen ? "" : "hidden"}`}>Settings</span>
            </button>
          </TooltipWrapper>
          <TooltipWrapper label="Notifications" isSidebarOpen={isOpen}>
            <button
              className={` ${
                isOpen ? "px-3 py-2" : ""
              } whitespace-nowrap hover:bg-lightGray rounded-md flex items-center gap-2`}
            >
              <Bell className={`size-4`} />
              <span className={`${isOpen ? "" : "hidden"}`}>
                Notifiacations
              </span>
            </button>
          </TooltipWrapper>
          <TooltipWrapper label="Logout" isSidebarOpen={isOpen}>
            <button
              onClick={handleLogout}
              className={` ${
                isOpen ? "px-3 py-2" : ""
              } whitespace-nowrap hover:bg-gradient-to-br hover:from-blue-800 hover:to-purple-600 hover:text-white rounded-md flex items-center gap-2`}
            >
              <LogOut className={`size-4`} />
              <span className={`${isOpen ? "" : "hidden"}`}>Logout</span>
            </button>
          </TooltipWrapper>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
