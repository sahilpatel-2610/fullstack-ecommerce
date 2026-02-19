import axios from "axios";

export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_BASE_URL + url)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const postData = async (url, formData) => {
    const { res } = await axios.post(process.env.REACT_APP_BASE_URL + url, formData)
    return res;
}

export const editData = async (url, updateData) => {
    const { res } = await axios.put(`${process.env.REACT_APP_BASE_URL}${url}`,updateData)
    return res;
}

export const deleteData = async (url) => {
    const { res } = await axios.delete(`${process.env.REACT_APP_BASE_URL}${url}`);
    return res;
};

export const deleteImages = async (url, image) => {
    const { res } = await axios.delete(`${process.env.REACT_APP_BASE_URL}${url}`,image);
    return res;
};


// import axios from "axios";

// export const fetchDataFromApi = async (url) => {
//     try {
//         const { data } = await axios.get(process.env.REACT_APP_API_URL + url)
//         return data;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// export const postData = async (url, formData) => {
//     const { res } = await axios.post(process.env.REACT_APP_API_URL + url, formData)
//     return res;
// }

// export const editData = async (url, updateData) => {
//     const { res } = await axios.put(`${process.env.REACT_APP_API_URL}${url}`,updateData)
//     return res;
// }

// export const deleteData = async (url) => {
//     const { res } = await axios.delete(`${process.env.REACT_APP_API_URL}${url}`);
//     return res;
// };