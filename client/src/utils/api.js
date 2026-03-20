import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const fetchDataFromApi = async (url) => {
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(BASE_URL + url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return null;
    }
}

export const postData = async (url, formData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(BASE_URL + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            return errorData;
        }

    } catch (error) {
        console.error("Error:", error);
        return { error: true, msg: error.message };
    }
}

export const editData = async (url, updateData) => {
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios.put(`${BASE_URL}${url}`, updateData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const deleteData = async (url) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.delete(`${BASE_URL}${url}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return data;
};