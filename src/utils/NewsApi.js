import { newsApiKey } from "./ApiKey";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
// Endpoints
import apiInstance from "./axiosConfig";

const apiBaseUrl = "http://192.168.1.9:3000";

const latestNewsURL = `${apiBaseUrl}/latest`;
const recommendedNewsUrl = `${apiBaseUrl}/recommend`;

const discoverNewsUrl = `${apiBaseUrl}/popular`;

const searchNewsUrl = (query) =>
  `${apiBaseUrl}/news?keyword=${query}`;
const savedNewsUrl = `${apiBaseUrl}/saved`;

const newsApiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await apiInstance.request(options);
    return response.data;

  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchLatestNews = async () => {
  return await newsApiCall(latestNewsURL);
};

export const fetchRecommendedNews = async () => {
  return await newsApiCall(recommendedNewsUrl);
};

export const fetchDiscoverNews = async (category) => {
  return await newsApiCall(discoverNewsUrl, category ? { category } : {});
};


export const fetchSearchNews = async (query) => {
  const endpoint = searchNewsUrl(query);
  return await newsApiCall(endpoint);
};

export const fetchsavedNews = async () => {
  const res = await newsApiCall(`${apiBaseUrl}/saved`)
  return res.data
}
export const fetchNewsByID = async (id) => {
  const res = await newsApiCall(`${apiBaseUrl}/news/${id}`)
  return res.data
}