import Container from '../components/Container'
import React from 'react'
import PrimaryButton from '../components/PrimaryButton'
import image from '../assets/image-1.png'

function HomePage() {
    return (
        <Container>
            <div >
                <div className='grid grid-cols-1  md:grid-cols-2 gap-10 justify-start items-start px-5 md:px-20 
                 py-60
                '>
                    <div className=' flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-3xl font-semibold'>Welcome to </h1>
                            <div className='w-[350px] h-[2px] bg-green-700'></div>
                            <h1 className='text-7xl font-bold 
                            text-green-700
                            '>Brokerless</h1>
                        </div>
                        <p className='text-justify font-semibold leading-7 text-[#2B1B12] text-lg'>Welcome to Brokerless, where room rentals are hassle-free and broker-free. Connect directly with property owners, saving time and money. Explore our wide range of listings and find your perfect room in just a few clicks. Rent smarter with Brokerless.</p>
                        <PrimaryButton>Get Started</PrimaryButton>
                    </div>
                    <div>
                        <img src={image} alt="" />
                    </div>
                </div>
            </div>
        </Container >
    )
}

export default HomePage