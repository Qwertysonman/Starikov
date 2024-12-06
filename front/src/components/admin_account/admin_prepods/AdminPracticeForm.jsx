import React, { useState, useEffect } from 'react';
import './../admin_students/AdminSignForm'; // Используем те же стили, что и для AdminSignForm

const AdminPracticeForm = ({ prepodId, prepods, onPracticeAdded }) => {
  const [formData, setFormData] = useState({
    type: '',
    dayWeak: '',
    timeSlot: '',
    place: '',
    startTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const endTime = calculateEndTime(formData.startTime, formData.type);
    const newPractice = {
      idPrepod: prepodId,
      dayWeak: formData.dayWeak,
      timeSlot: `${formData.startTime}-${endTime}`,
      typeLesson: formData.type,
      place: formData.place
    };

    console.log('New practice data:', newPractice);

    fetch('http://localhost:8080/api/v1/practices/new_practice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPractice)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then((savedPractice) => {
        console.log('Practice successfully added:', savedPractice);
        savedPractice.prepod = prepods.find((prep) => prep.id === prepodId);
        onPracticeAdded(savedPractice);
        setFormData({
          type: '',
          dayWeak: '',
          timeSlot: '',
          place: '',
          startTime: ''
        });
      })
      .catch((error) => console.error('Error saving practice:', error));
  };

  const isFormValid = () => {
    return formData.type && formData.dayWeak && formData.startTime && formData.place;
  };

  const calculateEndTime = (startTime, type) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    let duration = 0;
    if (type === 'Практика' || type === 'Экзамен_практика') {
      duration = 2 * 60 * 60 * 1000; // 2 часа
    } else if (type === 'Теория' || type === 'Экзамен_теория') {
      duration = 30 * 60 * 1000; // 30 минут
    }
    const end = new Date(start.getTime() + duration);
    return end.toTimeString().slice(0, 5);
  };

  console.log('Prepods in AdminPracticeForm:', prepods);

  return (
    <form className="add-student-form-container" onSubmit={handleSubmit}>
      <h3 className="add-student-form-container-h3">Добавить новую практику</h3>

      <div className="add-student-form-group">
        <label className="add-student-form-group-label" htmlFor="type">Тип:</label>
        <select name="type" id="type" value={formData.type} onChange={handleChange} className="add-student-form-group-select">
          <option value="">Выберите тип</option>
          <option value="Практика">Практика</option>
          <option value="Теория">Теория</option>
          <option value="Экзамен_практика">Экзамен_практика</option>
          <option value="Экзамен_теория">Экзамен_теория</option>
        </select>
      </div>

      <div className="add-student-form-group">
        <label className="add-student-form-group-label" htmlFor="dayWeak">День недели:</label>
        <select name="dayWeak" id="dayWeak" value={formData.dayWeak} onChange={handleChange} className="add-student-form-group-select">
          <option value="">Выберите день недели</option>
          <option value="1">Понедельник</option>
          <option value="2">Вторник</option>
          <option value="3">Среда</option>
          <option value="4">Четверг</option>
          <option value="5">Пятница</option>
          <option value="6">Суббота</option>
          <option value="7">Воскресенье</option>
        </select>
      </div>

      <div className="add-student-form-group">
        <label className="add-student-form-group-label" htmlFor="place">Место:</label>
        <input
          type="number"
          name="place"
          id="place"
          value={formData.place}
          onChange={handleChange}
          className="add-student-form-group-input"
        />
      </div>

      <div className="add-student-form-group">
        <label className="add-student-form-group-label" htmlFor="startTime">Время начала:</label>
        <input
          type="time"
          name="startTime"
          id="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="add-student-form-group-input"
        />
      </div>

      <button type="submit" className="add-student-form-submit-button" disabled={!isFormValid()}>
        Добавить практику
      </button>
    </form>
  );
};

export default AdminPracticeForm;
