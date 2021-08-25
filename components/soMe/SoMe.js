import React from 'react'
import Link from 'next/link'

import Instagram from '../../public/images/icons/instagram.png'
import Facebook from '../../public/images/icons/facebook.png'

export default function SoMe({classname}) {
    return (
        <div className={classname}>

            <div className="some__img">
                <Link href="https://www.instagram.com/norskpiperehabiliteringas/"><img src={Instagram.src} alt="SoMe instagram" /></Link>
            </div>

            <div className="some__img">
                <Link href="https://www.facebook.com/norskpiperehabiliteringas/"><img src={Facebook.src} alt="SoMe facebook" /></Link>
            </div>
            
        </div>
    )
}
