import React from 'react'

export default function HomeContact({   heading,
                                        children},
                                        ) {
    return (
        <div>

            <h2>{heading}</h2>

            <div>{children}</div>
            
        </div>
    )
}
