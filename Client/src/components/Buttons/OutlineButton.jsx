import React from 'react'

function OutlineButton({
    children,
    onClick,
    type,
    className,
}) {
    return (
        <button className={`${className} px-4 py-2 rounded-md border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200`}
            onClick={onClick}
            type={type}>
            {children}
        </button >
    )
}

export default OutlineButton

