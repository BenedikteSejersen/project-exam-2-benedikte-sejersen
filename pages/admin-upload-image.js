import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav';
import { useRouter } from 'next/router';
import Footer from '../components/footer/Footer';
import UseLocalStorage from '../hooks/UseLocalStorage';


export default function uploadImage() {

    const [authKey, setAuthKey] = useState(null);

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

    return (
        <>  
            {authKey ? (
                <>
                    <Head>
                        <title>Upload images - Norsk piperehabilitering AS</title>
                        <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>

                    <Nav />

                    <div className="blue-container">

                        <h1>Update</h1>

                    </div>

                    <Footer />
                </>
            ) : 
            
            ""
            }

        </>
    )
}