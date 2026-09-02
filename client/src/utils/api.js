import axios from "axios";

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

const BASE_URL = isLocalhost 
    ? "http://localhost:4000" 
    : "https://fullstack-ecommerce-server-do5l.onrender.com";

export const fetchDataFromApi = async (url) => {
    try {
        const token = localStorage.getItem("token");
        const headers = token ? { "Authorization": `Bearer ${token}` } : {};
        const { data } = await axios.get(BASE_URL + url, { headers });
        return data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return { error: true, msg: error.message };
    }
}

export const postData = async (url, formData) => {
    try {
        const token = localStorage.getItem("token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;
        const response = await axios.post(BASE_URL + url, formData, { headers });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        return error.response ? error.response.data : { error: true, msg: error.message };
    }
}

export const editData = async (url, updateData) => {
    try {
        const token = localStorage.getItem("token");
        const headers = token ? { "Authorization": `Bearer ${token}` } : {};
        const { data } = await axios.put(`${BASE_URL}${url}`, updateData, { headers });
        return data;
    } catch (error) {
        console.log(error);
        return { error: true, msg: error.message };
    }
}

export const deleteData = async (url) => {
    try {
        const token = localStorage.getItem("token");
        const headers = token ? { "Authorization": `Bearer ${token}` } : {};
        const { data } = await axios.delete(`${BASE_URL}${url}`, { headers });
        return data;
    } catch (error) {
        console.error("API Delete Error:", error);
        return { error: true, msg: error.message };
    }
};

export const uploadImage = async (url, image) => {
    try {
        const token = localStorage.getItem("token");
        const headers = token ? { "Authorization": `Bearer ${token}` } : {};
        const { data } = await axios.post(`${BASE_URL}${url}`, image, { headers });
        return data;
    } catch (error) {
        console.error("API Upload Error:", error);
        return { error: true, msg: error.message };
    }
}

export const deleteImage = async (url) => {
    try {
        const token = localStorage.getItem("token");
        const headers = token ? { "Authorization": `Bearer ${token}` } : {};
        const { data } = await axios.delete(`${BASE_URL}${url}`, { headers });
        return data;
    } catch (error) {
        console.error("API Delete Image Error:", error);
        return { error: true, msg: error.message };
    }
}