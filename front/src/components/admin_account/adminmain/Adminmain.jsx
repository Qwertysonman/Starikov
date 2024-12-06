import React, { useState, useEffect, useContext } from 'react';
import './Adminmain.css';
import avaImg from "./../../../images/Аватарки/Аватарка_3.jpg";
import { UserContext } from './../../../UserContext';

const Adminmain = ({ data }) => {
    const { setUserData } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data);
    const [displayData, setDisplayData] = useState(data);
    const [error, setError] = useState(null);

    useEffect(() => {
        setEditedData(data);
        setDisplayData(data);
    }, [data]);

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
        const url = 'http://localhost:8080/api/v1/admins/admin_update';
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
        .then(updatedData => {
            setDisplayData(updatedData);
            setEditedData(updatedData);
            setUserData(updatedData); // Обновляем данные в контексте
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-accountmain">
            <div className="admin-accountmain-img">
                <img src={avaImg} alt="Admin Avatar" className="admin-avatar" />
                <div className="admin-accountmain-name">
                    <h1>{displayData.FIO}</h1>
                </div>
                <div className="admin-accountmain-info">
                    <div className="admin-info">
                        <p>Email: {displayData.email}</p>
                    </div>
                </div>
                <button className="am-edit-button" onClick={openEdit}>Редактировать</button>
            </div>
            {isEditing && (
                <div className="am-edit-form">
                    <h2>Редактировать данные</h2>
                    <div className="am-input-box">
                        <label>ФИО:</label>
                        <input
                            type="text"
                            name="FIO"
                            value={editedData.FIO}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="am-input-box">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={editedData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className="am-apply-button" onClick={sendEditData}>Применить</button>
                    {error && <p className="am-error-message">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default Adminmain;
