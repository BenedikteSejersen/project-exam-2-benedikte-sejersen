import React from 'react'
import Logo from '../../public/images/logo/npr-logo-white.png'
import Link from 'next/link'
import Instagram from '../../public/images/icons/instagram-white.svg'
import Facebook from '../../public/images/icons/facebook-white.svg'
import PhoneWhiteIcon from '../../public/images/icons/phone-white-icon.png'
import Dropdown from '../dropdown/Dropdown';
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer__logo-container">
                <Link href="/">
                    <Image src={Logo.src} alt="npr logo" className="footer__logo" width="250" height="100" />
                </Link>  
            </div>

            <div className="footer__flex">

                <div className="footer__links-container">
                    <h6 className="footer__h6">Navigation</h6>
                    <ul>
                        <li><Dropdown /></li>
                        <li><Link href="/about">About us</Link></li>
                        <li><Link href="/contact">Contact us</Link></li>
                    </ul>
                </div>

                <div className="footer__links-container">
                    <h6 className="footer__h6">Admin</h6>
                    <ul>
                        <li><Link href="/login">Admin</Link></li>
                    </ul>
                </div>

                <div className="footer__links-container">
                    <h6 className="footer__h6">Social media</h6>
                    <ul className="footer__some">
                        <li className="footer__some--link">
                            <Link href="https://www.facebook.com/norskpiperehabiliteringas">
                                <Image src={Facebook.src} alt="facebook icon" width="300" height="300" />
                            </Link>
                        </li>
                        <li className="footer__some--link">
                            <Link href="https://www.instagram.com/norskpiperehabiliteringas/?fbclid=IwAR3PU2R8efz3yPDdubWPhYu-dVwbsW_ULw1NxlfmyHBAaFEpTf_zcjES1b0">
                                <Image src={Instagram.src} alt="instagram icon" width="300" height="300" />
                            </Link>
                        </li>
                    </ul>

                </div>

                <div className="footer__links-containe">
                        <a href="tel:+47 921 41 312" className=" footer__contact">
                            <img src={PhoneWhiteIcon.src} alt="phone icon" width="30" height="30" />
                            <h3 className="footer__h3">+47 921 41 312</h3>  
                        </a>
                </div>

            </div>

            <div className="footer__copyright">
                Norsk piperehabilitering AS
            </div>
            
        </footer>
    )
}
