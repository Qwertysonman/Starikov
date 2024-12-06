import React, { useState, useEffect, useContext } from 'react';
import './../../personal_account/accountmain/Accountmain.css'; // Используем те же стили
import avaImg from "./../../../images/Аватарки/Аватарка_5.jpg";
import { UserContext } from './../../../UserContext';

const Prepodmain = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(userData);
    const [error, setError] = useState(null);

    useEffect(() => {
        setEditedData(userData);
    }, [userData]);

    const openEdit = () => {
        setIsEditing(true);
    };

    const closeEdit = () => {
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({
            ...editedData,
            [name]: value
        });
    };

    const sendEditData = () => {
        const url = 'http://localhost:8080/api/v1/prepods/update_prepod';
        closeEdit();

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedData)
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    setError('Неверные почта или пароль. Повторите еще раз.');
                } else {
                    setError('Ошибка обновления. Повторите еще раз.');
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUserData(data);
            setEditedData(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <section className="am-accountmain">
            <div className="am-container">
                <div className="am-accountmain-img">
                    <img src={avaImg} alt="Avatar" className="am-avatar" />
                    <button className="am-edit-button" onClick={openEdit}>Редактировать</button>
                </div>
                <div className="am-accountmain-text">
                    <div className="am-accountmain-name">
                        <h1>{editedData?.fio}</h1>
                    </div>
                    <div className="am-accountmain-info">
                        <span className="am-info">
                            Номер телефона: {editedData?.mobile}<br />
                            Почта: {editedData?.email}<br />
                            Трансмиссия: {editedData?.transmission}<br />
                        </span>
                    </div>
                </div>
            </div>
            {isEditing && (
                <div className="am-edit-form">
                    <h2>Редактировать данные</h2>
                    <div className="am-input-box">
                        <label>ФИО:</label>
                        <input
                            type="text"
                            name="fio"
                            value={editedData.fio}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="am-input-box">
                        <label>Номер телефона:</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={editedData.mobile}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="am-input-box">
                        <label>Почта:</label>
                        <input
                            type="email"
                            name="email"
                            value={editedData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="am-input-box">
                        <label>Трансмиссия:</label>
                        <input
                            type="text"
                            name="transmission"
                            value={editedData.transmission}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="am-apply-button" onClick={sendEditData}>Применить</button>
                    {error && <p className="am-error-message">{error}</p>}
                </div>
            )}
        </section>
    );
}

export default Prepodmain;
