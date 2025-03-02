import axios from "axios";

export const BASE_URL = "https://api.mindhush.ai";
axios.defaults.baseURL = BASE_URL;

// Utility to handle requests
const handleRequest = async (request) => {
    
    try {
        return await request();
    } catch (error) {
        console.error(error);
        return error.response || { status: 500, data: { detail: "Server error" } };
    }
};

// Generic POST request
const apiCallerPost = async (url, body) =>
    handleRequest(() =>
        axios.post(url, { ...body })
    );

// Generic GET request
const apiCallerGet = async (url) =>{
    return handleRequest(() =>
        axios.get(url)
    );
}
   

// Authenticated GET request
const apiCallerAuthGet = async (url, token) =>{
    return handleRequest(() =>
        axios.get(url, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },

        })
    );
    
}
   
const apiCallerPut = async (url, body) =>
    handleRequest(() => axios.put(url, { ...body }));

// Authenticated PUT request
const apiCallerAuthPut = async (url, body, token) =>
    handleRequest(() =>
        axios.put(url, { ...body }, {
            headers: { Authorization: `Bearer ${token}` },
        })
    );

// Generic DELETE request
const apiCallerDelete = async (url) =>
    handleRequest(() => axios.delete(url));

// Authenticated DELETE request
const apiCallerAuthDelete = async (url, token) =>
    handleRequest(() =>
        axios.delete(url, {
            headers: { Authorization: `Bearer ${token}` },
        })
    );

// Authenticated POST request
const apiCallerAuthPost = async (url, body, token) =>{
   
    return handleRequest(() =>
        axios.post(url, { ...body }, {
            headers: { Authorization: `Bearer ${token}` },
        })
    );

}
   

// Set default Authorization header
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export {
    apiCallerPost,
    apiCallerGet,
    apiCallerAuthGet,
    apiCallerAuthPost,
    apiCallerPut,
    apiCallerAuthPut,
    apiCallerDelete,
    apiCallerAuthDelete,
    setAuthToken
};