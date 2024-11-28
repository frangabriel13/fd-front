import axios from 'axios';

export const manufacturerInstance = axios.create({
  baseURL: 'http://localhost:3001/api/manufacturers',
});

export const productInstance = axios.create({
  baseURL: 'http://localhost:3000/api/products',
});