import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Nav from '../components/nav/Nav';
import { useRouter } from 'next/router';
import UseLocalStorage from '../hooks/UseLocalStorage';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from '../components/login/FormError';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import WhiteContainer from '../components/containers/WhiteContainer';
import axios from 'axios'
import UserIcon from '../public/images/icons/user.svg'
import Image from 'next/image'
import TextareaAutosize from 'react-textarea-autosize';
import Footer from '../components/footer/Footer';
import ErrorConf from '../components/dialogBox/ErrorConf';

const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
const whitespace = /^([A-z0-9!@#$%^&*().,<>{}[\]<>?_=+\-|;:\'\"\/])*[^\s]\1*$/

// const str.replace(/\s+/g, '');

const schema = yup.object().shape({
	title: yup.string().required("Title is required"),
    short_description: yup.string().required("Short description is required"),
    description: yup.string().required("Description is required"),
    slug: yup.string().required("Slug is required").trim("hello").matches(whitespace, "Replace whitespace with -"),
    short_text_index: yup.string().required("Short text displayed in homepage is required").max(40, "Text is too long"),
    icon: yup.string().required("Icon is required").matches(URL, "Please enter a valid url"),
    img_1: yup.string().required("Image is required").matches(URL, "Please enter a valid url"),
    img_2: yup.string().required("Image is required").matches(URL, "Please enter a valid url"),
    img_3: yup.string().required("Image is required").matches(URL, "Please enter a valid url"),
});

export default function AdminCreateService() {

    const [authKey, setAuthKey] = useState(null);
    const [userId, setUserId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(false);

    const history = useRouter();
    const store = UseLocalStorage();

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
        history.push("/admin-create-service");
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
            await axios.post(process.env.NEXT_PUBLIC_API_SERVICES, data, options);
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
                        <title>Create - Norsk piperehabilitering AS</title>
                        <meta name="description" content="We help you with rehabilitation of chimney flues, installations of ovens, pipe fittings and installations of steel chimneys." />
                        <link rel="icon" href="/favicon.ico" />
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
                    </Head>

                    <Nav />

                    <div className="blue-container">

                        <Breadcrumb path="/admin-create-service" />
                        <div className="admin__layout-flex">

                        <div className="admin__header--section">
                            <h1 className="admin__create--h1">Create new service</h1>
                            <div className="admin__user">
                                <div className="admin__header--user">
                                    <Image src={UserIcon.src} alt="user icon" width="50" height="50" />
                                </div>
                                <h3 className="admin__header--user-id">{userId}</h3>
                            </div>
                        </div>
                        
 
                        <WhiteContainer classname="services-update__white-container">
                            <main>
                                <form 
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="form"
                                    >
                                    <fieldset disabled={submitting}>

                                        <div className="admin__create--flex">
                                            <div className="service__updating">
                                                <div className="service__updating--label">Title:</div>
                                                <input className={`input updating-input ${errors.title ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("title")} />
                                                {errors.title ?
                                                    <FormError>{errors.title.message}</FormError>
                                                :
                                                    <div className="input__required">Title of the service</div>
                                                }
                                            </div>

                                            <div className="service__updating">
                                                <div className="service__updating--label">Slug:</div>
                                                <input className={`input updating-input ${errors.slug ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("slug")} />
                                                {errors.slug ?
                                                    <FormError>{errors.slug.message}</FormError>
                                                :
                                                    <div className="input__required">Where the service shall link to</div>
                                                }
                                            </div>
                                        </div>

                                    <div className="service__updating">
                                        <div  className="service__updating--label">Short description:</div>
                                        {errors.short_description ?
                                            <FormError>{errors.short_description.message}</FormError>
                                        :
                                            <div className="input__required">Short important description in the blue area</div>
                                        }
                                        <TextareaAutosize className={`textarea__update input create-service__input ${errors.title ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("short_description")} />
                                    </div>

                                    <div className="service__updating">
                                        <div className="service__updating--label">Long description:</div>
                                        <TextareaAutosize className={`textarea__update input create-service__input ${errors.description ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("description")} />
                                        {errors.description ?
                                            <FormError>{errors.description.message}</FormError>
                                        :
                                            <div className="input__required">Long detailed description underneath the blue area</div>
                                        } 
                                    </div>

                                    <div className="service__updating">
                                        <div className="service__updating--label">Short text displayed in homepage:</div>
                                        <TextareaAutosize className={`textarea__update input create-service__input ${errors.short_text_index ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("short_text_index")} />
                                        {errors.short_text_index ?
                                            <FormError>{errors.short_text_index.message}</FormError>
                                        :
                                            <div className="input__required">Text will be displayed in the homepage about the service</div>
                                        }  
                                    </div>

                                    <div className="service__updating">
                                        <div className="service__updating--label">Icon:</div>
                                        <TextareaAutosize className={`textarea__update input create-service__input ${errors.icon? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("icon")} />
                                        {errors.icon ?
                                            <FormError>{errors.icon.message}</FormError>
                                        :
                                            <div className="input__required">Icon will be displayed in the menu and homepage</div>
                                        }   
                                    </div>

                                    <div className="service__updating">
                                        <div className="service__updating--label">Image:</div>
                                        <TextareaAutosize className={`textarea__update input create-service__input ${errors.img_1? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("img_1")} />
                                        {errors.img_1 ?
                                            <FormError>{errors.img_1.message}</FormError>
                                        :
                                            <div className="input__required">Image will be displayed in the service page</div>
                                        }     
                                    </div>

                                    <div className="service__updating">
                                        <div className="service__updating--label">Image:</div>
                                        <TextareaAutosize className={`textarea__update input create-service__input ${errors.img_2? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("img_2")} />
                                        {errors.img_2 ?
                                            <FormError>{errors.img_2.message}</FormError>
                                        :
                                            <div className="input__required">Image will be displayed in the service page</div>
                                        }
                                    </div>

                                    <div className="service__updating">
                                        <div className="service__updating--label">Image:</div>
                                        <TextareaAutosize className={`textarea__update input create-service__input ${errors.img_3? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("img_3")} />
                                        {errors.img_3 ?
                                            <FormError>{errors.img_3.message}</FormError>
                                        :
                                            <div className="input__required">Image will be displayed in the service page</div>
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
            ) : 
            
            ""
            }

        </>
    )
}