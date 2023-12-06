import React, { useEffect, useState } from 'react'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import axios from 'axios'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image'

//icons
import { ImCancelCircle } from "react-icons/im";
import TransactionList from '@/components/Layout/TransactionList';

interface FormProps {
    accountName: string;
    accountNumber: string;
    bankName: string;
}

interface userProps {
    business_name?: string;
    _id?: string;

}


const Home: React.FC<FormProps> = () => {
    const [formData, setFormData] = useState({
        accountName: "",
        accountNumber: "",
        bankName: "",
    });
    const [userInfo, setUserInfo] = useState<{ business_name?: string }>({});


    const [save, setSave] = useState("Save");
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [isOpened, setIsOpened] = useState(false);
    const closeModal = () => setIsOpened(!isOpened);
    // const username = localStorage.getItem("userBusinessName");


    useEffect(() => {
        // Check if there is a valid token in local storage
        if (typeof window !== 'undefined' && window.localStorage) {
            const authToken = localStorage.getItem("token");

            if (!authToken) {
                // Redirect the user to the login page if there is no valid token
                router.push('/auth');
            }
        }
        if (typeof window !== 'undefined' && window.localStorage) {
            const getUserInfo = async () => {
                const userString = localStorage.getItem('loggedInUser');

                if (!userString) {
                    console.error('User data not found in localStorage');
                    return;
                }


                const user = JSON.parse(userString) as userProps;
                // Ensure that the user object has the _id property
                const userID = user._id;
                if (!user || !user._id) {
                    console.error('Invalid userId');
                    return;
                }
                try {
                    const username = user.business_name

                    setUserInfo({
                        business_name: username || undefined,
                    });

                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            };

            getUserInfo();
        }
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (name === 'accountNumber') {
            const accountNumberPattern = /^\d+$/;
            if (value && !accountNumberPattern.test(value)) {
                setFormData((prevData) => ({
                    ...prevData,
                    error: 'Account number must be 10 digits',
                }));
            } else {
                // Clear the error message if the password matches the pattern or is empty
                setFormData((prevData) => ({
                    ...prevData,
                    error: '',
                }));
            }
        }
    }
    const clearErrorMessage = () => {
        setTimeout(() => {
            setErrorMessage(null); // Clear the error message after 5 seconds
        }, 5000);
    };

    const isAllFieldsFilled = () => {
        const requiredFields: (keyof FormProps)[] = ["accountName", "accountNumber", "bankName"];
        return requiredFields.every((field) => formData[field] !== "");
    };

    const onSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            const user = {
                account_name: formData.accountName,
                bankName: formData.bankName,
                accountNumber: formData.accountNumber

            }

            // // console.log('Signup payload:', user);
            setSave("Saving...");
            const response = await axios.post(
                "",
                user
            );

            // Assuming the registration is successful, you can handle success logic here
            if (response.status === 201) {
                setErrorMessage(null);
                const successMessage = "Saving successful";
                toast.success(successMessage, {
                    position: toast.POSITION.BOTTOM_LEFT,
                });
                setSuccess(true);
                router.push('/auth/emailVerification');
            } else {
                const errorMessage = "An error occurred, check your credentials and try again.";
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
            setSave("Save");
            setFormData({
                accountName: "",
                accountNumber: "",
                bankName: "",
            });
        }

    }

    return (
        <>
            <DashboardLayout>
                <ToastContainer />
                <main className={`relative  h-full px-10 pt-10`}>

                    <div className={`absolute flex flex-col justify-center items-center w-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[400px] border-[0.5px]  border-[#667085] rounded-md bg-[#FFF] shadow-md p-3 ${isOpened ? 'z-[99999] ' : 'hidden'}`}>
                        <div className='flex justify-between items-start w-full mb-3'>
                            <div>
                                <h1 className='text-[20px] font-extrabold text-black'>Add your Account Details</h1>
                                <h2 className='text-base text-[#667085]'>Complete your account creation</h2>
                            </div>
                            <div className='text-[20px] flex justify-center items-center mt-3 hover:text-[21px] cursor-pointer text-[#667085]'
                                onClick={closeModal}>
                                <ImCancelCircle />
                            </div>
                        </div>
                        <form onSubmit={onSubmit} className='w-full space-y-3'>
                            {errorMessage && (
                                <p className="text-base font-medium text-[red]">
                                    {errorMessage}
                                </p>
                            )}
                            <div className={`flex flex-col `}>
                                <label
                                    htmlFor="accountNumber"
                                    className={`font-bold text-[12px] text-[#314155] my-1`}
                                >
                                    Account Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="Input Account number"
                                    id="accountNumber"
                                    name="accountNumber"
                                    className={`border-[#D0D5DD]     border-[1px] text-base text-[#445568] font-normal p-3 rounded-md w-full`}
                                    value={formData.accountNumber}
                                    onChange={handleChange}
                                    required
                                    maxLength={10}
                                    minLength={10}
                                />
                            </div>
                            <div className={`flex flex-col `}>
                                <label
                                    htmlFor="bankName"
                                    className={`font-bold text-[12px] text-[#314155] my-1`}
                                >
                                    Bank
                                </label>
                                <input
                                    type="text"
                                    placeholder="Bank Name"
                                    id="bankName"
                                    name="bankName"
                                    className={`border-[#D0D5DD] border-[1px] text-base text-[#445568] font-normal p-3 rounded-md w-full`}
                                    value={formData.bankName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={`flex flex-col `}>
                                <label
                                    htmlFor="accountName"
                                    className={`font-bold text-[12px] text-[#314155] my-1`}
                                >
                                    Account Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name Surname"
                                    id="accountName"
                                    name="accountName"
                                    className={`border-[#D0D5DD] border-[1px] text-base bg-[#D0D5DD] text-[#445568] font-normal p-3 rounded-md w-full`}
                                    value={formData.accountName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={`flex justify-between items-center w-full space-x-3`}>
                                <button
                                    type="submit"
                                    className={`w-3/4 bg-white text-[#314155] py-2 px-4 border-[1px] border-[#CCD5DF] rounded-md text-sm hover:bg-[red] hover:text-white`}
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`w-3/4 bg-[#FF3500] text-white py-2 px-4 rounded-md text-sm hover:bg-[#c46a53]  ${isAllFieldsFilled() ? '' : 'cursor-not-allowed opacity-50'}`}
                                    disabled={!isAllFieldsFilled()}
                                >
                                    {save}
                                </button>

                            </div>
                        </form>
                    </div>
                    <div className={`${isOpened ? 'opacity-[0.3]' : ''} flex flex-col`}>
                        <h1 className='text-lg font-extrabold'>Welcome back, {userInfo.business_name} </h1>
                        <h2 className='text-[16px] font-light'>Track, manage and forecast your customers and orders.</h2>
                    </div>
                    <div className='relative w-full h-1/4'>
                        <Image src='/images/Metric.png' alt='hero' fill />
                    </div>

                    <section className={`flex flex-col w-full space-y- ${isOpened ? ' opacity-[0.3]' : ''}`}>
                        <div className='w-full h-[60px] flex justify-between items-center'>
                            <h1 className='text-lg font-extrabold text-black'>Transactions</h1>
                            <div className='w-[225px] flex justify-between items-center'>
                                <button
                                    type="button"
                                    className={`w-[75px] bg-white text-[#314155] border-[1px] border-[#CCD5DF] p-2 text-[11px] rounded-l-md hover:bg-[#F8FAFB]`}
                                >
                                    Today
                                </button>
                                <button
                                    type="button"
                                    className={`w-[75px] bg-white text-[#314155]  border-t-[1px] border-b-[1px] border-[#CCD5DF] p-2 text-[11px] hover:bg-[#F8FAFB]`}
                                >
                                    This Week
                                </button>
                                <button
                                    type="button"
                                    className={`w-[80px] bg-white text-[#314155] p-2 text-[11px]  border-[1px] border-[#CCD5DF] rounded-r-md hover:bg-[#F8FAFB]  `}
                                >
                                    This Month
                                </button>
                            </div>
                        </div>
                        <div className='w-full'>
                            <TransactionList totalSalesAmount={0} customerName={''} status={''} transactionsPerPage={4} />
                        </div>

                    </section>


                </main>
            </DashboardLayout>
        </>
    )
}

export default Home