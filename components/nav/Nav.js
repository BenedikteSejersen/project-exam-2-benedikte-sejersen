import React, { useState } from 'react'
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
import { Squash as Hamburger } from 'hamburger-react';
import Dropdown from '../dropdown/NavDropdown'
import useMediaQuery from '../hooks/mediaQuery/MediaQuery';

export default function Navigation() {

    const router = useRouter();

    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const isDesktop = useMediaQuery('992px');

    // Log out
    function handleClickLogout() {
        setOpenLogout(true);
    }

    function handleCancel() {
        setOpenLogout(false);
    }

    function handleClick() {
        setOpen(!open);
    }

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    }

    return (
        
        <>
        <nav>
            <ul>
                <div className="nav__flex--desktop">

                <div className="nav__mobile">
                    <li className='logo logo-active'>
                        <Link href="/" > 
                            <Image src={NavLogo.src} width='300' height='80' />
                        </Link>
                    </li>

                    <div onClick={toggleHamburger} className={hamburgerOpen ? "hamburger-active" : "hamburger-inactive"} >
                        {hamburgerOpen ? <p className='hamburger-inactive--p hamburger-active--p'>Lukk</p> : <p className='hamburger-inactive--p'>Meny</p>}
                        <Hamburger />
                    </div>
                    
                </div>
            
                <div className={hamburgerOpen ? 'nav__active' : 'nav__inactive'}>
                    <div className="nav__menu">

                        {isDesktop ? ' ' : 
                        <div className="logo logo-active">
                            <Link href="/" > 
                                <Image src={NavLogoWhite.src} alt="Norsk piperehabilitering AS logo" width='300' height='80' />
                            </Link>
                        </div>}
                        
                        <div> 

                        {isDesktop ? ' ' : <p className='nav__hamburger-open--p'>Meny</p> }

                            <ul className="nav__menu-links">
                            
                            {router.pathname != "/" ?   <li className="nav__link nav__link--extra">
                                                            <Link href="/">
                                                                <div className="nav__link--extra-a">Hjem</div>
                                                            </Link>
                                                        </li>
                                                        : 
                                                        ""} 

                            <li className={`nav__link--dropdown nav__link ${router.pathname == "/services" ? "active" : "nav__link--extra"}`} >
                                    <Dropdown />
                            </li>

                            <li className={`nav__link ${router.pathname == "/om-oss" ? "active" : "nav__link--extra"}`}>
                                <Link href="/om-oss">
                                    <div className="nav__link--extra-a">Om oss</div>
                                </Link>
                            </li>

                            <li className={`nav__link ${router.pathname == "/kontakt-oss" ? "active" : "nav__link--extra"}`}>
                                <Link href="/kontakt-oss">
                                    <div className="nav__link--extra-a">Kontakt oss</div>
                                </Link>
                            </li>

                            </ul>
                            
                        </div>
                        
                        <div className="nav__contact-options">
                            <span className="nav__phone-option">

                                {hamburgerOpen ? 
                                 <span className="nav__phone-option">
                                    <img src={PhoneWhiteIcon.src} alt="phone icon" width="30" height="30" className="nav__phone--icon" />
                                    <Link href="tel:+47 921 41 312" >92 14 13 12</Link>
                                </span> 
                                : 
                                <>
                                    <img src={PhoneBlackIcon.src} alt="phone icon" width="30" height="30" />
                                    <h3 className="nav__phone-number">92 14 13 12</h3>
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

                        {/* {authKey ?  
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
                                <p className="logout" onClick={() => handleClickLogout()}>Logout</p>
                            </div>
                        </div>
                        : "" } */}

                    </div>
                </div>

            </ul> 
        </nav>

        <span className="nav__search-option">
            {open && (<Filter click={() => handleClick()} />)}
        </span>

        {/* <span>
            {openLogout ?
                <Logout HandleCancel={() => handleCancel()} />
            : "" }
        </span> */}
        </>
    )
}
