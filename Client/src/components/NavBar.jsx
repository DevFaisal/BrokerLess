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
        <nav className=' text-black flex justify-between items-center p-3 px-20
        
        '>
            <div>
                <img src={logo} />
            </div>
            <div className='hidden md:flex justify-around gap-10  px-4 py-3'>
                {
                    links.map((link, index) => (
                        <Link key={index} to={link.path} className='
                        text-primary font-semibold hover:text-tertiary transition duration-300 ease-in-out
                        hover:scale-110 transform hover:font-bold
                        '>
                            {link.text}
                        </Link>
                    ))
                }
            </div>
            <div className='flex gap-3'>
                <PrimaryButton>
                    <Link to='/auth/register-user' > Connect</Link >
                </PrimaryButton>
                <PrimaryButton className={'bg-secondary'}>
                    <Link to='/auth/login-user' > Login</Link >
                </PrimaryButton>
            </div>
        </nav >
    )
}

export default NavBar