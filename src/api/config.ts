import axios from "axios";

export const axiosBaseUrl = axios.create({
    baseURL :  import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api/v1',
    withCredentials: true, 
})