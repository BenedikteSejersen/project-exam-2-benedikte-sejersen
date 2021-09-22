import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ArrowDown from '../../public/images/icons/arrow-down.png'
import ArrowDownWhite from '../../public/images/icons/arrow-down-white.png'
import ArrowUp from '../../public/images/icons/arrow-up.png'
import ArrowUpWhite from '../../public/images/icons/arrow-up-white.png'
import useMediaQuery from '../hooks/mediaQuery/MediaQuery';
import axios from 'axios'

export default function Dropdown() {

    const [service, setService] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 992px)");

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    async function getServices() {
        try {
            const res = await axios.get(process.env.NEXT_PUBLIC_API_SERVICES);
            setService(res.data);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getServices();
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
                        <a key={s.id} href={`/service/${s.slug}`} className="dropdown__option--link">
                            <div as="option" className="dropdown__option">
                                <img src={s.icon} alt={`service icon ${s.title}`} className="dropdown__option--img" />
                                <span className="dropdown__option--a">{s.title}</span> 
                            </div>
                        </a> 
                    ))}

                </div>
            </div>
        </div>
    )
}
