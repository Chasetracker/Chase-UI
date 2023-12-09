import React, { useEffect, useState } from 'react'
import { ImCancelCircle } from "react-icons/im";
import { BsCopy } from "react-icons/bs";
import Link from 'next/link';
import axios from 'axios';
import { config } from 'process';
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


                    const response = await axios.get('https://chase-lvga.onrender.com/api/get-invoices', config)
                    setTransactions(response.data.InvoiceRecord);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

    const handlePageChange = (page: number) => {
        const nextPage = Math.max(1, Math.min(page, totalPages));

        if (nextPage !== currentPage) {
            setCurrentPage(nextPage);
        }
    };

    const visibleTransactions = transactions.slice(
        (currentPage - 1) * transactionsPerPage,
        currentPage * transactionsPerPage
    );
    return (
        <div className='w-full flex flex-col justify-between'>
            <table className='w-full h-5/6 top-0'>
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
            </table>


            <div className='h-[100px] w-full absolute  flex  items-center bottom-0'>
                <div className='w-[92%] flex justify-between items-center px-3  h-3/4  border-[#EAECF0] border-t-[1px]'>
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
        </div >
    )
}

export default TransactionList