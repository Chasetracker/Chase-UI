import DashboardLayout from '@/components/Layout/DashboardLayout'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

//icons
import { GoPlus } from "react-icons/go";
import { ImCancelCircle } from 'react-icons/im';
import TransactionList from '@/components/Layout/TransactionList';
import Link from 'next/link';
import { config } from 'process';

interface FormProps {
    amount: number;
    date: string;
    email: string;
    reminder: string;
    customerName: string;
    status: string;
}
interface SelectProps {
    name: string;
    id: number;

    // Add other properties as needed
}


const Sales: React.FC<SelectProps & FormProps> = () => {
    const [formData, setFormData] = useState({
        amount: "",
        date: "",
        email: "",
        reminder: "",
        customerName: "",
        status: "pending",
    });
    const [send, setSend] = useState("Send Invoice");
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isOpened, setIsOpened] = useState(false);
    const closeModal = () => {
        setIsOpened(false);
        setFormData({
            amount: "",
            date: "",
            email: "",
            reminder: "",
            customerName: "",
            status: "pending",
        });
    }
    const openModal = () => setIsOpened(!isOpened);
    const [customers, setCustomers] = useState<SelectProps[]>([]);


    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const authToken = localStorage.getItem("token");
                if (!authToken) {
                    console.error("Authentication token not found");
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                };

                const response = await axios.get('https://chase-lvga.onrender.com/api/customers', config)
                setCustomers(response.data.customers); // Assuming your data is an array
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCustomers();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'amount') {
            const amount = /^\d+$/;
            if (value && !amount.test(value)) {
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
        const requiredFields: (keyof FormProps)[] = ["amount", "date", "email", "reminder", "customerName"];
        return requiredFields.every((field) => formData[field] !== "");
    };

    const onSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {

            // Retrieve the token from local storage
            if (typeof window !== 'undefined' && window.localStorage) {
                const authToken = localStorage.getItem("token");

                if (!authToken) {
                    console.error("Authentication token not found");
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                };

                const invoice = {
                    customerName: formData.customerName,
                    customerEmail: formData.email,
                    totalSalesAmount: Number(formData.amount),
                    dueDate: formData.date,
                    status: formData.status,
                    reminder: formData.reminder,

                }

                // // console.log('Signup payload:', user);
                setSend("Sending...");

                const response = await axios.post(
                    "https://chase-lvga.onrender.com/api/invoices",
                    invoice,
                    config
                );

                // Assuming the registration is successful, you can handle success logic here
                if (response.status === 201) {
                    setErrorMessage(null);
                    const successMessage = "Saving successful";
                    toast.success(successMessage, {
                        position: toast.POSITION.BOTTOM_LEFT,
                    });
                    setSuccess(true);
                    router.reload();
                } else {
                    const errorMessage = "An error occurred, check your credentials and try again.";
                    setErrorMessage(errorMessage);
                    toast.error(errorMessage, {
                        position: toast.POSITION.BOTTOM_LEFT,
                    });
                    clearErrorMessage()
                }
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
            setSend("Send Invoice");
            setFormData({
                amount: "",
                date: "",
                email: "",
                reminder: "",
                customerName: "",
                status: "pending",
            });
            closeModal();
        }

    }
    return (
        <>
            <DashboardLayout>
                <main className={`relative w-full h-full px-10 pt-10  `}>
                    <div className={`absolute flex flex-col justify-center items-center w-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[460px] border-[0.5px]  border-[#667085] rounded-md bg-[#FFF] shadow-md p-3 ${isOpened ? 'z-[99999]' : 'hidden'}`}>
                        <div className='flex justify-between items-start w-full mb-3'>
                            <div>
                                <h1 className='text-[20px] font-extrabold text-black'>Record New Sale</h1>
                                <h2 className='text-base text-[#667085]'>Add details of your recent sale</h2>
                            </div>
                            <div className='text-[20px] flex justify-center items-center mt-3 hover:text-[21px] cursor-pointer text-[#667085]'
                                onClick={closeModal}>
                                <ImCancelCircle />
                            </div>
                        </div>
                        <form onSubmit={onSubmit} className='w-full space-y-2'>
                            {errorMessage && (
                                <p className="text-base font-medium text-[red]">
                                    {errorMessage}
                                </p>
                            )}
                            <div className={`flex justify-between`}>
                                <div className={`flex flex-col basis-[48%] `}>
                                    <label
                                        htmlFor="amount"
                                        className={`font-bold text-[12px] text-[#314155] my-1`}
                                    >
                                        Total Sale Amount
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="# 0.00"
                                        id="amount"
                                        name="amount"
                                        className={`border-[#D0D5DD]     border-[1px] text-base text-[#445568] font-normal p-3 rounded-md w-full`}
                                        value={formData.amount}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={`flex flex-col basis-[48%]`}>
                                    <label
                                        htmlFor="date"
                                        className={`font-bold text-[12px] text-[#314155] my-1`}
                                    >
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        placeholder=""
                                        id="date"
                                        name="date"
                                        className={`border-[#D0D5DD]     border-[1px] text-base text-[#445568] font-normal p-3 rounded-md w-full`}
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={`flex flex-col `}>
                                <label
                                    htmlFor="customerName"
                                    className={`font-bold text-[12px] flex justify-between items-center text-[#314155] my-1`}
                                >
                                    <h1>Select Customer</h1>
                                    <Link href='/dashboard/customers' className='flex justify-between items-center mr-2 text-[#C4320A] hover:text-[13px]'>
                                        <GoPlus className='text-lg' />
                                        <h1>Add New Customer</h1>
                                    </Link>
                                </label>
                                <select
                                    id="customerName"
                                    name="customerName"
                                    onChange={(e) => handleChange(e)}
                                    className="border-[#D0D5DD] border-[1px] text-base text-[#445568] font-normal p-3 rounded-md w-full"
                                    value={formData.customerName}
                                >
                                    <option value="" disabled selected>
                                        Select customer
                                    </option>
                                    {customers.map((customer) => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={`flex flex-col `}>
                                <label
                                    htmlFor="email"
                                    className={`font-bold text-[12px] text-[#314155] my-1`}
                                >
                                    Customer Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter customer email"
                                    id="email"
                                    name="email"
                                    className={`border-[#D0D5DD] border-[1px] text-base text-[#445568] font-normal p-3 rounded-md w-full`}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={`flex flex-col `}>
                                <label
                                    htmlFor="reminder"
                                    className={`font-bold text-[12px] text-[#314155] my-1`}
                                >
                                    Set Reminder
                                </label>
                                <input
                                    type="text"
                                    placeholder="Every 1 hour"
                                    id="reminder"
                                    name="reminder"
                                    className={`border-[#D0D5DD] border-[1px] text-base text-[#445568] font-normal p-3 rounded-md w-full`}
                                    value={formData.reminder}
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
                                    {send}
                                </button>

                            </div>
                        </form>
                    </div>
                    <section className={`flex flex-col w-full h-full space-y-3 ${isOpened ? ' opacity-[0.3]' : ''}`}>
                        <div className='w-full  flex  justify-between  items-center top-0'>
                            <h1 className='text-lg font-extrabold text-black w-1/6'>Sales</h1>
                            <div className='w-5/6 flex justify-between items-center'>
                                <div className='flex w-[225px]'>
                                    <button
                                        type="button"
                                        className={`w-[75px] bg-white h-[45px] text-[#314155] border-[1px] border-[#CCD5DF] p-2 text-[12px] rounded-l-md hover:bg-[#F8FAFB]`}
                                    >
                                        Today
                                    </button>
                                    <button
                                        type="button"
                                        className={`w-[75px] bg-white h-[45px] text-[#314155]  border-t-[1px] border-b-[1px] border-[#CCD5DF] p-2 text-[12px] hover:bg-[#F8FAFB]`}
                                    >
                                        This Week
                                    </button>
                                    <button
                                        type="button"
                                        className={`w-[80px] bg-white h-[45px] text-[#314155] p-2 text-[12px]  border-[1px] border-[#CCD5DF] rounded-r-md hover:bg-[#F8FAFB]  `}
                                    >
                                        This Month
                                    </button>
                                </div>

                                <div>
                                    <button
                                        type="button"
                                        className={`w-[180px] h-[45px] bg-[#EC4A0A] text-white p-2 text-[13px] flex justify-center items-center space-x-2 border-[1px] border-[#CCD5DF] rounded-lg hover:bg-[#cd8568]  `}
                                        onClick={openModal}
                                    >
                                        <GoPlus className='text-lg' />
                                        <h1>Record New Sale</h1>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <TransactionList totalSalesAmount={0} customerName={''} status={''} transactionsPerPage={5} />
                        </div>
                    </section>
                </main >
            </DashboardLayout >
        </>
    )
}

export default Sales
