import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav';
import axios from 'axios';
import SecondaryBtn from '../components/btn/SecondaryBtn';
import Image from 'next/image'

export async function getStaticProps() {

    let about = [];

    try {
        // const res = await axios.get(process.env.API_ABOUT);
        const res = await axios.get("http://localhost:1337/about");
        about = res.data;
    } catch(err) {
        console.log(err);
    }

    return {
        props: {
            data: about,
        },
    };
}

export default function About(props) {

    const result = props.data;
    console.log(result)

    return (
        <>  
            <Head>
                <title>About us - Norsk piperehabilitering AS</title>
                <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />

            <div className="blue-container">

                <h1>{result.heading}</h1>

                <p className="p__bold">
                    {result.description_1}
                </p>
            </div>

            <p>
                {result.description_2}
            </p>
            
            <div>
                <Image src={result.img[0].formats.medium.url} alt="an recently installed oven" width="200" height="200" />
            </div>

            <SecondaryBtn link="/contact" text="Contact us"/>
        </>
    )
}