import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {

    const [ttlValue, setTtlValue] = useState();

    useEffect(() => {
        // handleShowFeed(); //raz, nie co sekundę

        let user = JSON.parse(localStorage.getItem('user'));
        let countdownInp = document.getElementById('countdownInp');

        if (user != null) {
            if (!ttlValue) {
                setTtlValue(user.ttl)
            }
        }

        const interval = setInterval(() => {
            if (user != null && ttlValue !== 0) {
                setTtlValue(ttlValue => ttlValue - 1);
            }
        }, 1000)

    }, []);

    const handleShowFeed = (user) => {
        var user = JSON.parse(localStorage.getItem('user'));

        if (user != null) {
            var accessToken = user.jwt_token;

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            axios.post(
                'https://akademia108.pl/api/social-app/post/latest',
                { 'headers': headers })

                .then(response => {

                    //DO ZMIANY
                    //- ma pobrać 10 ostatnich postów użytkownika i użytkowników których śledzi
                    //- request ma być wysyłany z tokenem, żeby wiadomo było kto
                    //  followuje i id usera którego followujemy
                    //- ma też pojawić się okienko do pisania posta

                    for (let entry = 0; entry < 10; entry++) {

                        var nodeLi = document.createElement("li");
                        var nodeDiv = document.createElement("div");

                        var nodeContent = document.createElement("p");
                        var textnodeContent = document.createTextNode(response.data[entry].content);

                        var nodeUsername = document.createElement("span");
                        var textnodeUsername = document.createTextNode(response.data[entry].user.username);

                        var nodeImg = document.createElement("img");
                        nodeImg.setAttribute("src", response.data[entry].user.avatar_url);

                        nodeContent.appendChild(textnodeContent);
                        nodeUsername.appendChild(textnodeUsername);

                        nodeDiv.appendChild(nodeImg);
                        nodeDiv.appendChild(nodeUsername);
                        nodeDiv.appendChild(nodeContent);

                        nodeLi.appendChild(nodeDiv);
                    }
                }).catch(error => {
                    console.log("Error: ");
                    console.error(error);
                })
        }
        else {

          //- ma pobrać 10 ogólnie ostatnich postów

        }
    }

    const handleAddPostButton = () => {
        var accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            document.getElementById('add-message-div').classList.remove('hidden');
            document.getElementById('add-message-div').classList.add('visible');
        }
    }

    const handleButtonLoadMore = () => {
        var user = JSON.parse(localStorage.getItem('user'));

        if (user != null) {
            var accessToken = user.jwt_token;

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            axios.post(
                'https://akademia108.pl/api/social-app/post/latest',
                { 'headers': headers })

                .then(response => {

                    //DO ZMIANY
                    //- ma pobrać 10 ostatnich postów użytkownika i użytkowników których śledzi
                    //- request ma być wysyłany z tokenem, żeby wiadomo było kto
                    //  followuje i id usera którego followujemy
                    //- ma też pojawić się okienko do pisania posta

                    for (let entry = 0; entry < 10; entry++) {

                        var nodeLi = document.createElement("li");
                        var nodeDiv = document.createElement("div");

                        var nodeContent = document.createElement("p");
                        var textnodeContent = document.createTextNode(response.data[entry].content);

                        var nodeUsername = document.createElement("span");
                        var textnodeUsername = document.createTextNode(response.data[entry].user.username);

                        var nodeImg = document.createElement("img");
                        nodeImg.setAttribute("src", response.data[entry].user.avatar_url);

                        nodeContent.appendChild(textnodeContent);
                        nodeUsername.appendChild(textnodeUsername);

                        nodeDiv.appendChild(nodeImg);
                        nodeDiv.appendChild(nodeUsername);
                        nodeDiv.appendChild(nodeContent);

                        nodeLi.appendChild(nodeDiv);
                    }
                }).catch(error => {
                    console.log("Error: ");
                    console.error(error);
                })
        }
        else {

            //- ma pobrać 10 ogólnie ostatnich postów

        }
    }

    return (
        <div className="outer-container">
            <div id="TTL">
                <p id="parTTL">Time left till logout: </p>
                <input value={ttlValue} type="text" id="countdownInp" />
            </div>
            <div id="add-message-div" className="hidden">
                <textarea placeholder="Write something here"></textarea>
                <button onClick={handleAddPostButton}>Add post</button>
            </div>

            <div className="list-container">
                <div id="add-entry-div"></div>
                <ul id="posts-list"></ul>
            </div>
            <button className="btn" onClick={handleButtonLoadMore}>Load more feed</button>
        </div>
    )
}


export default Home;