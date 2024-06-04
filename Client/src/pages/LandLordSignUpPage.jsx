import React from 'react'
import UserRegistration from '../components/UserRegistration'
import LandLordRegistration from '../components/LandlordRegistration'
import Container from '../components/Container'
import logoWhite from '../assets/logowhite.svg'


function LandLordSignUpPage() {


    return (
        <div className='flex justify-between items-center  bg-[#2a9d8f]'>
            <aside className='bg-[#00bbf9] flex flex-col justify-center items-start p-10 w-1/2 max-w-2/5 h-screen'>

                <p>
                    <img width={900}
                        className='text-white'
                        src={logoWhite} alt="logo" />
                </p>
                <h1
                    className='text-5xl font-bold text-white mb-5'
                >
                    Post your property and get the best tenants
                </h1>
                <ul
                    className='text-gray-200'
                >
                    <li>
                        We are here to help you find the best tenants
                    </li>
                    <li>
                        We provide you with the best options
                    </li>
                    <li>
                        Find the best tenants with us
                    </li>
                </ul>
            </aside>
            <aside className='bg-[#fca311] px-28 flex justify-center items-center h-screen w-1/2 max-w-2/5'>
                <LandLordRegistration />
            </aside>
        </div>
    )
}

export default LandLordSignUpPage