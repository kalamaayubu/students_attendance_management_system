'use client'

import { resetPassword } from "@/actions/auth/resetPassword"
import { Loader } from "lucide-react"
import Image from "next/image"
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

        if (password !== confirmPassword) {
            toast.error('Passwords are not matching.')
            setIsProcessing(false)
            return
        }

        setIsProcessing(true)

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
        <div className="flex flex-col items-center w-full mb-8">
            <Image width={800} height={800} src="/icons/attendMeLogoNoBg.png" alt="Logo" priority={true} className="w-20 flex"/>
            <p className="text-center font-semibold text-[17px]">Enter and confrim your new password</p>
        </div>
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
            <button type="submit" disabled={isProcessing} className={`blue-purple-gradient rounded-lg text-white ${isProcessing ? 'cursor-not-allowed' : ''}`}>
                {isProcessing? <span className="animate-pulse flex items-center justify-center gap-4"><Loader className="animate-spin"/>Resetting...</span> : 'Reset password'}
            </button>
        </form>
    </div>
    </div>
  )
}

export default ResetPasswordPage