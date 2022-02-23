import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import useMediaQuery from '../hooks/mediaQuery/MediaQuery';
import axios from 'axios'
import Link from 'next/link'
import ArrowUp from '../../public/icons/noun-arrow-blue-up.png';
import ArrowDown from '../../public/icons/noun-arrow-blue.png';
import ArrowDownWhite from '../../public/icons/noun-arrow-white.png';
import ArrowUpWhite from '../../public/icons/noun-arrow-white-up.png';
import ArrowUpRed from '../../public/icons/noun-arrow-red-up.png';

export default function Dropdown() {

    const [service, setService] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [fetchError, setFetchError] = useState(false); 
    const isDesktop = useMediaQuery("(min-width: 992px)");

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

      useEffect(async() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setFetchError(false);

        try {
            const res = await axios.get(process.env.NEXT_PUBLIC_API_SERVICES, { signal : signal });
            setService(res.data);
            setFetchError(false);
        } catch(err) {
            setFetchError(true);
            console.log(err);
        }

          return function cleanUp() {
            abortController.abort();
        }

      }, []);

    return (
        <div className="dropdown">

            {isDesktop ? 
            
                    <div 
                    className="dropdown__link-container" 
                    onClick={toggleDropdown}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)} 
                    >
                        <div className="nav__link--extra-a">Tjenester</div>
                        <span className="dropdown__select--img">
                            {dropdownOpen ? 
                                <Image
                                src={ArrowUpRed.src}
                                width="100"
                                height="100"
                                /> 
                                :  
                                <Image
                                src={ArrowDown.src}
                                width="100"
                                height="100"
                                />}
                        </span>
                    </div>

            :
            
                    <div 
                    className="dropdown__link-container" 
                    onClick={toggleDropdown} >
                        <div className="nav__link--extra-a">Tjenester</div>
                        <span className="dropdown__select--img">
                           <Image
                                src={dropdownOpen ? ArrowUpWhite.src : ArrowDownWhite.src}
                                width="5"
                                height="5"
                                /> 
                        </span>
                    </div>

            }

                {/* TERNARY OPERATOR ISDESKTOP.... */}
                <div 
                className={dropdownOpen ? "dropdown__down" : "dropdown__up"}
                onMouseEnter={() => setDropdownOpen(true)} 
                onMouseLeave={() => setDropdownOpen(false)}
                >
                <div className="dropdown__select"> 

                    {service.map((s) => (
                        <div key={s.id} className="link__container dropdown__container-link">
                            <Link href={`/${s.slug}`} className="dropdown__option--link">
                                <div as="option" className="dropdown__option">
                                    <img src={s.icon} alt={`service icon ${s.title}`} className="dropdown__option--img" />
                                    <p className="dropdown__option--a">{s.title}</p> 
                                </div>
                            </Link> 
                        </div>
                    ))}

                    {isDesktop ? 
                        <div className="link__container dropdown__text">
                            <p>En tett pipe er en viktig forsikring mot brann, og i tillegg er det bra for miljøet.</p>
                        </div>
                    : '' }

                </div>
            </div>
        </div>
    )
}
