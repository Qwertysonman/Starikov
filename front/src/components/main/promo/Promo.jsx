import React, { useState } from 'react';
import './Promo.css'
import promoImg from './../../../images/Преподы/Лось.png'
import MapModal from './MapModel';

const Promo = () => {

    const [isModalOpen, setIsModelOpen] = useState(false);

    const openModal = () => {
        setIsModelOpen(true);
    }

    const closeModal = () => {
        setIsModelOpen(false);
    }

    return (
        <section className="promo">
            <div className="container">
                <div className="promo_content">
                    <div className="promo_text">
                        <div className='promo_title'>
                            <span className='highlight'>
                                <span>НЕ ВОДИ</span>
                            </span>
                            КАК&nbsp;
                            <span className='highlightred'>
                                <span> ОЛЕНЬ</span>
                            </span>
                        </div>
                        <div className="promo_desc">Води как лось, с автошколой на Рязанском шоссе. Лоси умные и аккуратные. Стань одним из нас.</div>
                        <div className="promo_btn-wrapper">
                            <a href="#!" className='promo_btn' onClick = {openModal}>Подробнее</a>
                        </div>
                    </div>
                    <div className="promo_img">
                        <img src={promoImg} alt="Promo" />
                    </div>
                </div>
            </div>
            {isModalOpen && <MapModal onClose={closeModal} />}
        </section>
    )
}

export default Promo;
