// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.106:27017', // ou a URL do seu servidor MongoDB
});

export default api;
