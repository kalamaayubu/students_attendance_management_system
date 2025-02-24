'use client'

import { resetPassword } from "@/actions/auth/resetPassword"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const router = useRouter()

    const handleResetPassword = async (e) => {
        e.preventDefault()
        setIsProcessing(true)

        if (password !== confirmPassword) {
            toast.error('Passwords are not matching.')
            setIsProcessing(false)
            return
        }

        // Send a reset password request
        try {
            // Extract the hash param from the url
            const hasParams = new URLSearchParams(window.location.hash.substring(1))
            const accessToken = hasParams.get('access_token');

            if (!accessToken) {
                toast.error('Invalid or missing access token.')
                setIsProcessing(false)
                return
            }

            const res = await resetPassword(password, accessToken)

            if (res.error) {
                toast.error(res.error)
            } else {
                console.log(res.message)
                toast.success(res.message)
                router.push('/auth/login')
            }
        } catch (error) {
            console.log('Error resetting password:', error)
            toast.error('Error resetting password.')
        } finally{
            setConfirmPassword('')
            setPassword('')
            setIsProcessing(false)
        }
    }

  return (
    <div className="h-screen flex">
    <div className="m-auto max-w-[400px] w-[80%] -translate-y-4">
        <h3 className="text-center">Reset Password</h3>
        <form onSubmit={handleResetPassword} className="flex flex-col gap-2  m-auto mb-3">
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter new passsword..."
                className="rounded-md focus:border focus:border-gray-400"
            />
            <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password..."
                className="rounded-md focus:border focus:border-gray-400"
            />
            <button type="submit" disabled={isProcessing} className={`bg-blue-700 ${isProcessing ? 'cursor-not-allowed bg-slate-500' : 'hover:bg-blue-600'}`}>
                {isProcessing? <span className="animate-pulse">Resetting...</span> : 'Reset password'}
            </button>
        </form>
    </div>
    </div>
  )
}

export default ResetPasswordPage