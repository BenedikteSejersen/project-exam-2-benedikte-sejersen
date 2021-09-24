import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav'
import axios from 'axios';
import Image from 'next/image'
import PrimaryBtn from '../components/btn/PrimaryBtn';
import SecondaryBtn from '../components/btn/SecondaryBtn';
import SoMe from '../components/soMe/SoMe';
import Testimonials from '../components/home-constants/Testimonials';
import Footer from '../components/footer/Footer';
import HomeContact from '../components/home-constants/HomeContact';
import ImageHouse from '../public/images/img-services-house.png'
import ErrorComponent from '../components/error/ErrorComponent';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home(props) {

  const [authKey, setAuthKey] = useState("");

  useEffect(() => {
    AOS.init();
  }, [])

  useEffect(() => {
      const auth = window.localStorage.getItem("auth");

      if (!auth) {
          setAuthKey(null);
      } else {
          setAuthKey(auth);
      }
  }, [])

  const result = props.result;
  const services = props.services;
  const error = props.error;

  if (error) {
    return <ErrorComponent />
  };

  return (
    <div >
      <Head>
        <title>Norsk piperehabilitering AS</title>
        <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/cou5qgt.css"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
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
              </div>

              <SoMe classname="index__some" width="30" height="30" />

              <div className="index__images-container">
                <div 
                  className="index__img-1 index__img"
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="2500"
                  data-aos-easing="ease-in-out"
                  >
                  <Image src={result.img_2} alt="picture" width="300" height="400" />
                </div>

                <div 
                  className="index__img-2 index__img"
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="2000"
                  data-aos-easing="ease-in-out"
                  >
                  <Image src={result.img_1} alt="picture" width="400" height="400" />
                </div> 
              </div>

            </header>

            {/* Our services */}
            <main className="our-services-container">
              <div>
                <h2>Our services</h2>

                <div className={services.length > 4 ? "our-services__wrap" : "our-services__services"}>
                  {services.map(function(s) {
                    return (
                        <div 
                          key={s.id} 
                          className="our-services__services-container"
                          data-aos="fade-up"
                          data-aos-delay="50"
                          data-aos-duration="1000"
                          data-aos-easing="ease-in-out"
                          >

                              <img src={ImageHouse.src} alt="house-shaped image in light blue" className="our_services__services--houseImg"/>
                          
                          <div className="our-services__services--info">
                            <div className="our-services__services--img" >
                              <Image src={s.icon} width="100" height="100" alt={s.title}/>
                            </div>
                              <h4 className="our-services__h4">{s.title}</h4>
                              <p>{s.short_text_index}</p>
                              <div className="our-services__btn">
                                <SecondaryBtn text="Read more" link={`/service/${s.slug}`} />
                              </div>
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
            <div className="consider-rehab__btn">
              < SecondaryBtn link="/" text="Read more" />
            </div>
          </div>

          <div className="consider-rehab__all-cards">
            {result.rehabilitation.cards.map(r => (
              <div 
                key={r.number} 
                className="consider-rehab__card"
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                >
                  <div className="consider-rehab__card--heading">
                    <div className="consider-rehab__card--number">{r.number}</div>
                    <h3>{r.title}</h3>
                  </div>
                  <p className="consider-rehab__card--p">{r.description}</p>
              </div>)
            )}
          </div>
          

          <div className="consider-rehab__img--container">
            <div className="consider-rehab__img">
               <Image src={result.rehabilitation.img} width="500" height="500" alt="Rehabilitation a chimney" width="400" height="400" />
            </div>
           
          </div>
          
        </section>

        {/* Use professionals */}
        <section className="use-pro"
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                >

          <div className="use-pro__center">
            <div 
              className="use-pro__content"
              >
                <h2 className="use-pro__content--subheading">{result.use_professionals.heading}</h2>
                <p className="p__bold">
                  {result.use_professionals.description}
                </p>
                <p>
                  {result.use_professionals.description_2}
                </p>
                <div className="use-pro__content--btn">
                  < SecondaryBtn link="/about" text="Read more" />
                </div>
            </div>

            <div className="use-pro__img-container">
              <Image src={result.use_professionals.img} width="1000" height="1500" alt="advertising"/>
            </div>
          </div>
            
        </section>
        
        <div 
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        >
          <Testimonials />
        </div>

        <HomeContact
          heading={result.contact.heading}
          children={
            result.contact.contact_methods.map(contact => (
              <div key={contact.id}>
                <div className="index-contact__contact-info">
                  <div className="index-contact__img">
                    <Image src={contact.contact_icon} width="50" height="50" alt={contact.contact_info} />
                  </div>
                  <h4>{contact.contact_info}</h4>
                </div>
              </div>
            ))
          }
        />

        <Footer />
      
    </div>
  )
}

export async function getStaticProps() {

  let result = [];
  let resultServices = [];

  try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_HOME);
      result = res.data;

      const res2 = await axios.get(process.env.NEXT_PUBLIC_API_SERVICES);
      resultServices = res2.data;

  } catch(err) {
      console.log(err)

      return { props: { 
        error: true,
        result: null,
        resultServices: null
      }};
  }

    return {
      props: {
          error: false,
          result: result,
          services: resultServices,
      },
    };
}