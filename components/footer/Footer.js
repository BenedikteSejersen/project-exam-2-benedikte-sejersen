import React, { useEffect, useState } from 'react'
import Logo from '../../public/images/logo/npr-logo-white.png'
import Link from 'next/link'
import Instagram from '../../public/images/icons/instagram-white.svg'
import Facebook from '../../public/images/icons/facebook-white.svg'
import PhoneWhiteIcon from '../../public/images/icons/phone-white-icon.png'
import Image from 'next/image'
import axios from 'axios'
import SoMe from '../soMe/SoMe'

export default function Footer() {

    // const [service, setService] = useState([]);

    // async function getServices() {
    //     try {
    //         const res = await axios.get("http://localhost:1337/categories");
    //         setService(res.data);
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     getServices();
    // }, []);

    return (
        <footer className="footer">

            <div className="footer__logo-container">
                <Link href="/">
                    <a>
                        <Image src={Logo.src} alt="npr logo" className="footer__logo" width="250" height="100" />
                    </a>
                </Link>  
            </div>

            <div className="footer__flex">

                <div className="footer__links-container">
                    <h6 className="footer__h6">Navigation</h6>
                    <ul>
                        {/* {service.map((s) => (
                            <div key={s.title}>
                                <li className="footer__links">
                                    <Link href={`/service/s.slug`}>{s.title}</Link>
                                </li>  
                            </div>
                        ))} */}
                        <li className="footer__links">
                            <Link href="/about">About us</Link>
                        </li>
                        <li className="footer__links">
                            <Link href="/contact">Contact us</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer__links-container">
                    <h6 className="footer__h6">Admin</h6>
                    <ul>
                        <li className="footer__links">
                            <Link href="/login">Admin</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer__links-container">
                    <h6 className="footer__h6">Social media</h6>
                    <SoMe classname="footer__some" width="30" height="30" />
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
