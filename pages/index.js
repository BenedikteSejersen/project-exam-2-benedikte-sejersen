import React, { useState } from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav'
import axios from 'axios';
import Link from 'next/link';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Image from 'next/image'

import PrimaryBtn from '../components/btn/PrimaryBtn';
import SecondaryBtn from '../components/btn/SecondaryBtn';
import SoMe from '../components/soMe/SoMe';
import Testimonials from '../components/home-constants/Testimonials';
import Footer from '../components/footer/Footer';
import HomeContact from '../components/home-constants/HomeContact';

export async function getStaticProps() {

    // const [isLoading, setIsLoading] = useState(false);

    let result = [];
    let service = [];

    try {
        const res = await axios.get(process.env.API_HOME);
        result = res.data;

        const response = await axios.get(process.env.API_SERVICES);
        service = response.data;
        // setIsLoading(true);

    } catch(err) {
        console.log(err)
    }

    // setIsLoading(false);

    // if (!isLoading) {
    //   <ClimbingBoxLoader />
    // } else {
      return {
        props: {
            result: result,
            service: service,
        },
      };
    // }
    
    
}



export default function Home(props) {
  const result = props.result;
  console.log(result.rehabilitation)
  // console.log(props.service)
  console.log(result.rehabilitation.img)

  return (
    <div >
      <Head>
        <title>Norsk piperehabilitering AS</title>
        <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/cou5qgt.css"/>
      </Head>

      <Nav />

        <div className="parent__blue-container">
          <div className="blue-container">


            <header className="index__content-container">

              <div className="index__text-container index__text--h1">
                <h1>{result.heading_header}</h1>
              </div>
              <div className="index__text-container index__text--h3">
                <h3>{result.description_header}</h3>
              </div>

              <div className="index__btn-container">
                <div className="index__btn--primary-container">
                  <PrimaryBtn link="/contact" text="Contact us" />
                </div>
                {/* <div className="index__btn--secondary-container">
                  <SecondaryBtn link="#services" text="Our services" />
                </div> */}
              </div>

              <SoMe classname="index__some" />

              <div className="index__images-container">
                <img src={result.img_2[0].formats.medium.url} alt="picture" className="index__img-1 index__img" />
                <img src={result.img_1[0].formats.medium.url} alt="picture" className="index__img-2 index__img" />
              </div>

            </header>

            <main className="our-services-container">
              <div>
                <h2>Our services</h2>

                <div className="our-services__services">
                  {result.our_services.service.map(function(s) {
                    return (
                        <div key={result.our_services.service.id} className="our-services__services-container">

                            <img src={s.house_img[0].formats.medium.url} alt="oven icon" className="our_services__services--houseImg" />
                          
                          <div className="our-services__services--info">
                            <img src={s.icon[0].formats.medium.url} alt="oven icon" className="our-services__services--img" />
                              <h4>{s.title}</h4>
                              <p>{s.description}</p>
                              <SecondaryBtn text="Read more" link={s.link} />
                          </div>
                        </div>
                      )}
                  )}
                </div>

              </div>
            </main>
            
          
          </div>
        
        </div>

        {/* Consider rehabilitation */}
        <section className="consider-rehab">
          <div className="consider-rehab__text">
            <h2>{result.rehabilitation.heading}</h2>
            < SecondaryBtn link="/" text="Read more" />
          </div>

          <div className="consider-rehab__all-cards">
            {result.rehabilitation.cards.map(r => (
              <div key={r.number} className="consider-rehab__card">
                  <div className="consider-rehab__card--heading">
                    <div className="consider-rehab__card--number">{r.number}</div>
                    <h3>{r.title}</h3>
                  </div>
                  <p className="consider-rehab__card--p">{r.description}</p>
              </div>)
            )}
          </div>
          

          <div className="consider-rehab__img--container">
            <img src={result.rehabilitation.img[0].formats.medium.url} alt="Rehabilitation a chimney" className="consider-rehab__img" />
          </div>
          
        </section>


        <Testimonials />

        {/* Use professionals */}
        <section className="use-pro">

          <div className="use-pro__center">
            <div className="use-pro__content">
                <h2>{result.use_professionals.heading}</h2>
                <p className="p__bold">
                  {result.use_professionals.description}
                </p>
                <p>
                  {result.use_professionals.description_2}
                </p>
                < SecondaryBtn link="/about" text="Read more" />
            </div>

            <div className="use-pro__img-container">
              <img src={result.use_professionals.img[0].formats.large.url} alt="advertising" className="use-pro__img"/>
            </div>
          </div>
            
        </section>

        <HomeContact
          heading={result.contact.heading}
          children={
            result.contact.contact_methods.map(contact => (
              <div>
                <span>{contact.contact_info.contact_icon}</span>
                <h4>{contact.contact_info}</h4>
              </div>
            ))
          }
        />

        <Footer />
      
    </div>
  )
}
