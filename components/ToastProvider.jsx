"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
  return (
    <ToastContainer
      limit={1} // Ensures only one toast appears at a time
      pauseOnHover // Pauses toast dismissal on hover
      autoClose={5000} // Optional: Closes toast after 5 seconds
      position="top-right" // Optional: Adjust position
      hideProgressBar={true} // Optional: Show progress bar
      newestOnTop={true}
    />
  );
};

export default ToastProvider;
