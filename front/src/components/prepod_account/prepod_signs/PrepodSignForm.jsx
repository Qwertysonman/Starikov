import React, { useState } from 'react';
import './PrepodSignForm.css'; // Импортируем стили

const PrepodSignForm = ({ userId, onSignAdded, onAddStudent }) => {
  const [formData, setFormData] = useState({
    idStudent: '',
    idPrepod: userId,
    dataSign: '',
    timeSlot: '',
    typeSign: 'Теория', // Устанавливаем значение по умолчанию
    studentName: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddStudent = async () => {
    try {
      const student = await onAddStudent(formData.studentName);
      if (student) {
        setFormData({ ...formData, idStudent: student.id });
        setError(null); // Сбрасываем ошибку, если студент найден
      } else {
        setError('Студент с указанным именем не найден. Проверьте данные.');
      }
    } catch (error) {
      setError('Ошибка при добавлении студента. Пожалуйста, попробуйте еще раз.');
    }
  };

  const handleTimeSlotChange = (e) => {
    const { value } = e.target;
    const endTime = new Date(`1970-01-01T${value}:00Z`);
    endTime.setHours(endTime.getHours() + 2);
    const formattedEndTime = endTime.toISOString().substr(11, 5);
    setFormData({ ...formData, timeSlot: `${value}-${formattedEndTime}` });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/v1/signs/new_sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idStudent: formData.idStudent,
          idPrepod: formData.idPrepod,
          dataSign: formData.dataSign,
          timeSlot: formData.timeSlot,
          typeSign: formData.typeSign
        })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const newSign = await response.json();
      onSignAdded(newSign);
    } catch (error) {
      console.error('Error adding sign:', error);
      setError('Ошибка при добавлении записи. Пожалуйста, попробуйте еще раз.');
    }
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 14); // Устанавливаем максимальную дату на 2 недели вперед

  return (
    <form className="add-student-form-container" onSubmit={handleSubmit}>
      <h3 className="add-student-form-container-h3">Добавить запись</h3>
      <div className="add-student-form-group">
        <label className="add-student-form-group-label">Имя студента:</label>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleInputChange}
          className="add-student-form-group-input"
        />
        <button type="button" onClick={handleAddStudent} className="add-student-form-submit-button">
          Добавить студента
        </button>
      </div>
      {error && <p className="add-student-form-error-message">{error}</p>}
      <div className="add-student-form-group">
        <label className="add-student-form-group-label">ID студента:</label>
        <input
          type="text"
          name="idStudent"
          value={formData.idStudent}
          onChange={handleInputChange}
          readOnly
          className="add-student-form-group-input"
        />
      </div>
      <div className="add-student-form-group">
        <label className="add-student-form-group-label">Тип записи:</label>
        <select
          name="typeSign"
          value={formData.typeSign}
          onChange={handleInputChange}
          className="add-student-form-group-input"
        >
          <option value="Теория">Теория</option>
          <option value="Практика">Практика</option>
        </select>
      </div>
      <div className="add-student-form-group">
        <label className="add-student-form-group-label">Дата записи:</label>
        <input
          type="date"
          name="dataSign"
          value={formData.dataSign}
          onChange={handleInputChange}
          min={today.toISOString().split('T')[0]}
          max={maxDate.toISOString().split('T')[0]}
          className="add-student-form-group-input"
        />
      </div>
      <div className="add-student-form-group">
        <label className="add-student-form-group-label">Временной слот (начало):</label>
        <input
          type="time"
          name="timeSlotStart"
          value={formData.timeSlot.split('-')[0]}
          onChange={handleTimeSlotChange}
          className="add-student-form-group-input"
        />
      </div>
      <button type="submit" className="add-student-form-submit-button">
        Добавить запись
      </button>
    </form>
  );
};

export default PrepodSignForm;
