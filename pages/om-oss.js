import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav';
import axios from 'axios';
import Image from 'next/image'
import Footer from '../components/footer/Footer';
import CircleInfo from '../components/containers/CircleInfo';
import SoMe from '../components/soMe/SoMe';
import ErrorComponent from '../components/error/ErrorComponent';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PrimaryBtn from '../components/btn/PrimaryBtn';
import useMediaQuery from '../components/hooks/mediaQuery/MediaQuery';
import Services from '../components/services/Services';

export default function About(props) {

    const [gallery, setGallery] = useState([]);
    const [fetchError, setFetchError] = useState(false);

    const result = props.data;
    const service = props.services;
    const error = props.error;

    const isTablet = useMediaQuery("(min-width: 992px)");
    const isDesktop = useMediaQuery("(min-width: 1200px)");

    useEffect(async() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setFetchError(false);

        try {
            const res = await axios.get(process.env.NEXT_PUBLIC_API_GALLERY, { signal : signal });
            setGallery(res.data);
            setFetchError(false);
        } catch(err) {
            setFetchError(true);
            console.log(err);
        }

          return function cleanUp() {
            abortController.abort();
        }

      }, []);

    useEffect(() => {
        AOS.init();
      }, [])

    if (error) {
        return <ErrorComponent />
    }

    return (
        <>  
            <Head>
                <title>Om oss - NPRAS</title>
                <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
            </Head>

            <Nav />
            
            <div className="about">
               <div className="blue-container">
               <div className='blue-container__margin services__text-layout'>
               <div className='container__padding'>
                <main>
                    
                    <div className="about__heading-text">
                        <h1 className="about__h1">{result.heading}</h1>
                    </div>
                

                <div className='about__text-img-container'>
                    <div className="about__text-btn">
                        <p className="about__p--1">
                            {result.description_1}
                        </p>
                    <p className="about__p--2">
                            {result.description_2}
                        </p>
                        <div className="about__btn">
                        <PrimaryBtn link="/kontakt-oss" text="Kontakt oss"/>  
                        </div>
                    </div>

                    {isDesktop ? <CircleInfo 
                                    classname="about__circle" 
                                    text={result.info} /> : ""
                    }
                    
                    <div className="about__img-some">

                        {isDesktop ? ''
                        :  <CircleInfo 
                            classname="about__circle" 
                            text={result.info} />
                        }
                        
                        <div className="about__img full-width__imgs">
                            <Image src={isTablet ? result.img : result.img_description} alt="an recently installed oven" width={isTablet ? '1200' : '900'} height={isTablet ? '1250' : '500'} />
                        </div>

                        <SoMe 
                            width={isTablet ? '25' : '30'}
                            height={isTablet ? '25' : '30'}
                            classname="about__some"
                            />
                    </div>
                </div>

                </main>

                    <div 
                        className="about__good-to-know-container"
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-easing="ease-in-out"
                        >
                        <h3>{result.good_to_know}</h3>
                    </div>

                </div> 
                </div> 
                </div>

                <section
                data-aos="zoom-in"
                data-aos-delay="50"
                data-aos-easing="ease-in-out">
                    <Services />
                </section>

                {/* Gallery */}
                <section>

                    <h2 className='about__gallery--h2'>Galleri</h2>

                    <div className="about__gallery">
                        {gallery.map((g) => (
                            <div key={g.id} className="about__img-container"
                            data-aos="zoom-in"
                            data-aos-delay="50"
                            data-aos-easing="ease-in-out">
                                <Image src={g.img_url} alt={g.alt_text} width="1000" height="1000" />
                            </div>
                        ))}
                    </div>
                </section> 
            </div>

            <Footer service={service} />
        </>
    )
}

export async function getStaticProps() {

    let about = [];
    let services = [];

    try {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_ABOUT);
        about = res.data;

        const res2 = await axios.get(process.env.NEXT_PUBLIC_API_SERVICES);
        services = res2.data;

    } catch(err) {
        console.log(err);
        return {
            props: {
                error: true,
                data: about,
                services: services
            },
        };
    } 

    return {
        props: {
            error: false,
            data: about,
            services: services
        },
    };
}