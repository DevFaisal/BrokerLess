import React from 'react'
import logo from '../assets/logo.svg'
import PrimaryButton from './PrimaryButton'
import { Link } from 'react-router-dom'
import OutlineButton from './OutlineButton'
import { AlignJustify } from 'lucide-react'

const links = [
    { path: '/', text: 'Home' },
    { path: '/about', text: 'About' },
    { path: '/services', text: 'Services' },
    { path: '/contact', text: 'Contact' }
]
function NavBar() {
    return (
        <nav className=' text-black flex justify-between items-center p-3 px-10'>

            <Link to={'/'}><img className='w-40 h-10 object-contain ' src={logo} /></Link>

            <button
                className='md:hidden'>
                <AlignJustify size={30} />
            </button>
            {/* <MobileNavBar /> */}

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
            <div className='md:flex gap-3 hidden'>
                <OutlineButton>
                    <Link to='/auth/register-user' > Connect</Link >
                </OutlineButton>
                <PrimaryButton className={'bg-secondary'}>
                    <Link to='/auth/login-user' > Login</Link >
                </PrimaryButton>
            </div>
        </nav >
    )
}

export default NavBar


export function MobileNavBar() {
    return (
        <div className='bg-white fixed top-0 left-0 right-0 z-50' >
            <div
                className='flex flex-col gap-5 justify-center items-center p-5 h-screen w-screen bg-white text-black translate-x-5
                animate-fade-in-down transition duration-300 ease-in-out
                '
            >
                {
                    links.map((link, index) => (
                        <button key={index} to={link.path} className='
                            text-primary font-semibold hover:text-tertiary transition duration-300 ease-in-out
                            hover:scale-110 transform hover:font-bold
                        '>
                            {link.text}
                        </button>
                    ))
                }
            </div>
        </div >

    )
}