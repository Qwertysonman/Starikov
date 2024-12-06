import React from 'react';
import './Footer.css';
import authorImage from './../../../images/Преподы/Лось.png'; // Замените на путь к вашей картинке

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <img src={authorImage} alt="Автор" className="footer-image" />
          <div className="footer-text">
            <p>Создано с любовью и вдохновением</p>
            <p>Автор: Стариков Егор Андреевич</p>
            <p>© 2024 Все права защищены</p>
          </div>
        </div>
        <div className="footer-section">
          <h3>Об университете</h3>
          <p>Университет: Финансовый университет при правительстве РФ</p>
          <p>Факультет: Информационных Технологий и Анализа Больших Данных</p>
          <p>Специальность: Прикладная Информатика</p>
        </div>
        <div className="footer-section">
          <h3>О деталях</h3>
          <p>Группа: ПИ22-2</p>
          <p>Руководитель: Горшков Кирилл Андреевич</p>
          <p>Курсовая работа</p>
          <p>Информационная система для автошколы</p>
        </div>
        <div className="footer-section">
          <h3>Контакты</h3>
          <p>Email: 222715@edu.fa.ru</p>
          <p>Телефон: +7 (977) 390-34-00</p>
          <p>Адрес: Москва, пер. Вишняковски, д. 4</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
