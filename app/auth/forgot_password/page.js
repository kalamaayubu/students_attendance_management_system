'use client'

import { forgotPassword } from "@/actions/auth/forgotPassword"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    // Send a forgot password request
    const handleClick = async () => {
        setIsProcessing(true)

        try {
            const res = await forgotPassword(email)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success(res.message)
            }
        } catch (error) {
            console.log('Error:', error)
            toast.error(error)
        } finally {
            setIsProcessing(false)
            setEmail('')
        }
    }

  return (
    <div className="h-screen flex">
    <div className="m-auto max-w-[400px] w-[80%] -translate-y-4">
        <h3 className="text-center">Forgot password?</h3>
        <form className="flex flex-col gap-2  m-auto mb-3">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email..."
                className="rounded-md focus:border focus:border-gray-400"
            />
            <button onClick={handleClick} disabled={isProcessing} className={`bg-blue-700 ${isProcessing ? 'cursor-not-allowed bg-slate-500' : 'hover:bg-blue-600'}`}>
                {isProcessing? <span className="animate-pulse">Submitting...</span> : 'Submit'}
            </button>
        </form>
        <p>Go back to <Link href={'/auth/login'} className="text-blue-800 hover:underline">login</Link></p>
    </div>
    </div>
  )
}

export default ForgotPasswordPage