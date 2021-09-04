import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Head from 'next/head';
import Navigation from '../../components/nav/Nav';
import Image from 'next/image';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Footer from '../../components/footer/Footer';


export default function service({service}) {

    const slugService = service[0];

    return (
        <div>

            <Head>

            </Head>

            <Navigation />

            <div className="blue-container">

                <Breadcrumb path={`service/${slugService.slug}`} />

                <div className="service__h1">
                    <h1>{slugService.title}</h1>
                </div>

                <div className="service__short-p">
                    <p className="p__bold">{slugService.short_description}</p>
                </div>
            </div>

            <div>

            {slugService.img.map((img) => (
                <>
                <div className="service__img">
                    {img.img_url[0].formats.medium == undefined ?
                    <Image src={img.img_url[0].formats.small.url} alt="image" width={img.img_url[0].formats.small.width} height={img.img_url[0].formats.small.height} />
                    :
                    <Image src={img.img_url[0].formats.medium.url} alt="image" width={img.img_url[0].formats.medium.width} height={img.img_url[0].formats.medium.height} />
                    }
                </div>
                </>    
            ))}
            </div>

            {slugService.description == "" ?
            "Hello"
            :
            <div className="service__p">
                <p>{slugService.description}</p>
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
        console.log(service)

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
