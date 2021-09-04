import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav';
import Footer from '../components/footer/Footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import FormError from '../components/login/FormError';
import UseLocalStorage from '../hooks/UseLocalStorage';
import WhiteContainer from '../components/containers/WhiteContainer';
import SecondaryBtn from '../components/btn/SecondaryBtn';

// Icons
import UserIcon from '../public/images/icons/user.svg';
import Image from 'next/image';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import Trash from '../public/images/icons-confirmation/trash.svg';
import HandleDelete from '../components/dialogBox/HandleDelete';

export default function Admin(props) {

    const messages = props.message;

    const [userId, setUserId] = useState("");
    const [authKey, setAuthKey] = useState("");
    const history = useRouter();
    const store = UseLocalStorage();

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

    console.log(props.service)

    return (
        <>  
            {authKey ? (
                <>
                    <Head>
                        <title>Admin - Norsk piperehabilitering AS</title>
                        <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                        <link rel="icon" href="/favicon.ico" />
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

                    <div className="admin__flex">
                        <WhiteContainer classname="admin__white-container" children={(
                            <>
                                <div className="admin__crud">
                                    <h2>Update</h2>
                                    <p className="admin__p">To update content, you have to go to the page you want to update.</p>
                                </div>

                                <div className="admin__crud">
                                    <h2>Create</h2>
                                    <ul>
                                        <li><SecondaryBtn link="/" text="New Service" /></li>
                                        <li><SecondaryBtn link="/" text="Add images" /></li>
                                    </ul>
                                </div>

                                <div className="admin__crud">
                                    <h2>Delete service</h2>
                                    <ul>
                                        {props.service.map((s) => (
                                            <li>
                                                <span className="red-circle">
                                                    <HandleDelete url="http://localhost:1337/categories" id={s.id} /> 
                                                    {/* <Image src={Trash.src} alt="trash icon" width="50" height="50" /> */}
                                                </span>
                                                <p>{s.title}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                

                            </> 
                        )} />

                        <WhiteContainer classname="admin__white-container admin__message-container" children={(
                            <>
                                <h2>Messages</h2>

                                {messages.map((m) => (
                                    <>
                                    <div className="admin__message--id" key={m.id}>
                                        <div className="admin__message--delete">
                                           <HandleDelete url="http://localhost:1337/messages" id={m.id} /> 
                                        </div>
                                       <a href={`/admin-message/${m.id}`} key={m.id}>
                                            <div className="admin__messages">
                                                <h5 className="admin__messages--name">{m.Name}</h5>
                                                <h3 className="admin__messages--subject">{m.Subject}</h3>
                                            </div>
                                        </a> 
                                    </div>
                                    </>
                                    
                                ))}
                            </>
                        )} />
                    </div>

                    

                    {/* <Footer /> */}
                </>
            ) : 
            
            ""
            }

        </>
    )
}

export async function getStaticProps() {
    
    let message = [];
    let service = [];

    try {
        const response = await axios.get("http://localhost:1337/messages");
        message = response.data;

        const response2 = await axios.get("http://localhost:1337/categories");
        service = response2.data;
    } catch(err) {
        console.log(err);
    } 

    return {
        props: {
            message: message,
            service: service,
        },
    };
}