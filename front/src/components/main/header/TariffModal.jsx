import React, { useEffect, useState } from 'react';
import './TariffModal.css'; // Используем стили для модального окна

const TariffModal = ({ onClose }) => {
  const [tariffs, setTariffs] = useState([]);

  useEffect(() => {
    const fetchTariffs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/tarifs/find_all_tarifs', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Error fetching tariffs');
        const data = await response.json();
        setTariffs(data);
      } catch (error) {
        console.error('Error loading tariffs:', error);
      }
    };

    fetchTariffs();
  }, []);

  return (
    <div className="tariff-modal-overlay">
      <div className="tariff-modal-container">
        <button className="tariff-modal-close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Тарифы</h2>
        <table className="tariff-modal-table">
          <thead>
            <tr>
              <th>Название тарифа</th>
              <th>Количество занятий</th>
              <th>Стоимость</th>
            </tr>
          </thead>
          <tbody>
            {tariffs.map((tariff) => (
              <tr key={tariff.id}>
                <td>{tariff.name}</td>
                <td>{tariff.amount}</td>
                <td>{tariff.summ}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TariffModal;
