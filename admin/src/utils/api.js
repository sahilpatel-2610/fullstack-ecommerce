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
    const token = localStorage.getItem("token");
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        const errorMsg = error.response?.data?.message || error.response?.data?.error || error.message || "Failed to fetch data";
        return { error: true, msg: typeof errorMsg === "string" ? errorMsg : "Server Error" };
    }
}

export const postData = async (url, formData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(BASE_URL + url, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("API Post Error:", error);
        const rawData = error.response?.data;
        if (rawData && typeof rawData === "object" && !Array.isArray(rawData)) {
            return { error: true, ...rawData };
        }
        const msg = typeof rawData === "string" && !rawData.includes("<html") ? rawData : (error.message || "Server Error (502)");
        return { error: true, msg: msg };
    }
}

export const editData = async (url, updateData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put(`${BASE_URL}${url}`, updateData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("API Edit Error:", error);
        const rawData = error.response?.data;
        if (rawData && typeof rawData === "object" && !Array.isArray(rawData)) {
            return { error: true, ...rawData };
        }
        const msg = typeof rawData === "string" && !rawData.includes("<html") ? rawData : (error.message || "Server Error");
        return { error: true, msg: msg };
    }
}

export const deleteData = async (url) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.delete(`${BASE_URL}${url}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("API Delete Error:", error);
        const rawData = error.response?.data;
        if (rawData && typeof rawData === "object" && !Array.isArray(rawData)) {
            return { error: true, ...rawData };
        }
        const msg = typeof rawData === "string" && !rawData.includes("<html") ? rawData : (error.message || "Server Error");
        return { error: true, msg: msg };
    }
};

export const deleteImages = async (url, image) => {
    try {
        const response = await axios.delete(`${BASE_URL}${url}`, { data: image });
        return response.data;
    } catch (error) {
        console.error("API Delete Images Error:", error);
        return { error: true, msg: error.message || "Delete Images Failed" };
    }
};

