import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>

                {isLogin ? (
                    <LoginForm />
                ) : (
                    <RegisterForm />
                )}

                <button
                    className="toggle-button"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;