import React, {useState, useEffect} from 'react'
import Trash from '../../public/images/icons-confirmation/trash.svg'
import UseLocalStorage from '../../hooks/UseLocalStorage';
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router';
import Delete from './Delete';

export default function HandleDelete({id, url}) {

    const [authKey, setAuthKey] = useState(null);
    const [open, setOpen] = useState({
        show: false,
        id: null
    });

    const store = UseLocalStorage();
    const history = useRouter();
    const idItem = id;

    function handleClick() {
        setOpen({
            show: true,
            id: idItem
        }) 
    }
    
    function handleCancel() {
        setOpen({
            show: false,
            id: null
        });
    }; 

    useEffect(() => {
        setAuthKey(JSON.parse(window.localStorage.getItem("auth")));
    }, [store.authKey])

    async function handleDelete() {
    
        const options = { 
            headers: { 
                "Authorization" : `Bearer ${authKey}`,
                'Content-Type': 'application/json',
            }
        };

        const idUrl = `${url}/${idItem}`;

        if (handleDelete) { 
            try {
                const deleted = await axios.delete(idUrl, options);
                setOpen({
                    show: true,
                    id: deleted,
                });
                history.push("/admin");
            } catch(err) {
                console.log(err);
            }
        }
    }
    

    return ( 
        <div>

            {open.show ?
                <Delete 
                    HandleDelete={() => handleDelete()}
                    HandleCancel={() => handleCancel()} 
                    />
            : ""   }

            <div className="delete" onClick={() => handleClick()}>
                <Image src={Trash.src} alt="trash icon" width="30" height="30" />
            </div>
            
        </div>
    )
}

export async function getStaticPaths() {

    try {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_MESSAGES);
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

    const url = process.env.NEXT_PUBLIC_API_MESSAGES + `?id=${params.id}`;

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
