import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import EntryManager from './EntryManager';

function Home() {

    const [ttlValue, setTtlValue] = useState();

    useEffect(() => {

        let user = JSON.parse(localStorage.getItem('user'));

        if (user !== null) {
            if (!ttlValue) {
                setTtlValue(user.ttl)
            }
        }

        const interval = setInterval(() => {
            if (user !== null && ttlValue !== 0) {
                setTtlValue(ttlValue => ttlValue - 10);
            }
        }, 10000)

    }, []);

    const handleAddPostButton = () => {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user != null) {
            let accessToken = user.jwt_token;

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            axios.post(
                'https://akademia108.pl/api/social-app/post/add',
                { 'headers': headers })

                .then(response => {
                    console.log(response.data);
                })

        }
    }

    return (
        <div>
            {(JSON.parse(localStorage.getItem('user') !== null) ? (
                <div id="logged-in-user-div">
                    <div id="TTL">
                        <p id="parTTL">Time left till logout: </p>
                        <span id="countdownSpan">{ttlValue}</span><br />
                    </div>
                    <div id="add-message-div">
                        <textarea placeholder="Write something here" id="your-entry" /> <br />
                        <button className="btn" onClick={handleAddPostButton}>Add post</button>
                    </div>
                </div>
            ) : (<p id="altText">Log in to see more feed</p>))}

            <div className="list-container">
                <EntryManager />
                <div id="add-entry-div"></div>
                <ul id="posts-list"></ul>
            </div>
        </div>
    )
}


export default Home;