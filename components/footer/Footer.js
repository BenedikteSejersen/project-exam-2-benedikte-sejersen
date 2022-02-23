import React, { useEffect, useState } from 'react'
import Logo from '../../public/images/logo/npr-logo-white.png'
import Link from 'next/link'
import Instagram from '../../public/images/icons/instagram-white.svg'
import Facebook from '../../public/images/icons/facebook-white.svg'
import PhoneWhiteIcon from '../../public/images/icons/phone-white-icon.png'
import Image from 'next/image'
import axios from 'axios'
import useMediaQuery from '../hooks/mediaQuery/MediaQuery';

export default function Footer() {

    const [service, setService] = useState([]);

    const isTablet = useMediaQuery("(min-width: 992px)");

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(process.env.NEXT_PUBLIC_API_SERVICES, { signal : signal })
          .then((response) => response.json())
          .then((data) => setService(data)) 
          .catch((error) => console.log(error.message));

          return function cleanUp() {
            abortController.abort();
        }

      }, []);

    return ( 
        <>

        <footer className="footer">

            <div className="footer__logo-container">

                <div>
                    <Link href="/">
                        <div className="footer__img">
                            <Image src={Logo.src} alt="npr logo" className="footer__logo" width="420" height="150" />
                        </div>
                    </Link> 
                </div>
                
                {isTablet 
                    ?
                        <div className='footer__text'>
                            <p>En tett pipe er en viktig forsikring mot brann, og i tillegg er det bra for miljøet.</p>
                        </div>
                    : ''
                    } 
            </div>

            <div className="footer__contain">

                {isTablet ? ''
                : 
                <div className='footer__phone-container footer__link-container'>
                    <Link href="tel:+47 921 41 312" className=" footer__contact">
                        <>
                            <div className="footer__contact--img">
                                <Image src={PhoneWhiteIcon.src} alt="phone icon" width="30" height="30" />
                            </div>
                            <h3 className="footer__phone--number">92 14 13 12</h3>  
                        </>
                    </Link>
                </div>
                }

                    <div className='footer__link-container'>
                        <h3 className="footer__h6">Norsk Piperehabilitering AS</h3>
                        <ul>
                            <li className="footer__links">
                                <Link href="/om-oss">Om oss</Link>
                            </li>
                            <li className="footer__links">
                                <Link href="/kontakt-oss">Kontakt oss</Link>
                            </li>  
                        </ul>
                    </div>

                    <div className='footer__link-container'>
                        <h3 className="footer__h6">Våre tjenester</h3>
                        <ul>
                            {service.map((s) => (
                                <div key={s.title}>
                                    <li className="footer__links">
                                        <Link href={`/${s.slug}`}>{s.title}</Link>
                                    </li>  
                                </div>
                            ))}
                        </ul>
                    </div>

                    <div className='footer__link-container'>
                        <h3 className="footer__h6">Følg oss</h3>
                        <Link className='footer__links' href="https://www.instagram.com/norskpiperehabiliteringas/">
                            <div className='footer__links--SoMe'>
                                <div className="footer__SoMe--img">
                                    <Image src={Instagram.src} width="30" height="30" />
                                </div>
                                <p className='footer__SoMe--p'>Instagram</p>
                            </div>
                        </Link>
                        <Link className='footer__links' href="https://www.facebook.com/norskpiperehabiliteringas/">
                            <div className='footer__links--SoMe'>
                                <div className="footer__SoMe--img">
                                    <Image src={Facebook.src} width="30" height="30" />
                                </div>
                                <p className='footer__SoMe--p'>Facebook</p>
                            </div>
                        </Link>
                    </div>

                    {isTablet ?
                    <div className='footer__phone-container footer__link-container'>
                        <Link href="tel:+47 921 41 312" className=" footer__contact">
                            <>
                                <div className="footer__contact--img">
                                    <Image src={PhoneWhiteIcon.src} alt="phone icon" width="30" height="30" />
                                </div>
                                <h3 className="footer__phone--number">92 14 13 12</h3>  
                            </>
                        </Link>
                    </div>
                    : ''
                    }

                    {isTablet ? ''
                    : 
                        <div className='footer__link-container footer__text'>
                            <p>En tett pipe er en viktig forsikring mot brann, og i tillegg er det bra for miljøet.</p>
                        </div>
                    }

                </div>

            <div className="footer__copyright">
                © Norsk Piperehabilitering AS
            </div>
            
        </footer>
        </>
    )
}
