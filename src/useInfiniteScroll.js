import React, { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {

    const [isFetching, setIsFetching] = useState(false);
    //   const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user') !== null)) {
            window.addEventListener('scroll', handleScroll);
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        if (!isFetching) return;
        callback(() => {
            console.log('called back');
        });
    }, [isFetching]);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
        setIsFetching(true);
    }

    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;