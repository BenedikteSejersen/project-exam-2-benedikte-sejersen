import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav';
import { useRouter } from 'next/router';


export default function Admin() {

    const [authKey, setAuth] = useState(null);

    const history = useRouter();

    useEffect(() => {
        
        const auth = window.localStorage.getItem("auth");

        if (!auth) {
            setAuth(null);
            history.push("/");
        } else {
            setAuth(auth);
        }
    }, [])

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
                </>
            ) : 
            
            ""
            }

        </>
    )
}