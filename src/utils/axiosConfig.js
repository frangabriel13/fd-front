import axios from 'axios';

const addAuthHeader = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

export const manufacturerInstance = axios.create({
  baseURL: 'http://localhost:3001/api/manufacturers',
});
manufacturerInstance.interceptors.request.use(addAuthHeader);

export const userInstance = axios.create({
  baseURL: 'http://localhost:3001/api/users',
});
userInstance.interceptors.request.use(addAuthHeader);

export const productInstance = axios.create({
  baseURL: 'http://localhost:3000/api/products',
});
productInstance.interceptors.request.use(addAuthHeader);

export const authInstance = axios.create({
  baseURL: 'http://localhost:3001/api/auth',
});

export const wholesalerInstance = axios.create({
  baseURL: 'http://localhost:3001/api/wholesalers',
});
wholesalerInstance.interceptors.request.use(addAuthHeader);

export const categoryInstance = axios.create({
  baseURL: 'http://localhost:3000/api/categories',
});

export const sizeInstance = axios.create({
  baseURL: 'http://localhost:3000/api/sizes',
});

export const imageInstance = axios.create({
  baseURL: 'http://localhost:3000/api/images',
});
imageInstance.interceptors.request.use(addAuthHeader);

export const colorInstance = axios.create({
  baseURL: 'http://localhost:3000/api/colors',
});