import axios from "axios";

const BASE_URL = "https://fullstack-ecommerce-server-do5l.onrender.com";

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
        console.log(error);
        return error;
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
        console.error(error);
        return error.response ? error.response.data : error;
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
        console.error(error);
        return error.response ? error.response.data : error;
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
        console.error(error);
        return error.response ? error.response.data : error;
    }
};

export const deleteImages = async (url, image) => {
    try {
        const response = await axios.delete(`${BASE_URL}${url}`, { data: image });
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response ? error.response.data : error;
    }
};

