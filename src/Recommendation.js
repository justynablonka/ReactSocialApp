import React, { useState } from 'react';
import axios from 'axios';
import './Recommendation.css';

function Recommendation(props) {

    let user = JSON.parse(localStorage.getItem('user'));
    const [likedEntry, setlikedEntry] = useState({ post_id: '' });

    const handleFollowClick = () => {

        if (user != null) {
            let accessToken = user.jwt_token;

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            axios.post(
                'https://akademia108.pl/api/social-app/follows/follow',
                { 'leader_id': user.id },
                { 'headers': headers })

                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    // const handleUnfollowClick = () => {

    //     if (user != null) {
    //         let accessToken = user.jwt_token;

    //         const headers = {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //         axios.post(
    //             'https://akademia108.pl/api/social-app/follows/follow',
    //             { 'leader_id': user.id },
    //             { 'headers': headers })

    //             .then(response => {
    //                 console.log(response);
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             })
    //     }
    // }

    return (
        // { user !== null && props.username !== user.username ?
        (<div className="recommendation-div">
            <img className="user-avatar" src={props.avatar_url} alt="users_avatar_image" />
            <div className="break" />
            <span className="user-username">{props.username}</span>
            <div className="break" />
            <button className="followBtn" onClick={handleFollowClick}>Follow</button>
        </div>)
        //     :
        //     ('')
        // }
    )
}

export default Recommendation;