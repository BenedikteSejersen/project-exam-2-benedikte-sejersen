import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav';
import Footer from '../components/footer/Footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import UseLocalStorage from '../hooks/UseLocalStorage';
import WhiteContainer from '../components/containers/WhiteContainer';
import SecondaryBtn from '../components/btn/SecondaryBtn';
import ErrorComponent from '../components/error/ErrorComponent';

// Icons
import UserIcon from '../public/images/icons/user.svg';
import Image from 'next/image';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import HandleDelete from '../components/dialogBox/HandleDelete';
import Link from 'next/link';

export default function Admin() {

    // const messages = message;
    // const serverError = error;

    const [userId, setUserId] = useState("");
    const [authKey, setAuthKey] = useState("");
    const history = useRouter();
    const store = UseLocalStorage();

    const [service, setService] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(async() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        setFetchError(false);

        try {
            const res = await axios.get(process.env.NEXT_PUBLIC_API_SERVICES, { signal : signal });
            setService(res.data);

            const res2 = await axios.get(process.env.NEXT_PUBLIC_API_MESSAGES, { signal : signal });
            setMessages(res2.data);

            setFetchError(false);
        } catch(err) {
            setFetchError(true);
            console.log(err);
        }

          return function cleanUp() {
            abortController.abort();
        }

      }, []);

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

    if (fetchError) {
        return <ErrorComponent />
    }

    return (
        <>  
            {authKey ? (
                <>
                    <Head>
                        <title>Admin - Norsk piperehabilitering AS</title>
                        <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                        <link rel="icon" href="/favicon.ico" />
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
                    </Head>

                    <Nav />

                    <div className="blue-container">

                        <div>
                            <Breadcrumb path="admin" />
                        </div>

                        <h1 className="admin__h1">Welcome {userId}!</h1>
                        <div className="admin__user admin-panel__user">
                            <div><Image src={UserIcon.src} alt="user icon" width="50" height="50" /></div>
                            <h3>{userId}</h3>
                        </div>

                    </div>

                    <main className="admin__flex">
                        <WhiteContainer classname="admin__white-container" children={(
                            <aside>
                                <div className="admin__crud">
                                    <h2>Update</h2>
                                    <p className="admin__p">To update content, you have to go to the page you want to update.</p>
                                </div>

                                <div className="admin__crud">
                                    <h2>Create</h2>
                                    <ul>
                                        <li className="admin__create--link"><SecondaryBtn link="/admin-create-service" text="New Service" /></li>
                                        <li className="admin__create--link"><SecondaryBtn link="/admin-upload-image" text="Add images" /></li>
                                    </ul>
                                </div>

                                <div className="admin__crud">
                                    <h2>Delete service</h2>
                                    <ul>
                                        {service.map((s) => (
                                            <li className="admin__delete-services" key={s.id}>
                                                <span className="red-circle">
                                                    <HandleDelete url={process.env.NEXT_PUBLIC_API_SERVICES} id={s.id} /> 
                                                </span>
                                                <p>{s.title}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                

                            </aside> 
                        )} />

                        <WhiteContainer classname="admin__white-container admin__message-container" children={(
                            <>
                                <h2>Messages</h2>

                                {messages.length === 0 && (
                                    <div className="admin__message--empty">There is no new messages now.</div>
                                )}

                                {messages.map((m) => (
                                    
                                    <div className="admin__message--id" key={m.id}>
                                        <div className="admin__message--delete">
                                           <HandleDelete url={process.env.NEXT_PUBLIC_API_MESSAGES} id={m.id} /> 
                                        </div>
                                        <div className="link__container">
                                            <Link href="/admin-message/[slug]" as={`/admin-message/${m.id}`} key={m.id}>
                                                <div className="admin__messages">
                                                    <h5 className="admin__messages--name">{m.Name}</h5>
                                                    <h3 className="admin__messages--subject">{m.Subject}</h3>
                                                </div>
                                            </Link>
                                        </div> 
                                    </div>
                                    
                                ))}
                            </>
                        )} />
                    </main>
                </>
            ) : 
            ""
            }
            <Footer />
        </>
    )
}

export async function getStaticProps() {
    
    let message = [];
    let service = [];

    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_MESSAGES);
        message = response.data;

        const response2 = await axios.get(process.env.NEXT_PUBLIC_API_SERVICES);
        service = response2.data;
    } catch(err) {
        console.log(err);
        return { props: { 
            error: true,
            message: message,
            service: service,
          }};
    } 

    return {
        props: {
            error: false,
            message: message,
            service: service,
        },
    };
}