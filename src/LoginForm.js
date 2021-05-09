import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';
import { Redirect } from 'react-router';

function LoginForm() {

    const [details, setDetails] = useState('');
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
                        window.location.reload(); //przeładowanie strony żeby menu się zmieniło

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
            {(localStorage.user != undefined && loginError === "") ? (
                <Redirect to="/home" />
            ) : (
                <form className="form" id="login-form" onSubmit={submitHandler}>
                    <div className="form-inner">
                        <h2>Zaloguj się</h2>
                        {(loginError !== "") ? (<div className="error">{loginError}</div>) : ""}
                        <div className="form-group">
                            <label htmlFor="username">Nazwa użytkownika:</label>
                            <input type="text" name="username" id="user-login" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} /><br />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Hasło:</label>
                            <input type="password" name="password" id="password-login" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} /><br />
                        </div>
                        <input type="submit" value="Zaloguj" id="submit-login" />
                        <p className="no-account">Nie masz jeszcze konta? <br /> Założysz je <a href="http://localhost:3000/signup">tutaj</a>!</p>
                    </div>
                </form>
            )}
        </div>
    );
}

export default LoginForm;