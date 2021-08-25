import React from 'react'
import Head from 'next/head'
import LoginForm from '../components/login/LoginForm'
import Navigation from '../components/nav/Nav'
import BlueContainer from '../components/containers/BlueContainer'

export default function login() {
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

                <div>
                    <h1>Login</h1>
                    <p>
                        This page is only for admin. 
                        Click here to og back to the homepage
                    </p>
                </div>

            </div>

            <div className="login__form-container">
               <LoginForm /> 
            </div>
            
            
        </>
    )
}
