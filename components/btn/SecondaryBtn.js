import React from 'react'
import Link from 'next/link'
import ArrowLeft from '../../public/images/icons/arrow-left.png'

export default function SecondaryBtn({link, text}) {
    return (
        <div className="secondary-btn__container">
            <a href={link} className="secondary-btn">

            <Link href={link}>{text}</Link>
            <img src={ArrowLeft.src} alt="arrow to the left" className="secondary-btn__img" />
            
        </a>
        </div>
        
    )
}
