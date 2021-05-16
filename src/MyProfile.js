
import React from 'react';
import axios from 'axios';

import './MyProfile.css';

function MyProfile() {
    let user = JSON.parse(localStorage.getItem('user'));

    const showMyProfileDetails = () => {
        if (user !== null) {
            let accessToken = user.jwt_token;

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            axios.post(
                'https://akademia108.pl/api/social-app/user/profile',
                {},
                { 'headers': headers })

                .then(response => {
                    {
                        //uzupełnić
                        console.log(response.data);
                    }
                }).catch(error => {
                    console.log("Error: ");
                    console.error(error);
                })
        }
    }

    return (
        <div>
            {(JSON.parse(localStorage.getItem('user') !== null) ? (
                <div>
                    <h2 className="section-title">Your profile</h2>
                    <button className="btn" onClick={showMyProfileDetails}>Show details</button>
                    <div id="my-profile-div">
                        <h3>Your id:</h3>
                        <p id="my-id"/>
                        <h3>Your username:</h3>
                        <p id="my-username"/>
                        <h3>Your e-mail:</h3>
                        <p id="my-email"/>
                        <h3>You created your account on:</h3>
                        <p id="my-createdAt"/>
                        <h3>You last updated your account on:</h3>
                        <p id="my-updatedAt"/>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Please log on to see your profile!</p>
                </div>)
            )}
        </div>
    )
}

export default MyProfile;