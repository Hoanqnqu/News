import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchsavedNews } from "../utils/NewsApi";
const SavedNewsContext = createContext({});
import { AuthContext } from "./authContext";
import apiInstance from '../utils/axiosConfig';
function SavedNewsProvider({ children }) {
    const [savedNews, setSavedNews] = useState([]);
    const { userInfo } = useContext(AuthContext);
    useEffect(() => {

        const loadSavedNews = async () => {
            if (!userInfo) {
                setSavedNews([]);
                return;
            }
            try {
                const savedNews = await fetchsavedNews();
                setSavedNews(savedNews);
            } catch (error) {
                console.error('Failed to load saved news:', error);
            }
        };
        loadSavedNews();
    }, [userInfo]);

    const addSavedNews = (news) => {
        if (news.id in savedNews) {
            return;
        }
        apiInstance.post(`/save/${news?.id}`, news?.id);
        setSavedNews([...savedNews, news]);
    };
    const removeSavedNews = (news) => {
        setSavedNews(savedNews.filter((item) => item.id != news.id));
        apiInstance.post(`/save/${news?.id}`, news?.id);
    };

    const contextValue = {
        savedNews,
        addSavedNews,
        removeSavedNews
    };
    return <SavedNewsContext.Provider value={contextValue}>{children}</SavedNewsContext.Provider>;

}
export { SavedNewsContext, SavedNewsProvider }