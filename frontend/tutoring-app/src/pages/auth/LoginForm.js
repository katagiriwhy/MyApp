import React, { useState } from 'react';
import {useAuthAPI} from "../../api/auth";
import './AuthPage.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuthAPI();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            alert("Вход успешен!");
            //localStorage.setItem('token', response.token);
        } catch (err) {
            setError('Неверный email или пароль' + err);
        }
    };

    return (

        <div className="auth-container">
            <div className="auth-form">
                <h1>Войти</h1>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Войти</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;