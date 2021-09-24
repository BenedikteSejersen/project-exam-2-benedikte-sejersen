import React, {useState, useEffect} from 'react'
import Nav from '../../components/nav/Nav'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import WhiteContainer from '../../components/containers/WhiteContainer'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import UseLocalStorage from '../../hooks/UseLocalStorage'
import { useRouter } from 'next/router'
import ErrorComponent from '../../components/error/ErrorComponent'

// Image
import Image from 'next/image'
import UserIcon from '../../public/images/icons/user.svg'
import Phone from '../../public/images/icons/phone-icon.png'
import Email from '../../public/images/icons/contact-email.png'

export default function message(props) {

    const [userId, setUserId] = useState(null);
    const [authKey, setAuthKey] = useState(null);
    
    const store = UseLocalStorage();
    const history = useRouter();

    const message = props.message[0]; 
    const error = props.error;

    useEffect(() => {

        setUserId(JSON.parse(window.localStorage.getItem("user")));
        const auth = window.localStorage.getItem("auth");

        if (!auth) {
            setAuthKey(null);
            history.push("/");
        } else {
            setAuthKey(auth);
        }

    }, [store.userId]);

    if (error) {
        return < ErrorComponent />
    }

    return (
        <div>

            <Head>
                <title>Message - Norsk piperehabilitering AS</title>
                <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
            </Head>

            <Nav />

            {authKey ?  

            <div className="blue-container admin__blue-container">
                <Breadcrumb path="admin" path2={`admin-message/${message.id}`} path2Name="message" />
                <div className="admin__layout-flex">
                    <div className="admin__header--section">
                        <h1>Message</h1>
                            <div className="admin__user">
                                <div className="admin__header--user">
                                    <Image src={UserIcon.src} alt="user icon" width="50" height="50" />
                                </div>
                                <h3 className="admin__header--user-id">{userId}</h3>
                            </div>

                            <div className="admin-message__contact">
                                <div className="admin-message__contact-info">
                                    <div className="admin-message__icon">
                                        <Image src={Phone.src} alt="phone icon" width="50" height="50" />
                                    </div>
                                    <Link href={`tel:${message.Number}`}><h3>{message.Number}</h3></Link>
                                </div>
                                <div className="admin-message__contact-info">
                                    <div className="admin-message__icon">
                                        <Image src={Email.src} alt="email icon" width="50" height="50" />
                                    </div>
                                    <Link href={`mailto:${message.Email}`}><h4>{message.Email}</h4></Link>
                                </div>
                            </div>
                    </div>

                        <WhiteContainer classname="admin-message__white-container" children={(
                            <>
                                <div className="admin-message__message--text">
                                    <h4 className="admin-message__message--name">{message.Name}</h4>
                                    <h4 className="admin-message__message--subject">{message.Subject}</h4>

                                    <div className="admin-message__message--message">
                                        <h3>
                                            Message:
                                        </h3>
                                        <p className="admin-message__message--p">{message.Message}</p>
                                    </div> 

                                </div>
                                <div className="admin-message__message--contact">
                                    <div className="admin-message__message--call">
                                        <h3 className="admin-message__message--h3">Call:</h3>
                                        <Link href={`tel:${message.Number}`}><h4 className="admin-message__message--a contact-link">{message.Number}</h4></Link> 
                                    </div>
                                    <div className="admin-message__message--email">
                                        <h3 className="admin-message__message--h3">Send a mail:</h3>
                                        <Link href={`mailto:${message.Email}`}><h4 className="admin-message__message--a contact-link">{message.Email}</h4></Link>
                                    </div>
                                </div>
                            </>
                        )}/>
                    </div>

            </div>  
            
            : ""}
             
        </div>
    )
}

export async function getStaticPaths() {

    try {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_MESSAGES);
        const message = res.data;  

        const paths = message.map((m) => ({
            params: { id:  m.id.toString() }, 
        }));
        
        return { paths, fallback: false };

    } catch(err) {
        console.log(err);
        return { paths: [], fallback: false }
    }
}

export async function getStaticProps({ params }) {

    const url = process.env.NEXT_PUBLIC_API_MESSAGES + `?id=${params.id}`;

    let message = [];

    try {
        const res = await axios.get(url);
        message = res.data;
    } catch(err) {
        console.log(err);
        return {
            props: {
                error: true,
                message: message,
            },
        };
    }

    return {
        props: {
            error: false,
            message: message,
        },
    };
}
