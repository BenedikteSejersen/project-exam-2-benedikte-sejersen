import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import axios from 'axios'
import Nav from '../components/nav/Nav';
import { useRouter } from 'next/router';
import Footer from '../components/footer/Footer';
import UseLocalStorage from '../hooks/UseLocalStorage';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import WhiteContainer from '../components/containers/WhiteContainer';
import UserIcon from '../public/images/icons/user.svg';
import Image from 'next/image'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from '../components/login/FormError';
import ErrorConf from '../components/dialogBox/ErrorConf';
import { useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

const schema = yup.object().shape({
	img_url: yup.string().required("Image is required").matches(URL, "Please enter a valid url"),
    alt_text: yup.string().required("Alt text is required")
});

export default function AdminUploadImage() {

    const [authKey, setAuthKey] = useState(null);
    const [userId, setUserId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(false);

    const history = useRouter();
    const store = UseLocalStorage();
    const form = useRef();

    // Form yup resolver
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {

        setUserId(JSON.parse(window.localStorage.getItem("user")));
        const auth = JSON.parse(window.localStorage.getItem("auth"));

        if (!auth) {
            setAuthKey(null);
            history.push("/");
        } else {
            setAuthKey(auth);
        }

    }, [store.userId]);

    function handleConfirm() {
        setServerError(false);
        history.push("/admin-upload-image");
    }

      // Form submit function
      async function onSubmit(data) {
        setSubmitting(true);
		setServerError(false);

        data.status = "publish";

        const options = { 
            headers: { 
                "Authorization" : `Bearer ${authKey}`,
                'Content-Type': 'application/json',
            }
        };


        try {
            const resImage = await axios.post(process.env.NEXT_PUBLIC_API_GALLERY, data, options);
            console.log(resImage.data)
            history.push("/admin");

        } catch(err) {
            console.log(err);
            setServerError(true);
        } 
    }

    return (
        <>  
            {authKey ? (
                <>
                    <Head>
                        <title>Upload images - Norsk piperehabilitering AS</title>
                        <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                        <link rel="icon" href="/favicon.ico" />
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
                    </Head>

                    <Nav />

                    <div className="blue-container">

                        <Breadcrumb path="/admin-upload-image" />

                        <div className="admin__layout-flex">

                            <div className="admin__header--section">
                            <h1 className="admin__h1">Upload new images to the gallery</h1>
                                <div className="admin__user admin-panel__user">
                                    <div><Image src={UserIcon.src} alt="user icon" width="50" height="50" /></div>
                                    <h3>{userId}</h3>
                                </div> 
                            </div>

                            <WhiteContainer classname="create__white-container">

                                <main>
                                    <form 
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="form"
                                        >
                                        <fieldset disabled={submitting}>
                                        <div className="create__heading">
                                            <h2>Upload your images from cloudinary here. These images will be uploaded to your gallery</h2>
                                        </div>

                                        <div className="service__updating">
                                            <div className="service__updating--label">Upload image:</div>
                                            <TextareaAutosize 
                                                className={`textarea__update input create-service__input ${errors.img_url ? "red-border" : ""} 
                                                ${errors.success ? "green-border" : ""}`} 
                                                {...register("img_url")} />
                                                {errors.alt_text ?
                                                    <FormError>{errors.img_url.message}</FormError>
                                                :
                                                    <div className="input__required">Image displayed in the gallery</div>
                                                }   
                                        </div>

                                        <div className="service__updating">
                                            <div className="service__updating--label">Alt text:</div>
                                            <TextareaAutosize 
                                                className={`textarea__update input create-service__input ${errors.alt_text ? "red-border" : ""} 
                                                ${errors.success ? "green-border" : ""}`} 
                                                {...register("alt_text")} />
                                                {errors.alt_text ?
                                                    <FormError>{errors.alt_text.message}</FormError>
                                                :
                                                    <div className="input__required">Short descriptive text about the image</div>
                                                }   
                                        </div>

                                        <div className="create__btn">
                                            <button className="submit">Submit</button>
                                            <div className="input__required create-service__btn--required">All fields are required</div>
                                        </div>

                                        </fieldset>
                                    </form>

                                </main>
                            </WhiteContainer>

                        </div>
                        
                    </div>

                    {serverError && (
                        <ErrorConf confirm={() => handleConfirm()} />
                    )}

                    <Footer />
                </>
            ) : ""}

        </>
    )
}