import React from 'react'

function Footer() {
    const date = new Date()
    const year = date.getFullYear()
    return (

        <div
            className='bg-secondary text-white  p-4 text-center' >

            <p>© {year} Brokerless. All rights reserved.</p>
        </div>
    )
}

export default Footer