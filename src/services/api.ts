// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // ou a URL do seu servidor MongoDB
});

export default api;
