import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function AuthLayout() {
  return (

    <div className=" flex-col dark:bg-primary bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] flex">
      <div
        className='top-0 z-50'
      >
        <NavBar />
      </div>
      <Outlet />
      <Footer />
    </div>
  )
}

export default AuthLayout
