import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav';
import axios from 'axios';
import Img from '../public/images/contact-img.jpg'
import Image from 'next/image';

export async function getStaticProps() {
    let contact = [];
    try {
        const resHome = await axios.get(process.env.API_HOME);
        contact = resHome.data;
    } catch(err) {
        console.log(err);
    }

    return {
        props: {
            contact: contact,
        },
    };
}

export default function Contact(props) {

    console.log(props.contact.contact.contact_icon)
    return (
        <>  
            <Head>
                <title>Contact us - Norsk piperehabilitering AS</title>
                <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />

            <div className="blue-container">

                <div>
                    <img src={Img.src} alt="nice view of some cabins at work" />
                </div>

                <div>
                    <h1>Contact us</h1>
        
                    <div>
                        <form>
                            <fieldset>
                                <div>
                                  <div>
                                        <div>Name:</div>
                                        <input />
                                    </div>
                                    {/* Dropdown */}
                                    <div>
                                        <div>Subject:</div>
                                        <input />
                                    </div>  
                                </div>
                                
                                <div>
                                    <div>
                                        <div>Phone:</div>
                                        <input />
                                    </div>
                                    <div>
                                        <div>Location:</div>
                                        <input />
                                    </div>
                                </div>

                                <div>
                                    <div>Message:</div>
                                    <textarea />
                                </div>
                                

                            </fieldset>
                        </form>

                    </div>

                    <div>
                        {props.contact.contact.contact_methods.map(c => (
                            <div key={c.id}>
                                <Image src={c.contact_icon[0].url} alt="contact icon" width="200" height="200" />
                                <h4>{c.contact_info}</h4>
                            </div>
                        ))}
                    </div>
                </div> 
            </div>
        </>
    )
}