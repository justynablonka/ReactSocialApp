import React from 'react';
import './Recommendation.css';

function Recommendation(props) {

    return (
        (<div className="recommendation-div">
            <img className="user-avatar" src={props.avatar_url} alt="users_avatar_image" />
            <div className="break" />
            <span className="user-username">{props.username}</span>
            <div className="break" />
            <button className="followBtn" onClick={props.handleFollowClick(props.idx)}>Follow</button>
        </div>)
    )
}

export default Recommendation;