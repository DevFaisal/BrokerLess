import React from 'react'
import logo from '../assets/logo.svg'
import UserLogin from '../components/UserLogin'



function UserLoginPage() {


  return (
    <div className='
        flex flex-col-reverse xl:flex-row-reverse
        '>
      <aside className='bg-[#264653] flex justify-center items-center h-screen w-full xl:w-1/2 max-w-2/5'>
        <UserLogin />
      </aside>
      <aside className='bg-[#ffe5d9] flex flex-col justify-center items-start p-5 md:p-10 w-full xl:w-1/2 max-w-2/5 h-1/2 xl:h-screen'>
        <p>
          <img width={900}
            className='text-black '
            src={logo} alt="logo" />
        </p>
        <h1
          className='text-5xl font-bold text-black mb-5'
        >
          Welcome to our platform
        </h1>
        <ul
          className='
                
                text-gray-500'
        >
          <li>
            Find the best homes
          </li>
          <li>
            Connect with the best landlords
          </li>
          <li>
            Get the best services
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default UserLoginPage