import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import { CircleAlert, CircleCheck } from 'lucide-react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function EmailVerificationPage() {

    const { verificationToken } = useParams()
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()



    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_LOCALHOST}/auth/user/verify-email?verificationToken=${verificationToken}`)
                if (response.status === 200) {
                    setIsVerified(true)
                }
            } catch (error) {
                setError(error.response.data.message)
                console.log(error)
            }
            setTimeout(() => { 
                navigate('/auth/login-user')
            }, 2000)
        }
        verifyEmail()
    }, [verificationToken])

    

    return (
        <Container>
            <div className='flex justify-center items-center flex-col h-screen w-full text-center'>
                {
                    isVerified ? (
                        <>
                            <CircleCheck className='h-36 w-40
                        animate__animated animate__bounce animate__infinite
                        ' color='green' />
                            <h1
                                className='text-3xl pt-2 font-bold text-gray-800'
                            >Email Verified Successfully!
                            </h1>
                            <p
                                className='w-96 pt-5 text-lg text-gray-600'
                            >Thank you for verifying your email address. You can now login to your account.</p>
                        </>
                    ) : (
                        <div className='flex flex-col items-center justify-center'>
                            <CircleAlert className='h-36 w-40' color='red' />
                            <h1 className='text-3xl pt-2 font-bold text-danger'
                            >{error}
                            </h1>
                        </div>
                    )
                }
            </div>
        </Container>
    )
}

export default EmailVerificationPage