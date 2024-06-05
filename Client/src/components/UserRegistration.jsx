import React from 'react'
import { useForm } from 'react-hook-form'
import PrimaryButton from './PrimaryButton'
import Container from './Container'
import { LoaderCircle } from 'lucide-react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'



function UserRegistration() {

    const navigate = useNavigate()
    const [loading, setLoading] = React.useState(false)
    const { register,
        formState: { errors },
        handleSubmit } = useForm({
            defaultValues: {
                name: '',
                email: '',
                password: '',
                phone: ''
            },
        })
    const onSubmit = async (data) => {
        setLoading(true)
        const response = await axios.post(`${import.meta.env.VITE_LOCALHOST}/auth/user/register`, data)
            .then((res) => {
                setLoading(false)
                toast.success(res.data.message)
                navigate('/login')
                return res;
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error.response.data.message)
                return error;
            });
    }
    const Inputs = [
        {
            label: 'Full Name',
            type: 'text',
            name: 'name',
            placeholder: 'Enter your full name',
            required: true

        },
        {
            label: 'Email',
            type: 'email',
            name: 'email',
            placeholder: 'Enter your email address',
            required: true

        },
        {
            label: 'Phone Number',
            type: 'tel',
            name: 'phone',
            placeholder: 'Enter your phone number',
            required: true
        },
        {
            label: 'Password',
            type: 'password',
            name: 'password',
            placeholder: 'Enter your password',
            required: true


        },
    ]
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)} className='p-5 bg-white mx-5 2xl:mx-40 rounded-md max-w-1/2 shadow-md'>
                <div className='flex flex-col  w-auto  gap-3'>
                    <h1 className='text-3xl text-center font-bold text-secondary mb-5'>User Registration</h1>
                    <span
                        className='h-[1px] w-auto bg-background mb-5'
                    />
                    <h1 className='text-2xl font-semibold text-black'>
                        Sing Up to your account
                    </h1>
                    {
                        Inputs.map((input, index) => (
                            <div key={index}>
                                <label className='block font-semibold text-black'>{input.label}
                                </label>
                                <input
                                    id={input.name}
                                    key={index}
                                    {...register(input.name, { required: input.required })}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    aria-invalid={errors[input.name] ? "true" : "false"}
                                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                                />
                                <p
                                    className='text-red-500 text-sm pt-1 font-bold'
                                >
                                    {errors[input.name] && errors[input.name].type === 'required' && `${input.label} is required`}
                                </p>
                            </div>
                        ))

                    }
                    <PrimaryButton
                        className={"flex justify-center w-full mt-5 "}
                        onClick={handleSubmit(onSubmit)}
                    >

                        {
                            loading ? <LoaderCircle size={20} className='text-white animate-spin' /> : 'Register'
                        }
                    </PrimaryButton>
                    <p>
                        Already have an account? <Link to='/auth/login-user' className='text-success'>Login</Link>
                    </p>
                    <p>
                        Are you a landlord? <Link to='/auth/register-landlord' className='text-success'>Register as a landlord</Link>
                    </p>
                </div>
            </form>
        </Container>
    )
}

export default UserRegistration