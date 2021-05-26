
import React from 'react';
import Recommendation from './Recommendation';

function RecommendationsManager(props) {

    return (
        <>
            <h3 className="recommendations-title">Users you may know:</h3>
            <ul className="recommendations-list">
                {
                props.recommendations ? 
                props.recommendations.map(item => {
                    return <Recommendation key={item.key} idx={item.key} username={item.username} avatar_url={item.avatar_url} handleFollowClick={props.handleFollowClick}/>;
                }) : ''
                }
            </ul>
        </>
    );
};

export default RecommendationsManager;