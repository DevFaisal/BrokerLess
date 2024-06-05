import React from 'react'

function PrimaryButton({
    children,
    onClick,
    className,
    ...props
}) {
    return (
        <button
            className={`px-4 py-2 bg-primary rounded-xl border border-neutral-600 hover:text-black text-white hover:bg-gray-100 transition duration-200 ${className}`}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default PrimaryButton