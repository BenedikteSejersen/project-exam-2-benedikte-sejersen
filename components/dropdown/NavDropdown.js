import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ArrowDown from '../../public/images/icons/arrow-down.png'
import ArrowDownWhite from '../../public/images/icons/arrow-down-white.png'
import ArrowUp from '../../public/images/icons/arrow-up.png'
import ArrowUpWhite from '../../public/images/icons/arrow-up-white.png'
import useMediaQuery from '../hooks/mediaQuery/MediaQuery';
import axios from 'axios'
import Link from 'next/link'

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
                        <a>Our services</a>
                        <span className="dropdown__select--img">
                           <Image
                                src={dropdownOpen ? ArrowUp.src : ArrowDown.src}
                                width="10"
                                height="10"
                                /> 
                        </span>
                    </div>

            :
            
                    <div 
                    className="dropdown__link-container" 
                    onClick={toggleDropdown} >
                        <a>Our services</a>
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
                            <Link href={`/service/[slug]`} as={`/service/${s.slug}`} className="dropdown__option--link">
                                <div as="option" className="dropdown__option">
                                    <img src={s.icon} alt={`service icon ${s.title}`} className="dropdown__option--img" />
                                    <span className="dropdown__option--a">{s.title}</span> 
                                </div>
                            </Link> 
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
