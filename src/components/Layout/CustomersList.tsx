import React, { useEffect, useState } from 'react'
import { ImCancelCircle } from "react-icons/im";
import { BsCopy } from "react-icons/bs";
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
interface ApiResponse {
    name: string;
    phoneNumber: string;
    email: string;

    // Add other properties as needed
}


const CustomersList: React.FC<ApiResponse> = () => {
    const [customers, setCustomers] = useState<ApiResponse[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const CustomersPerPage = 8;


    useEffect(() => {
        // Fetch data using Axios when the component mounts
        const fetchData = async () => {
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

                    const response = await axios.get('https://chase-lvga.onrender.com/api/customers', config)
                    setCustomers(response.data.customers); // Assuming your data is an array
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const totalPages = Math.ceil(customers.length / CustomersPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const registeredCustomers = customers.slice(
        (currentPage - 1) * CustomersPerPage,
        currentPage * CustomersPerPage
    );
    return (
        <div className='w-full flex flex-col justify-between '>
            <div className="h-5/6 w-full ">
                <div className="grid grid-cols-2  md:grid-cols-4 gap-4">
                    {registeredCustomers.map((customer, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-between items-center px-3 h-[160px] text-base bg-white rounded-xl  p-3 border-[2px] border-[#EAECF0]"
                        >
                            <div className='relative w-[50px] h-[50px]'>
                                <Image src='/Images/Avatar.png' alt="Picture of the author" fill />
                            </div>
                            <h1 className='font-bold text-sm'>{customer.name}</h1>
                            <h1 className='font-normal text-[#FF3500] text-base'>Customer</h1>
                            <h1 className='font-normal tet-base text-[#647187]'>{customer.phoneNumber}</h1>
                            <h1 className='font-normal tet-base text-[#647187]'>{customer.email}</h1>
                        </div>
                    ))}

                </div>
            </div>
            <div className='h-1/6 w-full absolute   bottom-0'>
                <div className='w-[92%] flex justify-between items-center p-3  h-3/4  border-[#EAECF0] border-t-[1px]'>
                    <p className='text-[#7B7B7B] flex justify-start font-bold text-[15px] w-1/5'>Page {currentPage} of {totalPages}</p>
                    <div className='w-4/5 flex justify-end space-x-3'>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`w-[100px] text-base border-[#CCD5DF] p-2 rounded-md border-[1px] font-bold text-[#314155] bg-[#F9FAFC] hover:bg-[#a6adbb] cursor-pointer`}
                        >
                            Previous
                        </button>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`w-[100px] text-base border-[#CCD5DF] p-2 rounded-md border-[1px] font-bold text-[#314155] bg-[#F9FAFC] hover:bg-[#a6adbb] cursor-pointer`}

                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default CustomersList