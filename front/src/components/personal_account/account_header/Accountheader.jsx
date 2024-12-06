import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../../main/header/Header.css';
import logoImg from './../../../images/Лого/Vector.png';
import Statistic from './Statistic'; // Импортируем компонент модального окна
import { UserContext } from './../../../UserContext';

const Accountheader = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        setUserData(null);
        navigate('/');
    };

    return (
        <header className="main_header">
            <div className="main_container">
                <div className="main_header_row">
                    <div className="main_header_logo">
                        <img src={logoImg} alt="Logo" />
                        <span>Лось</span>
                    </div>
                    <nav className="main_header_nav">
                        <ul>
                            <li><Link to="/" state={{ data }}>Главная</Link></li>
                            <li><a href="#!" onClick={openModal}>Статистика</a></li>
                            <li><a href="#!" className="main_header_nav-btn" onClick={handleLogout}>Выйти</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            {isModalOpen && <Statistic onClose={closeModal} userData={data} />}
        </header>
    );
};

export default Accountheader;
