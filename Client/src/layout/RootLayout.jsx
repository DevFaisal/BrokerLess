import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function RootLayout() {
    return (
        <div className='bg-[#d8e2dc]'>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout