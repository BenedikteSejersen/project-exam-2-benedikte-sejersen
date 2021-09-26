import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav';
import axios from 'axios';
import SecondaryBtn from '../components/btn/SecondaryBtn';
import Image from 'next/image'
import Footer from '../components/footer/Footer';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import CircleInfo from '../components/containers/CircleInfo';
import SoMe from '../components/soMe/SoMe';
import ErrorComponent from '../components/error/ErrorComponent';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HandleDelete from '../components/dialogBox/HandleDelete';

export default function About(props) {

    const [authKey, setAuthKey] = useState("");
    const [gallery, setGallery] = useState([]);
    const [fetchError, setFetchError] = useState(false);

    const result = props.data;
    const service = props.services;
    const error = props.error;

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

      console.log(gallery)

    useEffect(() => {
        AOS.init();
      }, [])
    
    useEffect(() => {
        const auth = JSON.parse(window.localStorage.getItem("auth"));

        if (!auth) {
            setAuthKey(null);
        } else {
            setAuthKey(auth);
        }
    }, [])

    if (error && fetchError) {
        return <ErrorComponent />
    }

    return (
        <>  
            <Head>
                <title>About us - Norsk piperehabilitering AS</title>
                <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
            </Head>

            <Nav />
            
            <div className="about">
               <div className="blue-container about__blue-container">

                    <Breadcrumb path="about" />
                    
                    <div className="about__heading-text">
                        <h1 className="about__h1">{result.heading}</h1>

                        <p className="p__bold about__p--bold">
                            {result.description_1}
                        </p>
                    </div>
                    
                </div>

                <div className="about__text-btn">
                  <p className="about__p--normal">
                        {result.description_2}
                    </p>
                    <div className="about__btn">
                       <SecondaryBtn link="/contact" text="Contact us"/>  
                    </div>
                </div>
                
                <div className="about__img-some">
                    <div className="about__img">
                        <Image src={result.img} alt="an recently installed oven" width="500" height="750" />
                    </div>

                    <SoMe 
                        width="20" 
                        height="20" 
                        classname="about__some"
                         />
                </div>

                <CircleInfo 
                classname="about__circle" 
                text="Free inspection and price quote" />  

                <section className="about__services">
                    {service.map((s) => (
                        <div 
                            className="about__service-container" 
                            key={s.id}
                            data-aos="fade-up"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            >
                            <div className="about__service--img">
                               <Image src={s.icon} width="100" height="100" /> 
                            </div>
                            <div className="about__service--btn">
                                <SecondaryBtn link={`/service/${s.slug}`} text={s.title} /> 
                            </div>
                            
                        </div>
                    ))}
                </section>
                

                <div 
                    className="about__good-to-know-container"
                    data-aos="fade-left"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    >
                    <h2>{result.good_to_know}</h2>
                </div>

                {/* Gallery */}
                <section>

                    <h2>Gallery</h2>

                    <div className="about__gallery">
                        {gallery.map((g) => (
                            <div key={g.id} className="about__img-container">
                                {gallery.alt_text && 
                                    <>
                                        <div 
                                            data-aos="fade-up"
                                            data-aos-delay="50"
                                            data-aos-duration="1000"
                                            data-aos-easing="ease-in-out">
                                        <div>

                                            <div>
                                                <Image src={g.img_url} alt={g.alt_text} width="700" height="700" />
                                            </div>

                                            </div>
                                            {authKey && (
                                                <div className="about__delete">
                                                    <HandleDelete url={process.env.NEXT_PUBLIC_API_GALLERY} id={g.id} />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                }   
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
    let gallery = [];
    let services = [];

    try {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_ABOUT);
        about = res.data;

        // Gallery
        const res1 = await axios.get(process.env.NEXT_PUBLIC_API_GALLERY);
        gallery = res1.data;

        const res2 = await axios.get(process.env.NEXT_PUBLIC_API_SERVICES);
        services = res2.data;

    } catch(err) {
        console.log(err);
        return {
            props: {
                error: true,
                data: about,
                gallery: gallery,
                services: services
            },
        };
    } 

    return {
        props: {
            error: false,
            data: about,
            gallery: gallery,
            services: services
        },
    };
}