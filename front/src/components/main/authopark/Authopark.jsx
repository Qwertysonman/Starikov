import './Authopark.css'
import Cards from "../cards/Cards";
import car from './../../../images/Преподы/Автомобиль.jpg';
import clas from './../../../images/Преподы/Класс.jpg';
import React, { useState } from 'react';


const Authopark = () => {
    return(
        <section className="authopark">
            <div className="container">
                <div className="authopark_header">
                    <h2 className='title-2'>Наше обучение</h2>
                </div>
                <div className="authopark_cards">
                    <Cards title = "Вождение в городе" img = {car} explore = "Новые автомобили" addinfo = "В нашей автошколе мы уделяем особое внимание вождению в городских условиях. Наши инструкторы проводят практические занятия на реальных маршрутах, помогая ученикам привыкнуть к интенсивному движению и научиться безопасно маневрировать. Ученики учатся правильно парковаться и соблюдать все правила дорожного движения. Мы готовим наших учеников к уверенному вождению в любых городских условиях."/>
                    <Cards title = "Занятия в классе" img = {clas} explore = "Комфортные современные классы" addinfo = "В нашей автошколе мы уделяем большое внимание теоретической подготовке. Мы предлагаем обширную программу теоретических занятий, охватывающую все аспекты правил дорожного движения и безопасности. Наши преподаватели используют современные методы обучения, делая процесс эффективным и интересным. Ученики получают глубокие теоретические знания, помогающие успешно сдать экзамены и стать ответственными водителями."/>
                </div>
            </div>
        </section>
    )
}
export default Authopark;