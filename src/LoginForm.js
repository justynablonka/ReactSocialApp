import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ handleUserLogin, loginError }) {

    const [details, setDetails] = useState({id:"", ttl:"", token:"" })

    const submitHandler = e => {
        e.preventDefault();

        handleUserLogin(details); //login function passed as props
    }

    return (
        <div>
            <form className="form" id="login-form" onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>Zaloguj się</h2>
                    {(loginError !== "") ? ( <div className="error">{loginError}</div> ) : ""}
                    <div className="form-group">
                        <label htmlFor="username">Nazwa użytkownika:</label>
                        <input type="text" name="username" id="user-login" onChange={e => setDetails({...details, username: e.target.value})} value={details.username} /><br />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Hasło:</label>
                        <input type="password" name="password" id="password-login" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}  /><br />
                    </div>
                    <input type="submit" value="Zaloguj" id="submit-login" />
                    <p className="no-account">Nie masz jeszcze konta? <br /> Założysz je <a href="http://localhost:3000/signup">tutaj</a>!</p>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;