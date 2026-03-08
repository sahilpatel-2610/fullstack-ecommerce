import axios from "axios";

export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get("http://localhost:4000" + url)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const postData = async (url, formData) => {
    try {
        const response = await axios.post("http://localhost:4000" + url, formData);
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response ? error.response.data : error;
    }
}

export const editData = async (url, updateData) => {
    try {
        const response = await axios.put(`${"http://localhost:4000"}${url}`, updateData);
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response ? error.response.data : error;
    }
}

export const deleteData = async (url) => {
    try {
        const response = await axios.delete(`${"http://localhost:4000"}${url}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response ? error.response.data : error;
    }
};

export const deleteImages = async (url, image) => {
    try {
        const response = await axios.delete(`${"http://localhost:4000"}${url}`, { data: image });
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response ? error.response.data : error;
    }
};

