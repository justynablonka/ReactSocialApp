import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import { NativeRouter, Route, Link } from 'react-router-native'

import Menu from './Menu';
// import MainView from './MainView';

import Home from './Home';
import LoginData from './LoginData';
import SignUp from './SignUp';
// import UseToken from './UseToken';

function App() {

  // const [ token, setToken ] = useState();

  // if (!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <div className="App">
      <header className="App-header">
        Social App
      </header>

      <div className="main">
        <Menu />
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
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
