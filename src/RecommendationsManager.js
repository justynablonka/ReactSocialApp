
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Recommendation from './Recommendation';

function RecommendationsManager(props) {

    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        getFollowRecommendations();
    }, []);

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
                    for (let userToFollow of response.data) {
                        //console.log(response.data);
                        let key = userToFollow.id;
                        let username = userToFollow.username;
                        let avatar_url = userToFollow.avatar_url;

                        let newRecommendation = <Recommendation key={key} username={username} avatar_url={avatar_url} />;
                        setRecommendations(oldRecommendations => [...oldRecommendations, newRecommendation]);
                    }

                })
                .catch(error => {
                    console.log(error);
                })
        }
        return recommendations;
    };

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
        <>
            <h3 className="recommendations-title">Users you may know:</h3>
            <ul className="recommendations-list">
                {recommendations}
            </ul>
        </>
    );
};

export default RecommendationsManager;