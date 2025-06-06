import axios from 'axios';
import { refreshToken } from '../store/actions/manufacturerActions';

const addAuthHeader = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

export const manufacturerInstance = axios.create({
  baseURL: 'https://nodeuser.fabricantedirecto.com/api/manufacturers',
});
manufacturerInstance.interceptors.request.use(addAuthHeader);

export const userInstance = axios.create({
  baseURL: 'https://nodeuser.fabricantedirecto.com/api/users',
});
userInstance.interceptors.request.use(addAuthHeader);

export const productInstance = axios.create({
  baseURL: 'https://nodeproduct.fabricantedirecto.com/api/products',
});
productInstance.interceptors.request.use(addAuthHeader);

export const authInstance = axios.create({
  baseURL: 'https://nodeuser.fabricantedirecto.com/api/auth',
});

export const wholesalerInstance = axios.create({
  baseURL: 'https://nodeuser.fabricantedirecto.com/api/wholesalers',
});
wholesalerInstance.interceptors.request.use(addAuthHeader);

export const categoryInstance = axios.create({
  baseURL: 'https://nodeproduct.fabricantedirecto.com/api/categories',
});

export const sizeInstance = axios.create({
  baseURL: 'https://nodeproduct.fabricantedirecto.com/api/sizes',
});

export const imageInstance = axios.create({
  baseURL: 'https://nodeproduct.fabricantedirecto.com/api/images',
});
imageInstance.interceptors.request.use(addAuthHeader);

export const colorInstance = axios.create({
  baseURL: 'https://nodeproduct.fabricantedirecto.com/api/colors',
});

export const packInstance = axios.create({
  baseURL: 'https://nodeproduct.fabricantedirecto.com/api/packs',
});
packInstance.interceptors.request.use(addAuthHeader);

export const genderInstance = axios.create({
  baseURL: 'https://nodeproduct.fabricantedirecto.com/api/genders',
});

export const orderInstance = axios.create({
  baseURL: 'https://nodeuser.fabricantedirecto.com/api/orders',
});
orderInstance.interceptors.request.use(addAuthHeader);

export const reviewInstance = axios.create({
  baseURL: 'https://nodeuser.fabricantedirecto.com/api/reviews',
});
reviewInstance.interceptors.request.use(addAuthHeader);

export const favoriteInstance = axios.create({
  baseURL: 'https://nodeuser.fabricantedirecto.com/api/favorites',
});
favoriteInstance.interceptors.request.use(addAuthHeader);

export const adminInstance = axios.create({
  baseURL: 'https://nodeuser.fabricantedirecto.com/api/admin',
});
adminInstance.interceptors.request.use(addAuthHeader);

const instancesWithAuth = [
  manufacturerInstance,
  userInstance,
  productInstance,
  wholesalerInstance,
  imageInstance,
  packInstance,
  orderInstance,
  reviewInstance,
  favoriteInstance,
  adminInstance
];

instancesWithAuth.forEach(instance => {
  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshToken();
          originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
          return instance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );
});