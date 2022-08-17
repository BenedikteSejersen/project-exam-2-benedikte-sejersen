import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Head from 'next/head';
import Navigation from '../../components/nav/Nav';
import Image from 'next/image';
import Footer from '../../components/footer/Footer';
import ErrorComponent from '../../components/error/ErrorComponent';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PrimaryBtn from '../../components/btn/PrimaryBtn';
import Link from 'next/link'

// Image carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function ildsted({ildsted, error}) {

    const ildstedT = ildsted[0];

    useEffect(() => {
        AOS.init();
      }, [])

  if (error) {
      return <ErrorComponent />
  }
  
const settings = {
    showArrows: true,
    dynamicHeight: false,
    showStatus: true,
    showThumbs: true,
    showIndicators: true,
    swipeable: true,
    emulateTouch: true,
  };

    return (
        <div>

            <Head>
                <title>{ildstedT.title} - Norsk piperehabilitering AS</title>
                <meta name="description" content={ildstedT.title + " " + ildstedT.type} />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
                <link rel="stylesheet" href="carousel.css"/>
            </Head>

            <Navigation />

            <main>
            <div className="blue-container">
            <div className='blue-container__margin services__text-layout'>
                <div>
                    <div className='ildsted__heading-container'>
                        <p className='orange-text ildsteder__recommend--p ildsted__recommend'>{ildstedT.recommended}</p>
                        <h1 className='ildsted__h1'>{ildstedT.title}</h1>
                        {ildstedT.type === 'Standard' ? '' :
                        <h4>{ildstedT.type}</h4>} 
                    </div>
        
                    <div className='ildsted__product'>
                        <div className='ildsted__img1'>
                            <Carousel {...settings}>
                                {ildstedT.images_product.map((p) => 
                                    (
                                        <div key={p.id}>
                                            <Image src={p.img} width="750" height="850" />
                                        </div>
                                    )
                                )}
                            </Carousel>
                        </div>
                        <div className='specification-container white-box-container'>
                            <h3 className='specification__h3'>Spesifikasjoner</h3>
                            {ildstedT.specification.map(function(s) {
                                return (
                                    <div key={s.description} className='specification__text-container'>
                                        <h4 className='specification__description'>{s.description}</h4>
                                        <h4 className='specification__text'>{s.text}</h4>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='ildsted__handbook-container white-box-container'>
                        <h3 className='ildsted__handbook--h3'>Brukerveiledning</h3>
                        <div className='ildsted__handbook--btn'>
                            <a className='link' href='https://www.westfire.dk/wp-content/uploads/2020/08/brugsvejledning_wf36-wf37.pdf'>Åpne brukerveiledning</a>
                        </div>
                    </div>
                        
                    <div className='ildsted__contact-container white-box-container'>
                        <h3 className='ildsted__contact--text'>{ildstedT.contact_text}</h3>
                        <div className='ildsted__contact--btn'>
                            <PrimaryBtn link='/' text='Kontakt oss' />
                        </div>
                    </div>

                    <div className='breadcrumb'>
                        <Link href='/ildsteder-og-ovnsmontering'>Tilbake til ildsteder</Link>
                    </div>

                </div>
            </div>
            </div>
            </main>

           <Footer /> 
        </div>
    )
}

export async function getServerSideProps(content) {

    const url = process.env.NEXT_PUBLIC_API_ILDSTEDER + `?slug=${content.params.slug}`;

    let ildsted = [];
    let ildsteder = [];

    try {
        const res = await axios.get(url);
        ildsted = res.data;

        const res2 = await axios.get(process.env.NEXT_PUBLIC_API_ILDSTEDER);
        ildsteder = res2.data;

    } catch(err) {
        console.log(err);
        return {
            props: {
                error: true,
                ildsted: ildsted,
                ildsteder: ildsteder,
            },
        };
    }

    return {
        props: {
            error: false,
            ildsted: ildsted,
            ildsteder: ildsteder,
        },
    };
}