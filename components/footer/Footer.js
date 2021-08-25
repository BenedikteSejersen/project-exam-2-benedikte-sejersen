import React from 'react'
import Logo from '../../public/images/logo/npr-logo-white.png'
import Link from 'next/link'
import Instagram from '../../public/images/icons/instagram-white.svg'
import Facebook from '../../public/images/icons/facebook-white.svg'
import PhoneWhiteIcon from '../../public/images/icons/phone-white-icon.png'
import Dropdown from '../dropdown/Dropdown';

export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer__logo-container">
                <img src={Logo.src} alt="npr logo" className="footer__logo" />
            </div>

            <div className="footer__flex">

                <div className="footer__links-container">
                    <h6>Navigation</h6>
                    <ul>
                        <li><Dropdown /></li>
                        <li><Link href="/about">About us</Link></li>
                        <li><Link href="/contact">Contact us</Link></li>
                    </ul>
                </div>

                <div className="footer__links-container">
                    <h6>Admin</h6>
                    <ul>
                        <li><Link href="/login">Admin</Link></li>
                    </ul>
                </div>

                <div className="footer__links-container">
                    <h6>Social media</h6>
                    <ul>
                        <li><img src={Facebook.src} alt="facebook icon" /></li>
                        <li><img src={Instagram.src} alt="instagram icon" /></li>
                    </ul>

                </div>

                <div className="footer__links-container">
                    <img src={PhoneWhiteIcon.src} alt="phone icon" width="30" height="30" />
                    <h3 className="aa">+47 921 41 312</h3>
                </div>

            </div>
            
        </footer>
    )
}
