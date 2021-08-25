import Link from 'next/link'
import React from 'react'

export default function PrimaryBtn({link, text}) {
    return (
        <div className="primary-btn">

          <Link href={link}>{text}</Link>  
            
        </div>
    )
}
