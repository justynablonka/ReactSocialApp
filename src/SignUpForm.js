import React, { useState } from 'react';
import './SignUpForm.css';

function SignUpForm({ handleUserSignup, error }) {

    const [details, setDetails] = useState({ username: "", password: "", email: "" })

    const submitHandler = e => {
        e.preventDefault();

        handleUserSignup(details);
    }

    const validateUsername = (event) => {
        var myInput = event.target;
        var space = document.getElementById("space-username");
        var length = document.getElementById("length-username");

        // Validate spaces
        var spaces = /[ ]/g;
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
        var myInput = event.target;
        var length = document.getElementById("length-email");
        var space = document.getElementById("space-email");
        var exists = document.getElementById("exists");

        // Validate spaces
        var spaces = /[ ]/g;
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
        var myInput = event.target;
        var letter = document.getElementById("letter");
        var capital = document.getElementById("capital");
        var number = document.getElementById("number");
        var character = document.getElementById("character");
        var length = document.getElementById("length-psw");

        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if (myInput.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if (myInput.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if (myInput.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate special charaters
        var characters = /[!@#$%]/g;
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
        var myInput = event.target;
        var pswConfirm = document.getElementById("psw-confirm");

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
            <form className="form" id="create-account-form" onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>Utwórz konto</h2>
                    {(error !== "") ? ( <div className="error">{error}</div> ) : ""}
                    <input type="text" onInput={validateUsername} onFocus={focusUsername} onBlur={blurUsername} onChange={e => setDetails({...details, username: e.target.value})} value={details.username} id="username" placeholder="Nazwa użytkownika" required /><br />
                    <input type="e-mail" onInput={validateEmail} onFocus={focusEmail} onBlur={blurEmail} onChange={e => setDetails({...details, email: e.target.value})} value={details.email} id="email" placeholder="Adres e-mail" required /><br />
                    <input type="password" onInput={validatePsw} onFocus={focusPsw} onBlur={blurPsw} onChange={e => setDetails({...details, password: e.target.value})} value={details.password} id="password" placeholder="Hasło" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Musi zawierać minimum 6 znaków, w tym przynajmniej 1 cyfrę i 1 znak specjalny" required /><br />
                    <input type="password" onInput={validatePswConfirm} onFocus={focusPswConfirm} onBlur={blurPswConfirm} id="password-confirm" placeholder="Potwierdź hasło" title="Musi być takie samo jak hasło powyżej." required /><br />
                    <input type="submit" value="Załóż konto" />
                    <p className="no-account">Masz już konto? <br /> Zaloguj się <a href="http://localhost:3000/login">tutaj</a>!</p>
                </div>
            </form>

            <div className="message" id="message-username">
                <h3>Nazwa użytkownika:</h3>
                <p id="length-username" className="invalid">Musi zawierać przynajmniej <b>4</b> znaki</p>
                <p id="space-username" className="invalid"><b>Nie może</b> zawierać <b>spacji</b></p>
            </div>

            <div className="message" id="message-email">
                <h3>Adres e-mail:</h3>
                <p id="length-email" className="invalid">Nie może być pusty</p>
                <p id="space-email" className="invalid"><b>Nie może</b> zawierać <b>spacji</b></p>
                <p id="exists" className="invalid">Taki email nie istnieje</p>
            </div>

            <div className="message" id="message-psw">
                <h3>Hasło musi zawierać:</h3>
                <p id="letter" className="invalid">Przynajmniej 1 <b>małą</b> literę</p>
                <p id="capital" className="invalid">Przynajmniej 1 <b>wielką</b> literę</p>
                <p id="number" className="invalid">Przynajmniej 1 <b>cyfrę</b></p>
                <p id="character" className="invalid">Przynajmniej 1 <b>ze znaków: ! # @ $ %</b></p>
                <p id="length-psw" className="invalid">Przynajmniej <b>6 znaków</b></p>
            </div>

            <div className="message" id="message-psw-confirm">
                <h3>Adres e-mail:</h3>
                <p id="psw-confirm" className="invalid">Potwierdzenie hasła musi być <b>identyczne</b> jak wybrane hasło.</p>
            </div>
        </div>
    );
}

export default SignUpForm;