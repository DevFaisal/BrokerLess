import React from 'react'
import { useForm } from 'react-hook-form'
import PrimaryButton from './PrimaryButton'
import Container from './Container'


function LandLordRegistration() {
    const { register,
        formState: { errors },
        handleSubmit } = useForm({
            defaultValues: {
                full_name: '',
                email: '',
                password: '',
                phone_number: '',
                street_address: '',
                city: '',
                state: '',
                zip_code: '',
                country: ''
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
        },
        {
            label: 'Phone Number',
            type: 'tel',
            name: 'phone_number',
            placeholder: 'Enter your phone number',
            required: true
        },
        {
            label: 'Street Address',
            type: 'text',
            name: 'street_address',
            placeholder: 'Enter your street address',
            required: true
        },
        {
            label: 'City',
            type: 'text',
            name: 'city',
            placeholder: 'Enter your city',
            required: true
        },
        {
            label: 'State',
            type: 'text',
            name: 'state',
            placeholder: 'Enter your state',
            required: true
        },
        {
            label: 'Zip Code',
            type: 'text',
            name: 'zip_code',
            placeholder: 'Enter your zip code',
            required: true
        },
        {
            label: 'Country',
            type: 'text',
            name: 'country',
            placeholder: 'Enter your country',
            required: true
        },

    ]
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)} className='px-2 bg-white  rounded-md shadow-lg'>
                <div className='flex flex-col p-10  w-auto  gap-3'>
                    <h1 className='text-3xl text-center font-bold text-secondary mb-5'>Landlord Registration</h1>
                    <span
                        className='h-[1px] w-auto bg-success mb-5'
                    />
                    <h1 className='text-2xl font-semibold text-black'>
                        Sing Up to your account
                    </h1>

                    {
                        Inputs.map((input, index) => (
                            <div key={index}
                                className='flex flex-col items-evenly  gap-1  p-1'
                            >
                                <div className='flex justify-between  grid-cols-2 gap-2'>
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
                                        className='w-2/3 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                                    />
                                </div>

                            </div>
                        ))

                    }
                    <PrimaryButton
                        onClick={handleSubmit(onSubmit)}
                    >
                        Sign Up
                    </PrimaryButton>
                </div>
            </form >
        </Container>
    )
}

export default LandLordRegistration