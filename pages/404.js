import React from 'react'
import Number4 from '../public/images/404/4.png'
import Number0 from '../public/images/404/0.png'
import HouseShape from '../public/images/404/404_house-shape.png'
import ArrowLeftWhite from '../public/images/404/arrow-left-white.png'
import Image from 'next/image'
import Navigation from '../components/nav/Nav'

export default function Custom404() {
    return (
        <>

        <Navigation />

        <div className="not-found">

        <div className="not-found__house-shape">
            <Image src={HouseShape.src} width="2000" height="2000" />
        </div>

        <div className="not-found__img-container">
           <div className="not-found__img not-found__img-1"> 
               <Image src={Number4.src} alt="number 4 with bricks texture" width="1000" height="1000" />
            </div> 

            <div className="not-found__img not-found__img-2"> 
               <Image src={Number0.src} alt="number 0 with bricks texture" width="1000" height="1000" />
            </div> 

            <div className="not-found__img not-found__img-3"> 
               <Image src={Number4.src} alt="number 4 with bricks texture" width="1000" height="1000" />
            </div>  
        </div>

            <div className="not-found__content">
            <h1 className="not-found__h1">Woops! <br/>
                This page couldn't be find.
            </h1>
            <p className="not-found__p">
            Just because your path is different, doesn't mean you're lost. 
            Maybe the page you are looking for are not available right now.
            </p>
            <div className="not-found__link">
                <div className="not-found__secondary-btn">
                    <a href="/" className="not-found__secondary-btn__a">
                        <span className="not-found__secondary-btn__a--text">Home</span>
                        <span className="not-found__secondary-btn__img">
                            <Image src={ArrowLeftWhite} width="10" height="10" alt="arrow to the left" />
                        </span>
                    </a> 
                </div>  
            </div>
            
            </div>

        </div>
        </>
    )
}
