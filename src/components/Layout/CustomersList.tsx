import React, { useEffect, useState } from 'react'
import { ImCancelCircle } from "react-icons/im";
import { BsCopy } from "react-icons/bs";
import Link from 'next/link';
import axios from 'axios';
interface ApiResponse {
    business_name: string;
    phone: string;
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

                const response = await axios.get('https://chase-lvga.onrender.com/api/user/getCustomers')
                console.log(response.data.users);
                setCustomers(response.data.users); // Assuming your data is an array
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
        <div className='w-full flex flex-col'>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {registeredCustomers.map((customer, index) => (
                    <div
                        key={index}
                        className="flex flex-col justify-between items-center px-3 h-[150px] text-base  border-[2px] border-[#EAECF0]"
                    >
                        <h1>{customer.business_name}</h1>
                        <h1>Customer</h1>
                        <h1>{customer.email}</h1>
                    </div>
                ))}
            </div>
            <div className='w-full flex justify-between items-center bottom-0 h-[80px]  border-[red] border-[1px]'>
                <p className='text-[#7B7B7B] text-[12px] w-1/5'>Page {currentPage} of {totalPages}</p>
                <div className='w-4/5'>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>



    )
}

export default CustomersList