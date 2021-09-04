import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import NavLogo from '../../public/images/logo/logo-black.png'
import NavLogoWhite from '../../public/images/logo/npr-logo-white.png'
import PhoneBlackIcon from '../../public/images/icons/phone-icon.png'
import PhoneWhiteIcon from '../../public/images/icons/phone-white-icon.png'
import SearchBlackIcon from '../../public/images/icons/search-black-icon.png'
import SearchWhiteIcon from '../../public/images/icons/search-white-icon.png'
import User from '../../public/images/icons/user.svg'
import UserWhite from '../../public/images/icons/user-white.svg'

import { Squash as Hamburger } from 'hamburger-react';
import Dropdown from '../dropdown/Dropdown'
import SecondaryBtn from '../btn/SecondaryBtn'
import Logout from '../login/Logout'

export default function Navigation({ service }) {

    const router = useRouter();

    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [authKey, setAuthKey] = useState("");
    const [userId, setUserId] = useState("");

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    }

    useEffect(() => {
        const auth = window.localStorage.getItem("auth");
        setAuthKey(auth);
        const user = JSON.parse(window.localStorage.getItem("user"));
        setUserId(user);
    }, [])

    return (
        
        <>
        <nav>
            <ul>

                <div className="nav__mobile">
                    <li>
                        <Link href="/" > 
                            <img src={NavLogo.src} alt="Norsk piperehabilitering AS logo" className="logo"/>
                        </Link>
                    </li>

                    <div onClick={toggleHamburger} className={hamburgerOpen ? "hamburger-active" : "hamburger-inactive"} >
                        <Hamburger />
                    </div>
                    
                </div>
            
                <div className={hamburgerOpen ? 'nav__active' : 'nav__inactive'}>
                    <div className="nav__menu">

                        {hamburgerOpen ? <Link href="/" > 
                            <img src={NavLogoWhite.src} alt="Norsk piperehabilitering AS logo" className="logo logo-active"/>
                        </Link>
                        : ""}

                        {hamburgerOpen ? 
                        <span className="nav__phone-option">
                            <img src={PhoneWhiteIcon.src} alt="phone icon" width="30" height="30" className="nav__phone--icon" />
                            <Link href="tel:+47 921 41 312" >+47 921 41 312</Link>
                        </span>
                        : ""}

                        {hamburgerOpen ? 
                        <div className="circle"></div>
                        : ""} 
                        
                        <div className="nav__menu-links"> 
                            
                            {router.pathname != "/" ?   <li className="nav__link">
                                                            <Link href="/">Home</Link>
                                                        </li>
                                                        :
                                                        ""} 

                            <li className={`nav__link ${router.pathname == "/services" ? "active" : ""}`} >
                                    < Dropdown />
                            </li>

                            <li className={`nav__link ${router.pathname == "/about" ? "active" : ""}`}>
                                <Link href="/about">About us</Link>
                            </li>

                            <li className={`nav__link ${router.pathname == "/contact" ? "active" : ""}`}>
                                <Link href="/contact">Contact us</Link>
                            </li>
                            
                        </div>
                        
                        <div className="nav__contact-options">
                            <span className="nav__phone-option">
                                {hamburgerOpen ? "" : 
                                <>
                                    <img src={PhoneBlackIcon.src} alt="phone icon" width="30" height="30" />
                                    <h3 className="nav__phone-number">+47 921 41 312</h3>
                                </>
                                }
                                
                            </span>
                            <span className="nav__search-option">
                                {hamburgerOpen ? <img src={SearchWhiteIcon.src} alt="search icon" width="30" height="30" /> : <img src={SearchBlackIcon.src} alt="search icon" width="30" height="30" />}
                            </span> 
                        </div>

                        {authKey ?  
                        <div className="nav__user">
                            <a href="/admin">
                                {hamburgerOpen ? 
                                <div className="nav__user--img">
                                    <Image src={UserWhite.src} alt="user icon" width="30" height="35" />
                                </div> 
                                : 
                                <div className="nav__user--img">
                                    <Image src={User.src} alt="user icon" width="30" height="35" />
                                </div>}
                                <p className="nav__user--id">{userId}</p> 
                            </a>
                        
                            <div className="nav__user--log-out">
                                <Logout />
                            </div>
                        </div>
                        : "" }

                    </div>
                </div>

            </ul> 
        </nav>

        <script src="https://code.jquery.com/jquery-latest.min.js"></script>
        </>
    )
}
