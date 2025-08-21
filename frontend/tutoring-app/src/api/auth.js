import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 5000,
});

export const useAuthAPI = () => {
    const navigate = useNavigate();

     const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            if (response.status >= 200 && response.status < 300) {
                //navigate("/dashboard");
                return response.data;
            }
            throw new Error(response.data?.error || 'Login failed');
        } catch (err) {
            throw err;
        }
    };

     const register = async (userData) => {
        try {
            const response = await api.post(`/register`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status >= 200 && response.status < 300) {
                alert("Регистрация успешна!");
                navigate("/login");
                return response.data;
            }

        } catch (err) {
            return err.response.data;
        }
    };

     const deleteUser = async (email) => {
        try {
            const response = await api.delete(`/delete`, email);
            return response.data;
        } catch (err) {
            return err.response.data;
        }
    };

    return {login, register, deleteUser};
}

