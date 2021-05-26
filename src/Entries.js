import Entry from './Entry';

function Entries(props) {

    return (
        <ul className="list-group">
            {
                props.entries ? 
                props.entries.map(item => {
                    return <Entry key={item.key} idx={item.key} liked={item.liked} userId={item.userId} username={item.username} followed={item.followed} content={item.content} avatar_url={item.avatar_url} createdAtDate={item.createdAtDate} handleLikeClick={props.handleLikeClick} handleFollowClick={props.handleFollowClick} handleDeleteClick={props.handleDeleteClick} />;
                }) : ''
            }
        </ul>

    );
};

export default Entries;