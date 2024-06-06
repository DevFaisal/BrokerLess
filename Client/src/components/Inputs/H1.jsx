import React from 'react'

function H1(
    {
        children,
        className = '',
        ...rest
    }
) {
    return <h1
        className={`${className} text-primary font-bold text-5xl md:text-8xl`}
    >{children}</h1>
}

export default H1