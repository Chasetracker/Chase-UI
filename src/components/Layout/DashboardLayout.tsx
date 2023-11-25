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
import { TbReceipt } from "react-icons/tb";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    const isLinkActive = (linkPath: string) => {
        return router.asPath === linkPath;
    };

    return (
        <div className='w-full h-[100vh] flex '>
            <aside className='w-1/4 h-[100vh] shadow-xl flex sticky top-0 flex-col items-start  overflow-y-auto shrink-0 basis-auto grow-0'>
                <Link href='/' className='flex h-[50px] justify-center pt-12 pl-5 items-center space-x-2 mb-20'>
                    <div className='relative w-[40px] h-[45px]'>
                        <Image src='/svgs/logo.svg' alt='' fill />
                    </div>
                    <h1 className='text-[20px] font-extrabold text-[#314155]'>Chase</h1>
                </Link>

                <ul className='w-full flex flex-col space-y-3 mb-16'>
                    <Link href='/dashboard' className=''>
                        <li className={`h-[50px]  flex  w-full space-x-3 px-6 py-2 justify-start font-extrabold items-center hover:bg-[#b2a291] rounded-sm ${isLinkActive("/dashboard") ? "bg-[#FFE9D2] text-[#EC4A0A] " : "text-[#344054]"}`}>
                            <PiHouseSimpleLight className=' text-xl' />
                            <h1 >Home</h1>
                        </li>
                    </Link>
                    <Link href='/dashboard/sales' className=''>
                        <li className={`h-[50px]  flex  w-full space-x-3 px-6 py-2 justify-start font-extrabold items-center hover:bg-[#b2a291] rounded-sm ${isLinkActive("/dashboard/sales") ? "bg-[#FFE9D2] text-[#EC4A0A] " : "text-[#344054]"}`}>
                            <BiReceipt className='text-xl rotate-180 ' />
                            <h1 >Sales</h1>
                        </li>
                    </Link>
                    <Link href='/dashboard/customers' className=''>
                        <li className={`h-[50px]  flex  w-full space-x-3 px-6 py-2 justify-start font-extrabold items-center hover:bg-[#b2a291] rounded-sm ${isLinkActive("/dashboard/customers") ? "bg-[#FFE9D2] text-[#EC4A0A] " : "text-[#344054]"}`}>
                            <GoPeople className='text-[30px]' />
                            <h1>Customers</h1>
                        </li>
                    </Link>
                </ul>

                <Link href='#' className='relative flex flex-col p-3 h-[150px] w-[290px] justify-evenly items-start bg-[#FFDBA4] rounded-md mx-auto'>
                    <div className='z-50 space-y-2'>
                        <TbReceipt className="text-2xl text-[#EC4A0A]" />
                        <h1 className='font-extrabold text-sm pl-1'>Record a new sale</h1>
                        <h2 className='font-light text-[16px] pl-1'>Starting recording your new sale</h2>
                    </div>
                    <div className='absolute w-[200px] h-[150px] right-0'>
                        <Image src='/svgs/card.svg' alt='' fill />
                    </div>
                </Link>

            </aside>

            <div className="flex flex-col w-3/4 h-[100vh]">
                <nav className='flex py-5 px-10 w-full justify-end items-center  bg-white z-[99999] top-0 right-0  h-[100px] shadow-sm'>
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
                <main className='p-10'>{children}</main>
            </div>

        </div>
    )
}

export default DashboardLayout