import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/router";
import { inter } from '@/styles/font';


//icons 
import { RiSettingsLine } from "react-icons/ri";
import { FaRegBell, FaChevronDown } from "react-icons/fa";
import { PiBuildings, PiHouseSimpleLight } from "react-icons/pi";
import { IoReceiptOutline } from "react-icons/io5";
import { BiReceipt } from "react-icons/bi";
import { GoPeople } from "react-icons/go";
import { TbReceipt } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
interface userProps {
    email?: string;
    business_name?: string;
    _id?: string;

}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<{ email?: string; business_name?: string }>({});

    useEffect(() => {
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
                    const email = user.email;

                    setUserInfo({
                        email: email || undefined,
                        business_name: username || undefined,
                    });

                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            };

            getUserInfo();
        }
    }, []);

    const handleLogout = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('token');
            router.push('/');

        }
    };




    const isLinkActive = (linkPath: string) => {
        return router.asPath === linkPath;
    };
    return (
        <div className={`w-full h-[100vh] flex ${inter.className} overflow-hidden `}>
            <aside className='w-1/4 h-[100vh] shadow-xl flex sticky top-0 flex-col items-start z-[99999] bg-white  shrink-0 basis-auto grow-0'>
                <Link href='/' className='flex h-[50px] justify-center pt-12 pl-5 items-center space-x-2 mb-20'>
                    <div className='relative w-[40px] h-[45px]'>
                        <Image src='/svgs/logo.svg' alt='' fill />
                    </div>
                    <h1 className='text-[20px] font-extrabold text-[#314155]'>Chase</h1>
                </Link>
                <div className='overflow-y-auto h-4/5 w-full'>
                    <ul className='w-full flex flex-col space-y-3 mb-16 '>
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

                    <Link href='/dashboard/sales' className=' flex justify-start items-center w-full mx-auto mb-10'>
                        <div className='relative w-[300px] h-[150px] '>
                            <Image src='/svgs/card2.svg' alt='' fill />
                        </div>
                    </Link>

                    <Link href='#' className=''>
                        <li className={`h-[50px]  flex  w-full space-x-3 px-6 py-2 mb-10 justify-start font-extrabold items-center  hover:bg-[#b2a291] rounded-sm ${isLinkActive("/dashboard/settingd") ? "bg-[#FFE9D2] text-[#EC4A0A] " : "text-[#344054]"}`}>
                            <RiSettingsLine className='text-[30px]' />
                            <h1>Settings</h1>
                        </li>
                    </Link>

                </div>
                <div className='w-full bottom-0 flex justify-start items-end border-[1px] border-[#EAECF0] mt-2'>
                    <div className={`h-[70px]  flex  w-full space-x-3 px-6 py-2 font-extrabold items-center justify-between `}>
                        <div className='text-[30px] w-[50px] h-[50px] rounded-full bg-[#FFEAD5] flex justify-center items-center text-[#EC4A0A]'>
                            <PiBuildings />
                        </div>
                        <div className='flex flex-col w-2/4 justify-center items-center '>
                            <h1 className='font-bold text-base text-black'>{userInfo.business_name}</h1>
                            <h2 className='font-bold text-[10px]'>{userInfo.email}</h2>
                        </div>
                        <div className=' text-[30px] w-[40px] h-[50px] flex justify-center items-center rounded-md hover:bg-[#b2a291]' onClick={handleLogout}>
                            <CiLogout />
                        </div>
                    </div>
                </div>

            </aside>

            <div className="flex flex-col w-3/4 h-[100vh]">
                <nav className='flex py-5 px-10 w-full justify-end items-center  bg-white z-[99998] top-0 right-0 fixed  h-[100px] shadow-sm'>
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
                <main className='mt-[75px] w-full h-full bg-[#FCFCFD]'>{children}</main>
            </div>

        </div>
    )
}

export default DashboardLayout