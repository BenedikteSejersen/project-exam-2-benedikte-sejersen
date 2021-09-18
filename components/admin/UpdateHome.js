import React, { useState } from 'react'
import Image from 'next/image';
import UpdateIcon from '../../public/images/icons/update-icon.png';

export default function UpdateHome({ home }) {

    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
    }

    return (
        <div>

            <div onClick={() => handleClick()} className="update-icon">
                <div>
                    <a><Image src={UpdateIcon.src} width="50" height="50" alt="update the content icon" /></a>
                </div>
            </div>

           {clicked && (
               <>
                <div className="index__text-container index__text--h1">
                    <input 
                    defaultValue={home.heading_header} 
                    />
                </div>
                <div className="index__text-container index__text--h3">
                    <input 
                    defaultValue={home.description_header} 
                    />
                </div>
               </>
           )}
            
        </div>
    )
}
