import React from 'react'

function Input(
    {
        children,
        type,
        name,
        placeholder,
        value,
        onChange,
        required,
        className,
        label,
        errors,
        register,
        ...props

    }
) {
    return (
        <div>
            <label
                className='block font-semibold text-black'
            >
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={`${className} w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent`}
                {...props}

            />
            {children}
        </div>
    )
}

export default Input