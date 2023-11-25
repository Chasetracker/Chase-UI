import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '../Button/Button'

const DashboardLayout = () => {
    return (
        <div>
            <nav className='flex py-5 px-10 w-full justify-between items-center h-[90px] bg-white fixed z-[99999] top-0 shadow-md'>
                <Link href='#' className='flex h-[50px] justify-center items-center space-x-2 '>
                    <div className='relative w-[45px] h-[45px]'>
                        <Image src='/svgs/logo.svg' alt='' fill />
                    </div>
                    <h1 className='text-[20px] font-extrabold text-[#314155]'>Chase</h1>
                </Link>
                <div className='flex space-x-5'>

                </div>
            </nav>
        </div>
    )
}

export default DashboardLayout