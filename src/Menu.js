import React from 'react';
import './Menu.css';

function Menu({ setUser, handleMenuVisibility }) {

    const handleUserLogout = () => {
    
        setUser({ id: "", username: "", email: "", password: "", ttl: "" });
        localStorage.clear();
        console.log("Logged out");
    
        handleMenuVisibility();
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
                    <li id="link-saved-posts" className="visible"><a href="http://localhost:3000/saved_posts">Saved posts</a></li>
                    <li id="link-my-profile" className="hidden"><a href="http://localhost:3000/my_profile">My profile</a></li>
                    <li id="link-logout" className="hidden"><a href="http://localhost:3000/home" onClick={handleUserLogout}>Logout</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;