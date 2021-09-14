import React from 'react'
import UpdateIcon from '../../public/images/icons/update-icon.png'
import Image from 'next/image'
import Link from 'next/link'

export default function UpdateContent(props) {

    const handleClick = () => {
        console.log("clicked")
    }

    return (
        <div>

            <div onClick={() => handleClick()} className="update-icon">
                <Link href="/admin-update">
                    <a><Image src={UpdateIcon.src} width="50" height="50" alt="update the content icon" /></a>
                </Link>
            </div>
            
        </div>
    )
}
