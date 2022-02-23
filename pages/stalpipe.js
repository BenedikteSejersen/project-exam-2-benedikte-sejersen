import React, { useEffect } from 'react';
import axios from 'axios';
import ErrorComponent from '../components/error/ErrorComponent';
import Nav from '../components/nav/Nav';
import Head from 'next/head'
import Footer from '../components/footer/Footer';
import Image from 'next/image';
import PrimaryBtn from '../components/btn/PrimaryBtn';
import useMediaQuery from '../components/hooks/mediaQuery/MediaQuery';

export default function stålpipe(props) {

  const result = props.result;
  const error = props.error;

  const isTablet = useMediaQuery("(min-width: 767px)");

  console.log(result)

  if (error) {
    return <ErrorComponent />
  };
  
  return( 
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
          <div className='blue-container__margin'>

            <div className='container__padding'>
              <h1 className='stålpipe__h1'>{result.heading}</h1>
            </div>

            <div className='stålpipe-container'>
              <div className='stålpipe__text-container'>
                <p className='stålpipe__p--1'>{result.short_description}</p>

                <div className='stålpipe__btn-container'>
                  <PrimaryBtn link='/kontakt-oss' text='Kontakt oss' />
                </div>
              </div>

              <div className='stålpipe__imgs full-width__imgs'>
                <div className='stålpipe__img-1'>
                  <Image src={result.img_2} width='1000' height='1000' />
                </div>
                <div className='stålpipe__img-2'>
                  <Image src={isTablet ? result.img_3 : result.img_1} width={isTablet ? '1000' : '1000'} height={isTablet ? '1500' : '1000'} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />

    </>
    )
}

export async function getStaticProps() {

  let result = [];

  try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_STALPIPE);
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

