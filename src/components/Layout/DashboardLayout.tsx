import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/router";


//icons 
import { RiSettingsLine } from "react-icons/ri";
import { FaRegBell, FaChevronDown } from "react-icons/fa";
import { PiBuildings, PiHouseSimpleLight } from "react-icons/pi";
import { IoReceiptOutline } from "react-icons/io5";
import { BiReceipt } from "react-icons/bi";
import { GoPeople } from "react-icons/go";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    const isLinkActive = (linkPath: string) => {
        return router.asPath === linkPath;
    };

    return (
        <div className='w-full max-h-screen '>
            <div className='w-full flex'>
                <nav className='flex py-5 px-10 w-4/5 justify-end items-center h-1/6 bg-white fixed z-[99999] top-0 right-0 shadow-sm'>
                    <div className=' flex space-x-3 justify-center items-center'>
                        <Link href='#' className='h-[45px] w-[45px] border-[1px] text-md bg-white hover:bg-[#F2F4F7] border-[#F2F4F7] flex justify-center items-center rounded-md text-[#344054]'>
                            <RiSettingsLine />
                        </Link>
                        <Link href='#' className='h-[45px] w-[45px] border-[1px] text-md bg-white hover:bg-[#F2F4F7] border-[#F2F4F7] flex justify-center items-center rounded-md text-[#344054]'>
                            <FaRegBell />
                        </Link>
                        <Link href='#' className='h-[50px] w-[140px] space-x-3 border-[1px] border-[#FFE8CF] bg-[#FFE8CF] hover:bg-[#b2a291] flex justify-center items-center rounded-md text-[#344054]'>
                            <PiBuildings className='text-[#EC4A0A] text-xl' />
                            <h1>Demo</h1>
                            <FaChevronDown />
                        </Link>
                    </div>
                </nav>
                <div className='w-1/5 h-screen shadow-xl flex left-0 fixed top-0 flex-col items-start'>
                    <Link href='/' className='flex h-[50px] justify-center pt-12 pl-8 items-center space-x-2 mb-20'>
                        <div className='relative w-[40px] h-[45px]'>
                            <Image src='/svgs/logo.svg' alt='' fill />
                        </div>
                        <h1 className='text-[20px] font-extrabold text-[#314155]'>Chase</h1>
                    </Link>

                    <ul className='w-full flex flex-col space-y-3'>
                        <Link href='/dashboard' className=''>
                            <li className={`h-[50px]  flex  w-full space-x-3 px-3 py-2 justify-start font-extrabold items-center hover:bg-[#b2a291] rounded-sm ${isLinkActive("/dashboard") ? "bg-[#FFE9D2] text-[#EC4A0A] " : "text-[#344054]"}`}>
                                <PiHouseSimpleLight className=' text-xl' />
                                <h1 >Home</h1>
                            </li>
                        </Link>
                        <Link href='/dashboard/sales' className=''>
                            <li className={`h-[50px]  flex  w-full space-x-3 px-3 py-2 justify-start font-extrabold items-center hover:bg-[#b2a291] rounded-sm ${isLinkActive("/dashboard/sales") ? "bg-[#FFE9D2] text-[#EC4A0A] " : "text-[#344054]"}`}>
                                <BiReceipt className='text-xl rotate-180 ' />
                                <h1 >Sales</h1>
                            </li>
                        </Link>
                        <Link href='/dashboard/customers' className=''>
                            <li className={`h-[50px]  flex  w-full space-x-3 px-3 py-2 justify-start font-extrabold items-center hover:bg-[#b2a291] rounded-sm ${isLinkActive("/dashboard/customers") ? "bg-[#FFE9D2] text-[#EC4A0A] " : "text-[#344054]"}`}>
                                <GoPeople className='text-[30px]' />
                                <h1>Customers</h1>
                            </li>
                        </Link>
                    </ul>

                </div>
            </div>

            <div className="flex-grow p-10 w-full ">
                <main className='w-4/5 h-5/6 '>{children}</main>
            </div>

        </div>
    )
}

export default DashboardLayout