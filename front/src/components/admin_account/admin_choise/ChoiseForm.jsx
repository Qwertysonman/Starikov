import React, { useState } from 'react';
import rightImg from "./../../../images/Админка/инструктор.jpg";
import leftImg from "./../../../images/Админка/Ученик.jpg";
import './ChoiseForm.css';
import Students from './../admin_students/Students';
import Prepods from './../admin_prepods/Prepods'; // Импортируем компонент Prepods

const ChoiseForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageId) => {
    setSelectedImage(imageId);
  };

  return (
    <div className="choice-form">
      <div className="choise-image-container">
        <div
          className={`choice-image-wrapper ${selectedImage === 'left' ? 'selected' : ''}`}
          onClick={() => handleImageClick('left')}
        >
          <img
            src={leftImg}
            alt="Left Image"
            className="choice-image"
          />
          <div className="choice-image-overlay">Ученики</div>
        </div>
        <div
          className={`choice-image-wrapper ${selectedImage === 'right' ? 'selected' : ''}`}
          onClick={() => handleImageClick('right')}
        >
          <img
            src={rightImg}
            alt="Right Image"
            className="choice-image"
          />
          <div className="choice-image-overlay">Преподаватели</div>
        </div>
      </div>
      {selectedImage === 'left' && <Students />}
      {selectedImage === 'right' && <Prepods />} {/* Рендерим компонент Prepods при выборе правой картинки */}
    </div>
  );
};

export default ChoiseForm;
