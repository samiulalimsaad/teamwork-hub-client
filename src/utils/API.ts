import axios from "axios";
import { BASE_URL } from "../config/siteConfig";
import { useModalStore } from "../store/modal";
import { useUserStore } from "../store/user";

export const API = axios.create({ baseURL: BASE_URL, withCredentials: true });

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            console.error("Unauthorized: Redirecting to login...");
            useModalStore.getState().open();
            useUserStore.getState().reset();
        } else if (error.response?.status === 403) {
            console.error("Forbidden: Access denied.");
            alert("You do not have permission to access this resource.");
        }
        return Promise.reject(error);
    }
);
