
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sidebar() {

    const getFollowRecommendations = () => {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user != null) {
            let accessToken = user.jwt_token;

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            axios.post(
                'https://akademia108.pl/api/social-app/follows/recommendations',
                {},
                { 'headers': headers })

                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    const followUser = () => {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user != null) {
            let accessToken = user.jwt_token;

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            axios.post(
                'https://akademia108.pl/api/social-app/follows/follow',
                {},
                { 'headers': headers })

                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    return (
        <ul></ul>
    );
};

export default Sidebar;