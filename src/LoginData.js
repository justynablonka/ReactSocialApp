import React, { useState } from 'react';
import LoginForm from './LoginForm';
import axios from 'axios';
import { Redirect } from 'react-router';

function LoginData() {

    const [user, setUser] = useState({ id: "", ttl: "", token: "" });
    const [loginError, setLoginError] = useState();

    const handleUserLogin = details => {

        setUser({
            username: details.username,
            password: details.password,
        })

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        axios.post(
            'https://akademia108.pl/api/social-app/user/login',
            {
                'username': details.username,
                'password': details.password
            },
            { 'headers': headers })
            .then(response => {
                //user with this username exists but either field was not filled in
                if (details.username === undefined || details.password === undefined || details.username.trim() === "" || details.password.trim() === "") {
                    setLoginError("Uzupełnij oba pola!");
                }
                else if (details.username !== undefined && response.data.jwt_token !== undefined) {
                    localStorage.setItem('id', details.id);
                    localStorage.setItem('ttl', details.ttl);
                    localStorage.setItem('token', response.data.jwt_token);

                    setUser({
                        id: response.data.id,
                        ttl: response.data.ttl,
                        token: response.data.jwt_token
                    })
                    setLoginError("");
                    handleMenuVisibility();
                }
                else {
                    setLoginError("Nieprawidłowa nazwa użytkownika lub hasło.");
                }

            }).catch(error => {
                console.log("Błąd: ");
                console.error(error);
            })
    }

    const handleMenuVisibility = () => {

        var accessToken = localStorage.getItem('token');
        console.log(accessToken)

        var login = document.getElementById("link-login");
        var signup = document.getElementById("link-signup");
        var myProfile = document.getElementById("link-my-profile");
        var logout = document.getElementById("link-logout");

        if (accessToken !== undefined) {

            login.classList.remove("visible");
            login.classList.add("hidden");
            signup.classList.remove("visible");
            signup.classList.add("hidden");

            myProfile.classList.remove("hidden");
            myProfile.classList.add("visible");
            logout.classList.remove("hidden");
            logout.classList.add("visible");
        }
        else {
            login.classList.remove("hidden");
            login.classList.add("visible");
            signup.classList.remove("hidden");
            signup.classList.add("visible");

            myProfile.classList.remove("visible");
            myProfile.classList.add("hidden");
            logout.classList.remove("visible");
            logout.classList.add("hidden");
        }
    }

    return (
        <div>
            {(user.token != "" && loginError === "") ? (
                <Redirect to="/home" />
            ) : (
                <LoginForm handleUserLogin={handleUserLogin} loginError={loginError} />
            )
            }
        </div>
    );
}

export default LoginData;


//     const adminUser = {
//         username: "admin",
//         email: "admin@admin.com",
//         password: "Parowka2!"
//     }

//     const [user, setUser] = useState({ id: "", name: "", email: "", password: "" , ttl:"" });
//     const [error, setError] = useState("");

//     const login = details => {
//         console.log(details);

//         if (true) {//(details.email == adminUser.email && details.password == adminUser.password) { //if (existingUsers.includes(userLoggingIn)) {
//             setUser({
//                 username: details.username,
//                 email: details.email
//             })

//             const headers = {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }

//             axios.post(
//                 'http://localhost:3100/login',
//                 { 'username': details.username,
//                   'title': details.title },
//                 { 'headers': headers })
//                 .then(response => {
//                     localStorage.setItem('token', JSON.stringify(response.data.accessToken));
//                     localStorage.setItem('username', JSON.stringify(details.username));
//                     localStorage.setItem('title', JSON.stringify(details.title));
//                     console.log(`Zalogowany użytkownik: ${details.email}`);
//                     console.log(response.data);
//                 }).catch(error => {
//                     console.log("Błąd: ");
//                     console.error(error);
//                 })

//         } else {
//             setError("Nieprawidłowy adres e-mail lub hasło.")
//         }
//     }

//     const logout = () => {
//         console.log("Log out");
//         setUser({ id: "", name: "", email: "", password: "", ttl:"" });
//         localStorage.clear();
//     }

//     return (
//         <div>
//         {(user.email != "") ? (
//             <div className="welcome">
//               <h2>Witaj, <span>{user.username}</span>!</h2>
//               <button onClick={logout}>Logout</button>
//             </div>
//           ) : (
//             <LoginForm login={login} error={error}/>
//           )
//         }
//         </div>
//   );
// }

// export default LoginData;