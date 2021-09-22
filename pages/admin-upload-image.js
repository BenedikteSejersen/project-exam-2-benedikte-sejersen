import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav';
import { useRouter } from 'next/router';
import Footer from '../components/footer/Footer';
import UseLocalStorage from '../hooks/UseLocalStorage';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import FileUpload from '../components/upload/FileUpload';
import WhiteContainer from '../components/containers/WhiteContainer';
import UserIcon from '../public/images/icons/user.svg';
import Image from 'next/image'

export default function AdminUploadImage() {

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
                        <title>Upload images - Norsk piperehabilitering AS</title>
                        <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>

                    <Nav />

                    <div className="blue-container">

                        <Breadcrumb path="/admin-upload-image" />

                        <div className="admin__layout-flex">

                            <div className="admin__header--section">
                            <h1 className="admin__h1">Upload new images to the gallery</h1>
                                <div className="admin__user admin-panel__user">
                                    <div><Image src={UserIcon.src} alt="user icon" width="50" height="50" /></div>
                                    <h3>{userId}</h3>
                                </div> 
                            </div>

                            <WhiteContainer classname="services-update__white-container">
                                <FileUpload />
                            </WhiteContainer>

                        </div>
                        
                    </div>

                    <Footer />
                </>
            ) : ""}

        </>
    )
}