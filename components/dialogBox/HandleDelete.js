import React, {useState, useEffect} from 'react'
import Trash from '../../public/images/icons-confirmation/trash.svg'
import UseLocalStorage from '../../hooks/UseLocalStorage';
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router';

export default function HandleDelete({id, url}) {

    const [authKey, setAuthKey] = useState(null);

    const store = UseLocalStorage();
    const history = useRouter();

    useEffect(() => {
        setAuthKey(JSON.parse(window.localStorage.getItem("auth")));
    }, [store.authKey])

    const idMessage = id;

    async function onDelete() {
        const confirmDelete = confirm("Are you sure you will delete?");

        console.log(authKey)
        const options = { 
            headers: { 
                "Authorization" : `Bearer ${authKey}`,
                'Content-Type': 'application/json',
            }
        };

        if (confirmDelete) {
            try {
                await axios.delete(`${url}/${idMessage}`, options);
                history.push("/admin");
            } catch(err) {
                console.log(err);
            }
        }
    }

    return (
        <div>

            <div className="delete" onClick={() => onDelete()}>
                <Image src={Trash.src} alt="trash icon" width="30" height="30" />
            </div>
            
        </div>
    )
}

export async function getStaticPaths() {

    try {
        const res = await axios.get("http://localhost:1337/messages");
        const message = res.data; 
        console.log(message)

        const paths = message.map((m) => ({
            params: { id:  m.id.toString() },
        }));

        console.log(paths)
        
        return { paths, fallback: false };

    } catch(err) {
        console.log(err);
    }
}

export async function getStaticProps({ params }) {
    const url = `http://localhost:1337/messages?id=${params.id}`;

    let message = null;

    try {
        const res = await axios.get(url);
        message = res.data;
    } catch(err) {
        console.log(err);
    }

    return {
        props: {
            message: message,
        },
    };
}
