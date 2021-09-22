import React, { useState, useEffect  } from 'react'
import UpdateIcon from '../../public/images/icons/update-icon.png'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios';
import UserIcon from '../../public/images/icons/user.svg';
import UseLocalStorage from '../../hooks/UseLocalStorage';
import ErrorConf from '../dialogBox/ErrorConf';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormError from '../login/FormError';
import { yupResolver } from "@hookform/resolvers/yup";
import WhiteContainer from '../containers/WhiteContainer';
import { useRouter } from 'next/router';

const schema = yup.object().shape({
	title: yup.string().required("Title is required"),
    short_description: yup.string(),
    description: yup.string().required("Description is required"),
    slug: yup.string().required("Slug is required"),
});

export default function UpdateServices({ service }) {

    const [authKey, setAuthKey] = useState(null);
    const [updatingPost, setUpdatingPost] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [fetchingPost, setFetchingPost] = useState(false);
    const [userId, setUserId] = useState("");

    const history = useRouter();
    const store = UseLocalStorage();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleClick = () => {
        setClicked(true);
    }

    function handleConfirm() {
        setUpdateError(false);
    }

    useEffect(() => {
        setUserId(JSON.parse(window.localStorage.getItem("user")));
        const auth = JSON.parse(window.localStorage.getItem("auth"));
        setAuthKey(auth);
    }, [store.userId]);

    async function onSubmit(data) {
        setUpdated(false);
        setUpdatingPost(true);
        setUpdateError(false);

        const options = { 
            headers: { 
                "Authorization" : `Bearer ${authKey}`,
                'Content-Type': 'application/json',
            }
        };

        const urlServices = process.env.NEXT_PUBLIC_API_SERVICES;

        try {
            const res = await axios.put(`${urlServices}/${service.id}`, data, options);
            console.log("response:", res.data);
            setUpdated(true);
            history.push(`/service/${service.slug}`)
        } catch(err) {
            console.log(err);
            setUpdateError(true);
        } finally {
            setUpdatingPost(false);
        }
    }

    return (
        <div>

        {clicked ? "" :
            <div onClick={() => handleClick()} className="update-icon">
                <div className="update-btn">
                    <a><Image src={UpdateIcon.src} width="50" height="50" alt="update the content icon" /></a>
                </div>
            </div>
        }

            {clicked && (
                <div className="admin__layout-flex">
                <div className="admin__header--section">
                    <h1 className="service__updating--h1">Update {service.title}</h1>
                    <div className="admin__user">
                            <div className="admin__header--user">
                                <Image src={UserIcon.src} alt="user icon" width="50" height="50" />
                            </div>
                            <h3 className="admin__header--user-id">{userId}</h3>
                        </div>
                </div>

                <WhiteContainer classname="services-update__white-container" >
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset disabled={updatingPost}>
                    <div>
                        <div className="service__updating">
                            <div className="service__updating--label">Title:</div>
                            <input 
                            name="title"
                            defaultValue={service.title} 
                            {...register("title")} 
                            className="input updating-input"
                            />
                            {errors.title && <FormError>{errors.title.message}</FormError>}
                        </div> 

                        <div className="service__updating">
                            <div className="service__updating--label">Short description: </div>
                            <textarea 
                            name="short_description"
                            defaultValue={service.short_description} 
                            className="textarea__update" 
                            {...register("short_description")} 
                            />
                            {errors.short_description && <FormError>{errors.short_description.message}</FormError>}
                        </div> 
                    </div>

                    <div>
                        {/* {slugService.img.map((img) => (
                            <div key={img.id} className="service__img">
                                {img.img_url[0].formats.medium == undefined ?
                                <Image src={img.img_url[0].formats.small.url} alt="image" width={img.img_url[0].formats.small.width} height={img.img_url[0].formats.small.height} />
                                :
                                <Image src={img.img_url[0].formats.medium.url} alt="image" width={img.img_url[0].formats.medium.width} height={img.img_url[0].formats.medium.height} />
                                }
                            </div>    
                        ))} */}
                    </div>

                    <div>
                        <div className="service__updating">
                            <div className="service__updating--label">Description: </div>
                            <textarea 
                            name="description"
                            defaultValue={service.description}
                            className="textarea__update" 
                            {...register("description")} 
                            />
                            {errors.description && <FormError>{errors.description.message}</FormError>}
                        </div>
                    </div>

                    <div>
                        <div className="service__updating">
                            <div className="service__updating--label">Slug</div>
                            <input
                            name="slug"
                            defaultValue={service.slug}
                            className="" 
                            {...register("slug")} 
                            className="input updating-input"
                            />
                            {errors.slug && <FormError>{errors.slug.message}</FormError>}
                        </div>
                    </div>

                    <div className="update-submit-container">
                        <button className="submit">Update</button>
                        <Link href={`/service/${service.slug}`}>Go back</Link>
                    </div>
                    </fieldset>
                </form>
                </WhiteContainer>
                </div>
            )}

            {updateError && (
                <ErrorConf confirm={() => handleConfirm()} />
            )}
            
        </div>
    )
}
