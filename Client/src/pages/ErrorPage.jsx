import React from 'react'
import Container from '../components/Container'

function ErrorPage() {
    return (
        <Container>
            <div
                className='container mx-auto px-4 sm:px-6 lg:px-8 h-screen flex flex-col justify-center items-center'
            >
                <h1
                    className='text-9xl text-danger font-bold text-center mt-20'
                >404</h1>
                <p
                    className='text-7xl font-semibold text-center mt-5'
                >Page not found</p>
            </div>
        </Container>
    )
}

export default ErrorPage