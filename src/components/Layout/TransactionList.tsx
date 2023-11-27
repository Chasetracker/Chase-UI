import React, { useEffect, useState } from 'react'
import { ImCancelCircle } from "react-icons/im";
import { BsCopy } from "react-icons/bs";
import Link from 'next/link';
import axios from 'axios';
interface ApiResponse {
    totalSalesAmount: number;
    customerName: string;
    status: string;

    // Add other properties as needed
}
interface TransactionListProps {
    transactionsPerPage: number;
}

const TransactionList: React.FC<TransactionListProps & ApiResponse> = ({ transactionsPerPage }) => {
    const [transactions, setTransactions] = useState<ApiResponse[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Fetch data using Axios when the component mounts
        const fetchData = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU1ZmE5YmE3MmM0MmMxN2IzZDc0M2M0IiwiZW1haWwiOiJvbnVvaGFjb2xsaW5zY2hpZHViZW1AZ21haWwuY29tIiwiaWF0IjoxNzAwOTE0MDAxfQ.fv0ReJ2HUWqzWtupFNY4tby6pZGD6PxOx9KpPtjOi-k'; // Replace with your actual authorization token
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                const response = await axios.get('https://chase-lvga.onrender.com/api/get-invoices', config)
                console.log(response.data.InvoiceRecord);
                setTransactions(response.data.InvoiceRecord); // Assuming your data is an array
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const visibleTransactions = transactions.slice(
        (currentPage - 1) * transactionsPerPage,
        currentPage * transactionsPerPage
    );
    return (
        <div className='w-full'>
            <table className='w-full'>
                <thead className='w-full bg-[#F8FAFB] h-[50px] rounded-t-md flex border-b-[2px] border-[#EAECF0]'>
                    <tr className='w-full flex justify-between items-center text-[#7B7B7B] text-light text-[12px]  px-3 '>
                        <th className='w-[20px]  flex justify-start items-center'><input type="checkbox" /></th>
                        <th className='w-[150px] flex justify-start items-center'>Transaction Type</th>
                        <th className='w-[80px] flex justify-start items-center'>Tag</th>
                        <th className='w-[70px] flex justify-start items-center'>Amount</th>
                        <th className='w-[100px] flex justify-start items-center'>Product</th>
                        <th className='w-[150px] flex justify-start items-center'>Customer</th>
                        <th className='w-[250px] flex justify-start items-center'>Payment Link</th>
                    </tr>
                </thead>
                <tbody className="">
                    {visibleTransactions.map((transaction, index) => (
                        <tr
                            key={index}
                            className="w-full flex justify-between items-center px-3 h-[60px] text-base  border-b-[2px] border-[#EAECF0]"
                        >
                            {/* Render your table cells based on the structure of your transaction object */}
                            <td className="w-[20px]">
                                <input type="checkbox" />
                            </td>
                            <td className="w-[150px] font-extrabold text-black">
                                Credit Transaction
                            </td>
                            <td className="w-[80px] flex justify-start">
                                <h1 className="bg-[#FFEFE4] w-[60px] flex justify-center items-center rounded-full p-1 text-[#FF4900]">
                                    {transaction.status}
                                </h1>
                            </td>
                            <td className="w-[70px]">{'# ' + transaction.totalSalesAmount}</td>
                            <td className="w-[100px]">Groceries</td>
                            <td className="w-[150px] font-extrabold">{transaction.customerName}</td>
                            <td className="w-[250px] flex justify-between items-center">
                                <Link href='#' className="text-[#0072F7] underline">
                                    chase.me/2akdd392a403
                                </Link>
                                <button
                                    type="button"
                                    className={`w-[70px] bg-white flex text-[#314155] border-[1px] border-[#CCD5DF]  text-[12px] py-2 rounded-full hover:bg-[#F8FAFB] justify-center items-center space-x-1`}
                                >
                                    <BsCopy />
                                    <h1>Copy</h1>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
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

            </table>


        </div >
    )
}

export default TransactionList