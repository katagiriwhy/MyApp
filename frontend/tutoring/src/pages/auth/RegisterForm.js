import React, { useState } from 'react';
import { register } from '../../api/auth';
import './AuthPage.css';

const RegisterForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ firstName, lastName, email, password, birthDate });
            alert('Регистрация успешна! Теперь войдите.');
        } catch (err) {
            setError('Ошибка регистрации');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Фамилия"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
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
            <input
                type="date"
                placeholder="Дата рождения"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
            />
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
};

export default RegisterForm;