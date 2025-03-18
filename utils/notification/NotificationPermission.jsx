"use client";
import { useEffect } from "react";
import { subscribeUser } from "./subscribeUser";
import { usePathname } from "next/navigation";

const NotificationPermission = () => {
  // Ask notification permission only if user is a student
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("student")) {
      const subscribeToNotifications = async () => {
        await subscribeUser();
      };

      subscribeToNotifications();
    }
  }, [pathname]);

  return null; // No UI, just runs logic
};

export default NotificationPermission;
