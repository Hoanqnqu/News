import apiInstance from "./axiosConfig";

const apiBaseUrl = "http://192.168.1.9:3000";

const getAllCategoryUrl = `${apiBaseUrl}/categories`;


const categoryApiCall = async (endpoints, params) => {
    const options = {
      method: "GET",
      url: endpoints,
      params: params ? params : {},
    };
  
    try {
      const response = await apiInstance.request(options);
      return response.data.data;
  
    } catch (error) {
      console.log('Category API Call Err'   , error);
      return {};
    }
  };


export const fetchAllCategories = async () => {
  return await categoryApiCall(getAllCategoryUrl);
}