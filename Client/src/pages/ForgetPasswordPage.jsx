import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import PrimaryButton from '../components/PrimaryButton'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { LoaderCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function ForgetPasswordPage() {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const sentEmail = async () => {
        try {
            if (!email) {
                return toast.error('Please enter your email')
            }
            if (!email.includes('@')) {
                return toast.error('Please enter a valid email')
            }
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_LOCALHOST}/auth/user/forgot-password`, { email })
            if (response.status === 200) {
                toast.success(response.data.message)
                useTimeout(() => {
                    navigate('/login')
                }, 2000)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {

            toast.error(error.response.data.message)
        }
        setLoading(false)
    }

    return (
        <Container>
            <Toaster
                position='bottom-center'
                reverseOrder={false}
            />
            <div className='flex items-center justify-center h-screen w-full'>
                <div
                    className='flex flex-col  items-center justify-start w-1/3 h-1/2 p-5 border  border-gray-300 rounded-md'
                >
                    <h1
                        className='text-3xl font-bold mb-32'
                    >
                        Forget Password
                    </h1>
                    <label
                        className=' w-full text-black font-bold'
                    >
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className=' w-full p-2 border border-gray-300 rounded-md'
                        placeholder='Write your email here'
                        aria-invalid='spelling'
                        type="email" />
                    <PrimaryButton
                        className={'flex justify-center w-full mt-5 mb-5 '}
                        onClick={sentEmail}
                    >
                        {
                            loading ? <LoaderCircle size={20} className='text-white animate-spin' /> : 'Send Email'
                        }
                    </PrimaryButton>
                    <Link
                        to="/login"
                        className='text-secondary hover:underline'
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </Container>
    )
}

export default ForgetPasswordPage