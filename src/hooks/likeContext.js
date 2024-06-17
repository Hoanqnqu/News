import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchsavedNews } from "../utils/NewsApi";
const LikeContext = createContext({});
function LikedNewsProvider({ children }) {
    const [likedNews, setLikedNews] = useState([]);
    const [disLikedNews, setDisLikedNews] = useState([]);
    const addLikedNews = (news) => {
        if (news.id in likedNews) {
            return;
        }
        setLikedNews([...likedNews, news]);
    };
    const removeLikedNews = (news) => {
        setLikedNews(likedNews.filter((item) => item.id != news.id));
    };

    const addDislikedNews = (news) => {
        if (news.id in disLikedNews) {
            return;
        }
        setDisLikedNews([...disLikedNews, news]);
    };
    const removeDislikedNews = (news) => {
        setDisLikedNews(disLikedNews.filter((item) => item.id != news.id));
    };
    const contextValue = {
        likedNews,
        addLikedNews,
        removeLikedNews,
        disLikedNews,
        addDislikedNews,
        removeDislikedNews
    };
    return <LikeContext.Provider value={contextValue}>{children}</LikeContext.Provider>;
}

export { LikeContext, LikedNewsProvider }