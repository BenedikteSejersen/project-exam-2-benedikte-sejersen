import React, { useEffect } from 'react';
import Nav from '../components/nav/Nav';
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/footer/Footer';
import axios from 'axios';
import ErrorComponent from '../components/error/ErrorComponent';
import SecondaryBtn from '../components/btn/SecondaryBtn';
import PrimaryBtn from '../components/btn/PrimaryBtn';
import Link from 'next/link';
import Services from '../components/services/Services';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ildstederOgOvnsmontering(props) {

  const result = props.result;
  const ildsteder = props.ildsteder;
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
        <title>NPRAS - Ildsteder og ovnsmontering</title>
        <meta name="description" content="Tjenester; ildsteder og ovnsmontering som NPRAS tilbyr" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/cou5qgt.css"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
      </Head>
      
      <Nav />

      <main className='ild-ovns'>

      <div className="blue-container">

        <div className='blue-container__margin services__text-layout'>

          <div className='container__padding'>

            <h1 className='ild-ovns__heading'>{result.title}</h1>

            <div className='services__btns'>
              <div className='services__btn-container'>
                <SecondaryBtn link='#ildsteder' text='Ildsteder'/>
              </div>
              <div className='services__btn-container'>
                <SecondaryBtn link='#ovnsmontering' text='Ovnsmontering' />
              </div>
            </div>

          </div>

          <div className='ildsteder' >

            <div className='ildsteder__text-container'>
              <h3 className='ildsteder__text--h3'>{result.sub_heading_2}</h3>
              <p className='ildsteder__text--p'>{result.sub_description_2}</p>
            </div>

            <div className='ildsteder__products' id='ildsteder'>
              {ildsteder.map(function(i) {
                return (
                  <Link href={`/ildsteder/${i.slug}`} key={i.id}>
                    <div className='ildsteder__product-container'>
                      {i.recommended === null ? '' :
                      <>
                        <div className='ildsteder__recommend'></div>
                        <p className='ildsteder__recommend--p'>{i.recommended}</p>
                      </>}
                      <>
                      <div>
                        <Image src={i.img_1} width='300' height='400' />
                      </div>
                      <div className='ildsteder__text-container'>
                          <h4>{i.title}</h4>
                          {i.type === 'Standard' ? '' :
                          <p className='ildsteder__text--p'>{i.type}</p>}
                          <div className='ildsteder__btn-center'>
                            <div className='ildsteder__btn'>
                              <SecondaryBtn link={`/ildsteder/${i.slug}`} text='Les mer' />
                            </div>
                          </div>
                      </div>
                      </>
                    </div>
                  </Link>
                )
              })}
            </div>

          </div >

          <div id='ovnsmontering'>
            <div className='ovnsmontering'>
            <div>
              <h3 className='ovnsmontering__h3'>{result.sub_heading}</h3>
              <p>{result.description}</p>
              <div className='ovnsmontering__btn-container'>
                <PrimaryBtn link='/kontakt-oss' text='Kontakt oss' />
              </div>
            </div>

            <div className='ovnsmontering__imgs'>
                <div className='ovnsmontering__img1'>
                  <Image src={result.img_1} width='400' height='500' />
                </div>
                <div className='ovnsmontering__img2'>
                  <Image src={result.img_2} width='400' height='500' />
                </div>
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
  let ildsteder = [];

  try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_ILD_OVN);
      result = res.data;

      const res2 = await axios.get(process.env.NEXT_PUBLIC_API_ILDSTEDER);
      ildsteder = res2.data;

  } catch(err) {
      console.log(err)

      return { props: { 
        error: true,
        result: null,
        ildsteder: null
      }};
  }

    return {
      props: {
          error: false,
          result: result,
          ildsteder: ildsteder
      },
    };
}

