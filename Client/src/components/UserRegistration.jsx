import React from 'react'
import { useForm } from 'react-hook-form'
import PrimaryButton from './PrimaryButton'
import Container from './Container'
import { UserSignUpPage } from '../utils/Api_Endpoint'
import { LoaderCircle } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'


function UserRegistration() {


    const [loading, setLoading] = React.useState(false)
    const { register,
        formState: { errors },
        handleSubmit } = useForm({
            defaultValues: {
                name: '',
                email: '',
                password: '',
                phone: ''
            }
        })
    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_LOCALHOST}/auth/user/register`,
                data
            );
            if (response.status === 201) {
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            if (error.response.data.message) {
                return toast.error(error.response.data.message)
            }
            toast.error(error.response.data[0])
        }
        finally {
            setLoading(false)
        }

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
            <Toaster
                position="bottom-center"
            />
            <form onSubmit={handleSubmit(onSubmit)} className='p-5 bg-white mx-5 2xl:mx-40 rounded-md max-w-1/2 shadow-md'>
                <div className='flex flex-col  w-auto  gap-3'>
                    <h1 className='text-3xl font-bold text-secondary mb-5'>User Registration</h1>
                    <span
                        className='h-[1px] w-auto bg-green-600 mb-5'
                    />
                    <h1 className='text-2xl font-semibold text-black'>
                        Sing Up to your account
                    </h1>
                    {
                        Inputs.map((input, index) => (
                            <div key={index}>
                                <label
                                    className='block font-semibold text-black'
                                >
                                    {input.label}
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
                                {
                                    errors[input.name] && <span
                                        className='text-red-500'
                                    >{errors[input.name].message}</span>
                                }
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
                        Already have an account? <a href='/login' className='text-green-600'>Login</a>
                    </p>
                    <p>
                        Are you a landlord? <a href='/landlord-registration' className='text-green-600'>Register as a landlord</a>
                    </p>
                </div>
            </form>
        </Container>
    )
}

export default UserRegistration