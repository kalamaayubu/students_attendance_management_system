"use client";
import Menu from "./Menu";

const NavBar = () => {
  return (
    <header className="w-full flex items-center justify-between mb-1 px-6 pt-5 z-10">
      <div className="flex items-center">
        <img src="/icons/attendMeLogoNoBg.png" alt="Logo" className="w-12" />
        <p className="hidden sm:flex bg-gradient-to-br from-blue-700 from-20% via-purple-600 via-90% bg-clip-text text-transparent font-semibold text-xl">
          &nbsp;&nbsp;&nbsp;AttendMe
        </p>
      </div>
      <Menu />
    </header>
  );
};

export default NavBar;
