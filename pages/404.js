import React from 'react'
import Navigation from '../components/nav/Nav'
import Image from 'next/image'
import PrimaryBtn from '../components/btn/PrimaryBtn'
import Footer from '../components/footer/Footer'
import { useRouter } from 'next/router'
import not_found_img from '../public/images/404/404.jpg';

export default function Custom404() {
    const router = useRouter()
    return (
        <>

        <Navigation />

        <div className='notFound-content'>
            <div className='notFound__text'>
               <h1>Siden ble ikke funnet</h1>
                <div className='notFound__p'>
                    <p>Siden du leter etter eksisterer ikke, eller har blitt flyttet. Her finner du noen hjelpsomme linker:</p>
                </div>

                <div className='notFound__btn-container'>
                    <div className="secondary-btn" onClick={() => router.back()}>
                        <a className="secondary-btn__a">
                            <span className="secondary-btn__a--text">Gå tilbake</span>
                        </a> 
                    </div>  
                    <div>
                        <PrimaryBtn text='Gå hjem' link='/' />
                    </div>
                </div> 
            </div>

            <div className='notFund__img-container'>
                <Image src={not_found_img} width='400' height='300' />
            </div>
        </div>

        <Footer />
        </>
    )
}
