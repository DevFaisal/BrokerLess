import React from 'react'

function PrimaryButton({
    children,
    onClick,
    className,
    ...props
}) {
    return (
        <button
            className={`bg-primary rounded-md px-4 py-2 text-white ${className}`}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default PrimaryButton