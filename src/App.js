import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Menu from './Menu';

import Home from './Home';
import LoginData from './LoginData';
import SignUp from './SignUp';
import SavedPosts from './SavedPosts';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        Social App
      </header>

      <div className="main-container">
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
                <SignUp />
              </Route>
              <Route path="/login">
                <LoginData />
              </Route>
              <Route path="/saved_posts">
                <SavedPosts />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
