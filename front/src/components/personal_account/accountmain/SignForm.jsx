import React, { useEffect, useState } from 'react';
import './SignForm.css';

const SignForm = ({ availableSlots, userData, prepods, setSigns }) => {
    const [formData, setFormData] = useState({
        type: '',
        date: '',
        time_slot: '',
        place: userData?.filial?.address || '',
        prepod: ''
    });

    const [localAvailableSlots, setLocalAvailableSlots] = useState(availableSlots);

    useEffect(() => {
        if (formData.type && formData.date && formData.prepod){
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
                console.log(data);
            } else {
                console.error('Expected an array but received:', data);
            }
        })
        .catch(error => console.error('Error fetching available slots:', error));
    }

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
            console.log('Fetched prepod data:', prepodData); // Лог данных преподавателя
            const newSign = {
                idStudent: userData.id,
                idPrepod: prepodData.id,
                dataSign: formData.date,
                timeSlot: formData.time_slot,
                typeSign: formData.type,
                student: userData,
                prepod: prepodData
            };
            // Сохранение новой записи на сервере
            fetch('http://localhost:8080/api/v1/signs/new_sign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSign)
            })
            .then(response => response.json())
            .then(savedSign => {
                 // Лог сохраненной записи

                // Обновление состояния signs
                const newSignData = {
                    id: savedSign.id,
                    type: savedSign.typeSign,
                    date: savedSign.dataSign,
                    time: savedSign.timeSlot,
                    place: userData.filial.name,
                    prepod: savedSign.prepod.fio
                };
                setSigns(prevSigns => [...prevSigns, newSignData]);

                setFormData({
                    type: '',
                    date: '',
                    time_slot: '',
                    place: userData.filial.name,
                    prepod: ''
                });
            })
            .catch(error => console.error('Error saving sign:', error));
        })
        .catch(error => console.error('Error fetching prepod data:', error));
    };

    const isFormValid = () => {
        return formData.type && formData.date && formData.time_slot && formData.place && formData.prepod;
    };

    return (
        <form className="sign-form" onSubmit={handleSubmit}>
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
                    {prepods.map((prepodi, index) => (
                    <option key={index} value={prepodi}>{prepodi}</option>))}
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
                    {localAvailableSlots.map((slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="submit-button" disabled={!isFormValid()}>Добавить запись</button>
        </form>
    );
};

export default SignForm;
