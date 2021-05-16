import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Entry.css';

function Entry(props) {

    return (
        <li>
            <div>
                <img src={props.avatar_url}></img>
                <span>{props.username}</span>
                <p>{props.content}</p>
            </div>
        </li>
    )

}

export default Entry;