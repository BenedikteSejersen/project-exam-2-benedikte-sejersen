import React from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';

export default function service() {

    const history = useRouter();

    const { slug } = useParams();
    console.log(id)

    if (!slug) {
        history.push("/");
    }

    const url = `http://localhost:1337/categories?slug=${slug}`;

    async function getStaticProps() {

        let service = [];

        try {
            const res = await axios.get(url);
            service = res.data;
        } catch(err) {
            console.log(err);
        }
        
    }

    return (
        <div>
            
        </div>
    )
}
