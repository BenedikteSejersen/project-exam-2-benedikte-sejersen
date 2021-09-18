import React from 'react'
import ArrowLeft from '../../public/images/icons/arrow-left.png'
import Image from 'next/image'

export default function SecondaryBtn({link, text}) {
    return (
            <div className="secondary-btn">
               <a href={link} className="secondary-btn__a">
                    <span className="secondary-btn__a--text">{text}</span>
                    <span className="secondary-btn__img">
                        <Image src={ArrowLeft.src} width="10" height="10" alt="arrow to the left" />
                    </span>
                </a> 
            </div>  
    )
}
