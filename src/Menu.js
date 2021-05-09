import React, { useEffect } from 'react';
import './Menu.css';

function Menu() {

    useEffect(() => {
        handleMenuVisibility();
    },[]);

    const handleUserLogout = () => {
        localStorage.clear();
        handleMenuVisibility();
    }

    const handleMenuVisibility = () => {

        var user = localStorage.getItem('user');

        var login = document.getElementById("link-login");
        var signup = document.getElementById("link-signup");
        var myProfile = document.getElementById("link-my-profile");
        var logout = document.getElementById("link-logout");

        if (user !== null) {

            login.classList.remove("visible");
            login.classList.add("hidden");
            signup.classList.remove("visible");
            signup.classList.add("hidden");

            myProfile.classList.remove("hidden");
            myProfile.classList.add("visible");
            logout.classList.remove("hidden");
            logout.classList.add("visible");
        }
        else {
            login.classList.remove("hidden");
            login.classList.add("visible");
            signup.classList.remove("hidden");
            signup.classList.add("visible");

            myProfile.classList.remove("visible");
            myProfile.classList.add("hidden");
            logout.classList.remove("visible");
            logout.classList.add("hidden");
        }
    }

    return (
        <div>
            <nav id="main-menu">
                {/* <label for="collapsible-menu">Menu</label>
                <input type="checkbox" id="collapsible-menu" /> */}
                <ul id="main-menu-list">
                    <li id="link-home" className="visible"><a href="http://localhost:3000/home">Home</a></li>
                    <li id="link-login" className="visible"><a href="http://localhost:3000/login">Log in</a></li>
                    <li id="link-signup" className="visible"><a href="http://localhost:3000/signup">Sign up</a></li>
                    <li id="link-my-profile" className="hidden"><a href="http://localhost:3000/my_profile">My profile</a></li>
                    <li id="link-logout" className="hidden"><a href="http://localhost:3000/home" onClick={handleUserLogout}>Logout</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;