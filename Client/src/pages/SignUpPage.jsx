import React from 'react'
import UserRegistration from '../components/UserRegistration'
import LandLordRegistration from '../components/LandlordRegistration'

function SignUpPage() {


    return (

        <div
            className='flex justify-between items-center h-screen w-screen bg-[#2a9d8f]'
        >
            <aside className='bg-[#264653] flex flex-col justify-center items-center  p-8 h-screen w-1/2 max-w-2/5'>
                <UserRegistration />
            </aside>
            <aside className='bg-[#a53860] flex flex-col justify-center items-center  p-8 w-1/2 max-w-2/5 h-screen'>
                <LandLordRegistration />
            </aside>
        </div>


    )
}

export default SignUpPage