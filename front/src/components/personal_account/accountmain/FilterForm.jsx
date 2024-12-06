import React, { useState } from 'react';
import './FilterForm.css';

const FilterForm = ({ onFilter, onSort, onReset, filials, prepods }) => {
    const [filter, setFilter] = useState({
        type: '',
        date: '',
        place: '',
        prepod: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filter);
    };

    const handleReset = () => {
        setFilter({
            type: '',
            date: '',
            place: '',
            prepod: ''
        });
        onReset();
    };

    return (
        <div className="filter-sort-container">
            <h2>Мои записи</h2>
            <form className="filter-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="type">Тип:</label>
                    <select name="type" id="type" value={filter.type} onChange={handleChange}>
                        <option value="">Все</option>
                        <option value="Практика">Практика</option>
                        <option value="Теория">Теория</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Дата:</label>
                    <input type="date" name="date" id="date" value={filter.date} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="place">Место:</label>
                    <select name="place" id="place" value={filter.place} onChange={handleChange}>
                        <option value="">Все</option>
                        {filials.map((filial, index) => (
                        <option key={index} value={filial}>{filial}</option>))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="prepod">Преподаватель:</label>
                    <select name="prepod" id="prepod" value={filter.prepod} onChange={handleChange}>
                        <option value="">Все</option>
                        {prepods.map((prepod, index) => (
                        <option key={index} value={prepod}>{prepod}</option>))}
                    </select>
                </div>
                <button type="submit" className="filter-button">Фильтровать</button>
                <button type="button" className="filter-button" onClick={handleReset}>Сбросить фильтр</button>
                <button type="button" className="sort-button" onClick={onSort}>Сортировать по дате</button>
                
            </form>
        </div>
    );
};

export default FilterForm;