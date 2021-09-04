import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import LoginForm from '../components/login/LoginForm'
import Navigation from '../components/nav/Nav'
import BlueContainer from '../components/containers/BlueContainer'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import WhiteContainer from '../components/containers/WhiteContainer'
import { useRouter } from 'next/router'
// import Footer from '../components/footer/Footer'

export default function login() {

    const [authKey, setAuthKey] = useState(null);
    const history = useRouter();

    useEffect(() => {
        const auth = window.localStorage.getItem("auth");

        if (auth) {
            setAuthKey(auth);
            history.push("/admin");
        } else {
            setAuthKey(null);
        }
    }, [])


    return (
        <>
            <Head>
                <title>Norsk piperehabilitering AS - ADMIN login</title>
                <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://use.typekit.net/cou5qgt.css"/>
            </Head>

            <Navigation />

            <div className="blue-container login">

                <Breadcrumb path="login" />

                <div className="login__text">
                    <h1 className="login__text--h1">Login</h1>
                    <p className="login__text--p">
                        This page is only for admin. 
                        Click here to og back to the homepage
                    </p>
                </div>

            </div>

            <WhiteContainer classname="login__white-container">
               <LoginForm /> 
            </WhiteContainer>

            {/* <Footer /> */}
            
            
        </>
    )
}
