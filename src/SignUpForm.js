import React, { useState } from 'react';
import './SignUpForm.css';
import axios from 'axios';

function SignUpForm() {

    const [details, setDetails] = useState({ username: "", password: "", email: "" })
    const [newUser, setNewUser] = useState({ id: "", name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const submitHandler = e => {
        e.preventDefault();

        handleUserSignup(details);
    }

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
            }).catch(error => {
                console.log("Error: ");
                console.error(error);
            })
    }

    const validateUsername = (event) => {
        let myInput = event.target;
        let space = document.getElementById("space-username");
        let length = document.getElementById("length-username");

        // Validate spaces
        let spaces = /[ ]/g;
        if (!myInput.value.match(spaces) && myInput.value.length >= 1) {
            space.classList.remove("invalid");
            space.classList.add("valid");
        } else {
            space.classList.remove("valid");
            space.classList.add("invalid");
        }

        // Validate length
        if (myInput.value.length >= 4) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }

    const validateEmail = (event) => {
        let myInput = event.target;
        let length = document.getElementById("length-email");
        let space = document.getElementById("space-email");
        let exists = document.getElementById("exists");

        // Validate spaces
        let spaces = /[ ]/g;
        if (myInput.value.length > 0 && !myInput.value.match(spaces)) {
            space.classList.remove("invalid");
            space.classList.add("valid");
        } else {
            space.classList.remove("valid");
            space.classList.add("invalid");
        }

        // Validate if email exists (for now - if includes @)
        if (myInput.value.match('@')) {
            exists.classList.remove("invalid");
            exists.classList.add("valid");
        } else {
            exists.classList.remove("valid");
            exists.classList.add("invalid");
        }

        // Validate length
        if (myInput.value.length > 0) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }

    const validatePsw = (event) => {
        let myInput = event.target;
        let letter = document.getElementById("letter");
        let capital = document.getElementById("capital");
        let number = document.getElementById("number");
        let character = document.getElementById("character");
        let length = document.getElementById("length-psw");

        // Validate lowercase letters
        let lowerCaseLetters = /[a-z]/g;
        if (myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters
        let upperCaseLetters = /[A-Z]/g;
        if (myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers
        let numbers = /[0-9]/g;
        if (myInput.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate special charaters
        let characters = /[!@#$%]/g;
        if (myInput.value.match(characters)) {
            character.classList.remove("invalid");
            character.classList.add("valid");
        } else {
            character.classList.remove("valid");
            character.classList.add("invalid");
        }

        // Validate length
        if (myInput.value.length >= 6) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }

    const validatePswConfirm = (event) => {
        let myInput = event.target;
        let pswConfirm = document.getElementById("psw-confirm");

        // Validate if passwords are identical
        if (myInput.value === document.getElementById("password").value) {
            pswConfirm.classList.remove("invalid");
            pswConfirm.classList.add("valid");
        } else {
            pswConfirm.classList.remove("valid");
            pswConfirm.classList.add("invalid");
        }
    }

    const focusUsername = (event) => {
        document.getElementById("message-username").style.display = "block";
    }

    const blurUsername = (event) => {
        document.getElementById("message-username").style.display = "none";
    }

    const focusEmail = (event) => {
        document.getElementById("message-email").style.display = "block";
    }

    const blurEmail = (event) => {
        document.getElementById("message-email").style.display = "none";
    }

    const focusPsw = (event) => {
        document.getElementById("message-psw").style.display = "block";
    }

    const blurPsw = (event) => {
        document.getElementById("message-psw").style.display = "none";
    }

    const focusPswConfirm = (event) => {
        document.getElementById("message-psw-confirm").style.display = "block";
    }

    const blurPswConfirm = (event) => {
        document.getElementById("message-psw-confirm").style.display = "none";
    }

    return (
        <div className="outer-container">
            {(newUser.username != null) ? (
                <div className="welcome">
                    <h2 className="section-title">Welcome, <span className="span-username">{newUser.username}</span>! <br />
                You can log in now.</h2>
                </div>
            ) : (
                <div className="flex-container">
                    
                    <div className="form-container">
                        <form className="form" id="create-account-form" onSubmit={submitHandler}>
                            <div className="form-inner">
                                <h2>Sign up</h2>
                                {(error !== "") ? (<div className="error">{error}</div>) : ""}
                                <input type="text" onInput={validateUsername} onFocus={focusUsername} onBlur={blurUsername} onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} id="username" placeholder="Username" title="Fill in this field." required /><br />
                                <input type="e-mail" onInput={validateEmail} onFocus={focusEmail} onBlur={blurEmail} onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} id="email" placeholder="E-mail address" title="Fill in this field." required /><br />
                                <input type="password" onInput={validatePsw} onFocus={focusPsw} onBlur={blurPsw} onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} id="password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Must consist of at least 6 characters, including at least 1 digit and 1 symbol" required /><br />
                                <input type="password" onInput={validatePswConfirm} onFocus={focusPswConfirm} onBlur={blurPswConfirm} id="password-confirm" placeholder="Confirm password" title="Must be the same as the password above." required /><br />
                                <input type="submit" value="Create an account" />
                                <p className="no-account">Got an account? <br /> Log in <a href="http://localhost:3000/login">here</a>!</p>
                            </div>
                        </form>
                    </div>

                    <div className="messages-container">
                        <div className="message" id="message-username">
                            <h3>Username:</h3>
                            <p id="length-username" className="invalid">has to consist of at least <b>4</b> characters</p>
                            <p id="space-username" className="invalid"><b>cannot</b> contain <b>spaces</b></p>
                        </div>

                        <div className="message" id="message-email">
                            <h3>E-mail address:</h3>
                            <p id="length-email" className="invalid">cannot be empty</p>
                            <p id="space-email" className="invalid"><b>cannot</b> contain <b>spaces</b></p>
                            <p id="exists" className="invalid">chosen e-mail address does not exist</p>
                        </div>

                        <div className="message" id="message-psw">
                            <h3>Password has to contain:</h3>
                            <p id="letter" className="invalid">at least 1 <b>lowercase</b> letter</p>
                            <p id="capital" className="invalid">at least 1 <b>uppercase</b> letter</p>
                            <p id="number" className="invalid">at least 1 <b>digit</b></p>
                            <p id="character" className="invalid">at least 1 <b>of these symbols: ! # @ $ %</b></p>
                            <p id="length-psw" className="invalid">at least <b>6 characters</b></p>
                        </div>

                        <div className="message" id="message-psw-confirm">
                            <h3>Password confirmation:</h3>
                            <p id="psw-confirm" className="invalid"> has to be <b>identical</b> as the chosen password.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SignUpForm;