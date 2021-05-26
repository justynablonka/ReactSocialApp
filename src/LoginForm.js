import React from 'react';
import './LoginForm.css';
import { Redirect } from 'react-router';

function LoginForm(props) {

    return (
        <div>
            {(localStorage.user !== undefined && props.loginError === "") ? (
                <Redirect exact to="/" />
            ) : (
                <form className="form" id="login-form" onSubmit={props.submitHandler}>
                    <div className="form-inner">
                        <h2>Log in</h2>
                        {(props.loginError !== "") ? (<div className="error">{props.loginError}</div>) : ""}
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" name="username" id="user-login" onChange={props.onUsernameChanged} value={props.username} /><br />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" id="password-login" onChange={props.onPasswordChanged} value={props.password} /><br />
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