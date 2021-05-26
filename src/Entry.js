import React from 'react';
import './Entry.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons'

function Entry(props) {

    let user = JSON.parse(localStorage.getItem('user'));

    return (
        <li className="entry">
            <p className="entry-content">{props.content}</p>

            { user !== null && props.username !== user.username ?
                (<>
                    <div className="entry-signature">
                        <FontAwesomeIcon icon={faThumbsUp} className={"likeBtn" + (props.liked ? " liked" : "")} onClick={props.handleLikeClick(props.idx)} />
                        <img className="entry-avatar" src={props.avatar_url} alt="avatar_image" />
                        <span className="entry-username">{props.username}</span>
                    </div>
                    <div className="entry-social">
                        <div className="break" />
                        <button className={"followBtn" + (props.followed ? " followed" : "")} onClick={props.handleFollowClick(props.userId)}>{props.followed ? "Unfollow" : "Follow"}</button>
                    </div>
                </>)
                :
                (<>
                    <div className="entry-signature">
                        <img className="entry-avatar" src={props.avatar_url} alt="avatar_image" />
                        <span className="entry-username">{props.username}</span>
                    </div>
                    <div className="entry-social">
                        <FontAwesomeIcon icon={faTrash} className="deleteBtn" onClick={props.handleDeleteClick(props.idx)} />
                        <div className="break"></div>
                    </div >
                </>)}
        </li >
    )
}

export default Entry;