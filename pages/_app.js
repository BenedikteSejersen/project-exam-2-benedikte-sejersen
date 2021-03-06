import '../styles/globals.css'
import '../styles/scss/style.css'
import '../styles/fonts/rns-sanz/stylesheet.css';
import '../styles/fonts/gothic-a1/stylesheet.css';
import React, { useEffect, useState } from "react";
import {Router} from 'next/router';
import { BeatLoader } from 'react-spinners';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };

  }, []);


  return (
      <>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/cou5qgt.css"/>
      </Head>
      {loading ? (
        <>
          <div className="loader-container">
            <BeatLoader />
          </div>
        </>
        ) : (
          <Component {...pageProps} />
        )}
    </>
  )
}

export default MyApp
