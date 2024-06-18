import apiInstance from "./axiosConfig";

const apiBaseUrl = "https://newsfu.xyz";

export const fetchComments = async (newsID) => {
  console.log(newsID)
  options = {
    method: "GET",
    url: `${apiBaseUrl}/comments/${newsID}`,
  }
  try {
    const response = await apiInstance.request(options);
    return response.data.data;

  } catch (error) {
    console.log('Comments API Call Err', error);
    return {};
  }
}
export const postComment = async (comment) => {
  options = {
    method: "POST",
    url: `${apiBaseUrl}/comment`,
    data: comment
  }
  try {
    console.log(comment)
    const response = await apiInstance.request(options);
    return response.data.data;

  } catch (error) {
    console.log(comment)
    console.log('Comments API Call Err', error);
    return {};
  }
}  