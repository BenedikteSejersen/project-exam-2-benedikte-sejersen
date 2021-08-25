import Link from 'next/link'
import React, { useState } from 'react'
import ArrowDown from '../../public/images/icons/arrow-down.png'
import ArrowUp from '../../public/images/icons/arrow-up.png'
import OvenMounting from '../../public/images/icons/oven-black.png'
import PipeFittings from '../../public/images/icons/pipe-fitting-black.png'
import SteelPipes from '../../public/images/icons/steel-pipes-black.png'
import Rehabilitation from '../../public/images/icons/rehabilitation-black.png'
import useMediaQuery from '../hooks/mediaQuery/MediaQuery';

import axios from 'axios'

export async function getStaticPaths() {
	try {
		const res = await axios.get(process.env.API_SERVICES);
		console.log(res.data);
		const service = res.data.data;

		const paths = service.map((s) => ({
			params: { service: s.service },
		}));

		// console.log(paths);

		return { paths: paths, fallback: false };
	} catch (error) {
		console.log(error);
	}
}

export async function getStaticProps({ params }) {
	const url = process.env.API_SERVICES/`${params.link}`;

	let services = null;

	try {
		const response = await axios.get(process.env.API_SERVICES);
		// the value we want is on response.data here, not response.data.data
		services = response.data;
	} catch (error) {
		console.log(error);
	}

	return {
		props: {
            service: services,
        },
	};
}

export default function Dropdown({ service }) {

    console.log(service)
    console.log(process.env.API_SERVICES)

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const isDesktop = useMediaQuery("(min-width: 992px)");


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
            
                <div as="select" className="dropdown__select">

                    {/* {props.result.map} */}

                    <a href="/oven-mounting" className="dropdown__option--link">
                        <div as="option" className="dropdown__option">
                            <img src={OvenMounting.src} alt="service" className="dropdown__option--img" />
                            <a className="dropdown__option--a">Oven mounting</a> 
                        </div>
                    </a>
                   

                    <a href="/oven-mounting" className="dropdown__option--link">
                        <div as="option" className="dropdown__option">
                            <img src={PipeFittings.src} alt="service" className="dropdown__option--img" />
                            <a className="dropdown__option--a">Pipe fitting</a> 
                        </div>
                    </a>
                    
                    <a href="/oven-mounting" className="dropdown__option--link">
                        <div as="option" className="dropdown__option">
                            <img src={SteelPipes.src} alt="service" className="dropdown__option--img" />
                            <a className="dropdown__option--a">Steel pipes</a> 
                        </div>
                    </a>
                    
                    <a href="/oven-mounting" className="dropdown__option--link">
                        <div as="option" className="dropdown__option">
                            <img src={Rehabilitation.src} alt="service" className="dropdown__option--img" />
                            <a className="dropdown__option--a">Rehabilitation</a> 
                        </div> 
                    </a>

                </div> 

            </div>
            
            
        </div>
    )
}
