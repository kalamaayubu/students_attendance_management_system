"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { requestNotificationPermission } from "@/lib/firebase/requestNotificationPermission";

const NotificationPermission = () => {
  // Ask notification permission only if user is a student
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("student")) {
      const subscribeUser = async () => {
        await requestNotificationPermission();
      };

      subscribeUser();
    }
  }, [pathname]);

  return null; // No UI, just runs logic
};

export default NotificationPermission;
