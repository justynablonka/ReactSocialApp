import React from 'react';
import './Menu.css';

function Menu(props) {

    return (
        <nav class="main-menu">
            <ul>
                <li><a href="http://localhost:3000/home">Home</a></li>
                <li><a href="http://localhost:3000/login">Log in</a></li>
                <li><a href="http://localhost:3000/signup">Sign up</a></li>
                <li><a href="http://localhost:3000/saved_posts">Saved posts</a></li>
            </ul>
        </nav>
    );
}

export default Menu;