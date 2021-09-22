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

const schema = yup.object().shape({
	title: yup.string().required("Title is required"),
    short_description: yup.string().required("Short description is required"),
    description: yup.string().required("Description is required"),
    slug: yup.string().required("Slug is required"),
    short_text_index: yup.string().required("Short text displayed in homepage is required").max(20)
});

export default function AdminCreateService() {

    const [authKey, setAuthKey] = useState(null);
    const [userId, setUserId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(false);

    // const [iconImage, setIconImage] = useState({value: ""}); 
    const [iconImage, setIconImage] = useState([]); 

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

    // const handleChange = (e) => {
    //     setIconImage({value: e.target.value})
    // }

    // Form submit function
    async function onSubmit(data) {
        setSubmitting(true);
		setServerError(false);

        // let fileUpload = new formData();
        // console.log(iconImage + " " + "This is icon pathname")
        // fileUpload.append("icon", iconImage);

        const options = { 
            headers: { 
                "Authorization" : `Bearer ${authKey}`,
                'Content-Type': 'application/json',
            }
        };

        try {

            // POST images
            const resImage = await axios.post(process.env.NEXT_PUBLIC_API_SERVICES, data, options,)
            console.log(resImage.data + 'this is data after api call');
            // const imageId = resImage.data.id;

            // axios.post("http://localhost:1337/categories",{image:imageId}).then((response)=>{
            //     console.log(response)

            // }).catch((error)=>{
            //     console.log(error);
            // })

            // POST text
            const res = await axios.post(process.env.NEXT_PUBLIC_API_SERVICES, data, options,)
            // setShowConfirm(true);
            console.log(data)

        } catch(err) {
            console.log(err);
            setServerError(true);
            // setShowConfirm(false);
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
                            <div>
                                <form 
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="form"
                                    >
                                    <fieldset disabled={submitting}>

                                        <div className="admin__create--flex">
                                            <div className="service__updating">
                                                <div className="service__updating--label">Title:</div>
                                                <input className={`input updating-input ${errors.title ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("title")} />
                                                {errors.title && <FormError>{errors.title.message}</FormError>}
                                                <div className="input__required">Title of the service</div>
                                            </div>

                                            <div className="service__updating">
                                                <div className="service__updating--label">Slug:</div>
                                                <input className={`input updating-input ${errors.slug ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("slug")} />
                                                {errors.slug && <FormError>{errors.slug.message}</FormError>}   
                                                <div className="input__required">Where the service shall link to</div>
                                            </div>
                                        </div>

                                    <div className="service__updating">
                                        <div  className="service__updating--label">Short description:</div>
                                        <TextareaAutosize className={`textarea__update input create-service__input ${errors.title ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("short_description")} />
                                        {errors.title && <FormError>{errors.title.message}</FormError>}  
                                        <div className="input__required">Short important description in the blue area</div>
                                    </div>

                                    <div className="service__updating">
                                        <div className="service__updating--label">Long description:</div>
                                        <TextareaAutosize className={`textarea__update input create-service__input ${errors.description ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("description")} />
                                        {errors.description && <FormError>{errors.description.message}</FormError>} 
                                        <div className="input__required">Long detailed description underneath the blue area</div>  
                                    </div>

                                    <div className="service__updating">
                                        <div className="service__updating--label">Short text displayed in homepage:</div>
                                        <TextareaAutosize className={`textarea__update input create-service__input ${errors.short_text_index ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("short_text_index")} />
                                        {errors.short_text_index && <FormError>{errors.short_text_index.message}</FormError>}
                                        <div className="input__required">Text will be displayed in the homepage about the service</div>   
                                    </div>

                                    <div>
                                        Images
                                        <div className="create-service__input-container">
                                            <div>Icon:</div>
                                            {/* <input type="file"  className={`input create-service__input ${errors.icon ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("icon")} /> */}
                                            <input 
                                                type="file" 
                                                name="icon"
                                                value={iconImage}
                                                onChange={(e)=>setIconImage(e.target.value)} 
                                                // {...register("icon")} 
                                                />
                                            {/* {errors.slug && <FormError>{errors.icon.message}</FormError>}    */}
                                        </div>

                                        <div className="create-service__input-container">
                                            <div>Image 1:</div>
                                            <input type="file" className={`input create-service__input ${errors.icon ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("icon")} />
                                            {/* {errors.slug && <FormError>{errors.icon.message}</FormError>}    */}
                                        </div>

                                        <div className="create-service__input-container">
                                            <div>Image 2:</div>
                                            <input type="file" className={`input create-service__input ${errors.icon ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("icon")} />
                                            {/* {errors.slug && <FormError>{errors.icon.message}</FormError>}    */}
                                        </div>

                                        <div className="create-service__input-container">
                                            <div>Image 3:</div>
                                            <input type="file" className={`input create-service__input ${errors.icon ? "red-border" : ""} ${errors.success ? "green-border" : ""}`} {...register("icon")} />
                                            {/* {errors.slug && <FormError>{errors.icon.message}</FormError>}    */}
                                        </div>
                                    </div>

                                    <div className="create-service__btn">
                                        <button className="submit">Submit</button>
                                        <div className="input__required create-service__btn--required">All fields are required</div>
                                    </div>

                                    </fieldset>
                                </form>
                            </div>

                        </WhiteContainer>
                        </div>

                    </div>
                    <Footer />
                </>
            ) : 
            
            ""
            }

        </>
    )
}