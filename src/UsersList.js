import React from 'react';
import './UsersList.css';

import SignUp from './SignUp';

function UsersList(props) {

    let usersList = props.usersList1;
    let usersLiElements = usersList.map(user => <li key={user.id}>{user.name}</li>);

    return (
        <ul className="users-list">
            {usersLiElements}
        </ul>
    );
}

export default UsersList;