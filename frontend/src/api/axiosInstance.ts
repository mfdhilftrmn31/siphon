import axios from 'axios';

// BASE_URL diset ke port 9999 sesuai spesifikasi
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:9999',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menangani error secara global
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nantinya kita bisa tambahkan logika toast notification global di sini
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
