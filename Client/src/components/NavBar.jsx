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
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        // <nav className=' text-black flex justify-between items-center p-3 px-10'>
        //     <Link to={'/'}><img className='w-40 h-10 object-contain ' src={logo} /></Link>

        //     <button
        //         className='md:hidden'>
        //         <AlignJustify size={30} />
        //     </button>
        //     {/* <MobileNavBar /> */}

        //     <div className='hidden md:flex justify-around gap-10  px-4 py-3'>
        //         {
        //             links.map((link, index) => (
        //                 <Link key={index} to={link.path} className='
        //                 text-primary font-semibold hover:text-tertiary transition duration-300 ease-in-out
        //                 hover:scale-110 transform hover:font-bold
        //                 '>
        //                     {link.text}
        //                 </Link>
        //             ))
        //         }
        //     </div>
        //     <div className='md:flex gap-3 hidden'>
        //         <OutlineButton>
        //             <Link to='/auth/register-user' > Connect</Link >
        //         </OutlineButton>
        //         <PrimaryButton className={'bg-secondary'}>
        //             <Link to='/auth/login-user' > Login</Link >
        //         </PrimaryButton>
        //     </div>
        // </nav >
        <nav className=' text-black flex  justify-between items-center p-3 px-10'>
            <div>
                <img src={logo} alt="Logo" />
            </div>

            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className={`block text-black focus:outline-none transform transition-all ease-out duration-500 ${isOpen ? 'rotate-90 duration-500' : ''}`}>
                    <AlignJustify size={30} strokeWidth={3} />
                </button>
            </div>

            <div className={`md:flex md:gap-10 ${isOpen ? `flex flex-col h-1/2 self-center bg-white py-5 items-center absolute top-16 left-0 w-full z-50` : 'hidden'}`}>
                {links.map((link, index) => (
                    <Link key={index} to={link.path} onClick={() => setIsOpen(false)} className='text-black text-lg font-semibold py-2'>
                        {link.text}
                    </Link>
                ))}
                <PrimaryButton className={'bg-secondary rounded-none'}>
                    <Link to='/auth/login-user' > Login</Link >
                </PrimaryButton>
            </div>
            <div className='md:flex gap-3 hidden'>
                <OutlineButton>
                    <Link to='/auth/register-user' > Connect</Link >
                </OutlineButton>
                <PrimaryButton className={'bg-secondary'}>
                    <Link to='/auth/login-user' > Login</Link >
                </PrimaryButton>
            </div>
        </nav>
    )
}

export default NavBar
