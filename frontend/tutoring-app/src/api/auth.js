import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 5000,
});

export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        throw new Error(response.data?.error || 'Login failed');
    } catch (err) {
        throw err;
    }
};

export const register = async (userData) => {
    try {
        const response = await api.post(`/register`, userData)
        return response.data;
    } catch (err) {
        return err.response.data;
    }
};

export const deleteUser = async (email) => {
  try {
      const response = await api.delete(`/delete`, email);
      return response.data;
  } catch (err) {
      return err.response.data;
  }
};