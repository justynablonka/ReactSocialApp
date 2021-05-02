
import React, { useState } from 'react';
import axios from 'axios';

import './SavedPosts.css';

function SavedPosts() {

    const showPosts = (event) => {

        var accessToken = JSON.parse(localStorage.getItem('token'));
        var username = JSON.parse(localStorage.getItem('username'));
        var title = JSON.parse(localStorage.getItem('title'));

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }

        axios.get(`http://localhost:3100/posts?username=${username}`,
            { 'headers': headers })
            .then(response => {
                console.log("Udzielony dostęp do postów.");
                console.log(accessToken);
                fillPostsList(title);
            }).catch(error => {
                console.log("Błąd: ");
                console.error(error);
            })
    }

    const fillPostsList = (title) => {
        let postsList = document.getElementById('postsList');
        let liPost = document.createElement('li');

        postsList.innerHTML = '';
        postsList.appendChild(liPost);
        postsList.innerHTML = title;
    }

    return (
        <div class="posts">
            Lista prywatnych postów (tylko ty je widzisz):<br />
            <button onClick={showPosts}>Poka posty</button>
            <ul id="postsList" />
        </div>
    );
}

export default SavedPosts;