import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router'

interface OTPInputProps {
    initialLength: number;
}

const OTPInput: React.FC<OTPInputProps> = ({ initialLength }) => {
    const [otp, setOtp] = useState(new Array(initialLength).fill(''));
    const router = useRouter()
    const [verify, setVerify] = useState("Continue");
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleInputChange = (index: number, value: string) => {
        const sanitizedValue = /^\d*$/.test(value) ? value : '';
        const newOtp = [...otp];
        newOtp[index] = sanitizedValue;

        if (sanitizedValue && index < initialLength - 1) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        }

        setOtp(newOtp);
    };

    const isAllFieldsFilled = (): boolean => {
        return otp.every((digit) => digit !== '');
    };

    const clearErrorMessage = () => {
        setTimeout(() => {
            setErrorMessage(null); // Clear the error message after 5 seconds
        }, 5000);
    };

    const onSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            setVerify("Verifying...");

            const otpVerify = await axios.get('https://chase-lvga.onrender.com/api/user/verify/email/6562737a1d5b182d1b44f66e/7539')
            console.log(otpVerify)
            if (otpVerify.status === 200) {
                setErrorMessage(null);
                const successMessage = "OTP Verified Successfully";
                toast.success(successMessage, {
                    position: toast.POSITION.BOTTOM_LEFT,
                });
                setSuccess(true);
                router.push('/dashboard')
            } else {
                const errorMessage = "An error occurred, OTP Verification Failed";
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
            setVerify("Continue");

        }



    };

    return (
        <form onSubmit={onSubmit} className='flex flex-col justify-center items-center space-y-5'>
            <ToastContainer />
            <div className='space-x-2 flex'>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(index, e.target.value)
                        }
                        className='w-[50px] h-[50px] border-[1px]  border-[#314155] rounded-[6px]  text-[#314155] text-[20px] font-extrabold text-center'
                    />
                ))}
            </div>
            {errorMessage && (
                <p className="text-base font-medium text-[red]">
                    {errorMessage}
                </p>
            )}

            <button
                type="submit"
                className={`w-full bg-primary text-white py-2 px-4 rounded-md text-sm ${isAllFieldsFilled() ? '' : 'cursor-not-allowed opacity-50'}`}
                disabled={!isAllFieldsFilled()}
            >
                {verify}
            </button>
        </form>
    );
};

export default OTPInput;
