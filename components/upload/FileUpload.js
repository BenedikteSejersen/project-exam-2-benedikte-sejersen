import axios from 'axios';
import { post } from 'jquery';
import React, { useEffect, useState } from 'react'

export default function FileUpload() {

    const [image, setImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [response, setResponse] = useState({});
    const [authKey, setAuthKey] = useState(null);

    // console.log(image)

    useEffect(() => {

        const auth = JSON.parse(window.localStorage.getItem("auth"));

        if (!auth) {
            setAuthKey(null);
            history.push("/");
        } else {
            setAuthKey(auth);
        }
    }, []);

    const onSubmit = async (e) => {
        setSubmitting(true)

        e.preventDefault();

        let formData = new FormData();
        formData.append("img", image);
        // formData.append("ref", "img");
        console.log(formData.get("img"));

        formData = { img: JSON.stringify(image) }

        const options = { 
            headers: { 
                "Authorization" : `Bearer ${authKey}`,
                // 'Content-Type': 'application/json',
            }
        };

        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_GALLERY, formData , options);
            // const res = await axios.post(process.env.NEXT_PUBLIC_API_GALLERY, { alt_text: alt } , options);
            console.log(res.data)

        } catch(error){
            console.log(error);
        };
    }

    return (
        <div>

            <form onSubmit={onSubmit}>
                <fieldset disabled={submitting}>

                    File upload
                    {/* <input 
                        // value={image}
                        onChange={e => setImage(e.target.files[0])} 
                        type="file" 
                        name="img"
                        /> */}
                    <input
                        type="text"
                        />

                    <div className="create-service__btn">
                        <button className="submit">Submit</button>
                    </div>
                    
                </fieldset>
            </form>
            
        </div>
    )
}
