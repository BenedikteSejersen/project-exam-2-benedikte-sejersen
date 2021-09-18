import React, {useState, useEffect} from 'react'
import Nav from '../../components/nav/Nav'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import WhiteContainer from '../../components/containers/WhiteContainer'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import UseLocalStorage from '../../hooks/UseLocalStorage'
import { useRouter } from 'next/router'

// Image
import Image from 'next/image'
import UserIcon from '../../public/images/icons/user.svg'
import Phone from '../../public/images/icons/phone-icon.png'
import Email from '../../public/images/icons/contact-email.png'

export default function message({ message }) {

    const [userId, setUserId] = useState(null);
    const [authKey, setAuthKey] = useState(null);
    
    const store = UseLocalStorage();
    const history = useRouter();

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

    return (
        <div>

            <Head>
                <title>Message - Norsk piperehabilitering AS</title>
                <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />

            {authKey ?  

            <div className="blue-container admin__blue-container">
                <Breadcrumb path="admin" path2={`admin-message/${message[0].id}`} path2Name="message" />
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
                                    <Link href={`tel:${message[0].Number}`}><h3>{message[0].Number}</h3></Link>
                                </div>
                                <div className="admin-message__contact-info">
                                    <div className="admin-message__icon">
                                        <Image src={Email.src} alt="email icon" width="50" height="50" />
                                    </div>
                                    <Link href={`mailto:${message[0].Email}`}><h4>{message[0].Email}</h4></Link>
                                </div>
                            </div>
                    </div>

                        <WhiteContainer classname="admin-message__white-container" children={(
                            <>
                                <div className="admin-message__message--text">
                                    <h4 className="admin-message__message--name">{message[0].Name}</h4>
                                    <h4 className="admin-message__message--subject">{message[0].Subject}</h4>

                                    <div className="admin-message__message--message">
                                        <h3>
                                            Message:
                                        </h3>
                                        <p className="admin-message__message--p">{message[0].Message}</p>
                                    </div> 

                                </div>
                                <div className="admin-message__message--contact">
                                    <div className="admin-message__message--call">
                                        <h3 className="admin-message__message--h3">Call:</h3>
                                        <Link href={`tel:${message[0].Number}`}><h4 className="admin-message__message--a contact-link">{message[0].Number}</h4></Link> 
                                    </div>
                                    <div className="admin-message__message--email">
                                        <h3 className="admin-message__message--h3">Send a mail:</h3>
                                        <Link href={`mailto:${message[0].Email}`}><h4 className="admin-message__message--a contact-link">{message[0].Email}</h4></Link>
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
        const res = await axios.get("http://localhost:1337/messages");
        const message = res.data;  

        const paths = message.map((m) => ({
            params: { id:  m.id.toString() }, 
        }));

        console.log(paths)
        
        return { paths, fallback: true };

    } catch(err) {
        console.log(err);
    }
}

export async function getStaticProps({ params }) {
    const url = `http://localhost:1337/messages?id=${params.id}`;

    let message = null;

    try {
        const res = await axios.get(url);
        message = res.data;
    } catch(err) {
        console.log(err);
    }

    return {
        props: {
            message: message,
        },
    };
}
