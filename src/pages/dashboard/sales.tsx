import DashboardLayout from '@/components/Layout/DashboardLayout'
import React from 'react'

const sales = () => {
    return (
        <>
            <DashboardLayout>
                <main className={`grow w-4/5 h-5/6 flex items-center justify-end  bottom-0 right-0`}>
                    <h1 >Sales</h1>
                </main>
            </DashboardLayout>
        </>
    )
}

export default sales
