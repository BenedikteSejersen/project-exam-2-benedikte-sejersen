import React, { useEffect, useState } from 'react'
import PrimaryBtn from '../btn/PrimaryBtn'

export default function HomeContact({ heading, children }) {

    const [googleMaps, setGoogleMaps] = useState("");

    async function getGoogleMaps() {
        try {
            const res = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDpBOdDuq-zgQGNTMFeWjQGDwSnLtS9H-o&q=Rødmyrjordet+6";
            setGoogleMaps(res);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getGoogleMaps();
    }, [])

    return (
        <div className="index-contact">
            <div className="index-contact__flex">

            <div className="index-contact__text">
               <h2 className="index-contact__h2">{heading}</h2>

                <div className="index-container__children">{children}</div>

                <PrimaryBtn link="/contact" text="Contact us" /> 
            </div>

            <div className="index-contact__map-container">
                <iframe 
                    width="600" 
                    height="450" 
                    style={{border:0}}
                    loading="lazy" 
                    allowFullScreen
                    src={googleMaps}
                    className="index-contact__map"
                    ></iframe> 
            </div>


            </div>
        </div>
    )
}
