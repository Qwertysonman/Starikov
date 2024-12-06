import React, { useState, useEffect } from 'react';
import './../SignForm.css';

const EditForm = ({ onEditSign, userData, availableSlots, initialData, onClose, prepods }) => {
    const [formData, setFormData] = useState({
        type: initialData.type,
        date: initialData.date,
        time_slot: initialData.time,
        place: initialData.place,
        prepod: initialData.prepod
    });

    const [localAvailableSlots, setLocalAvailableSlots] = useState(availableSlots);

    useEffect(() => {
        if (formData.type && formData.date && formData.prepod) {
            fetchAvailableSlots();
        }
    }, [formData.type, formData.date, formData.prepod]);

    const fetchAvailableSlots = () => {
        fetch("http://localhost:8080/api/v1/signs/available", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fio: formData.prepod,
                typeLesson: formData.type,
                date: formData.date
            })
        })
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                setLocalAvailableSlots(data);
            } else {
                console.error('Expected an array but received:', data);
            }
        })
        .catch(error => console.error('Error fetching available slots:', error));
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
        // Получение данных преподавателя по имени
        fetch('http://localhost:8080/api/v1/prepods/find_prepod', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: formData.prepod })
        })
        .then(response => response.json())
        .then(prepodData => {
            const updatedSign = {
                id: initialData.id,
                idStudent: userData.id,
                idPrepod: prepodData.id,
                dataSign: formData.date,
                timeSlot: formData.time_slot,
                typeSign: formData.type,
                student: userData,
                prepod: prepodData
            };

            // Сохранение обновленной записи на сервере
            fetch('http://localhost:8080/api/v1/signs/update_sign', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedSign)
            })
            .then(response => response.json())
            .then(savedSign => {
                // Преобразуем данные перед обновлением состояния
                const updatedSignData = {
                    id: savedSign.id,
                    type: savedSign.typeSign,
                    date: savedSign.dataSign,
                    time: savedSign.timeSlot,
                    place: initialData.place,
                    prepod: savedSign.prepod.fio
                };

                // Передаем обновленные данные в родительский компонент
                onEditSign(updatedSignData); 
                onClose(); // Закрываем форму после успешного редактирования
            })
            .catch(error => console.error('Error updating sign:', error));
        })
        .catch(error => console.error('Error fetching prepod data:', error));
    };

    const isFormValid = () => {
        return formData.type && formData.date && formData.time_slot && formData.place && formData.prepod;
    };

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="type">Запись:</label>
                <select name="type" id="type" value={formData.type} onChange={handleChange}>
                    <option value="">Выберите тип</option>
                    <option value="Практика">Практика</option>
                    <option value="Теория">Теория</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="date">Дата:</label>
                <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} 
                min={new Date().toISOString().split("T")[0]} 
                max={new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split("T")[0]}/>
            </div>
            <div className="form-group">
                <label htmlFor="prepod">Преподаватель:</label>
                <select name="prepod" id="prepod" value={formData.prepod} onChange={handleChange}>
                    <option value="">Выберите преподавателя</option>
                    {prepods && Array.isArray(prepods) && prepods.map((prepod, index) => (
                        <option key={index} value={prepod}>{prepod}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="place">Место:</label>
                <input type="text" name="place" id="place" value={formData.place} readOnly />
            </div>
            <div className="form-group">
                <label htmlFor="time_slot">Время:</label>
                <select name="time_slot" id="time_slot" value={formData.time_slot} onChange={handleChange}>
                    <option value="">Выберите время</option>
                    {localAvailableSlots && Array.isArray(localAvailableSlots) && localAvailableSlots.map((slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="submit-button" disabled={!isFormValid()}>Обновить запись</button>
        </form>
    );
};

export default EditForm;
