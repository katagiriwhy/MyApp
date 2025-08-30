import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const [currentReview, setCurrentReview] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const reviews = [
        {
            id: 1,
            name: "Мария, мама Светы",
            text: "Ольга Николаевна за год занятий подтянула мою дочь по математике. Сейчас Света одна из лучших в классе! Спасибо за индивидуальный подход и терпение.",
            rating: 5
        },
        {
            id: 2,
            name: "Антон, папа Миши",
            text: "Ребенок с нетерпением ждет каждое занятие. Ольга Николаевна умеет заинтересовать учебой даже такого непоседу как наш Миша. Результаты стали заметны уже через месяц.",
            rating: 5
        },
        {
            id: 3,
            name: "Оксана Викторовна",
            text: "Профессионал высшего класса! Готовились к поступлению в гимназию, успешно сдали все экзамены. Рекомендую всем родителям, кто хочет качественной подготовки для ребенка.",
            rating: 5
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentReview((prev) => (prev + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [reviews.length]);

    const services = [
        {
            title: "Подготовка к школе",
            description: "Комплексная программа для будущих первоклассников"
        },
        {
            title: "Помощь по школьной программе",
            description: "Объяснение сложных тем, помощь с домашними заданиями"
        },
        {
            title: "Устранение пробелов в знаниях",
            description: "Индивидуальный подход к каждому ученику"
        },
        {
            title: "Чистописание",
            description: "Развиваем мелкую моторику и координацию, улучшаем концентрацию внимания и дисциплину, способствуем лучшему запоминанию информации и формированию разборчивого почерка"
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <div className="homepage">
            <nav className="navbar">
                <div className="nav-container">
                    <div className="nav-logo">
                        <h2>Ольга Николаевна</h2>
                        <span>Репетитор начальных классов</span>
                    </div>
                    <div className="nav-buttons">
                        {isLoggedIn ? (
                            <>
                                <Link to="/dashboard" className="nav-btn">Личный кабинет</Link>
                                <button onClick={handleLogout} className="nav-btn">Выйти</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-btn">Войти</Link>
                                <Link to="/register" className="nav-btn">Регистрация</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <section className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>Индивидуальные занятия для младших школьников</h1>
                        <p>Профессиональный подход к обучению детей с 1 по 4 классы. Развивающие занятия, подготовка к школе, помощь с учебной программой.</p>
                        <button className="cta-button">Записаться на пробный урок</button>
                    </div>
                    <div className="hero-image">
                        <img src="/mom.jpg" alt="Ольга Николаевна - репетитор начальных классов" />
                    </div>
                </div>
            </section>

            <section className="about">
                <h2>Обо мне</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p>Я - Ольга Николаевна, педагог с 25-летним стажем работы с детьми младшего школьного возраста.
                            Закончила педагогический университет с красным дипломом, регулярно прохожу курсы повышения квалификации.</p>
                        <p>В своей работе использую современные методики обучения, игровые подходы и индивидуальный план
                            занятий для каждого ребенка. Помогаю не только усвоить школьную программу, но и полюбить процесс обучения.</p>
                        <ul>
                            <li>✅ Высшее педагогическое образование</li>
                            <li>✅ Сертификаты о дополнительном образовании</li>
                            <li>✅ Опыт работы - 25 лет</li>
                            <li>✅ Более 1000 довольных учеников</li>
                        </ul>
                    </div>
                    <div className="about-image">
                        <img src="/placeholder-about.jpg" alt="Ольга Николаевна на занятии с учеником" />
                    </div>
                </div>
            </section>

            {/* Услуги */}
            <section className="services">
                <h2>Мои услуги</h2>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Отзывы */}
            <section className="reviews">
                <h2>Отзывы родителей</h2>
                <div className="reviews-container">
                    <div className="review active">
                        <div className="stars">
                            {'★'.repeat(reviews[currentReview].rating)}
                        </div>
                        <p className="review-text">"{reviews[currentReview].text}"</p>
                        <p className="review-author">- {reviews[currentReview].name}</p>
                    </div>
                </div>
                <div className="review-dots">
                    {reviews.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentReview ? 'active' : ''}`}
                            onClick={() => setCurrentReview(index)}
                        ></span>
                    ))}
                </div>
            </section>

            {/* Контакты */}
            <section className="contact">
                <h2>Контакты</h2>
                <div className="contact-info">
                    <p>📞 Телефон: +7 (924) 260-58-68</p>
                    <p>✉️ Email: helgabest80@mail.ru</p>
                    <p>📍 Адрес: г. Новороссийск, ул. Проспект Дзержинского, д. 247</p>
                    <p>🕒 Время работы: Пн-Пт с 9:00 до 19:00</p>
                </div>
            </section>

            {/* Футер */}
            <footer className="footer">
                <p>© 2023 Ольга Николаевна. Репетитор начальных классов. Все права защищены.</p>
            </footer>
        </div>
    );
};

export default HomePage;