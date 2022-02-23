import React from 'react'

export default function Link({link, text}) {
    return (
        <div>
            <a 
            href={link}
            className='link-btn'>
                {text}
            </a>
        </div>
    )
}
