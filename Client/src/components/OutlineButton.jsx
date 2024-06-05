import React from 'react'

function OutlineButton({
    children,
    onClick,
    type,
    className,
    disabled,
    loading,
    ...rest
}) {
    return (
        <button button className={`${className} px-4 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200`}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button >
    )
}

export default OutlineButton

