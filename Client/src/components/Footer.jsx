import React from 'react'
import logo from '../assets/logo.svg'

function Footer() {
    const date = new Date()
    const year = date.getFullYear()
    return (

        <div
            className='bg-secondary text-white  p-4 text-center w-full' >
            <div>
                <img
                    className='h-96 w-96'
                    src={logo} alt="" />
            </div>
            <p>© {year} Brokerless. All rights reserved.</p>
        </div>
    )
}

export default Footer