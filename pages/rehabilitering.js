import React, { useEffect } from 'react';
import axios from 'axios';
import ErrorComponent from '../components/error/ErrorComponent';
import Nav from '../components/nav/Nav';
import Head from 'next/head'
import Footer from '../components/footer/Footer';
import Image from 'next/image';
import PrimaryBtn from '../components/btn/PrimaryBtn';
import Services from '../components/services/Services';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function rehailitering(props) {

  const result = props.result;
  const error = props.error;

  if (error) {
    return <ErrorComponent />
  };

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <>

    <Head>
        <title>{result.heading} - Norsk piperehabilitering AS</title>
        <meta name="description" content={result.heading} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
    </Head>

    <Nav />

    <main className='rehabilitering'>
      <div className="blue-container">
        <div className='blue-container__margin services__text-layout'>

          <div>

            <div className='container__padding'>
              <h1 className='rehabilitering__h1'>{result.heading}</h1>
            </div>

            <div className='rehabilitering-container'>
              <div className='rehabilitering__text-container'>
                <p className='rehabilitering__p--1'>{result.short_description}</p>
                <p className='rehabilitering__p--2'>{result.description}</p>
              </div>

              <div className='rehabilitering__img-1 full-width__imgs'>
                <Image src={result.img_1} width='1000' height='1000' />
              </div>
            </div>
            
          </div>

          <div>
            
            <div className='kamerainspeksjon__text-container'>
              <div className='kamerainspeksjon__heading-container'>
                <p className='orange-text kamerainspeksjon__new'>NY</p>
                <h3 className='kamerainspeksjon__h1'>{result.sub_heading}</h3>
              </div>
              <p className='kamerainspeksjon__p--1'>{result.sub_description}</p>
            </div>

            <div className='kamerainspeksjon__btn-container'>
              <PrimaryBtn link='/kontakt-oss' text='Kontakt oss' />
            </div>

          </div>

        </div>
      </div>
    </main>

    <section
    data-aos="zoom-in"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out">
        <Services />
      </section>

    <Footer />

    </>
    )
}

export async function getStaticProps() {

  let result = [];

  try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_REHAB);
      result = res.data;

  } catch(err) {
      console.log(err)

      return { props: { 
        error: true,
        result: null
      }};
  }

    return {
      props: {
          error: false,
          result: result
      },
    };
}
