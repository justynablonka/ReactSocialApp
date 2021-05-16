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

function App(props) {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (currentUser === null) {
      let timer1 = setTimeout(() => setModalIsOpen(true), 10000);
      return () => {
        clearTimeout(timer1);
      };
    }
  }, []);

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
        {<LoginPopup modalIsOpen={modalIsOpen} setModalIsOpenToFalse={setModalIsOpenToFalse} setModalIsOpenToTrue={setModalIsOpenToTrue}/>}
        {currentUser && <h1 className="header-p">Welcome, <span id="username-header">{currentUser.username}</span>!</h1>}
      </header>

      <BrowserRouter>
        <div className="menu">
          <Menu userLoggedIn={currentUser} updateUser={setCurrentUser}/>
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
      </BrowserRouter>

      <div className="main-footer">
        <Footer />
      </div>

    </div>
  );
}

export default App;
