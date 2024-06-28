import axios from "axios";
import { BASE_URL } from "../config/siteConfig";

export const API = axios.create({ baseURL: BASE_URL, withCredentials: true });

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // Handle unauthorized error (e.g., redirect to login)
            console.error("Unauthorized: Redirecting to login...");
            window.location.href = "#/login";
        } else if (error.response.status === 403) {
            // Handle forbidden error (e.g., show a forbidden message)
            console.error("Forbidden: Access denied.");
            alert("You do not have permission to access this resource.");
        }
        return Promise.reject(error);
    }
);
