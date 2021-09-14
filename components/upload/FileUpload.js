import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function FileUpload() {

    const [image, setImage] = useState({});
    // const [files, setFiles] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [authKey, setAuthKey] = useState(null);

    // function handleChange(event) {
    //     // event.target.files;

    //     console.log("FileUpload.event.target.files", event.target.files)
    // }

    console.log(image)

    useEffect(() => {

        const auth = JSON.parse(window.localStorage.getItem("auth"));

        if (!auth) {
            setAuthKey(null);
            history.push("/");
        } else {
            setAuthKey(auth);
        }

    }, []);

    // let formData = new FormData();
    // formData.append("files", files[0]);

    // console.log(formData)

    const onSubmit = async () => {
        setSubmitting(true)

        let formData = new FormData();
        formData.append("img", image);
        console.log(formData)

        axios({
        method: "post",
        url: "http://localhost:1337/galleries",
        data: formData,
        headers: {
            "Authorization" : `Bearer ${authKey}`,
            'Content-Type': 'application/json'
            },
        })
        .then(({ data }) => {
            setImage(data);
            console.log("Succesfully uploaded: ", JSON.stringify(data));
        })
        .catch((error) => {
            console.log(error);
        });

        // let formData = new FormData();
        // // formData.append("img", image[0]);
        // formData.append("img", image);
        // console.log(formData)

        // const options = { 
        //     headers: { 
        //         "Authorization" : `Bearer ${authKey}`,
        //         'Content-Type': 'application/json',
        //     }
        // };

        // try {
        //     const res = await axios.post("http://localhost:1337/galleries", {data: formData}, options);

        //     const imageId = res.data[0].id;

        //     console.log(res.data + "This is data after api call");

            // try {
            //     await axios.post("http://localhost:1337/galleries", {imageID})
            // } catch(err) {
            //     console.log(err);
            // }

            // setImage(res.data);
        // } catch(err) {
        //     console.log(err);
        // }
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
                        // name="img"
                        />

                    <button>Submit</button>

                </fieldset>
            </form>
            
        </div>
    )
}
