import React, { useEffect, useState, useCallback } from 'react'
import SecondaryBtn from '../btn/SecondaryBtn'
import axios from 'axios';
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/dist/client/image';

export default function Testimonials() {

    const [testimonial, setTestimonial] = useState([]);
    const [fetchError, setFetchError] = useState(false);

    useEffect(async() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setFetchError(false);
    
        try {
            const res = await axios.get(process.env.NEXT_PUBLIC_API_TESTIMONIALS, { signal : signal });
            setTestimonial(res.data);
            setFetchError(false); 
        } catch(err) {
            setFetchError(true);
            console.log(err);
        }
    
          return function cleanUp() {
            abortController.abort();
        }
    
      }, []);

    //   const testimonialStar = testimonial[0];
      
    //   const star1 = testimonialStar.star_1;
    //   const star2 = testimonialStar.star_2;
    //   const star3 = testimonialStar.star_3;
    //   const star4 = testimonialStar.star_4;
    //   const star5 = testimonialStar.star_5;

      const EmblaCarousel = () => {
        const [emblaRef, emblaApi] = useEmblaCarousel({loop: false})

        const scrollPrev = useCallback(() => {    
            if (emblaApi) emblaApi.scrollPrev()  
        }, [emblaApi])

        const scrollNext = useCallback(() => {
                if (emblaApi) emblaApi.scrollNext()  
        }, [emblaApi])
      
        return (
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {testimonial.map(function(t) {
                    return (
                        <div className='testimonial__container-text' key={t.id}>
                            <div className="embla__slide">
                                <div className='testimonial__star-container'>
                                    <div className='testimonial__star'>
                                        <Image src={t.star_1} width="50" height="50"/>
                                    </div>
                                    <div className='testimonial__star'>
                                        <Image src={t.star_2} width="50" height="50"/>
                                    </div>
                                    <div className='testimonial__star'>
                                        <Image src={t.star_3} width="50" height="50"/>
                                    </div>
                                    <div className='testimonial__star'>
                                        <Image src={t.star_4} width="50" height="50"/>
                                    </div>
                                    <div className='testimonial__star'>
                                        <Image src={t.star_5} width="50" height="50"/>
                                    </div>
                                </div>
                                <h3 className='testimonial__text'>{t.text}</h3>
                            </div> 
                        </div>
                    )
                })}
            </div>
            <div className='testimonial__prev-next-container'>
                <div className="testimonial__prev" onClick={scrollPrev}></div>  
                <div className="testimonial__next" onClick={scrollNext}></div>
            </div>
          </div>
        )
      }

    return (
        <div className='testimonial'>   
            <EmblaCarousel/>

            <div className="testimonial__btn-container">
                    <SecondaryBtn link="https://mittanbud.no/profil/787099/norsk-piperehabilitering-as/" text="Sjekk ut mer" />
            </div> 
        </div>
    )
}
