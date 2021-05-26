import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Menu from './Menu';
import Home from './Home';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import MyProfile from './MyProfile';
import Footer from './Footer';
import LoginPopup from './LoginPopup';

function App(props) {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [timestamp, setTimestamp] = useState();
  const [ttlValue, setTtlValue] = useState();
  const [details, setDetails] = useState({username: '', password: ''});
  const [loginError, setLoginError] = useState('');

  useEffect((currentUser) => {
    if (currentUser === null) {
      let timer1 = setTimeout(() => setModalIsOpen(true), 10000);
      return () => {
        clearTimeout(timer1);
      };
    }
  }, []);

  // useEffect(() => {
  //   if (currentUser != null && ttlValue != null && ttlValue != timestamp) {
  //     const interval = setInterval(() => {
  //       let newTimestamp = Date.now();
  //       let timeElapsed = newTimestamp - timestamp;
  //       if (timeElapsed >= ttlValue) {
  //         handleUserLogout();
  //       } else {
  //         setTtlValue(ttlValue => currentUser.ttl - timeElapsed);
  //       }
  //     }, 1);
  //     return () => clearInterval(interval);
  //   }
  // }, [currentUser]);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }

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

                    setTtlValue(response.data.ttl);
                    // setTimestamp(Date.now());
                    setCurrentUser(response.data);
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

  const handleUserLogout = () => {
    if (currentUser != null) {

        let accessToken = currentUser.jwt_token;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
        axios.post(
            'https://akademia108.pl/api/social-app/user/logout',
            {},
            {'headers': headers })
            .then(response => {
                setCurrentUser(null);

            }).catch(error => {
                console.log("Error: ");
                console.error(error);
            })
    }
    localStorage.clear();
  }

  const onUsernameChanged = (e) => {
    setDetails({ ...details, username: e.target.value });
  }

  const onPasswordChanged = (e) => {
    setDetails({ ...details, password: e.target.value });
  }

  return (
    <div className="App">

      <header className="App-header">
        Social App
        {<LoginPopup modalIsOpen={modalIsOpen} setModalIsOpenToFalse={setModalIsOpenToFalse} setModalIsOpenToTrue={setModalIsOpenToTrue} />}
        {currentUser &&
          <>
            {/* <h1 className="header-p">Welcome, <span id="username-header">{currentUser.username}</span>!</h1> */}
            <div id="TTL">
              <p id="parTTL">Time left till logout: <span id="countdownSpan">{ttlValue}</span></p>
            </div>
          </>}
      </header>

      <BrowserRouter>
        <div className="menu">
          <Menu userLoggedIn={currentUser} handleUserLogout={handleUserLogout}/>
        </div>
        <div className="main-content">
          <Switch>
            <Route exact path="/">
              <Home currentUser={currentUser} />
            </Route>
            <Route path="/signup">
              <SignUpForm />
            </Route>
            <Route path="/login">
              <LoginForm onUsernameChanged={onUsernameChanged} onPasswordChanged={onPasswordChanged} username={details.username} password={details.password} submitHandler={submitHandler} loginError={loginError}/>
            </Route>
            <Route path="/my_profile">
              <MyProfile />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>

      <div className="main-footer">
        <Footer />
      </div>

    </div>
  );
}

export default App;
