import axios from "axios";

export const fetchDataFromApi = async (url) => {
    try {
        const {data} = await axios.get("http://localhost:4000" + url)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const postData = async (url, formData) => {
    const { data } = await axios.post("http://localhost:4000" + url, formData)
    return data;
}


export const editData = async (url, updateData) => {
    const { data } = await axios.put(`http://localhost:4000${url}`,updateData)
    return data;
}

// export const deleteData = async (url, id) => {
//     const { data } = await axios.delete(`http://localhost:4000${url}${id}`)
//     return data;
// }

export const deleteData = async (url) => {
    const { data } = await axios.delete(`http://localhost:4000${url}`);
    return data;
};