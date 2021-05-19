import React, { useState } from 'react';
import axios from 'axios';
import './Entry.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

function Entry(props) {

    let user = JSON.parse(localStorage.getItem('user'));
    const [likedEntry, setlikedEntry] = useState({ post_id: '' });

    const handleLikeClick = () => {

        if (user != null) {
            let accessToken = user.jwt_token;

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            axios.post(
                'https://akademia108.pl/api/social-app/post/like',
                { 'post_id': likedEntry.post_id },
                { 'headers': headers })
                .then(response => {
                    console.log(response);
                    setlikedEntry(props.post_id);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

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

    return (
        <li className="entry">
            <p className="entry-content">{props.content}</p>

            { user !== null && props.username !== user.username ?
                (<>
                    <div className="entry-signature">
                        <FontAwesomeIcon icon={faThumbsUp} className="likeBtn" onClick={handleLikeClick} />
                        <img className="entry-avatar" src={props.avatar_url} alt="avatar_image" />
                        <span className="entry-username">{props.username}</span>
                    </div>
                    <div className="entry-social">
                        <div className="break" />
                        <button className="followBtn" onClick={handleFollowClick}>Follow</button>
                    </div>
                </>)
                :
                (<>
                    <div className="entry-signature">
                        <img className="entry-avatar" src={props.avatar_url} alt="avatar_image" />
                        <span className="entry-username">{props.username}</span>
                    </div>
                    <div className="entry-social">
                        <div className="break"></div>
                    </div >
                </>)}
        </li >
    )
}

export default Entry;