import React, { useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from './FormError'
import { ClimbingBoxLoader } from 'react-spinners';
import { useRouter } from 'next/router';
import UseLocalStorage from '../../hooks/UseLocalStorage';
import Link from 'next/link';

const schema = yup.object().shape({
    username: yup.string().required("Please enter you're username here"),
    password: yup.string().required("Please enter you password here")
});


export default function LoginForm() {

    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userAuth, setUserAuth] = UseLocalStorage("auth", "");
    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [userId, setUserId] = UseLocalStorage("user", "");

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const history = useRouter();

    async function onSubmit({username, password}) {
		setSubmitting(true);
		setLoginError(null);
        setIsLoading(false);

        const authUser = {
            "identifier": username,
            "password": password,
        };

		try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:1337/auth/local", authUser);
            history.push("/admin");
            setUsername(username);
            setPassword(password);
            setUserId(response.data.user.username);
            setUserAuth(response.data.jwt)
			
		} catch (error) {
			console.log("error", error);
			setLoginError("Please check that you're username and password are correct.");
		} finally {
			setSubmitting(false);
            setIsLoading(false);
		}
	}

    return (
        <div> 
            
            <form onSubmit={handleSubmit(onSubmit)} className="form">
				{loginError && <FormError>{loginError}</FormError>}
				<fieldset disabled={submitting}>
					<div className="login__input-container">
                        <div>Username:</div>
						<input className={`input login__input ${loginError ? "red-border" : ""}`} name="username" placeholder="Username" onChange={ (e) => setUsername(e.target.value) } {...register("username")} />
						{errors.username && <FormError>{errors.username.message}</FormError>}
					</div>

					<div className="login__input-container">
                        <div>Password:</div>
						<input className={`input login__input ${loginError ? "red-border" : ""}`} name="password" placeholder="Password" type="password" onChange={ (e) => setPassword(e.target.value) } {...register("password")} />
						{errors.password && <FormError>{errors.password.message}</FormError>}
					</div>
                    <button className="primary-btn login__btn">{submitting ? "Loggin in..." : "Login"}</button>
				</fieldset>
			</form>
            
        </div>
    )
}
