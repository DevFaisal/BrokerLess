import React from 'react'
import UserRegistration from '../components/UserRegistration'
import logoWhite from '../assets/logowhite.svg'


function UserSignUpPage() {


    return (
        <div className='
        flex flex-col-reverse xl:flex-row
        '>
            <aside className='bg-backgroundThree flex justify-center items-center h-screen w-full xl:w-1/2 max-w-2/5'>
                <UserRegistration />
            </aside>
            <aside className='bg-backgroundOne flex flex-col justify-center items-start p-5 md:p-10 w-full xl:w-1/2 max-w-2/5 h-1/2 xl:h-screen'>
                <p>
                    <img width={900}
                        className='text-white'
                        src={logoWhite} alt="logo" />
                </p>
                <h1
                    className='text-5xl font-bold text-white mb-5'
                >
                    Register as User & Take a step towards your dream home
                </h1>
                <ul
                    className='
                
                text-gray-200'
                >
                    <li>
                        We are here to help you find your dream home
                    </li>
                    <li>
                        We provide you with the best options
                    </li>
                    <li>
                        Find your dream home with us
                    </li>
                </ul>
            </aside>
        </div>
    )
}

export default UserSignUpPage