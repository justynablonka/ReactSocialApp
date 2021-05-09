
import React from 'react';
import axios from 'axios';

import './MyProfile.css';

function MyProfile() {
    var user = JSON.parse(localStorage.getItem('user'));

    const showMyProfileDetails = () => {
        console.log(user);
        if (user !== null) {
            var accessToken = user.jwt_token;

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            axios.post(
                'https://akademia108.pl/api/social-app/user/profile',
                { 'headers': headers })

                .then(response => {
                    {
                        var myId = document.getElementById('my-id');
                        var myUsername = document.getElementById('my-username');
                        var myEmail = document.getElementById('my-email');
                        var myCreatedAt = document.getElementById('my-createdAt');
                        var myUpdatedAt = document.getElementById('my-updatedAt');

                        var idParText = document.createTextNode(response.data.id);
                        var usernameParText = document.createTextNode(response.data.username);
                        var emailParText = document.createTextNode(response.data.email);
                        var createdAtParText = document.createTextNode(response.data.created_at);
                        var updatedAtParText = document.createTextNode(response.data.updated_at);

                        myId.appendChild(idParText);
                        myUsername.appendChild(usernameParText);
                        myEmail.appendChild(emailParText);
                        myCreatedAt.appendChild(createdAtParText);
                        myUpdatedAt.appendChild(updatedAtParText);
                    }
                }).catch(error => {
                    console.log("Error: ");
                    console.error(error);
                })
        }
    }

    return (
        <div>
            <h2>Your profile</h2>
            <button className="btn" onClick={showMyProfileDetails}>Show details</button>
            <div id="my-profile-div">
                <p id="my-id"></p>
                <p id="my-username"></p>
                <p id="my-email"></p>
                <p id="my-createdAt"></p>
                <p id="my-updatedAt"></p>
            </div>
        </div>
    )
}

export default MyProfile;