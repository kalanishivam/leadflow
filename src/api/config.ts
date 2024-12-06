import axios from "axios";

export const axiosBaseUrl = axios.create({
    baseURL :  `${process.env.REACT_APP_PUBLIC_URL}`
})