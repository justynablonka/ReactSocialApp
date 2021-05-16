import React, { useState, useEffect } from 'react';
import Entry from './Entry';
import axios from 'axios';

function EntryManager() {

    const [entries, setEntries] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user != null) {
            //- ma pobrać 10 ostatnich postów użytkownika i użytkowników których śledzi
            //- request ma być wysyłany z tokenem, żeby wiadomo było kto
            //  followuje i id usera którego followujemy
            //- ma też pojawić się okienko do pisania posta
            let accessToken = user.jwt_token;

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            axios.post(
                'https://akademia108.pl/api/social-app/post/latest',
                {}, //tutaj id userów, których followujemy?
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
        } else { }

        return entries;
    };

    return (
        <ul>
            {entries}
        </ul>
    )

}

export default React.memo(EntryManager);