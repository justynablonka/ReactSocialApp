import React from 'react';
import './MyProfileDetails.css';

function MyProfileDetails(props) {

    return (
        <div className="user-details-div">
            <img className="user-details-avatar" src={props.avatar_url} alt="your_avatar"/>
            <div className="user-text-data">
                <h3>Your username: <span className="user-details-span">{props.username}</span></h3>
                <h3>Your e-mail: <span className="user-details-span">{props.email}</span></h3>
            </div>
        </div>
    )
}

export default MyProfileDetails;