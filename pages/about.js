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
import UpdateIcon from '../public/images/icons/update-icon.png'

export default function About(props) {

    const [authKey, setAuthKey] = useState("");

    const result = props.data;
    const gallery = props.gallery;
    const service = props.services;
    
    useEffect(() => {
        const auth = window.localStorage.getItem("auth");

        if (!auth) {
            setAuthKey(null);
        } else {
            setAuthKey(auth);
        }
    }, [])

    console.log(authKey)

    return (
        <>  
            <Head>
                <title>About us - Norsk piperehabilitering AS</title>
                <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />
            
            <div className="about">
               <div className="blue-container about__blue-container">

                    <Breadcrumb path="about" />

                    {authKey ? 
                        <div>
                            <Image src={UpdateIcon.src} width="50" height="50" alt="update the content icon" />
                        </div>
                   : "" }

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
                        <Image src={result.img[0].formats.medium.url} alt="an recently installed oven" width="500" height="750" />
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
                            >
                            <div className="about__service--img">
                               <Image src={s.icon.formats.thumbnail.url} width="100" height="100" /> 
                            </div>
                            <div className="about__service--btn">
                                <SecondaryBtn link={`/service/${s.slug}`} text={s.title} /> 
                            </div>
                            
                        </div>
                    ))}
                </section>
                

                <div className="about__good-to-know-container">
                    <h2>{result.good_to_know}</h2>
                </div>

                {/* Gallery */}
                <section>

                    <h2>Gallery</h2>

                    <div className="about__gallery">
                        {gallery.map((g) => (
                            <div key={g.id} className="about__gallery--img">
                                <div>
                                    <Image src={g.img[0].url} alt={g.alt_text} width="700" height="700" />
                                </div>
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
        // const res = await axios.get(process.env.API_ABOUT);
        const res = await axios.get("http://localhost:1337/about");
        about = res.data;

        // Gallery
        const res1 = await axios.get("http://localhost:1337/galleries");
        gallery = res1.data;

        const res2 = await axios.get("http://localhost:1337/categories");
        services = res2.data;

    } catch(err) {
        console.log(err);
    } 

    return {
        props: {
            data: about,
            gallery: gallery,
            services: services
        },
    };
}