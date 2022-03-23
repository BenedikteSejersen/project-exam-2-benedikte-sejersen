import React, { useState, useRef } from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav';
import axios from 'axios';
import Img from '../public/images/contact-img.jpg'
import Image from 'next/image';
import Footer from '../components/footer/Footer';
import WhiteContainer from '../components/containers/WhiteContainer';
import SoMe from '../components/soMe/SoMe';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from '../components/login/FormError';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import TextareaAutosize from 'react-textarea-autosize';
import CircleInfo from '../components/containers/CircleInfo';
import { send } from 'emailjs-com';

import Success from '../components/dialogBox/Success';
import ErrorConf from '../components/dialogBox/ErrorConf';
import ErrorComponent from '../components/error/ErrorComponent';
import ArrowUp from '../public/images/icons/arrow-up.png'
import ArrowDown from '../public/images/icons/arrow-down.png'

const schema = yup.object().shape({
	from_name: yup.string().required("Navn må fylles ut"),
    service: yup.string().required("Tema må velges"),
    reply_to: yup.string().email().required("E-post må fylles ut"),
    number: yup.number().required("Nummer må fylles ut").typeError('Kun tall er godtatt'),
    message_to: yup.string().required("Melding må fylles ut")
});

export default function Contact(props) {

    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [toSend, setToSend] = useState({
        from_name: '',
        message_to: '',
        reply_to: '',
        number: '',
        service: '',
      });

    const handleDropdown = () => setShow(!show);

    function handleChange(e) {
        setSelectedSubject(e)
        setShow(false);
    }

    const error = props.error;
    const service = props.services;

    const form = useRef();

    // Form yup resolver
    const { handleC, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // Confirmation dialog form successfully sent
    const handleConfirm = () => {
        form.current.submit();
    }

    const handleConfrimMsg = () => {
        if (Object.entries(errors).length === 0) {
            return setShowConfirm(false);
        } 
        return false;
    }

    // Form submit function
    const onSubmit = (e) => {
        setSubmitting(true);

        send(
            // 'service_tqkqmk4',
            // 'template_p79dm3l',
            // toSend,
            // 'aQnjCHLb0XF_LwwqR'

            'service_27mvh1t',
            'template_3iftnuo',
            toSend,
            'user_P1SkhYsGnLeEEwTAgFD9t'
          )
            .then((response) => {
              console.log('SUCCESS!', response.status, response.text);
              setShowConfirm(true);
            })
            .catch((err) => {
              console.log('FAILED...', err);
              setServerError(true);
              setShowConfirm(false);
            });
      };
    
      const handleSend= (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
      };

    if (error) {
        return <ErrorComponent />
    }

    return (
        <>  
            <Head>
                <title>Kontakt oss - Norsk piperehabilitering AS</title>
                <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
            </Head>

            <Nav />

            <div className="blue-container">

                <div className="contact">

                        <main className="contact__form-info">
                            
                            <div className="contact__form-heading">
                                <h1 className="contact__h1">Kontakt <span className='orange-text'>oss</span></h1>
                    
                                <div>
                                    <form ref={form} onSubmit={handleSubmit(onSubmit)} className="form">
                                        <fieldset disabled={submitting}>
                                        <div className="contact__form--flex">
                                            <div className="contact__input-container">
                                                    <p className='contact__input--p'>Navn:</p>
                                                    <input 
                                                    className={`input contact__input ${errors.from_name ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} 
                                                    {...register("from_name")} 
                                                    onChange={handleSend}
                                                    value={toSend.from_name}
                                                    name='from_name'
                                                    />
                                                    <div className='contat__error--text'>{errors.from_name && <FormError>{errors.from_name.message}</FormError>}</div>
                                            </div>
                                                {/* Dropdown */}
                                                <div className="contact__input-container">
                                                    <p className='contact__input--p'>Tema:</p>
                                                    <div className="form-dropdown__custom contact__dropdown">
                                                        <select
                                                        {...register("service")} 
                                                        className="input-dropdown form-dropdown__input"
                                                        onChange={handleSend}
                                                        value={toSend.service}
                                                        name='service'
                                                        >
                                                                <option
                                                                className='option'
                                                                value=''
                                                                >-- Velg --</option>
                                                                {service.map((s) => (
                                                                    <option 
                                                                        key={s.id} 
                                                                        value={s.title} 
                                                                        className="option"
                                                                        >{s.title}</option>
                                                                ))}
                                                                <option className="option" value="Spørsmål" >Spørsmål</option>
                                                                <option className="option" value="Befaring" >Befaring</option>
                                                                <option className="option" value="Annet">Annet</option>
                                                        </select>
                                                </div>
                                                <div className='contat__error--text'>{errors.service && <FormError>{errors.service.message}</FormError>}</div>
                                            </div>  
                                        </div>
                                            
                                        <div className="contact__form--flex">
                                            <div className="contact__input-container">
                                                <p className='contact__input--p'>Mobilnummer:</p>
                                                <input 
                                                className={`input contact__input ${errors.number ? "red-border" : ""}`} 
                                                {...register("number")}
                                                onChange={handleSend}
                                                value={toSend.number}
                                                name='number'
                                                 />
                                                <div className='contat__error--text'>{errors.number && <FormError>{errors.number.message}</FormError>}</div>
                                            </div>
                                            <div className="contact__input-container">
                                                <p className='contact__input--p'>E-post:</p>
                                                <input
                                                className={`input contact__input ${errors.reply_to ? "red-border" : ""}`} 
                                                {...register("reply_to")} 
                                                onChange={handleSend}
                                                value={toSend.reply_to}
                                                name='reply_to'
                                                />
                                                <div className='contat__error--text'>{errors.reply_to && <FormError>{errors.reply_to.message}</FormError>}</div>
                                            </div>
                                        </div> 

                                        <div className="contact__input-container contact__input-container--message">
                                            <p className='contact__input--p'>Melding:</p>
                                            <TextareaAutosize 
                                            className={`input contact__input contact__message ${errors.message_to ? "red-border" : ""}`} 
                                            {...register("message_to")} 
                                            onChange={handleSend}
                                            value={toSend.message_to}
                                            name='message_to' 
                                            />
                                            <div className='contat__error--text'>{errors.message_to && <FormError>{errors.message_to.message}</FormError>}</div>
                                        </div>

                                        <div className="contact__btn">
                                            <button onClick={handleConfrimMsg} className="submit">Send</button>
                                            <p className="input__required contact__btn--required">Alle felt må fylles ut</p>
                                        </div>
                                        </fieldset>
                                    </form>
                                </div> 
                            </div>

                            <div className="contact__info-container">
                                <div className='contact__info--email'>
                                    <a href='mailto:janne@npras.no'>janne@npras.no</a>
                                </div>

                                <SoMe classname="contact__some" width="50" height="50" />
                            </div>
                        </main> 

                        <div className='contact__img-container'>

                            <div className="contact__img">
                                <Image src={Img.src} alt="nice view of some cabins at work" width="1200" height="1500" />
                            </div> 

                            <div>
                                <CircleInfo
                                    text='Åpningstid: Mandag - Fredag 07.00 - 15.00'
                                    classname="contact__circle-info" />
                            </div>
                            
                        </div>
                        

                    </div>
                    
            </div>

            <Footer />

            {showConfirm &&  (
                <Success confirm={handleConfirm} />
            )}
            {serverError && (
                <ErrorConf confirm={handleConfirm} />
            )}
        </>
    )
}

export async function getStaticProps() { 

    let contact = [];
    let services = [];

    try {
        const resHome = await axios.get(process.env.NEXT_PUBLIC_API_HOME);
        contact = resHome.data;

        const resService = await axios.get(process.env.NEXT_PUBLIC_API_SERVICES);
        services = resService.data;

    } catch(err) {
        console.log(err);
        return { props: { 
            error: true,
            contact: contact,
            services: services
          }};
    }

    return {
        props: {
            error: false,
            contact: contact,
            services: services
        },
    };
}
