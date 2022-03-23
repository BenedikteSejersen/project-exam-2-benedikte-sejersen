import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Services() {

    const [service, setService] = useState([]);

    const router = useRouter();

    useEffect(async() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        // setFetchError(false);

        try {
            const res = await axios.get(process.env.NEXT_PUBLIC_API_SERVICES, { signal : signal });
            setService(res.data);
            // setFetchError(false);
        } catch(err) {
            // setFetchError(true);
            console.log(err);
        }

          return function cleanUp() {
            abortController.abort();
        }

      }, []);
    
  return (
    <div className='services-container'>
        {service.map((s) => (
            <Link key={s.id} href={`/${s.slug}`}>
                <div className={`service__link`}>
                    <div className='services__icon'>
                        <Image src={s.icon} width='500' height='500' />
                    </div>
                    <div className='services__p-container'>
                        <p className={router.pathname === `/${s.slug}` ? 'red-text' : ''}>{s.title}</p>
                    </div>
                </div>
            </Link>
        ))}
    </div>
  )
}
