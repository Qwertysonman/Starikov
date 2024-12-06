import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import './Statistic.css';

// Регистрация необходимых компонентов Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Statistic = ({ onClose, userData }) => {
    const [examStats, setExamStats] = useState([]);
    const [filialStats, setFilialStats] = useState({});
    const [signStats, setSignStats] = useState([]);

    useEffect(() => {
        // Запрос на получение статистики экзаменов
        fetch('http://localhost:8080/api/v1/students/stat_examens')
            .then(response => response.json())
            .then(data => setExamStats(data))
            .catch(error => console.error('Error fetching exam stats:', error));

        // Запрос на получение статистики филиалов
        fetch('http://localhost:8080/api/v1/students/stat_filials')
            .then(response => response.json())
            .then(data => setFilialStats(data))
            .catch(error => console.error('Error fetching filial stats:', error));

        // Запрос на получение статистики посещений
        fetch('http://localhost:8080/api/v1/signs/stat_count_sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => setSignStats(data))
            .catch(error => console.error('Error fetching sign stats:', error));
    }, [userData]);

    const theoryData = examStats.filter(stat => stat.typeExamen === 'Теория');
    const practiceData = examStats.filter(stat => stat.typeExamen === 'Практика');

    const theoryChartData = {
        labels: theoryData.map(stat => stat.attemptNumber === 0 ? 'В процессе сдачи' : `Попытка ${stat.attemptNumber}`),
        datasets: [
            {
                label: 'Количество студентов',
                data: theoryData.map(stat => stat.studentsCount),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }
        ]
    };

    const practiceChartData = {
        labels: practiceData.map(stat => stat.attemptNumber === 0 ? 'В процессе сдачи' : `Попытка ${stat.attemptNumber}`),
        datasets: [
            {
                label: 'Количество студентов',
                data: practiceData.map(stat => stat.studentsCount),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }
        ]
    };

    const filialChartData = {
        labels: Object.keys(filialStats),
        datasets: [
            {
                label: 'Количество студентов',
                data: Object.values(filialStats),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CB31', '#FF6347', '#779ECB', '#00CED1', '#FF69B4'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CB31', '#FF6347', '#779ECB', '#00CED1', '#FF69B4']
            }
        ]
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h3>Статистика сдачи экзаменов</h3>
                <div className="modal-layout">
                    <div className="left-section">
                        <div className="chart-container">
                            <div className="chart-section">
                                <h3>Теория</h3>
                                <Pie data={theoryChartData} />
                            </div>
                            <div className="chart-section">
                                <h3>Практика</h3>
                                <Pie data={practiceChartData} />
                            </div>
                        </div>
                        <div className="chart-section-center">
                            <h3>Распределение студентов по филиалам</h3>
                            <Bar data={filialChartData} />
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="table-section">
                            <h3>Посещения</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Тип занятий</th>
                                        <th>Количество посещений</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Практические занятия</td>
                                        <td>{signStats[0]}</td>
                                    </tr>
                                    <tr>
                                        <td>Теоретические занятия</td>
                                        <td>{signStats[1]}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <button className="close-button-bottom" onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default Statistic;
