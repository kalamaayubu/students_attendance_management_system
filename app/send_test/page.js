"use client";

import { sendNotification } from "@/actions/notification/sendNotification";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SendPage() {
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    setLoading(true);
    const res = await sendNotification("Hello!", "This is a test notification.");
    if (!res.success) {
        toast.error(res.error)
        return
    }

    toast.success(res.message)
    setLoading(false);
  }

  return (
    <div>
      <h1>Send Push Notifications</h1>
      <button onClick={handleSend} disabled={loading}>
        {loading ? "Sending..." : "Send Notification"}
      </button>
    </div>
  );
}
