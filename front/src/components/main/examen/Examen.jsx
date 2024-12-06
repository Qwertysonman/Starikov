import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Examen.css';
import examenImg from './../../../images/Преподы/Экзамен_1.jpg';

const Examen = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/login');
    };

    return (
        <section className="examen">
            <div className="container">
                <div className="examen_content">
                    <div className="examen_img">
                        <img src={examenImg} alt="Examen" />
                    </div>
                    <div className="examen_text">
                        <div className='examen_title'>
                            <span className='highlight'>
                                <span>ГАРАНТИЯ</span>
                            </span>
                            СДАЧИ НА ЭКЗАМЕНЕ
                        </div>
                        <div className="examen_desc">90% наших учеников сдают с 1 раза теорию  80% сдают с 1 раза практику</div>
                        <div className="examen_btn-wrapper">
                            <button className='examen_btn' onClick={handleRegisterClick}>Хочу права</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Examen;
