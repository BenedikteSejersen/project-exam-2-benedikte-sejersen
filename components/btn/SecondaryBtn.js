import React from 'react'
import ArrowLeft from '../../public/images/icons/arrow-left.png'
import Image from 'next/image'

export default function SecondaryBtn({link, text}) {
    return (
        <div className="secondary-btn__container">
            <a href={link} className="secondary-btn">
                {text}
                <Image src={ArrowLeft} width="10" height="10" alt="arrow to the left" className="secondary-btn__img" />
            </a>
        </div>
        
    )
}
