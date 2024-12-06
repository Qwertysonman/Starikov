import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logoImg from './../../../images/Лого/Vector.png';
import { UserContext } from './../../../UserContext';
import TariffModal from './TariffModal'; // Импортируем новый компонент

function Header({ data }) {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const [showTariffModal, setShowTariffModal] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterClick = () => {
    navigate('/login');
  };

  const handleLoginClick = () => {
    if (userData && userData.email.startsWith('Admin')) {
      navigate('/admin');
    } else {
      navigate('/person');
    }
  };

  const handleTariffClick = () => {
    setShowTariffModal(true);
  };

  const handleCloseModal = () => {
    setShowTariffModal(false);
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
              <li><a href="#!" onClick={() => scrollToSection("promo")}>Автошкола</a></li>
              <li><a href="#!" onClick={handleTariffClick}>Цены</a></li>
              <li><a href="#!" onClick={() => scrollToSection("arrivals")}>Инструктора</a></li>
              <li><a href="#!" onClick={() => scrollToSection("footer")}>Об авторе</a></li>
              <li>
                {userData ? (
                  <a href="#!" className="main_header_nav-btn" onClick={handleLoginClick}>Вход</a>
                ) : (
                  <a href="#!" className="main_header_nav-btn" onClick={handleRegisterClick}>Авторизация</a>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {showTariffModal && <TariffModal onClose={handleCloseModal} />}
    </header>
  );
}

export default Header;
