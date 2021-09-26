import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Head from 'next/head';
import Navigation from '../../components/nav/Nav';
import Image from 'next/image';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Footer from '../../components/footer/Footer';
import Update from '../../components/admin/UpdateServices';
import SecondaryBtn from '../../components/btn/SecondaryBtn';
import ErrorComponent from '../../components/error/ErrorComponent';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/router';

export default function service({service, error}) {

    const [authKey, setAuthKey] = useState("");
    const [clicked, setClicked] = useState(false);
    const [fetchError, setFetchError] = useState(false); 
    
    const slugService = service[0];

      const image1 = slugService.img_1;
      const image2 = slugService.img_2;
      const image3 = slugService.img_3;

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

  const handleClick = () => {
    setClicked(true);
  }

  if (error) {
      return <ErrorComponent />
  }

    return (
        <div>

            <Head>
                <title>{slugService.title} - Norsk piperehabilitering AS</title>
                <meta name="description" content={slugService.short_text_index + " " + slugService.title} />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
            </Head>

            <Navigation />

            <main>

            <div className="blue-container">

                <Breadcrumb path={`service/${slugService.slug}`} />

                <div onClick={handleClick}>
                   {authKey ? 
                        <Update service={slugService}/>
                    : "" } 
                </div>

                {clicked ? "" :
                    <>

                        {image1 &&
                            <> 
                                {slugService.img_1 === null && "null" ?
                                "" :
                                    <div className="service__img-1">
                                        <Image src={image1} alt={slugService.title} width="1000" height="1400" />
                                    </div>
                                }
                            </>
                        }

                            

                        <div 
                            className="service__h1"
                            data-aos="fade-up"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            >
                            <h1>{slugService.title}</h1>
                        </div>

                        {slugService.short_description == "" ?
                        ""
                        :
                        <div 
                            className="service__short-p"
                            data-aos="fade-up"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            >
                            <p className="p__bold">{slugService.short_description}</p>
                        </div>
                        }
                    </>
                }
            </div>

            {clicked ? "" :
                    <div className="service__under-text">

                        {slugService.description == "" ?
                        ""
                        :
                        <div 
                            className="service__p"
                            data-aos="fade-up"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            >
                            <p>{slugService.description}</p>
                        </div>
                        }

                        <div className="service__btn">
                            <SecondaryBtn link="/contact" text="Contact us" />
                        </div>

                        <div className="service__imgs-2-3">  

                        {image2 &&
                            <> 
                                {slugService.img_2 === null && "null" ?
                                "" :
                                    <div className="service__img-2">
                                        <Image src={image2} alt={slugService.title} width="2000" height="2000" />
                                    </div>
                                }
                            </>
                        }

                        {image3 &&
                            <> 
                                {slugService.img_3 === null && "null" ?
                                "" :
                                    <div className="service__img-3">
                                        <Image src={image3} alt={slugService.title} width="2000" height="2000" />
                                    </div>
                                }
                            </>
                        }

                        </div>

                    </div>
                }
                </main>

           <Footer /> 
        </div>
    )
}

export async function getStaticPaths() {

    try {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_SERVICES);
        const service = res.data; 

        const paths = service.map((s) => ({
            params: { slug: s.slug.toString() },
        }));

        console.log(paths)
        
        return { paths, fallback: false };

    } catch(err) {
        console.log(err);
        return { paths: [], fallback: false }
    }
}

export async function getStaticProps({params}) {

    const url = process.env.NEXT_PUBLIC_API_SERVICES + `?slug=${params.slug}`;

    let service = [];

    try {
        const res = await axios.get(url);
        service = res.data;
    } catch(err) {
        console.log(err);
        return {
            props: {
                error: true,
                service: service,
            },
        };
    }

    return {
        props: {
            error: false,
            service: service,
        },
    };
}
