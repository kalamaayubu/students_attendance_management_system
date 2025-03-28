'use client'

import { forgotPassword } from "@/actions/auth/forgotPassword"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"
import { Formik, Form, Field, ErrorMessage } from "formik"; // For form state management
import * as Yup from "yup" // For validation schema definition
import Image from "next/image"


const ForgotPasswordPage = () => {
    const [isProcessing, setIsProcessing] = useState(false)

    // Yup validation schema
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                'Enter a valid email address'
            )
            .required('Email is required'),
    })

    // Send a forgot password request
    const handleSubmit = async (values, {setIsSubmitting, resetForm}) => {
        setIsProcessing(true)

        try {
            const res = await forgotPassword(values.email)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success(res.message)
                resetForm()
            }
        } catch (error) {
            console.log('Error:', error)
            toast.error(error)
        } finally {
            setIsProcessing(false)
            setIsSubmitting(false)
        }
    }

  return (
    <div className="h-screen flex">
    <div className="m-auto max-w-[350px] w-[80%] -translate-y-4">
        <div className="flex flex-col items-center w-full mb-10">
            <Image width={800} height={800} src="/icons/attendMeLogoNoBg.png" alt="Logo" className="w-20 flex"/>
            <p className="text-[18px] text-gray-900 font-semibold">Forgot password? Enter your email.</p>
        </div>
        <Formik
            initialValues={{email: ""}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({errors, touched}) => (
                <Form className="flex flex-col gap-2  m-auto mb-3">
                {/* Email field */}
                <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    className={`rounded-md focus:border focus:border-gray-400 ${
                        errors.email && touched.email ? "border-red-500" : ""
                    }`}
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>

                <button 
                    type="submit" 
                    disabled={isProcessing} 
                    className={`bg-blue-700 rounded-lg ${isProcessing ? 'cursor-not-allowed bg-slate-500' : 'hover:bg-blue-600'}`}
                >
                    {isProcessing? <span className="animate-pulse">Submitting...</span> : 'Submit'}
                </button>
            </Form>
            )}
        </Formik>
        <p>Go back to <Link href={'/auth/login'} className="text-blue-800 hover:underline">login</Link></p>
    </div>
    </div>
  )
}

export default ForgotPasswordPage