import React, { useEffect } from 'react';
import axios from 'axios';
import ErrorComponent from '../components/error/ErrorComponent';
import Nav from '../components/nav/Nav';
import Head from 'next/head'
import Footer from '../components/footer/Footer';
import SecondaryBtn from '../components/btn/SecondaryBtn';
import Image from 'next/image';
import PrimaryBtn from '../components/btn/PrimaryBtn';
import useMediaQuery from '../components/hooks/mediaQuery/MediaQuery';
import Services from '../components/services/Services';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function taksikringOgPipebeslag(props) {

  const result = props.result;

  const isTablet = useMediaQuery("(min-width: 767px)");

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

      <main>
      <div className="blue-container">
      <div className='blue-container__margin services__text-layout'>
        <div className='container__padding tak-pipe__text-container'>
          <h1>{result.heading}</h1>

          <div className='services__btns'>
            <div className='services__btn-container'>
              <SecondaryBtn link='#taksikring' text='Taksikring'/>
            </div>
            <div className='services__btn-container'>
              <SecondaryBtn link='#pipebeslag' text='Pipebeslag' />
            </div>
          </div>

        </div>

        <div className='taksikring-container' id='taksikring'>
          <div>
            <h3 className='taksikring__h3'>{result.sub_heading}</h3>
            <p className='taksikring__p--1'>{result.short_description}</p>
            <p className='taksikring__p--2'>{result.description}</p>
          </div>

          <div className='taksikring__img-1 full-width__imgs'>
            <Image src={result.img_1} width='1000' height='1000' />
          </div>
        </div>

        <div className='pipebeslag-container' id='pipebeslag'>
          <div className='pipebeslag__text-container'>
            <h3 className='pipebeslag__h3'>{result.sub_heading_2}</h3>
            <p className='pipebeslag__p--1'>{result.sub_description}</p>
            <p className='pipebeslag__p--2'>{result.sub_description_2}</p>

            <div className='tak-pipe__btn-container'>
              <PrimaryBtn link='/kontakt-oss' text='Kontakt oss' />
            </div>
          </div>

          <div className='pipebeslag__imgs full-width__imgs'>
            <div className='pipebeslag__img-2'>
              <Image src={isTablet ? result.img_4 : result.img_3} width='1000' height={isTablet ? '1350' : '1000'} />
            </div>
            <div className='pipebeslag__img-1'>
              <Image src={result.img_2} width='1000' height='1000' />
            </div>
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
      const res = await axios.get(process.env.NEXT_PUBLIC_API_TAK_PIPE);
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
