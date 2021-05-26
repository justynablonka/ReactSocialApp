import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Menu from './Menu';
import Home from './Home';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import MyProfile from './MyProfile';
import Footer from './Footer';
import LoginPopup from './LoginPopup';
import RecommendationsManager from './RecommendationsManager';

function App(props) {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ttlValue, setTtlValue] = useState();

  useEffect((currentUser) => {
    if (currentUser === null) {
      let timer1 = setTimeout(() => setModalIsOpen(true), 10000);
      return () => {
        clearTimeout(timer1);
      };
    }
  }, []);

  useEffect(() => {
    if (currentUser !== null && ttlValue !== 0 ) {
        if (!ttlValue) {
            setTtlValue(currentUser.ttl);
        }
        if (ttlValue !== 0) {
            let interval = setInterval(() => setTtlValue(ttlValue => ttlValue - 1), 1);
            if (interval === 0) { //???
              localStorage.clear();
              console.log('reached ttl = 0');
          }
            return () => {
                clearTimeout(interval);
            };
        }
    }
}, [currentUser, ttlValue]);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
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
          <Menu userLoggedIn={currentUser} updateUser={setCurrentUser} />
        </div>
        <div className="main-content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup">
              <SignUpForm />
            </Route>
            <Route path="/login">
              <LoginForm updateUser={setCurrentUser} />
            </Route>
            <Route path="/my_profile">
              <MyProfile />
            </Route>
          </Switch>
        </div>
        <div className="sidebar">
          {currentUser && <RecommendationsManager />}
        </div>
      </BrowserRouter>

      <div className="main-footer">
        <Footer />
      </div>

    </div>
  );
}

export default App;
