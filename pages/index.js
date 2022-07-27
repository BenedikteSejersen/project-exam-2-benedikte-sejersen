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
import useMediaQuery from '../components/hooks/mediaQuery/MediaQuery';

// Images
import imageMobile1 from '../public/images/index/cottage-index-1.jpg';
import imageMobile2 from '../public/images/index/oven-index-2.jpg'


export default function Home(props) {

  const [services, setServices] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const isTablet = useMediaQuery("(min-width: 767px)");

  useEffect(async() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setFetchError(false);

    try {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_SERVICES, { signal : signal });
        setServices(res.data);
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

  const result = props.result;
  const error = props.error;

  if (error) {
    return <ErrorComponent />
  };

  return (
    <div >
      <Head>
        <title>Norsk piperehabilitering AS</title>
        <meta name="description" content="Rehabiliter din pipe, eller få hjelp av oss med å installere inn din peis eller stålpipe." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/cou5qgt.css"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
      </Head>

      <Nav />

        <div className="parent__blue-container">
          <div className="blue-container">

            <header className="index__content-container">

              <div className="index__header--text">
                <div className="index__text-container index__text--h1">
                  <h1>{result.heading_header}<span className='orange-text'>{result.heading_header_span}</span></h1>
                </div>
                <div className="index__text-container index__text--h3">
                  <h4>{result.description_header}</h4>
                </div>

                <div className="index__btn-container">
                  <div className="index__btn--primary-container">
                    <PrimaryBtn link="/kontakt-oss" text="Kontakt oss" />
                  </div>
                </div>
              </div>

              <SoMe classname="index__some" width="30" height="30" />

              <div className="index__images-container full-width__imgs">
                <div 
                  className={`index__img ${isTablet ? "index__img-1" : "index__img-1--mobile"}`}>
                  <Image src={isTablet ? result.img_2 : imageMobile1} alt="picture" width={isTablet ? "400" : "350"} height={isTablet ? "550" : "500"} />
                </div>

                <div 
                  className={`index__img ${isTablet ? "index__img-2" : "index__img-2--mobile"}`}>
                  <Image src={isTablet ? result.img_1 : imageMobile2} alt="picture" width={isTablet ? "500" : "450"} height={isTablet ? "600" : "500"} />
                </div>
              </div>

            </header>

            {/* Våre tjenester */}
            <main className="our-services-container"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            >
              <div>
                <h2>Våre tjenester</h2>

                <div className={isTablet ? "our-services__wrap" : "our-services__services"}>
                  {services.map(function(s) {
                    return (
                          <div 
                            key={s.id}  
                            className="our-services__services-container"
                            data-aos="zoom-in"
                            data-aos-easing="ease-in-out"
                            data-aos-duration="1000"
                            >
                              <div className='our-services__services--btn'>
                              <a href={`/${s.slug}`}>
                                <div className="our_services__services--houseImg">
                                  <Image src={ImageHouse.src} alt="house-shaped image in light blue" width={isTablet ? "210" : "210"} height={isTablet ? "200" : "190"}/>
                                </div> 
                              </a>
                            
                            <a href={`/${s.slug}`} className="our-services__services--info ">
                              <div>
                                <div className="our-services__services--img" >
                                  <Image src={s.icon} width="100" height="100" alt={s.title}/>
                                </div>
                                  <div className='our-services__h4-container'>
                                    <h6 className="our-services__h4">{s.title}</h6>
                                  </div>
                              </div>
                            </a>
                            </div>
                          </div>
                      )}
                  )}
                </div>

              </div>
            </main>

          </div>
        
        </div>

        {/* Vurderer rehabilitering */}
        <section className="consider-rehab">
          <div className="consider-rehab__text">
            <h2>{result.rehabilitation.heading} <span className='orange-text'>{result.rehabilitation.heading_span}</span> ?</h2>
          </div>

          <div className="consider-rehab__all-cards">
            {result.rehabilitation.cards.map(r => (
              <div 
                key={r.number}
                className='consider-rehab__card'>
                  <div className="consider-rehab__card--heading">
                    <h3>{r.title}</h3>
                  </div>
                  <p className="consider-rehab__card--p">{r.description}</p>
              </div>)
            )}
          </div>
          

          <div className="consider-rehab__img--container">
            <div className="consider-rehab__img">
               <Image src={result.rehabilitation.img} width="2000" height="2000" alt="Rehabilitation a chimney" />
            </div>
           
          </div>

          <div className="consider-rehab__btn">
            < SecondaryBtn link="/rehabilitering" text="Les mer" />
          </div>
          
        </section>

        {/* Bruk profesjonelle */}
        <section className="use-pro">

          <div className="use-pro__center">
            <div 
              className="use-pro__content">
                <h2 className="use-pro__content--subheading">{result.use_professionals.heading}</h2>
                <p>
                  {result.use_professionals.description_2}
                </p>
                <div className="use-pro__content--btn">
                  < SecondaryBtn link="/om-oss" text="Les mer" />
                </div>
            </div>

            <div className="use-pro__img-container">
              <Image src={result.use_professionals.img} width="1000" height="1500" alt="advertising"/>
            </div>
          </div>
            
        </section>
        
        <div>
          <Testimonials />
        </div>

        <HomeContact
          heading={result.contact.heading}
          children={
            result.contact.contact_methods.map(contact => (
              <div key={contact.id}>
                <div className="index-contact__contact-info">
                  <div className="index-contact__img">
                    <Image src={contact.contact_icon} width="40" height="50" alt={contact.contact_info} />
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
        services: null
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
