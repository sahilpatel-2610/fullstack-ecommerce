// import axios from "axios";
// require('dotenv/config');


// export const fetchDataFromApi = async (url) => {
//     try {
//         const { data } = await axios.get(process.env.REACT_APP_BASE_URL + url);
//         return data;
//     }catch (error) {
//         console.log(error);
//         return error;
//     }
// }


// export const postData = async (url, formData) => {
//     const { res } = await axios.post(process.env.REACT_APP_BASE_URL + url, formData);
//     return res;
// }

import axios from "axios";

// .env file ma aa define karo 👇
// REACT_APP_BASE_URL=http://localhost:4000/api

const API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000/api";

// GET request
export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(`${API_URL}${url}`);
    return data;
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    throw error;
  }
};

// POST request
export const postData = async (url, formData) => {
  try {
    const { data } = await axios.post(`${API_URL}${url}`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error) {
    console.error("❌ Post Error:", error);
    throw error;
  }
};