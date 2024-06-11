import { newsApiKey } from "./ApiKey";
import axios from "axios";

// Endpoints

const apiBaseUrl = "http://192.168.1.9:3000";

const breakingNewsUrl = `${apiBaseUrl}/news`;
const recommendedNewsUrl = `${apiBaseUrl}/news`;

const discoverNewsUrl = (discover) =>
  `${apiBaseUrl}/news?country=us&category=${discover}`;


const searchNewsUrl = (query) =>
  `${apiBaseUrl}/news?keyword=${query}`;

const newsApiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;

  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchBreakingNews = async () => {
  return await newsApiCall(breakingNewsUrl);
};

export const fetchRecommendedNews = async () => {
  return await newsApiCall(recommendedNewsUrl);
};

export const fetchDiscoverNews = async (discover) => {
  return await newsApiCall(discoverNewsUrl(discover));
};


export const fetchSearchNews = async (query) => {
  const endpoint = searchNewsUrl(query);
  return await newsApiCall(endpoint);
};
