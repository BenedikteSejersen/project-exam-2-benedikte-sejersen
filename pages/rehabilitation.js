import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav'

export default function rehabilitation() {
  return (
    <div>
      <Head>
        <Font />
        <title>Rehabiliation - Norsk piperehabilitering AS</title>
        <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
    </div>
  )
}