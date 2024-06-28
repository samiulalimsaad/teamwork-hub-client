import axios from "axios";
import { BASE_URL } from "../config/siteConfig";

export const API = axios.create({ baseURL: BASE_URL, withCredentials: true });
