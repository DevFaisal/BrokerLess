import Container from '../components/Container'
import React from 'react'
import PrimaryButton from '../components/PrimaryButton'
import background from '../assets/background-1.png'
import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <Container>
            <div >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 justify-start items-center px-5 md:px-20 py-20  '>
                    <div className=' flex flex-col gap-4 '>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-4xl xl:text-8xl font-bold text-primary'>Brokerless</h1>
                            <h2 className='text-xl md:text-3xl font-semibold text-secondary'>Rent Smarter</h2>
                        </div>
                        <p className='text-justify pr-5 font-semibold md:leading-7 text-sm md:text-lg text-primary'>Discover Brokerless. Rent rooms broker-free. Save time and money with direct owner connections. Rent smarter with Brokerless</p>
                        <PrimaryButton
                            className={'w-40 h-12 bg-primary  text-white  hover:bg-secondary transition duration-700 ease-in-out hover:scale-110 transform hover:font-bold'}
                        >
                            <Link to='/auth/login-user'>Get Started</Link>
                        </PrimaryButton>
                    </div>
                    <div className='hidden md:flex '>
                        <img
                            className='object-contain'
                            src={background} alt="" />
                    </div>
                </div>
            </div>
        </Container >
    )
}

export default HomePage