import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { Redirect } from 'react-router';

function LoginForm(props) {

    const [details, setDetails] = useState({username: '', password: ''});
    const [loginError, setLoginError] = useState();

    const submitHandler = e => {
        e.preventDefault();
        handleUserLogin(details);
    }

    const handleUserLogin = details => {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        if (details.username === undefined || details.password === undefined || details.username.trim() === "" || details.password.trim() === "") {
            setLoginError("Uzupełnij oba pola!");
        }
        else {
            axios.post(
                'https://akademia108.pl/api/social-app/user/login',
                {
                    'username': details.username,
                    'password': details.password
                },
                { 'headers': headers })
                .then(response => {
                    if (response.data.jwt_token !== undefined) {

                        localStorage.setItem('user', JSON.stringify(response.data));
                        setLoginError("");

                        props.updateUser(response.data);

                        console.log(`User logged in: ${localStorage.user}`);
                    } else {
                        setLoginError('Incorrect username or password');
                    }
                }).catch(error => {
                    console.log("Error: ");
                    console.error(error);
                })
        }
    }

    return (
        <div>
            {(localStorage.user !== undefined && loginError === "") ? (
                <Redirect exact to="/" />
            ) : (
                <form className="form" id="login-form" onSubmit={submitHandler}>
                    <div className="form-inner">
                        <h2>Log in</h2>
                        {(loginError !== "") ? (<div className="error">{loginError}</div>) : ""}
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" name="username" id="user-login" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} /><br />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" id="password-login" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} /><br />
                        </div>
                        <input type="submit" value="Log in" id="submit-login" />
                        <p className="no-account">Don't have an account yet? <br /> Create it <a href="http://localhost:3000/signup">here</a>!</p>
                    </div>
                </form>
            )}
        </div>
    );
}

export default LoginForm;