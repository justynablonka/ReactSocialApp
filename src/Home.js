import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import EntryManager from './EntryManager';

function Home() {

    const [ttlValue, setTtlValue] = useState();

    useEffect(() => {
        // handleShowFeed(); //raz, nie co sekundę

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

    // const showPreloader = () => {

    //     let preloader = document.getElementById('preloader');
    //     console.log('showPreloader()');
    //     preloader.style.display = 'block';

    // }

    // const hidePreloader = () => {

    //     let preloader = document.getElementById('preloader');
    //     console.log('hidePreloader()');
    //     preloader.style.display = 'none';

    // }

    // const getData = () => {

    //     let user = JSON.parse(localStorage.getItem('user'));

    //     if (user != null) {
    //         //- ma pobrać 10 ostatnich postów użytkownika i użytkowników których śledzi
    //         //- request ma być wysyłany z tokenem, żeby wiadomo było kto
    //         //  followuje i id usera którego followujemy
    //         //- ma też pojawić się okienko do pisania posta
    //         let accessToken = user.jwt_token;

    //         const headers = {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //         axios.post(
    //             'https://akademia108.pl/api/social-app/post/latest',
    //             { }, //tutaj id userów, których followujemy?
    //             { 'headers': headers })

    //             .then(response => response.json())
    //             .then(data => {
    //                 let body = document.body;
    //                 let hr = document.createElement('hr');
    //                 body.appendChild(hr);

    //                 for (let entry of data) {
    //                     let pEntryUserAvatar = document.createElement('p');
    //                     let pEntryUserId = document.createElement('p');
    //                     let pEntryUserName = document.createElement('p');
    //                     let pEntryContent = document.createElement('p');
    //                     let pLine = document.createElement('p');

    //                     pEntryUserAvatar.innerText = `Avatar: ${entry.user.avatar_url}`
    //                     pEntryUserId.innerText = `User ID: ${entry.user.id}`;
    //                     pEntryUserName.innerText = `User Name: ${entry.user.username}`;
    //                     pEntryContent.innerText = `User URL: ${entry.content}\n--------`;

    //                     body.appendChild(pEntryUserAvatar);
    //                     body.appendChild(pEntryUserId);
    //                     body.appendChild(pEntryUserName);
    //                 }

    //                 hidePreloader();
    //                 console.log(data);
    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             })
    //     } else {

    //         //- ma pobrać 10 ogólnie ostatnich postów

    //     }

        // for (let entry = 0; entry < 10; entry++) {

        //     let nodeLi = document.createElement("li");
        //     let nodeDiv = document.createElement("div");

        //     let nodeContent = document.createElement("p");
        //     let textnodeContent = document.createTextNode(response.data[entry].content);

        //     let nodeUsername = document.createElement("span");
        //     let textnodeUsername = document.createTextNode(response.data[entry].user.username);

        //     let nodeImg = document.createElement("img");
        //     nodeImg.setAttribute("src", response.data[entry].user.avatar_url);

        //     nodeContent.appendChild(textnodeContent);
        //     nodeUsername.appendChild(textnodeUsername);

        //     nodeDiv.appendChild(nodeImg);
        //     nodeDiv.appendChild(nodeUsername);
        //     nodeDiv.appendChild(nodeContent);

        //     nodeLi.appendChild(nodeDiv);

    // }

    // const scrollToEndOfPage = () => {

    //     let d = document.documentElement;

    //     //height of an element's content, including content not visible on the screen
    //     let scrollHeight = d.scrollHeight;

    //     //nr of pixels that an element's content is scrolled from the top
    //     let scrollTop = d.scrollTop;

    //     //inner height of an element in pixels (in our case - height of browser)
    //     let clientHeight = d.clientHeight;

    //     //Math.ceil(nr) - zaokrąglanie w górę, ochrona przed ułamkami w niektórych przeglądarkach
    //     let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);

    //     console.log(`scrollHeight: ${scrollHeight}`);
    //     console.log(`scrollTop: ${scrollTop}`);
    //     console.log(`clientHeight: ${clientHeight}`);
    //     console.log(`sumScrollTopClientHeight: ${sumScrollTopClientHeight}`);
    //     console.log('-----------------');

    //     if (sumScrollTopClientHeight >= scrollHeight) { // > to zabezpieczenie przed ułamkami w niektórych przeglądarkach
    //         console.log('Scrolled to the end of the page');
    //         showPreloader();
    //         getData();
    //     }
    // }

    // window.addEventListener('scroll', scrollToEndOfPage);

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

            {/* <img src="img/preloader1.gif" id="preloader"></img> */}
        </div>
    )
}


export default Home;