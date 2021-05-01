import React, { useState } from 'react';
import LoginForm from './LoginForm';
import axios from 'axios';

function LoginData() {

    const adminUser = {
        username: "admin",
        email: "admin@admin.com",
        password: "Parowka2!"
    }

    const [user, setUser] = useState({ id: "", name: "", email: "", password: "" , ttl:"" });
    const [error, setError] = useState("");

    const login = details => {
        console.log(details);

        if (details.email == adminUser.email && details.password == adminUser.password) { //if (existingUsers.includes(userLoggingIn)) {
            console.log("Jesteś zalogowany");
            setUser({
                username: details.username,
                email: details.email
            })

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                // 'Authorization': 'Bearer ' + <jwtToken>
            }
    
            axios.post(
                'https://akademia108.pl/api/social-app/user/login',
                JSON.stringify(details.email),
                { 'headers': headers })
                .then(response => {
                    console.log("Zalogowany użytkownik: ");
                    console.log(details.username); // dane użytkownika
                }).catch(error => {
                    console.log("Błąd: ");
                    console.error(error);
                })

        } else {
            setError("Nieprawidłowe dane")
        }
    }

    // myStorage = localStorage;
    // localStorage.setItem('myCat', 'Tom');

    const logout = () => {
        console.log("Log out");
        setUser({ id: "", name: "", email: "", password: "", ttl:"" });
    }

    return (
        <div>
        {(user.email != "") ? (
            <div className="welcome">
              <h2>Witaj, <span>{user.username}</span>!</h2>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <LoginForm login={login} error={error}/>
          )
        }
        </div>
  );
}

export default LoginData;
