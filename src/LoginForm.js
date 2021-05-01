import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';

import UsersList from './UsersList';

function LoginForm({ login, error }) {

    const [details, setDetails] = useState({id:"", username:"", email:"", password:"", ttl:""})

    const submitHandler = e => {
        e.preventDefault();

        login(details); //login function passed as props
    }

    return (
        <div>
            <form class="form" id="login-form" onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>Zaloguj się</h2>
                    {(error != "") ? ( <div className="error">{error}</div> ) : ""}
                    <div className="form-group">
                        <label htmlFor="username">Nazwa użytkownika:</label>
                        <input type="text" name="username" id="user-login" onChange={e => setDetails({...details, username: e.target.value})} value={details.username} /><br />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Adres e-mail:</label>
                        <input type="email" name="email" id="email-login" onChange={e => setDetails({...details, email: e.target.value})} value={details.email} /><br />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Hasło:</label>
                        <input type="password" name="password" id="password-login" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}  /><br />
                    </div>
                    <input type="submit" value="Zaloguj" id="submit-login" />
                    <p class="no-account">Nie masz jeszcze konta? <br /> Założysz je <a href="http://localhost:3000/signup">tutaj</a>!</p>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;