import React from 'react'

export default function WhiteContainer({children, classname}) {
    return (
        <div className={`white-container ${classname}`}>
            {children}
        </div>
    )
}
