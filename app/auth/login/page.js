'use client'

import { loginSuccess } from "@/redux/authSlice"
import { Loader } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { Formik, Form, Field, ErrorMessage } from "formik"; // For form state management
import * as Yup from "yup" // For validation schema definition
import Image from "next/image"

const LoginPage = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [isRedirecting, setIsRedirecting] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    // Yup validation schema
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                'Enter a valid email address'
            )
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    });

    // Handle form submission with Formik
    const handleSubmit = async (values, {setSubmitting}) => {
        setIsProcessing(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: values.email, password: values.password })
            });

            const result = await res.json()
            if (result.error) {
                toast.error(`${result.error}`)
                return;
            }

            // Save user to the redux store
            dispatch(loginSuccess({
                user: result.user,
                role: result.role
            }))

            // Navigate only after updating state
            toast.success(`${result.message}`)
            setIsRedirecting(true) // Show the redirecting animaation
            router.push(result.redirectUrl)
        } catch (error) {
            console.error('Error loging in:', error.stack)
            toast.error(`${error}`)
        } finally {
            setIsProcessing(false)
            setSubmitting(false)
        }
    }

  return (
    <div className="h-screen flex">
    <div className="m-auto max-w-[350px] w-[80%] -translate-y-4">
        <div className="flex flex-col items-center w-full mb-10">
            <Image width={800} height={800} src="/icons/attendMeLogoNoBg.png" alt="Logo" priority={true} className="w-20 flex"/>
            <p className="text-[18px] text-gray-900 font-semibold">Fill in your credentails to log in</p>
        </div>
        <Formik
            initialValues={{email: "", password: ""}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form className="flex flex-col gap-2  m-auto mb-3">
                    {/* Email Field */}
                    <Field
                        type="email"
                        name="email"
                        placeholder="Enter email..."
                        className={`rounded-md focus:border focus:border-gray-400 ${
                            errors.email && touched.email ? "border-red-500" : ""
                        }`}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>

                    {/* Password Field */}
                    <Field
                        type="password"
                        name="password"
                        placeholder="Enter password..."
                        className={`rounded-md focus:border focus:border-gray-400 ${
                            errors.email && touched.email ? "border-red-500" : ""
                        }`}
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>

                    {/* Navigation to forgot password */}
                    <Link href={'/auth/forgot_password'} className="text-blue-800 my-1 hover:underline">forgot password</Link>

                    {/* Submit(Login) Button */}
                    <button 
                        type="submit" 
                        disabled={isProcessing || isRedirecting || isSubmitting} 
                        className={`blue-purple-gradient text-white rounded-lg ${isProcessing ? 'cursor-not-allowed opacity-70' : ''}`}>
                        {isProcessing ? (
                            <span className="flex items-center justify-center gap-4 text-white animate-pulse">
                                <Loader className="animate-spin"/>
                                Authenticating...
                            </span> 
                        ) : isRedirecting ? (
                            <span className="flex items-center justify-center gap-4 text-white animate-pulse">
                                <Loader className="animate-spin"/> 
                                Redirecting
                            </span> 
                        ) : (
                          'Login' 
                        )}
                    </button>
                </Form>
            )}
        </Formik>
        
        <p>Have no account? <Link href={'/auth/signup'} className="text-blue-800 hover:underline">sign up</Link></p>
    </div>
    </div>
  )
}

export default LoginPage