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

import Success from '../components/dialogBox/Success';
import ErrorConf from '../components/dialogBox/ErrorConf';


const schema = yup.object().shape({
	Name: yup.string().min(3).required("Name is required"),
    Subject: yup.string().required("Subject is required"),
    Email: yup.string().email().required("Email is required"),
    Number: yup.number().typeError('You must specify a number').required("Phone is required"),
    Message: yup.string().min(10).required("Message is required")
});

export default function Contact(props) {

    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const form = useRef();

    // Form yup resolver
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    console.log(errors)

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
    async function onSubmit(data) {
        setSubmitting(true);
		setServerError(false);

        try {
            const resMes = await axios.post("http://localhost:1337/messages", data)
            setShowConfirm(true);

        } catch(err) {
            console.log(err);
            setServerError(true);
            setShowConfirm(false);
        } 
    }

    return (
        <>  
            <Head>
                <title>Contact us - Norsk piperehabilitering AS</title>
                <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Nav />

            <div className="blue-container">

                <Breadcrumb path="contact" />

                <div className="contact">

                    <div className="contact__img">
                        <Image src={Img.src} alt="nice view of some cabins at work" width="1000" height="1000" />
                    </div>

                    <WhiteContainer classname="contact__white-container" children={(
                        <div className="contact__form-info">

                            <div>
                                <CircleInfo
                                    text="Monday-Friday 07.00 - 15.00" 
                                    classname="contact__circle-info" />
                            </div>
                            
                            <div className="contact__form-heading">
                                <h1 className="contact__h1">Contact us</h1>
                    
                                <div>
                                    <form ref={form} onSubmit={handleSubmit(onSubmit)}  className="form">
                                        <fieldset disabled={submitting}>
                                        <div className="contact__form--flex">
                                            <div className="contact__input-container">
                                                    <div>Name:</div>
                                                    <input className={`input contact__input ${errors.Name ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("Name")} />
                                                    {errors.Name ? 
                                                        <FormError>{errors.Name.message}</FormError> 
                                                    :
                                                        <div className="input__required">Requires at least 3 characters</div>}  
                                            </div>
                                                {/* Dropdown */}
                                            <div className="contact__input-container">
                                                    <div>Subject:</div>
                                                    
                                                    <select
                                                    name="Subject"
                                                    className={`input contact__dropdown ${errors.Subject ? "red-border" : ""}`} 
                                                    {...register("Subject")}
                                                    >
                                                        <option value="">-- Select subject --</option>
                                                        <option value="Inspection">Inspection</option>
                                                        <option value="Rehabilitation">Rehabilitation</option>
                                                        <option value="Steel pipe">Steel pipe</option>
                                                        <option value="Oven mounting">Oven mounting</option>
                                                        <option value="Pipe fitting">Pipe fitting</option>
                                                        <option value="Questions">Questions</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    {errors.Subject && <FormError>{errors.Subject.message}</FormError>}
                                            </div>  
                                        </div>
                                            
                                        <div className="contact__form--flex">
                                            <div className="contact__input-container">
                                                <div>Phone:</div>
                                                <input className={`input contact__input ${errors.Number ? "red-border" : ""}`} {...register("Number")} />
                                                {errors.Number ? 
                                                        <FormError>{errors.Number.message}</FormError> 
                                                    :
                                                        <div className="input__required">Requires at least 8 numbers</div>}
                                            </div>
                                            <div className="contact__input-container">
                                                <div>Email:</div>
                                                <input className={`input contact__input ${errors.Email ? "red-border" : ""}`} {...register("Email")} />
                                                {errors.Email && <FormError>{errors.Email.message}</FormError>}
                                            </div>
                                        </div> 

                                        <div className="contact__input-container">
                                            <div>Message:</div>
                                            <TextareaAutosize className={`input contact__input ${errors.Message ? "red-border" : ""}`} {...register("Message")}  />
                                            {errors.Message ? 
                                                        <FormError>{errors.Message.message}</FormError> 
                                                    :
                                                        <div className="input__required">Requires at least 10 characters</div>}
                                        </div>

                                        <div className="contact__btn">
                                            <button onClick={handleConfrimMsg} className="submit">Submit</button>
                                            <div className="input__required contact__btn--required">All fields are required</div>
                                        </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>

                            <div className="contact__info-container">
                                {props.contact.contact.contact_methods.map(c => (
                                    <div className="contact__info" key={c.id}>
                                        <div  className="contact__info--img">
                                            <Image src={c.contact_icon[0].url} alt="contact icon" width="30" height="30" />
                                        </div>
                                        <h4 className="p__normal">{c.contact_info}</h4>
                                    </div>
                                ))}

                                <SoMe classname="contact__some" width="20" height="20" />
                            </div>
                        </div>  
                        )} />

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

    try {
        const resHome = await axios.get('http://localhost:1337/homepage');
        contact = resHome.data;
    } catch(err) {
        console.log(err);
    }

    return {
        props: {
            contact: contact,
        },
    };
}
