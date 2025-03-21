"use client";

import Link from "next/link";
import { logout } from "@/actions/auth/logout";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // Check authorization of user
  useEffect(() => {
    const authState = Cookies.get("authState"); // Use js-cookie to get the authState cookie

    if (authState) {
      try {
        const parsedAuth = JSON.parse(authState); // Parse the cookie value
        setUser(parsedAuth.user || null); // Set the user state
      } catch (error) {
        console.error("Failed to parse authState cookie:", error);
        setUser(null);
      }
    }
  }, []);

  // Handle logout
  const handleLogout = async () => {
    setIsProcessing(true);
    try {
      await logout();
      toast.success("Successfully logged out.");
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.success("Successfully logged out.");
      router.replace("/");
    } finally {
      setIsProcessing(false);
      setUser(null);
    }
  };

  return (
    <>
      <nav className="md:flex items-center gap-4 hidden">
        <Link href={"/"} className="gradient-text">
          Home
        </Link>
        <Link href={"/student/dashboard"}>Student</Link>
        <Link href={"/instructor/dashboard"}>Instructor</Link>
        <Link href={"/admin/dashboard"}>Admin</Link>
        <p>Contacts</p>
        <button
          disabled={isProcessing}
          className="px-4 text-white py-2 rounded-md bg-gradient-to-br from-blue-800 to-purple-600 outline-none"
        >
          {user ? (
            isProcessing ? (
              <Loader className="animate-spin" />
            ) : (
              <span onClick={handleLogout}>Logout</span>
            )
          ) : (
            <Link href={"/auth/login"}>Login</Link>
          )}
        </button>
      </nav>

      {/* Small screens navigation */}
      <nav className={`md:hidden overflow-hidden`}>
        <Image
          width={35}
          height={30}
          src={"/assets/ghost_menu.svg"}
          alt="Menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="cursor-pointer relative"
        />
        <div
          className={`p-6 ${
            isMenuOpen ? "translate-y-60 opacity-0" : ""
          } bg-white translate-y-0 flex flex-col gap-2 rounded-md absolute right-7 shadow-md border transition-all duration-500`}
        >
          <Link href={"/"} className="gradient-text">
            Home
          </Link>
          <Link href={"/student/dashboard"}>Student</Link>
          <Link href={"/instructor/dashboard"}>Instructor</Link>
          <Link href={"/admin/dashboard"}>Admin</Link>
          <p>Contacts</p>
          <button className="px-4 text-white py-2 rounded-md bg-gradient-to-br from-blue-800 to-purple-600 outline-none mt-2">
            {user ? (
              <span onClick={handleLogout}>Logout</span>
            ) : (
              <Link href={"/auth/login"}>Login</Link>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Menu;
