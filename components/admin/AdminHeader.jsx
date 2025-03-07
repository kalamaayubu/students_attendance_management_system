"use client";

import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const AdminHeader = ({ toggleSideBar }) => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex gap-4 items-center justify-between w-full">
      <div className="flex gap-5 items-center">
        <div className="flex gap-4 items-center">
          <Image
            width={200}
            height={200}
            alt="Logo"
            src="/assets/logo3.jpg"
            className="w-14"
          />
          <span className="font-semibold text-xl hidden md:flex">AttendMe</span>
        </div>

        <Menu onClick={toggleSideBar} className="cursor-pointer mx-2 size-6" />
      </div>

      <div
        className={`${
          isFocused
            ? "bg-white shadow-md border-[1px] border-gray-100"
            : "bg-gray-100"
        } gap-2 items-center hidden md:flex px-4 py-[2px] rounded-full`}
      >
        <Search className="text-gray-500 w-5" />
        <input
          type="text"
          value={search}
          className={`${isFocused ? "bg-white" : "bg-gray-100"} border-none`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search here..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="relative flex bg-gradient-to-br from-blue-800 to-purple-500 p-3 rounded-full cursor-pointer -translate-y-2 self-end">
        <Bell className="text-white size-[18px]" />
        <div className="size-3 bg-green-400 absolute rounded-full top-0 right-0" />
      </div>
    </div>
  );
};

export default AdminHeader;
