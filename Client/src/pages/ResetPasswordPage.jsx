import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import PrimaryButton from '../components/PrimaryButton'
import { Link } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const { verificationToken } = useParams()

    useEffect(() => {
        const checkVerificationToken = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_LOCALHOST}/auth/user/reset-password/${verificationToken}`)
                console.log(response)
                if (response.status === 200) {
                    setError(false)
                } else {
                    setError(false)
                    setErrorMessage(response.data.message)
                }
            } catch (error) {
                setErrorMessage(error.response.data.message)
                console.log(error)
            }
        }
        checkVerificationToken()
    }, [verificationToken])


    const resetPassword = async () => {
        if (!password) {
            return toast.error('Please enter your password')
        }
        if (!confirmPassword) {
            return toast.error('Please confirm your password')
        }

        if (password !== confirmPassword) {
            return toast.error('Passwords do not match')
        }
        setLoading(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_LOCALHOST}/auth/user/reset-password`, { password, verificationToken })
            if (response.status === 200) {
                toast.success(response.data.message)
                setTimeout(() => {
                    navigate('/auth/login-user')
                }, 2000)
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.response.data.message)

        }
        setLoading(false)
    }


    return (
        <>
            {error ? <Container>
                <div className='flex flex-col items-center justify-center h-screen w-full'>
                    <h1 className='text-3xl text-danger font-bold'>
                        Error 404
                    </h1>
                    <p className='text-lg text-gray-500'>
                        {errorMessage}
                    </p>
                </div>
            </Container> :
                <Container>
                    <div className='flex items-center justify-center h-screen w-full'>
                        <div className='flex flex-col  items-center justify-start w-1/3  p-10 border bg-white border-gray-300 rounded-md
                        shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105
                        '>
                            <h1
                                className='text-3xl font-bold mb-32'
                            >
                                Reset Password
                            </h1>
                            <label
                                className=' w-full text-black font-bold'
                            >
                                Enter new password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className=' w-full p-2 border border-gray-300 rounded-md'
                                placeholder='Write your new password here'
                                type="password" />
                            <label
                                className=' w-full text-black font-bold'
                            >
                                Confirm new password
                            </label>
                            <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className=' w-full p-2 border border-gray-300 rounded-md'
                                placeholder='Write your new password here again'
                                aria-invalid='spelling'
                                type="password" />
                            <PrimaryButton
                                className={'flex justify-center w-full mt-5 mb-5 '}
                                onClick={resetPassword}
                            >
                                {
                                    loading ? <LoaderCircle size={20} className='text-white animate-spin' /> : 'Reset Password'
                                }
                            </PrimaryButton>
                            <Link
                                to="/auth/login-user"
                                className='text-secondary hover:underline'
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </Container>
            }
        </>
    )
}

export default ResetPasswordPage