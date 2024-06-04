import React from 'react'
import logo from '../assets/logo.svg'
import PrimaryButton from './PrimaryButton'
import { Link } from 'react-router-dom'

function NavBar() {
    const links = [
        { path: '/', text: 'Home' },
        { path: '/about', text: 'About' },
        { path: '/services', text: 'Services' },
        { path: '/contact', text: 'Contact' }
    ]
    return (
        <nav className=' text-black flex justify-between items-center p-4 px-20 '>
            <div>
                <img src={logo} />
            </div>
            <div className='hidden md:flex justify-around gap-10  px-4 py-3'>
                {
                    links.map((link, index) => (
                        <Link key={index} to={link.path} className='
                        text-primary text-lg font-semibold hover:text-tertiary transition duration-300 ease-in-out
                        '>
                            {link.text}
                        </Link>
                    ))
                }
            </div>
            <PrimaryButton>
                <Link to='/signup' > Connect</Link >
            </PrimaryButton>
        </nav >
    )
}

export default NavBar