import React from 'react'

export default function SecondaryBtn({link, text}) {
    return (
            <div className="secondary-btn">
               <a href={link} className="secondary-btn__a">
                    <span className="secondary-btn__a--text">{text}</span>
                </a> 
            </div>  
    )
}
