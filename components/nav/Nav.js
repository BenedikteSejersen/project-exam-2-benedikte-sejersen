import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Filter from '../filtering/Filter'
import NavLogo from '../../public/images/logo/logo-black.png'
import NavLogoWhite from '../../public/images/logo/npr-logo-white.png'
import PhoneBlackIcon from '../../public/images/icons/phone-icon.png'
import PhoneWhiteIcon from '../../public/images/icons/phone-white-icon.png'
import SearchBlackIcon from '../../public/images/icons/search-black-icon.png'
import SearchWhiteIcon from '../../public/images/icons/search-white-icon.png'
import User from '../../public/images/icons/user.svg'
import UserWhite from '../../public/images/icons/user-white.svg'
import { Squash as Hamburger } from 'hamburger-react';
import Dropdown from '../dropdown/NavDropdown'
import Logout from '../login/Logout'

export default function Navigation() {

    const router = useRouter();

    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [authKey, setAuthKey] = useState("");
    const [userId, setUserId] = useState("");
    const [open, setOpen] = useState(false);

    function handleClick() {
        setOpen(!open);
    }

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
                <div className="nav__flex--desktop">

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
                            
                            {router.pathname != "/" ?   <li className="nav__link nav__link--extra">
                                                            <Link href="/">
                                                                <a className="nav__link--extra-a">Home</a>
                                                            </Link>
                                                        </li>
                                                        : 
                                                        ""} 

                            <li className={`nav__link--dropdown nav__link ${router.pathname == "/services" ? "active" : "nav__link--extra"}`} >
                                    <Dropdown />
                            </li>

                            <li className={`nav__link ${router.pathname == "/about" ? "active" : "nav__link--extra"}`}>
                                <Link href="/about">
                                    <a className="nav__link--extra-a">About us</a>
                                </Link>
                            </li>

                            <li className={`nav__link ${router.pathname == "/contact" ? "active" : "nav__link--extra"}`}>
                                <Link href="/contact">
                                    <a className="nav__link--extra-a">Contact us</a>
                                </Link>
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
                                <div className="search__icon">
                                    <Image onClick={() => handleClick()} src={hamburgerOpen ? SearchWhiteIcon.src : SearchBlackIcon.src} width="30" height="30" alt="search" />
                                </div>
                            </span> 
                        </div>
                        </div>

                        {authKey ?  
                        <div className="nav__user">
                            <a href="/admin" className="nav__user--id">
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

        <span className="nav__search-option">
            {open && (<Filter click={() => handleClick()} />)}
        </span>
        </>
    )
}
