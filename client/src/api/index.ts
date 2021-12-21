import axios from 'axios';

const baseURL = 'http://localhost:5000/';
const api = axios.create({ baseURL });

export const registerUser = async (data: Object) => await api.post('/users/register', data);

export default api;