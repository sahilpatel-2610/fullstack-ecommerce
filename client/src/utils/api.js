import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(BASE_URL + url)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const postData = async (url, formData) => {
    try {
        const { data } = await axios.post(BASE_URL + url, formData)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const editData = async (url, updateData) => {
    try {
        const { data } = await axios.put(`${BASE_URL}${url}`, updateData)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const deleteData = async (url) => {
    const { res } = await axios.delete(`${BASE_URL}${url}`);
    return res;
};