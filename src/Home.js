import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Entries from './Entries';
import useInfiniteScroll from './useInfiniteScroll';
import preloader1 from './img/preloader1.gif';

function Home() {

    const [entryContent, setEntryContent] = useState({ content: "" });
    const [entries, setEntries] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
    const [oldestEntryDate, setOldestEntryDate] = useState('');

    useEffect(() => {
        function getData() {
            let user = JSON.parse(localStorage.getItem('user'));

            if (user != null) {
                let accessToken = user.jwt_token;

                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
                axios.post(
                    'https://akademia108.pl/api/social-app/post/latest',
                    {},
                    { 'headers': headers })

                    .then(response => {
                        for (let entry of response.data) {
                            let newEntry = {};
                            newEntry.key = entry.id;
                            newEntry.userId = entry.user.id;
                            newEntry.username = entry.user.username;
                            newEntry.content = entry.content;
                            newEntry.avatar_url = entry.user.avatar_url;
                            newEntry.createdAtDate = entry.created_at;

                            setEntries(oldEntries => [...oldEntries, newEntry]);
                            setOldestEntryDate(newEntry.createdAtDate);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else {

                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
                axios.post(
                    'https://akademia108.pl/api/social-app/post/latest',
                    {},
                    { 'headers': headers })
                    .then(response => {
                        for (let entry of response.data) {
                            let newEntry = {};
                            newEntry.key = entry.id;
                            newEntry.userId = entry.user.id;
                            newEntry.username = entry.user.username;
                            newEntry.content = entry.content;
                            newEntry.avatar_url = entry.user.avatar_url;
                            newEntry.createdAtDate = entry.created_at;

                            setEntries(oldEntries => [...oldEntries, newEntry]);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }

        getData();
    }, []);

    function fetchMoreListItems() {
        setTimeout(() => {
            getOlderData();
        }, 2000);
    }

    const handleAddPostButton = () => {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user != null) {
            let accessToken = user.jwt_token;
            console.log(entryContent);

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            axios.post(
                'https://akademia108.pl/api/social-app/post/add',
                { content: entryContent.content },
                { 'headers': headers })

                .then(response => {
                    console.log(response.data);
                    console.log(`Entry content: ${entryContent}`);
                })

        }
    }

    const getOlderData = () => {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user != null) {
            let accessToken = user.jwt_token;

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            axios.post(
                'https://akademia108.pl/api/social-app/post/older-then',
                { 'date': oldestEntryDate },
                { 'headers': headers })

                .then(response => {
                    // console.log(response.data);
                    for (let entry of response.data) {
                        let newEntry = {};
                        newEntry.key = entry.id;
                        newEntry.userId = entry.user.id;
                        newEntry.username = entry.user.username;
                        newEntry.content = entry.content;
                        newEntry.avatar_url = entry.user.avatar_url;
                        newEntry.createdAtDate = entry.created_at;

                        setEntries(oldEntries => [...oldEntries, newEntry]);
                        setOldestEntryDate(newEntry.createdAtDate);
                    }
                    setIsFetching(false);
                })
                .catch(error => {
                    console.log(error);
                })
        } else {

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
            axios.post(
                'https://akademia108.pl/api/social-app/post/older-then',
                { 'date': oldestEntryDate },
                { 'headers': headers })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    };

    const handleLikeClick = (idx) => {
        return function () {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user != null) {
                let accessToken = user.jwt_token;
                let newEntries = entries;
                let likedEntry = newEntries.find(x => x.key === idx);

                if (likedEntry.liked) {
                    const headers = {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                    axios.post(
                        'https://akademia108.pl/api/social-app/post/dislike',
                        { 'post_id': idx },
                        { 'headers': headers })
                        .then(response => {
                            console.log(response);
                            likedEntry.liked = false;
                            setEntries(newEntries);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else {
                    const headers = {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                    axios.post(
                        'https://akademia108.pl/api/social-app/post/like',
                        { 'post_id': idx },
                        { 'headers': headers })
                        .then(response => {
                            console.log(response);
                            likedEntry.liked = true;
                            setEntries(newEntries);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            }
        }
    }

    const handleFollowClick = (userId) => {
        return function () {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user != null) {
                let accessToken = user.jwt_token;
                let newEntries = entries;
                let followedEntries = newEntries.filter(x => x.userId === userId);

                if (followedEntries[0].followed) {
                    const headers = {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                    axios.post(
                        'https://akademia108.pl/api/social-app/follows/disfollow',
                        { 'leader_id': userId },
                        { 'headers': headers })

                        .then(response => {
                            console.log(response);
                            for (let followedEntry of followedEntries) {
                                followedEntry.followed = false;
                            }
                            setEntries(newEntries);
                            
                            let users = followedUsers.filter(x => x !== userId);
                            setFollowedUsers(users);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else {
                    const headers = {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                    axios.post(
                        'https://akademia108.pl/api/social-app/follows/follow',
                        { 'leader_id': userId },
                        { 'headers': headers })

                        .then(response => {
                            console.log(response);
                            for (let followedEntry of followedEntries) {
                                followedEntry.followed = true;
                            }
                            setEntries(newEntries);

                            setFollowedUsers([...followedUsers, userId]);

                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            }
        }
    }

    return (
        <div>
            {(JSON.parse(localStorage.getItem('user') !== null) ? (
                <div id="logged-in-user-div">
                    <div id="add-message-div">
                        <textarea placeholder="Write something here" id="your-entry" onChange={e => setEntryContent({ ...entryContent, content: e.target.value })} value={entryContent.content} /> <br />
                        <button className="btn" onClick={handleAddPostButton}>Add post</button>
                    </div>
                </div>
            ) : (<p id="altText">Log in to see more feed and add posts!</p>))}

            <div className="list-container">
                <Entries entries={entries} handleLikeClick={handleLikeClick} handleFollowClick={handleFollowClick}/>
                {isFetching && <img src={preloader1} alt="preloader_gif" />}
            </div>
        </div>
    )
}


export default Home;