import React, { useState } from 'react';
import './Menu.css';
import { NavLink } from "react-router-dom";

function Menu(props) {

    const [isOpen, setOpen] = useState(false);

    return (
        <nav id="main-menu" className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a
                        role="button"
                        className={`navbar-burger burger ${isOpen && "is-active"}`}
                        aria-label="menu"
                        aria-expanded="false"
                        onClick={() => setOpen(!isOpen)}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                {props.userLoggedIn && <h1 className="header-p" id="header-p-menu">Welcome, <span id="username-header">{props.userLoggedIn.username}</span>!</h1>}<br />
                <div className={`navbar-menu ${isOpen && "is-active"}`}>
                    <div className="navbar-start">
                        <ul id="main-menu-list">
                            <li><NavLink className="navbar-item" activeClassName="is-active" to="/" exact>Home</NavLink></li>
                            {!props.userLoggedIn && <li><NavLink className="navbar-item" activeClassName="is-active" to="/login">Log in</NavLink></li>}
                            {!props.userLoggedIn && <li><NavLink className="navbar-item" activeClassName="is-active" to="/signup">Sign up</NavLink></li>}
                            {props.userLoggedIn && <li><NavLink className="navbar-item" activeClassName="is-active" to="/my_profile">My profile</NavLink></li>}
                            {props.userLoggedIn && <li><NavLink className="navbar-item" activeClassName="is-active" to="/login" onClick={props.handleUserLogout}>Logout</NavLink></li>}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Menu;