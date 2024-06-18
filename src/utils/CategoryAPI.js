import apiInstance from "./axiosConfig";

const apiBaseUrl = "https://newsfu.xyz";

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
    console.log('Category API Call Err', error);
    return {};
  }
};


export const fetchAllCategories = async () => {
  return await categoryApiCall(getAllCategoryUrl);
}