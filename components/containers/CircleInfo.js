import React from 'react'

export default function CircleInfo({text, classname}) {
    return (
        <div className={`circle-info ${classname}`}>
           <p className="circle-info__h3">{text}</p> 
        </div>
    )
}
