import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {

    const [feedError, setfeedError] = useState("");

    const handleFeedVisibility = () => {
        var accessToken = localStorage.getItem('token');
        console.log(accessToken)

        setfeedError("");
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
        axios.post(
            'https://akademia108.pl/api/social-app/post/latest',
            { 'headers': headers })

            .then(response => {
                if (accessToken !== "null") {

                    var nodeDivEntry = document.getElementById('add-entry-div');
                    
                    var nodeTextArea = document.createElement("textarea");
                    var nodeSpanUsername = document.createElement("span");
                    var nodeButton = document.createElement("input");

                    var myUsername = document.createTextNode(response.data.username);

                    nodeSpanUsername.appendChild(myUsername);

                    nodeDivEntry.appendChild(nodeTextArea);
                    nodeDivEntry.appendChild(nodeSpanUsername);
                    nodeDivEntry.appendChild(nodeButton);

                    nodeTextArea.setAttribute("placeholder", "Write your entry here");
                    
                    nodeButton.setAttribute("type", "submit");
                    nodeButton.setAttribute("value", "Submit");
                    nodeButton.setAttribute("class", "btn");

                    //- ma pobierać 10 ostatnich postów użytkownika i użytkowników których śledzi
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

                        document.getElementById('posts-list').appendChild(nodeLi);
                    }

                } else {
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

                        document.getElementById('posts-list').appendChild(nodeLi);
                        console.log(response.data[entry]);
                    }
                }
            }).catch(error => {
                console.log("Błąd: ");
                console.error(error);
            })
    }

    return (
        <div className="outer-container">
            <div className="list-container">
                <div id="add-entry-div"></div>
                <button onClick={handleFeedVisibility}>Show feed</button>
                <ul id="posts-list"></ul>
            </div>
            {/* <img src="img/preloader1.gif" id="preloader"></img> */}
            <script src="infiniteScroll.js"></script>
        </div>
    )



}

export default Home;