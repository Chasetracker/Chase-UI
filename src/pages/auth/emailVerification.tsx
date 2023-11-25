import Button from '@/components/Button/Button'
import OTPInput from '@/components/Layout/OtpLayout';
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, ChangeEvent } from 'react';
interface OTPInputProps {
    length: number;
}


const EmailVerification: React.FC<OTPInputProps> = () => {



    const onSubmit = async (event: { preventDefault: () => void }) => {
        // event.preventDefault();
        // console.log("formdata", formData);
        // const result = await signIn("credentials", {
        //     redirect: false,
        //     email: formData.email,
        //     password: formData.password,
        //     callbackUrl: "/dashboard/customer",
        // });
        // console.log("result", result);
        // console.log("session", session);
        // if (result && result.ok) {
        //     alert("Login Successful");
        //     // router.push("/dashboard/customer");

        // } else {
        //     alert("Login Failed");
        // }
    };


    return (
        <div className='flex flex-col w-full justify-center min-h-screen items-center pb-16'>
            <nav className='flex py-5 px-20 w-full justify-between items-center h-[90px] bg-white fixed z-[99999] top-0 shadow-md'>
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
            <div className='flex w-[500px] flex-col min-h-[450px] space-y-3 justify-center items-center mt-32'>
                <h1 className='text-xl font-extrabold flex justify-center items-center'>Verify your Email Address</h1>
                <h2 className='text-base text-[#647187] font-extralight flex justify-center items-center'>Input the code we sent to your email address.</h2>

                <div>
                    <OTPInput initialLength={4} />
                </div>

            </div>



        </div >
    )
}

export default EmailVerification