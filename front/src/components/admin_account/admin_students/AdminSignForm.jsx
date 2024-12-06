import React, { useState, useEffect } from 'react';
import './AdminSignForm.css';

const AdminSignForm = ({ userId, prepods, onSignAdded }) => {
  const [formData, setFormData] = useState({
    type: '',
    date: '',
    timeSlot: '',
    prepod: ''
  });

  const [availableSlots, setAvailableSlots] = useState([]);

  // Загружаем доступные временные слоты при изменении типа, даты или преподавателя
  useEffect(() => {
    if (formData.type && formData.date && formData.prepod) {
      fetchAvailableSlots();
    }
  }, [formData.type, formData.date, formData.prepod]);

  const fetchAvailableSlots = () => {
    fetch('http://localhost:8080/api/v1/signs/available', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fio: formData.prepod,
        typeLesson: formData.type,
        date: formData.date
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAvailableSlots(data);
        } else {
          console.error('Error: Available slots response is not an array');
        }
      })
      .catch((error) => console.error('Error fetching available slots:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedPrepod = prepods.find((prep) => prep.fio === formData.prepod);

    if (!selectedPrepod) {
      console.error('Selected prepod not found in the list');
      return;
    }

    const newSign = {
      idStudent: userId,
      idPrepod: selectedPrepod.id,
      dataSign: formData.date,
      timeSlot: formData.timeSlot,
      typeSign: formData.type
    };

    console.log('New sign data:', newSign);

    fetch('http://localhost:8080/api/v1/signs/new_sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSign)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then((savedSign) => {
        console.log('Sign successfully added:', savedSign);
        savedSign.prepod = selectedPrepod;
        onSignAdded(savedSign);
        setFormData({
          type: '',
          date: '',
          timeSlot: '',
          prepod: ''
        });
      })
      .catch((error) => console.error('Error saving sign:', error));
  };

  const isFormValid = () => {
    return formData.type && formData.date && formData.timeSlot && formData.prepod;
  };

  console.log('Prepods in AdminSignForm:', prepods);

  return (
    <form className="admin-sign-form" onSubmit={handleSubmit}>
      <h3>Добавить новую запись</h3>

      <div className="form-group">
        <label htmlFor="type">Тип:</label>
        <select name="type" id="type" value={formData.type} onChange={handleChange}>
          <option value="">Выберите тип</option>
          <option value="Практика">Практика</option>
          <option value="Теория">Теория</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Дата:</label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]} // Ограничение на выбор даты начиная с сегодняшнего дня
        />
      </div>

      <div className="form-group">
        <label htmlFor="prepod">Преподаватель:</label>
        <select name="prepod" id="prepod" value={formData.prepod} onChange={handleChange}>
          <option value="">Выберите преподавателя</option>
          {prepods.map((prep) => (
            <option key={prep.id} value={prep.fio}>
              {prep.fio}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="timeSlot">Время:</label>
        <select name="timeSlot" id="timeSlot" value={formData.
timeSlot} onChange={handleChange}>
          <option value="">Выберите время</option>
          {availableSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-button" disabled={!isFormValid()}>
        Добавить запись
      </button>
    </form>
  );
};

export default AdminSignForm;