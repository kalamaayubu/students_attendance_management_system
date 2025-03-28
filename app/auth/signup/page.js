'use client'

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import {Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const SignupPage = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    // SchemaValidation definition
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(3, 'Atleast 3 characters').required('First name is required'),
        secondName: Yup.string().min(3, 'Atleast 3 characters').required('Second name is required'),
        email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Enter a valid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    })

    // Handle form submission
    const handleSubmit = async (values, {isSubmitting}) => {
        setIsProcessing(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    firstName:values.firstName, 
                    secondName:values.secondName, 
                    email:values.email, 
                    password:values.password 
                }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error);

            toast.success(result.message)
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error(`${error.message}`)
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="h-screen flex">
            <div className="m-auto max-w-[350px] w-[80%] -translate-y-4">
                <div className="flex flex-col items-center w-full mb-10">
                    <Image width={800} height={800} src="/icons/attendMeLogoNoBg.png" alt="Logo" className="w-20 flex"/>
                    <p className="text-[18px] text-gray-700 font-semibold">Fill the form below to sign up.</p>
                </div> 
                <Formik
                    initialValues={{firstName:"", secondName:"", email:"", password:""}}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >  
                    {({errors, touched, isSubmitting }) => (
                        <Form className="flex flex-col gap-2 m-auto mb-3">
                            {/* First name field */}
                            <Field
                                type="text"
                                name="firstName"
                                placeholder="First name..."
                                className={`rounded-md focus:border focus:border-gray-400 ${
                                    errors.firstName && touched.firstName  ? "border-red-500" : ""
                                }`}
                            />
                            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm"/>

                            {/* Second name field */}
                            <Field
                                type="text"
                                name="secondName"
                                placeholder="Second name..."
                                className={`rounded-md focus:border focus:border-gray-400 ${
                                    errors.secondName && touched.secondName  ? "border-red-500" : ""
                                }`}                          
                            />
                            <ErrorMessage name="secondName" component="div" className="text-red-500 text-sm"/>

                            {/* Email field */}
                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter email..."
                                className={`rounded-md focus:border focus:border-gray-400 ${
                                    errors.email && touched.email  ? "border-red-500" : ""
                                }`}  
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>

                            {/* Password field */}
                            <Field
                                type="password"
                                name="password"
                                placeholder="Enter password..."
                                className={`rounded-md focus:border focus:border-gray-400 ${
                                    errors.password && touched.password  ? "border-red-500" : ""
                                }`}      
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>

                            <button
                                type="submit"
                                disabled={isProcessing || isSubmitting}
                                className={`blue-purple-gradient text-white rounded-lg ${isProcessing ? 'cursor-not-allowed opacity-70' : 'hover:bg-blue-500'}`}
                            >
                                {isProcessing ? 
                                    <span className="animate-pulse">
                                        <Loader2 className="animate-spin"/>
                                        Processing...
                                    </span> 
                                    : 
                                    "Signup"
                                }
                            </button>
                        </Form>
                    )}          
                </Formik>   
                <p>
                    Already have an account? <Link href={"/auth/login"} className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
