import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav';
import { useRouter } from 'next/router';
import axios from 'axios';


export default function message() {

    const history = useRouter();

    const { id } = useParams();
    console.log(id)

    if (!id) {
        history.push("/");
    }

    const url = `http://localhost:1337/messages?id=${id}`;

    async function getStaticProps() {

        let costumerMessage = [];

        try {
            const res = await axios.get(url);
            costumerMessage = res.data;
            console.log(costumerMessage)
        } catch(err) {
            console.log(err);
        }
        
    }

    return (
        <>  
        </>
    )
}