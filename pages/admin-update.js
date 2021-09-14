import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav';
import { useRouter } from 'next/router';
import UseLocalStorage from '../hooks/UseLocalStorage';


export default function Update(props) {

    console.log(props.result)

    const [authKey, setAuthKey] = useState(null);
    const [userId, setUserId] = useState(null);

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
                        <title>Update - Norsk piperehabilitering AS</title>
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

// export function getStaticPaths() {
//     try {
//         const res = await axios.get("http://localhost:1337/homepage");
//         const message = res.data; 
//         console.log(message)

//         const paths = message.map((m) => ({
//             params: { id:  m.id.toString() },
//         }));

//         console.log(paths)
        
//         return { paths, fallback: false };

//     } catch(err) {
//         console.log(err);
//     }

// }

export async function getStaticProps() {

    let result = [];

    try {
        const res = await axios.get("http://localhost:1337/homepage");
        result = res.data; 
        console.log(result)

    } catch(err) {
        console.log(err);
    }

    return {
        props: {
            result: result
        }
    }
}