import React from 'react';
import FollowerCard from './FollowerCard';

const FollowerList = ({ followers, removeFollower, isFilter}) => {
    return (
        <section className="user-list" style={{ gridTemplateColumns: isFilter ? 'repeat(4, 1fr)' : 'repeat(5, 1fr)' }}>
            {followers.length > 0 && followers.map((follower) => (
                <FollowerCard key={follower.uid} follower={follower} removeFollower={removeFollower} />
            ))}
        </section>
    );
};

export default FollowerList;
