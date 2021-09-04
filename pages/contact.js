import React, { useState } from 'react'
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
import SuccessImg from '../public/images/icons-confirmation/success-dialog.png'
import ModalBox from '../components/dialogBox/ModalBox';
import DialogApi from './api/hello';
import { useRouter } from 'next/router';


const schema = yup.object().shape({
	Name: yup.string().min(3).required("Name is required"),
    Subject: yup.string().required("Subject is required"),
    Email: yup.string().email().required("Email is required"),
    Number: yup.number().typeError('You must specify a number').required("Phone is required"),
    Message: yup.string().min(10).required("Message is required")
});

export async function getStaticProps() { 

    let contact = [];

    try {
        const resHome = await axios.get(process.env.API_HOME);
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

export default function Contact(props) {

    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data) {
        setSubmitting(true);
		setServerError(false);
        setSuccess(true);

        console.log(data)

        try {
            const resMes = await axios.post("http://localhost:1337/messages", data)
            console.log(resMes.data)
            confirm("Succes");
            setSuccess(true);

        } catch(err) {
            console.log(err);
            setServerError(err.toString());
        } finally {
            setSubmitting(false);
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
                            <div className="contact__form-heading">
                                <h1 className="contact__h1">Contact us</h1>
                    
                                <div>
                                    <form onSubmit={handleSubmit(onSubmit)}  className="form">
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
                                                {errors.Number && <FormError>{errors.Number.message}</FormError>}
                                            </div>
                                            <div className="contact__input-container">
                                                <div>Email:</div>
                                                <input className={`input contact__input ${errors.Email ? "red-border" : ""}`} {...register("Email")} />
                                                {errors.Email && <FormError>{errors.Email.message}</FormError>}
                                            </div>
                                        </div>

                                        <div className="contact__input-container">
                                            <div>Message:</div>
                                            <textarea className={`input contact__input ${errors.Message ? "red-border" : ""}`} {...register("Message")} />
                                            {errors.Name ? 
                                                        <FormError>{errors.Message.message}</FormError> 
                                                    :
                                                        <div className="input__required">Requires at least 10 characters</div>}
                                        </div>

                                        {/* {loginError && <FormError>{loginError}</FormError>} */}
                                        <div className="contact__btn">
                                            <button className="submit">Submit</button>
                                            <div className="input__required contact__btn--required">All fields are required *</div>
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
                                        <h4>{c.contact_info}</h4>
                                    </div>
                                ))}

                                <SoMe classname="contact__some" width="20" height="20" />
                            </div>
                        </div>  
                        )} />

                    </div>
                    
            </div>

            {/* If message is sent */}
            {/* {success ? <ModalBox 
                img={SuccessImg.src} 
                heading="Yes, message is sent!"
                bodyText="Thank you for your message.  We will be answering you as fast as possible."
                btnText="Continue"
                classname="success"
                />: ""} */}

            {/*{serverError ? <ModalBox
                img={SuccessImg.src}
                heading="Oh no! Something went wrong"
                bodyText="Unfortunately, your message did not arrive."
                btnText="Try again"
                classname="error"     />
            : ""} */}

            <Footer />
        </>
    )
}