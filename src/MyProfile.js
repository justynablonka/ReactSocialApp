import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MyProfileDetails from './MyProfileDetails';

function MyProfile() {

    useEffect(() => {
        showMyProfileDetails();
    }, []);

    const [details, setDetails] = useState([]);
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
                    let id = response.data.id;
                    let avatar_url = response.data.avatar_url;
                    let username = response.data.username;
                    let email = response.data.email;
                    let newDetails = <MyProfileDetails key={id} avatar_url={avatar_url} username={username} email={email} />;

                    setDetails(oldDetails => [...oldDetails, newDetails]);
                }).catch(error => {
                    console.log("Error: ");
                    console.error(error);
                })
        }

        return details;
    };

    return (
        <div>
            {(JSON.parse(localStorage.getItem('user') !== null) ? (
                <div>
                    <h2 className="section-title">Your profile</h2>
                    <div id="my-profile-div">
                        {details}
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

export default React.memo(MyProfile);