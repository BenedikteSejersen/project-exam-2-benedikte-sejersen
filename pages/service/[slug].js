import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Head from 'next/head';
import Navigation from '../../components/nav/Nav';
import Image from 'next/image';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Footer from '../../components/footer/Footer';
import Update from '../../components/admin/UpdateServices';
import SecondaryBtn from '../../components/btn/SecondaryBtn';

export default function service({service}) {

    const [authKey, setAuthKey] = useState("");
    const [clicked, setClicked] = useState(false);

    const slugService = service[0];

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

    return (
        <div>

            <Head>
                <title>{slugService.title} - Norsk piperehabilitering AS</title>
                <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation />

            <div className="blue-container">

                <Breadcrumb path={`service/${slugService.slug}`} />

                <div onClick={handleClick}>
                   {authKey ? 
                        <Update service={slugService}/>
                    : "" } 
                </div>

                {clicked ? "" :
                    <>

                        {slugService.img_1[0] ?
                            <div className="service__img-1">
                                {slugService.img_1[0].formats.medium == undefined ?
                                <Image src={slugService.img_1[0].formats.small.url} alt="image" width={slugService.img_1[0].formats.small.width} height={slugService.img_1[0].formats.small.height} />
                                :
                                <Image src={slugService.img_1[0].formats.medium.url} alt="image" width={slugService.img_1[0].formats.medium.width} height={slugService.img_1[0].formats.medium.height} />
                                }
                            </div>
                        : "" }
                        
                        <div className="service__h1">
                            <h1>{slugService.title}</h1>
                        </div>

                        {slugService.short_description == "" ?
                        ""
                        :
                        <div className="service__short-p">
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
                        <div className="service__p">
                            <p>{slugService.description}</p>
                        </div>
                        }

                        <div className="service__btn">
                            <SecondaryBtn link="/contact" text="Contact us" />
                        </div>

                        <div className="service__imgs-2-3">   
                            {slugService.img_2[0] ?
                                <div className="service__img-2">
                                    {slugService.img_2[0].formats.medium == undefined ?
                                    <Image src={slugService.img_2[0].formats.small.url} alt="image" width={slugService.img_2[0].formats.small.width} height={slugService.img_2[0].formats.small.height} />
                                    :
                                    <Image src={slugService.img_2[0].formats.medium.url} alt="image" width={slugService.img_2[0].formats.medium.width} height={slugService.img_2[0].formats.medium.height} />
                                    }
                                </div> 
                            : "" }

                            {slugService.img_3[0] ? (
                            <div className="service__img-3">
                                    {slugService.img_3[0].formats.medium == undefined ?
                                    <Image src={slugService.img_3[0].formats.small.url} alt="image" width={slugService.img_3[0].formats.small.width} height={slugService.img_3[0].formats.small.height} />
                                    :
                                    <Image src={slugService.img_3[0].formats.medium.url} alt="image" width={slugService.img_3[0].formats.medium.width} height={slugService.img_3[0].formats.medium.height} />
                                    }
                                </div>) 
                            : ""}
                        </div>

                    </div>
                }

           <Footer /> 
        </div>
    )
}

export async function getStaticPaths() {

    try {
        const res = await axios.get("http://localhost:1337/categories");
        const service = res.data; 

        const paths = service.map((s) => ({
            params: { slug: s.slug.toString() },
        }));

        console.log(paths)
        
        return { paths, fallback: false };

    } catch(err) {
        console.log(err);
    }
}

export async function getStaticProps({ params }) {

    const url = `http://localhost:1337/categories?slug=${params.slug}`;

    let service = [];

    try {
        const res = await axios.get(url);
        service = res.data;
    } catch(err) {
        console.log(err);
    }

    return {
        props: {
            service: service,
        },
    };
}
