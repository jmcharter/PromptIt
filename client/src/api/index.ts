import axios from 'axios';
import { UserData } from '../models/DataModels';
import { ValidateResponse } from '../models/ResponseModels';

const baseURL = 'http://localhost:5000/';
const api = axios.create({
    baseURL: baseURL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("access-token");
    if (token) {
        config.headers!.Authorization = "Bearer " + token;
    }
    return config;
});



export const registerUser = async (data: Object) => await api.post('/users/register', data);
export const loginUser = async (data: Object) => await api.post('/users/login', data);
export const logoutUser = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("user-data");
};

export const validateToken = async (token: String) => await api.post('/users/validateusertoken', { token });
export const getUser = async () => await api.get('/users/profile');

export const getPrompts = async () => await api.get('/prompts');

export const isAuthenticated = () => {
    return localStorage.getItem("access-token");
};

export default api;