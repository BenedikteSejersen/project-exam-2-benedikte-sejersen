import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function FileUpload() {

    const [image, setImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [response, setResponse] = useState({});
    const [authKey, setAuthKey] = useState(null);

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
        // formData.append("upload_preset", "yc3hjmth");
        // const formDataImage = formData.get("img")
        console.log(formData.get("img"));

        const options = { 
            headers: { 
                "Authorization" : `Bearer ${authKey}`,
                'Content-Type': 'application/json',
                
            }
        };

        try {
            const res = await axios.post("http://localhost:1337/galleries", { img: formData }, options);
            console.log(res.data)

            // const res = await axios.post("https://res.cloudinary.com/v1_1/dmuvt9zsp/image/upload/", formData);
            // console.log(res)

        } catch(error){
            console.log(error);
        };

        // axios.post("https://api.cloudinary.com/v1_1/dmuvt9zsp/image/upload", formData).then((res) => {
        //     consol.log(res);
        // })
    }

    return (
        <div>

            <form onSubmit={onSubmit}>
                <fieldset disabled={submitting}>

                    File upload
                    <input 
                        // value={image}
                        onChange={e => setImage(e.target.files[0])} 
                        type="file" 
                        name="img"
                        />
                    <button>Submit</button>

                </fieldset>
            </form>
            
        </div>
    )
}
