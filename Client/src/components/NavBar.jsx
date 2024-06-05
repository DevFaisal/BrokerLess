import  { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import logo from '../assets/logo.svg';
import PrimaryButton from './PrimaryButton';
import { Link } from 'react-router-dom';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { path: '/', text: 'Home' },
    { path: '/about', text: 'About' },
    { path: '/services', text: 'Services' },
    { path: '/contact', text: 'Contact' }
  ];

  return (
    <nav className='text-black flex justify-between items-center p-3 px-20 sticky top-0 bg-white z-50 shadow-md'>
      <div>
        <img src={logo} alt="Logo" />
      </div>
      
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className={`block text-black focus:outline-none transform transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`}>
          <HiMenu className="w-8 h-8" />
        </button>
      </div>
  
      <div className={`md:flex md:gap-10 ${isOpen ? 'flex flex-col items-center bg-white absolute top-16 left-0 w-full z-50' : 'hidden'}`}>
        {links.map((link, index) => (
          <Link key={index} to={link.path} onClick={() => setIsOpen(false)} className='text-black text-lg font-semibold py-2'>
            {link.text}
          </Link>
        ))}
        <PrimaryButton>
          <Link to='/signup' onClick={() => setIsOpen(false)}>Connect</Link>
        </PrimaryButton>
      </div>
    </nav>
  );
}

export default NavBar;
