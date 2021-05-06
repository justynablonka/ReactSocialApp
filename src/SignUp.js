import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
import SignUpForm from './SignUpForm.js';

function SignUp() {

    const [newUser, setNewUser] = useState({ id: "", name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleUserSignup = details => {

        let newUser = {
            username: details.username,
            password: details.password,
            email: details.email
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        axios.post(
            'https://akademia108.pl/api/social-app/user/signup',
            {
                'username': details.username,
                'password': details.password,
                'email': details.email
            },
            { 'headers': headers })
            .then(response => {
                if (response.data.signedup === false) {
                    if (response.data.message.username !== undefined && response.data.message.email !== undefined) {
                        setError(`${response.data.message.username} ${response.data.message.email}`);
                    }
                    else if (response.data.message.username !== undefined) {
                        setError(`${response.data.message.username} Please select another one`);
                    }
                    else if (response.data.message.email !== undefined) {
                        setError(`${response.data.message.email} Please select another one`);
                    }
                }
                else {
                    setNewUser({
                        username: details.username,
                        password: details.password,
                        email: details.email
                    })
                    setError("");
                    console.log(`Użytkownik ${newUser.username} utworzony.`);
                    console.log(response.data);
                }
    }).catch (error => {
        console.log("Błąd: ");
        console.error(error);
    })
}

return (
    <div>
        {(newUser.username != null) ? (
            <div className="welcome">
                <h2>Witaj, <span>{newUser.username}</span>! Zostałeś zarejestrowany.
                Możesz już się zalogować.</h2>
            </div>
        ) : (
            <SignUpForm handleUserSignup={handleUserSignup} error={error} />
        )
        }
    </div>
);
}

export default SignUp;