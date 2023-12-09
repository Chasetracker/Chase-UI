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
import CustomersList from '@/components/Layout/CustomersList';

interface FormProps {
  email: string;
  customerName: string;
  phone: string;
}


const Customers: React.FC<FormProps> = () => {
  const [formData, setFormData] = useState({
    email: "",
    customerName: "",
    phone: "",
  });
  const [send, setSend] = useState("Save");
  const [token, setToken] = useState("")
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const closeModal = () => {
    setIsOpened(false);
    setFormData({
      email: "",
      customerName: "",
      phone: "",
    });
  }
  const openModal = () => setIsOpened(!isOpened);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  }

  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage(null); // Clear the error message after 5 seconds
    }, 5000);
  };

  const isAllFieldsFilled = () => {
    const requiredFields: (keyof FormProps)[] = ["customerName", "email", "phone"];
    return requiredFields.every((field) => formData[field] !== "");
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {

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
          name: formData.customerName,
          email: formData.email,
          phoneNumber: formData.phone


        }

        // // console.log('Signup payload:', user);
        setSend("Saving...");

        const response = await axios.post(
          "https://chase-lvga.onrender.com/api/add-customer",
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
      setSend("Save");
      setFormData({
        email: "",
        customerName: "",
        phone: "",
      });
      closeModal();
    }

  }

  useEffect(() => {
    // Check if there is a valid token in local storage
    if (typeof window !== 'undefined' && window.localStorage) {
      const authToken = localStorage.getItem("token");
      setToken(authToken ?? '')

      if (!authToken) {
        // Redirect the user to the login page if there is no valid token

        router.push('/auth');
      }
    }
  }, []);

  return (
    <>
      {!token ? <h1 className='p-4 text-2xl flex justify-center items-start text-[red]'>Redircting to login page!!!</h1> :
        <DashboardLayout>
          <main className={`relative w-full h-full px-10 pt-10   `}>
            <div className={`absolute flex flex-col justify-center items-center w-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[400px] border-[0.5px]  border-[#667085] rounded-md bg-[#FFF] shadow-md p-3 ${isOpened ? 'z-[99999]' : 'hidden'}`}>
              <div className='flex justify-between items-start w-full mb-3'>
                <div className='space-y-2'>
                  <h1 className='text-[20px] font-extrabold text-black'>Add New Customer</h1>
                  <h2 className='text-[12px] text-[#667085]'>Yay! You have a new customer, record their details here</h2>
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
                <div className={`flex flex-col `}>
                  <label
                    htmlFor="customerName"
                    className={`font-bold text-[12px] flex justify-between items-center text-[#314155] my-1`}
                  >
                    Customer Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter customer name"
                    id="customerName"
                    name="customerName"
                    className={`border-[#D0D5DD] border-[1px] text-base text-[#445568] font-normal p-3 rounded-md w-full`}
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={`flex flex-col `}>
                  <label
                    htmlFor="phone"
                    className={`font-bold text-[12px] text-[#314155] my-1`}
                  >
                    Customer Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+234"
                    id="phone"
                    name="phone"
                    className={`border-[#D0D5DD]     border-[1px] text-base text-[#445568] font-normal p-3 rounded-md w-full`}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    maxLength={14}
                    minLength={14}
                  />
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
                <h1 className='text-lg font-extrabold text-black w-1/6'>Customers</h1>
                <div>
                  <button
                    type="button"
                    className={`w-[180px] h-[45px] bg-[#EC4A0A] text-white p-2 text-[13px] flex justify-center items-center space-x-2 border-[1px] border-[#CCD5DF] rounded-lg hover:bg-[#cd8568]  `}
                    onClick={openModal}
                  >
                    <GoPlus className='text-lg' />
                    <h1>Add a Customer</h1>
                  </button>
                </div>
              </div>
              <div className='w-full'>
                <CustomersList name={''} email={''} phoneNumber={''} />
              </div>
            </section>
          </main>
        </DashboardLayout>
      }
    </>

  )
}

export default Customers
