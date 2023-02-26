import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "";
const axiosConfig: AxiosRequestConfig = {
    baseURL: BASE_URL || "/api",
};
const client = axios.create(axiosConfig);

export default client;
