import React, { useState, ChangeEvent } from 'react';

interface OTPInputProps {
    initialLength: number;
}

const OTPInput: React.FC<OTPInputProps> = ({ initialLength }) => {
    const [otp, setOtp] = useState(new Array(initialLength).fill(''));

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

    return (
        <form className='flex flex-col justify-center items-center space-y-5'>
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

            <button
                type="submit"
                className={`w-full bg-primary text-white py-2 px-4 rounded-md text-sm ${isAllFieldsFilled() ? '' : 'cursor-not-allowed opacity-50'}`}
                disabled={!isAllFieldsFilled()}
            >
                Continue
            </button>
        </form>
    );
};

export default OTPInput;
