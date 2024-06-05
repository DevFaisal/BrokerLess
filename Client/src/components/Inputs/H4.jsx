import React from 'react'

function H4({
    children,
    className = '',
    ...rest
}) {
    return <h2
        className={`${className} text-secondary font-bold text-xl md:text-2xl`}
    >{children}</h2>

}
export default H4