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

        if (true) {//(details.email == adminUser.email && details.password == adminUser.password) { //if (existingUsers.includes(userLoggingIn)) {
            setUser({
                username: details.username,
                email: details.email
            })

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
    
            axios.post(
                'http://localhost:3100/login',
                { 'username': details.username,
                  'title': details.title },
                { 'headers': headers })
                .then(response => {
                    localStorage.setItem('token', JSON.stringify(response.data.accessToken));
                    localStorage.setItem('username', JSON.stringify(details.username));
                    localStorage.setItem('title', JSON.stringify(details.title));
                    console.log(`Zalogowany użytkownik: ${details.email}`);
                    console.log(response.data);
                }).catch(error => {
                    console.log("Błąd: ");
                    console.error(error);
                })

        } else {
            setError("Nieprawidłowy adres e-mail lub hasło.")
        }
    }

    const logout = () => {
        console.log("Log out");
        setUser({ id: "", name: "", email: "", password: "", ttl:"" });
        localStorage.clear();
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
