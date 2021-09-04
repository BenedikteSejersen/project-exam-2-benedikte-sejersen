import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Instagram from '../../public/images/icons/instagram.png'
import Facebook from '../../public/images/icons/facebook.png'

export default function SoMe({classname, width, height}) {
    return (
        <div className={classname}>

            <div className="some__img">
                <Link href="https://www.instagram.com/norskpiperehabiliteringas/"><Image src={Instagram.src} alt="SoMe instagram" width={width} height={height} /></Link>
            </div>

            <div className="some__img">
                <Link href="https://www.facebook.com/norskpiperehabiliteringas/"><Image src={Facebook.src} alt="SoMe facebook" width={width} height={height} /></Link>
            </div>
            
        </div>
    )
}
