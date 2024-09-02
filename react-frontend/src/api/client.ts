import axios from "axios";
import { AXIOS_CONFIG } from "@/config";
const token = localStorage.getItem('authToken');

export const apiClient = axios.create({
    baseURL: AXIOS_CONFIG.baseURL,
    headers: {
        Authorization: token,
    }
});
