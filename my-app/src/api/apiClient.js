import axios from "axios";

// Create an Axios instance with base configuration
const apiClient = axios.create({
    baseURL: "https://your-api.com",  
    headers: {
        "Content-Type": "application/json",
    },
});


apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Get token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
