import Button from '@/components/Button/Button'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import axios from 'axios'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { inter } from '@/styles/font';
//icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";


interface FormProps {
    email: string;
    password: string;
    error: string;
}


const Login: React.FC<FormProps> = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        error: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState("Sign In");
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const clearErrorMessage = () => {
        setTimeout(() => {
            setErrorMessage(null); // Clear the error message after 5 seconds
        }, 5000);
    };


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const isAllFieldsFilled = () => {
        const requiredFields: (keyof FormProps)[] = ["email", "password"];
        return requiredFields.every((field) => formData[field] !== "");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        try {
            const user = {
                email: formData.email,
                password: formData.password

            }

            setLogin("Signing In...");
            const response = await axios.post(
                "https://chase-lvga.onrender.com/api/user/login",
                user
            );

            // Assuming the registration is successful, you can handle success logic here
            if (response.status === 200) {
                setErrorMessage(null);
                const token = response.data.token;
                if (typeof window !== "undefined") {
                    // Access localStorage here
                    localStorage.setItem("token", token);
                    localStorage.setItem("loggedInUser", JSON.stringify(response.data.user));
                }
                const successMessage = "Login successful";
                toast.success(successMessage, {
                    position: toast.POSITION.BOTTOM_LEFT,
                });
                setSuccess(true);
                router.push('/dashboard');

            } else {
                const errorMessage = "Invalid email or password";
                setErrorMessage(errorMessage);
                toast.error(errorMessage, {
                    position: toast.POSITION.BOTTOM_LEFT,
                });
                clearErrorMessage()
            }
        } catch (error) {
            // Handle error if necessary
            const errorMessage = "An error occurred, check your network connection and try again.";
            setErrorMessage(errorMessage);
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_LEFT,
            });
            clearErrorMessage()
        } finally {
            // Reset the UI state
            setLogin("Sign In");
            setFormData({
                email: "",
                password: "",
                error: "",
            });
        }
    };
    return (
        <div className={`flex flex-col w-full justify-center min-h-screen items-center pb-16 ${inter.className}`}>
            <ToastContainer />
            <nav className='flex py-5 px-20 w-full justify-between items-center h-[90px] bg-white fixed z-[99998] top-0 shadow-md'>
                <Link href='/' className='flex h-[50px] justify-center items-center space-x-2 '>
                    <div className='relative w-[45px] h-[45px]'>
                        <Image src='/svgs/logo.svg' alt='' fill />
                    </div>
                    <h1 className='text-[20px] font-extrabold text-[#314155]'>Chase</h1>
                </Link>
                <div className='flex space-x-5'>
                    <Link href='/auth'>
                        <Button btnValue='Log In' className='text-[##667085] border-[1px] rounded-[6px] h-[45px] w-[100px] hover:bg-[#da7359] hover:text-[white]' />
                    </Link>
                    <Link href='/auth/signUp'>
                        <Button btnValue='Sign Up' className='text-[white] bg-primary h-[45px] w-[100px] rounded-[6px]  hover:border-[1px] hover:bg-[#da7359]' />
                    </Link>
                </div>
            </nav>
            <div className='flex w-[450px] flex-col h-[500px] justify-center items-center space-y-3 mt-16'>

                <h1 className='text-xl font-extrabold flex justify-center items-center'>Log in to your account</h1>
                <h2 className='text-base font-extralight text-[#647187] flex justify-center items-center'>Welcome back! Please enter your details.</h2>

                <form action="" onSubmit={onSubmit} className={`space-y-3 w-full px-10`}>
                    {errorMessage && (
                        <p className="text-base font-medium text-[red]">
                            {errorMessage}
                        </p>
                    )}
                    <div className={`flex flex-col `}>
                        <label
                            htmlFor="email"
                            className={`font-bold text-[16px] text-[#314155] my-1`}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            id="email"
                            name="email"
                            className={`border-medium border-[1px] text-base text-black font-bold py-3 px-5 rounded-md w-full`}
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={`flex flex-col`}>
                        <label htmlFor="password" className={`font-bold text-[16px] text-[#314155] my-1`}>
                            Password
                        </label>
                        <div className={`relative`}>
                            <input type={showPassword ? 'text' : 'password'} id='password' name='password' placeholder='********' className={`border-medium border-[1px] text-base text-black font-bold py-3 px-5 rounded-md w-full`} value={formData.password} onChange={handleChange} required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-[0rem] pr-3 flex items-center focus:outline-none"
                            >
                                {showPassword ? (
                                    <AiOutlineEye className="h-5 w-5 text-black" />
                                ) : (
                                    <AiOutlineEyeInvisible className="h-5 w-5 text-black" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className={`flex  font-[600]  justify-end text-base mx-auto`}>
                        <Link href='#' className={`text-primary text-base hover:text-[14.5px] `}>Forgot Password?</Link>
                    </div>

                    <div className={`flex flex-col justify-center items-center`}>
                        <button
                            type="submit"
                            className={`w-full bg-primary text-white py-2 px-4 rounded-md text-sm ${isAllFieldsFilled() ? '' : 'cursor-not-allowed opacity-50'}`}
                            disabled={!isAllFieldsFilled()}
                        >
                            {login}
                        </button>

                    </div>
                </form>
            </div>
            <Link href='https://accounts.google.com.ng/' className={`w-[450px] -mt-14 px-10 `} target='_blank'>
                <button
                    type="submit"
                    className={`w-full border-[1px] flex border-[#D0D5DD] items-center justify-center  text-[#314155] py-2 px-4 rounded-md hover:bg-purple5 text-base hover:bg-[#da7359] hover:text-white`}
                >
                    <FcGoogle className="mr-2 text-lg" />
                    Sign in with Google
                </button>
            </Link>

            <div className={`flex justify-center text-base text-[#647187] font-[600] w-[450px] mt-8 space-x-1 px-10  `}>
                <h5>Don&apos;t have an account?</h5>
                <Link href="/auth/signUp" className={`text-primary hover:text-[15px] `}>
                    Sign Up
                </Link>
            </div>

        </div>
    )
}

export default Login