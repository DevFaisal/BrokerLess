import React from 'react'
import { useForm } from 'react-hook-form'
import PrimaryButton from './PrimaryButton'


function UserRegistration() {
    const { register,
        formState: { errors },
        handleSubmit } = useForm({
            defaultValues: {
                full_name: '',
                email: '',
                password: ''
            }
        })
    const onSubmit = (data) => {
        console.log(data)
    }
    const Inputs = [
        {
            label: 'Full Name',
            type: 'text',
            name: 'full_name',
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
            label: 'Password',
            type: 'password',
            name: 'password',
            placeholder: 'Enter your password',
            required: true

        }
    ]
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='p-5 bg-white w-[500px] rounded-md max-w-1/2 shadow-md'>
            <div className='flex flex-col p-10  w-auto  gap-3'>
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
                    onClick={handleSubmit(onSubmit)}
                >
                    Sign Up
                </PrimaryButton>
            </div>
        </form>
    )
}

export default UserRegistration