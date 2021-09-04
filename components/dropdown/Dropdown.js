import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ArrowDown from '../../public/images/icons/arrow-down.png'
import ArrowUp from '../../public/images/icons/arrow-up.png'
import OvenMounting from '../../public/images/icons/oven-black.png'
import PipeFittings from '../../public/images/icons/pipe-fitting-black.png'
import SteelPipes from '../../public/images/icons/steel-pipes-black.png'
import Rehabilitation from '../../public/images/icons/rehabilitation-black.png'
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
            const res = await axios.get("http://localhost:1337/categories");
            setService(res.data);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getServices();
    }, []);

    console.log(service)


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
                        <img 
                        src={dropdownOpen ? ArrowUp.src : ArrowDown.src}
                        className="dropdown__select--img"
                        />
                    </div>

            :
            
                    <div 
                    className="dropdown__link-container" 
                    onClick={toggleDropdown} >
                        <a>Our services</a>
                        <img 
                        src={dropdownOpen ? ArrowUp.src : ArrowDown.src}
                        className="dropdown__select--img"
                        />
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
                        <a href={`/service/${s.slug}`} className="dropdown__option--link">
                            <div as="option" className="dropdown__option">
                                <img src={s.icon[0].formats.thumbnail.url} alt={`service icon ${s.title}`} className="dropdown__option--img" />
                                <a className="dropdown__option--a">{s.title}</a> 
                            </div>
                        </a>
                    ))}

                </div> 

            </div>
            
            
        </div>
    )
}
