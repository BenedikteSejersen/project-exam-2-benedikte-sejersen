import axios from 'axios';
import React from 'react'

export default function test(props) {

    const image = props.img[0].img_url;

    console.log(props.img[0].img_url)
    return (
        <div>

            <img src={image} />
            
        </div>
    )
}

export async function getStaticProps() {
    let img = [];

    try {
        const res = await axios.get("http://localhost:1337/galleries");
        img = res.data;
    } catch(err) {
        console.log(err)
    }

    return {
        props: {
            img: img
        }
    }
}
