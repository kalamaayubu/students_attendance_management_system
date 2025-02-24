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
  User2Icon,
  UserPen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import TooltipWrapper from "../TooltipWrapper";

const Sidebar = ({ isOpen }) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const logoutRef = useRef(null);
  const router = useRouter();

  // Close the logout div when user clicks outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (logoutRef.current && !logoutRef.current.contains(e.target)) {
        setIsLogoutOpen(false);
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    };
  }, []);

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
      url: "/instructor/dashboard",
    },
    {
      icon: CalendarClock,
      name: "Schedules",
      url: "/instructor/schedules",
    },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-52" : "w-[52px] pt-2"
      } transition-all duration-50 relative flex flex-col h-full`}
    >
      <div className="p-3">
        {menuItems?.map((item) => (
          <TooltipWrapper
            key={item.name}
            label={item.name}
            isSidebarOpen={isOpen}
          >
            <div
              onClick={() => router.push(item.url)}
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

      <div
        className={`absolute bottom-0 w-full overflow-y-clip ${
          isLogoutOpen ? "pt-12" : "h-12"
        } ${isOpen ? "" : ""}`}
      >
        <TooltipWrapper label="User" isSidebarOpen={isOpen}>
          <div
            onClick={() => setIsLogoutOpen(!isLogoutOpen)}
            className={`${
              isOpen ? "px-2" : "pl-[13px] p-[6px]"
            } flex w-full cursor-pointer bg-white z-20 rounded-md gap-2 items-center absolute bottom-0 hover:bg-gray-50`}
          >
            <User className={`${isOpen ? "" : "size-5"}`} />
            <button className={`${isOpen ? "" : "hidden"}`}>Username</button>
            <ChevronUp
              className={`${isOpen ? "" : "hidden"} ${
                isLogoutOpen ? "rotate-0" : "rotate-180"
              } -translate-y-[6px] transition-all duration-300 self-end`}
            />
          </div>
        </TooltipWrapper>

        <div
          ref={logoutRef}
          className={` ${isLogoutOpen ? "block" : "translate-y-40"} ${
            isOpen ? "shadow-lg mx-2 p-2" : "gap-1 shadow-md p-[4px]"
          } flex flex-col z-10 rounded-md bg-white border transition-all duration-300 -translate-y-[40px]`}
        >
          <TooltipWrapper label="Settings" isSidebarOpen={isOpen}>
            <button
              title={`${!isOpen ? "Settings" : ""}`}
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
              title={`${!isOpen ? "Notifications" : ""}`}
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
              } whitespace-nowrap hover:bg-red-500 rounded-md flex items-center gap-2`}
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
