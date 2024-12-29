import axios from "axios";

// Base URL setup
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";
const BASE_URL = "http://localhost:8000";
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
const apiCallerGet = async (url) =>
    handleRequest(() =>
        axios.get(url)
    );

// Authenticated GET request
const apiCallerAuthGet = async (url, token) =>
    handleRequest(() =>
        axios.get(url, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },

        })
    );

    

// Authenticated POST request
const apiCallerAuthPost = async (url, body, token) =>
    handleRequest(() =>
        axios.post(url, { ...body }, {
            headers: { Authorization: `Bearer ${token}` },
        })
    );

// Set default Authorization header
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export { apiCallerPost, apiCallerGet, apiCallerAuthGet, apiCallerAuthPost, setAuthToken };
