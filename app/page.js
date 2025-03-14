'use client'
import { subscribeUser } from "@/utils/notification/subscribeUser";
import { useEffect } from "react";

export default function NotificationSetup() {
    useEffect(() => {
      const doSubscription = async () => {
        await subscribeUser()
      }
      doSubscription()
    }, []);

    return (<p>NotificationSetup</p>);
}
