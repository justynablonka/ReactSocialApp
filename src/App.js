import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Menu from './Menu';
import Home from './Home';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import MyProfile from './MyProfile';
import Footer from './Footer';

function App() {

  // const [value, setValue] = useState();

  // const getLocalStorageData = () => {
  //   let user = localStorage.getItem('user');
  //   let inp = document.getElementById('inp');
  //   inp.value = user;
  // }

  return (
    <div className="App">

      <header className="App-header">
        Social App
        {/* <input value={value} type="text" id="inp" /> */}
        {/* <button className="btn" onClick={getLocalStorageData}>Get data</button> */}

        {(JSON.parse(localStorage.getItem('user') !== null) ? (
          <p className="header-p">Witaj, <span id="username-header">{JSON.parse(localStorage.getItem('user')).username}</span>!</p>
        ) : (<p className="header-p">Witaj!</p>))}
      </header>

      <div className="menu">
        <Menu />
      </div>

      <div className="main-content">
        <BrowserRouter>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/signup">
              <SignUpForm />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/my_profile">
              <MyProfile />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>

      <div className="main-footer">
        <Footer />
      </div>

    </div>
  );
}

export default App;
