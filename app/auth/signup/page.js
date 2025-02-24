'use client'

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, secondName, email, phone, password }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error);

            toast.success(result.message)
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error(`${error.message}`)
        } finally {
            setIsProcessing(false);
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="h-screen flex">
            <div className="m-auto max-w-[400px] w-[80%] -translate-y-4">
                <h3 className="text-center">Signup</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 m-auto mb-3">
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="First name..."
                        className="rounded-md focus:border focus:border-gray-400"
                    />
                    <input
                        type="text"
                        value={secondName}
                        onChange={(e) => setSecondName(e.target.value)}
                        required
                        placeholder="Second name..."
                        className="rounded-md focus:border focus:border-gray-400"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter email..."
                        className="rounded-md focus:border focus:border-gray-400"
                    />
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="Enter phone number..."
                        className="rounded-md focus:border focus:border-gray-400"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter password..."
                        className="rounded-md focus:border focus:border-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`bg-blue-700 ${isProcessing ? "cursor-not-allowed bg-slate-500" : "hover:bg-blue-600"}`}
                    >
                        {isProcessing ? <span className="animate-pulse">Processing...</span> : "Signup"}
                    </button>
                </form>
                <p>
                    Already have an account? <Link href={"/auth/login"} className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
