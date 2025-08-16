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
        setPassword(value);
        setError(validatePassword(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const passwordError = validatePassword(password);
        //
        // if (passwordError) {
        //     setError(passwordError);
        //     return;
        // }

        try {
            await register({ firstName, lastName, email, password, birthDate });
            alert('Регистрация успешна!');
        } catch (err) {
            setError('Ошибка регистрации: ' + err);
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
                onChange={handlePasswordChange}
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