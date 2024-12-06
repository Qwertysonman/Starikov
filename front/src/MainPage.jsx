import React from 'react';
import Header from "./components/main/header/Header";
import Promo from "./components/main/promo/Promo";
import Brands from "./components/main/brands/Brands";
import Arrivals from "./components/main/arrivals/Arrivals";
import Examen from "./components/main/examen/Examen";
import Authopark from "./components/main/authopark/Authopark";
import Advert from "./components/main/advert/Advert";
import Footer from "./components/main/footer/Footer";
import { useLocation } from 'react-router-dom';

const MainPage = () => {
    const location = useLocation();
    const { data } = location.state || {};

    return (
        <div className="main-page-container">
            <Header data={data} />
            <div id="promo"><Promo/></div>
            <Brands />
            <div id="arrivals"><Arrivals /></div>
            <Examen />
            <Authopark />
            <Advert />
            <div id="footer"><Footer /></div>
        </div>
    );
};

export default MainPage;
