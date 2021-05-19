import React, { useState, useEffect } from 'react';
import Entry from './Entry';
import axios from 'axios';
import useInfiniteScroll from './useInfiniteScroll';

function EntryManager(props) {

    const [entries, setEntries] = useState([]);
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

    useEffect(() => {
        getData();
    }, []);

    function fetchMoreListItems() {
        setTimeout(() => {
          setEntries(prevState => ([...prevState, ...getData()])); //...Array.from(getData(), n => n + prevState.length + 1)])); //...Array.from(Array(20).keys(), n => n + prevState.length + 1)]));
          setIsFetching(false);
        }, 2000);
      }

    const getData = () => {
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

                        let key = entry.id;
                        let username = entry.user.username;
                        let content = entry.content;
                        let avatar_url = entry.user.avatar_url;
                        let newEntry = <Entry key={key} username={username} content={content} avatar_url={avatar_url} />;
                        setEntries(oldEntries => [...oldEntries, newEntry]);
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
                        //dodać spr czy post z tym id już istnieje
                        let key = entry.id;
                        let username = entry.user.username;
                        let content = entry.content;
                        let avatar_url = entry.user.avatar_url;
                        let newEntry = <Entry key={key} username={username} content={content} avatar_url={avatar_url} />;
                        setEntries(oldEntries => [...oldEntries, newEntry]);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
        return entries;
    };

    return (
        <>
            <ul className="list-group">
                {entries}
                {entries.map(listItem => <li className="list-group-item">{listItem}</li>)}
            </ul>
            {isFetching && <img src="img/preloader1.gif" alt="preloader_gif" />}
        </>

    );
};

export default React.memo(EntryManager);