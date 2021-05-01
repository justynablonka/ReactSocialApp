import React from 'react';
import './Menu.css';

function Menu(props) {

    return (
        <nav class="main-menu">
            <ul>
                <li><a href="http://localhost:3000/home" onclick='showHomePage'>Home</a></li>
                <li><a href="http://localhost:3000/login" onclick='showLoginPage'>Log in</a></li>
                <li><a href="http://localhost:3000/signup" onclick='showSignUpPage'>Sign up</a></li>
            </ul>
        </nav>
    );
}

export default Menu;