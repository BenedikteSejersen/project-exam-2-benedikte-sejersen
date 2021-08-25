import React from 'react'

import FullStar from '../../public/images/icons/star-full.png'
import EmptyStar from '../../public/images/icons/star.png'
import SecondaryBtn from '../btn/SecondaryBtn'
// import BricksTexture from '../../public/images/texture/bricks-texture.svg'

export default function Testimonials() {
    return (
        <>
        <div className="testimonials">
            <div className="texture"></div>
            <div>
                <div className="testimonial__heading">
                    <span className="testimonials__stars">
                        <img src={FullStar.src} alt="star" />
                        <img src={FullStar.src} alt="star" />
                        <img src={FullStar.src} alt="star" />
                        <img src={FullStar.src} alt="star" />
                        <img src={FullStar.src} alt="star" />
                    </span>
                    <h2>"Good Professional Knowledge. Flexible Reliable Honest"</h2>
                </div>
                <h3 className="testimonial__h3">Costumer reviews</h3>
            </div>

            <div className="testimonial__cards-container">
                <div className="testimonial__card">
                <div className="testimonial__card--heading">
                    <span className="testimonials__stars">
                        <img src={FullStar.src} alt="star" />
                        <img src={FullStar.src} alt="star" />
                        <img src={FullStar.src} alt="star" />
                        <img src={FullStar.src} alt="star" />
                        <img src={FullStar.src} alt="star" />
                    </span>
                   <h4>Fireplace with jøtul - effort pulls poorly</h4> 
                </div>
                <p>
                    "Good communication. Several suggestions for solutions that were discussed with us. Good professional knowledge. 
                    Flexible Reliable Honest Could have ticked the max score on all the 6 points in the evaluation. Difficult to choose the right one."
                </p>
                <p>
                    - Anne, Bamble sommerrute
                </p> 
                </div>

                <div className="testimonial__card">
                    <div className="testimonial__card--heading">
                        <span className="testimonials__stars">
                            <img src={FullStar.src} alt="star" />
                            <img src={FullStar.src} alt="star" />
                            <img src={FullStar.src} alt="star" />
                            <img src={FullStar.src} alt="star" />
                            <img src={EmptyStar.src} alt="star" />
                        </span>
                    <h4>Piper rehabilitation</h4> 
                    </div>
                    <p>
                        "Very well satisfied."
                    </p>
                    <p>
                        - Vidar, Porsgrunn
                    </p> 
                </div>

                <div className="testimonial__card">
                    <div className="testimonial__card--heading">
                        <span className="testimonials__stars">
                            <img src={FullStar.src} alt="star" />
                            <img src={FullStar.src} alt="star" />
                            <img src={FullStar.src} alt="star" />
                            <img src={FullStar.src} alt="star" />
                            <img src={FullStar.src} alt="star" />
                        </span>
                    <h4>Inserting pipes in the chimney</h4> 
                    </div>
                    <p>
                        "Very well satisfied with the job done. Fast and execution of the job. Nice people. 
                        Simple and straightforward and relate to. Recommended. Regards Frode Røyneland Hestehagvegen 10 Skien."
                    </p>
                    <p>
                        - Frode, Skien
                    </p> 
                </div>
            </div>

            <div className="testimonial__btn-container">
                    < SecondaryBtn link="https://mittanbud.no/profil/787099/norsk-piperehabilitering-as/" text="Check out more" />
            </div> 

        </div>
        </>
    )
}
