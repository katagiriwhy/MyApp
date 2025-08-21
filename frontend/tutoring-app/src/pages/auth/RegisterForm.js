import React, { useState } from 'react';
import './AuthPage.css';
import { useAuthAPI } from "../../api/auth";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        birth_date: ''
    });
    const [error, setError] = useState('');
    const { register } = useAuthAPI();

    const validatePassword = (password) => {
        if (password.length < 8) {
            return 'Пароль должен быть не менее 8 символов';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Добавьте хотя бы одну заглавную букву';
        }
        if (!/[0-9]/.test(password)) {
            return 'Добавьте хотя бы одну цифру';
        }
        return '';
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setFormData({...formData, password: value});
        setError(validatePassword(value));
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        console.log('Отправляемые данные:', formData);
        try {
            await register(formData);
        } catch (err) {
            console.error('Полная ошибка:', err);
            setError('Ошибка регистрации: ' + err.message);
        }
    };

    return (
        <div className="auth-container"> {}
            <div className="auth-form"> {}
                <h1>Регистрация</h1> {}
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    <input
                        type="text"
                        name="first_name"
                        placeholder="Имя"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Фамилия"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={formData.password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <input
                        type="date"
                        name="birth_date"
                        placeholder="Дата рождения"
                        value={formData.birth_date}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;