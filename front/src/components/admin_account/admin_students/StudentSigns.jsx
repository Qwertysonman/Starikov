import React, { useEffect, useState } from 'react';
import './StudentSigns.css';
import AdminSignForm from './AdminSignForm';

const StudentSigns = ({ student, onBack }) => {
  const [signs, setSigns] = useState([]);
  const [filteredSigns, setFilteredSigns] = useState([]);
  const [filters, setFilters] = useState({
    id: '',
    idStudent: '',
    idPrepod: '',
    dataSign: '',
    timeSlot: '',
    typeSign: '',
    prepod: ''
  });
  const [editingSign, setEditingSign] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [prepods, setPrepods] = useState([]);

  // Загрузка данных о записях и преподавателях
  useEffect(() => {
    const fetchSignsAndPrepods = async () => {
      try {
        const signsResponse = await fetch('http://localhost:8080/api/v1/signs/find_all_history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(student)
        });
        if (!signsResponse.ok) throw new Error('Error fetching signs');
        const signsData = await signsResponse.json();
        setSigns(signsData);
        setFilteredSigns(signsData);

        const prepodsResponse = await fetch('http://localhost:8080/api/v1/prepods/find_all');
        if (!prepodsResponse.ok) throw new Error('Error fetching prepods');
        const prepodsData = await prepodsResponse.json();
        setPrepods(prepodsData.map((fio, index) => ({ id: index + 1, fio })));

        console.log('Loaded signs:', signsData);
        console.log('Loaded prepods:', prepodsData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchSignsAndPrepods();
  }, [student]);

  // Применение фильтров
  useEffect(() => {
    const applyFilters = () => {
      let filtered = signs;
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          filtered = filtered.filter((sign) =>
            String(sign[key]).toLowerCase().includes(filters[key].toLowerCase())
          );
        }
      });
      filtered.sort((a, b) => new Date(b.dataSign) - new Date(a.dataSign));
      setFilteredSigns(filtered);
    };

    applyFilters();
  }, [filters, signs]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleEditSign = (sign) => setEditingSign(sign);

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditingSign({ ...editingSign, [field]: value });
  };

  const handleSaveSign = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/signs/update_sign', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSign)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const updatedSign = await response.json();
      setSigns((prev) => prev.map((sign) => (sign.id === updatedSign.id ? updatedSign : sign)));
      setEditingSign(null);
    } catch (error) {
      console.error('Error updating sign:', error);
    }
  };

  const handleDeleteSign = async (id) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/signs/delete_sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setSigns((prev) => prev.filter((sign) => sign.id !== id));
    } catch (error) {
      console.error('Error deleting sign:', error);
    }
  };

  const handleSignAdded = (newSign) => {
    setSigns((prev) => [...prev, newSign]);
    setShowAddForm(false);
  };

  return (
    <div className="student-signs-container">
      <div className="filters-container">
        <input type="text" name="id" placeholder="ID" value={filters.id} onChange={handleFilterChange} />
        <input
          type="text"
          name="idStudent"
          placeholder="Student ID"
          value={filters.idStudent}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="idPrepod"
          placeholder="Prepod ID"
          value={filters.idPrepod}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="dataSign"
          placeholder="Data Sign"
          value={filters.dataSign}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="timeSlot"
          placeholder="Time Slot"
          value={filters.timeSlot}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="typeSign"
          placeholder="Type Sign"
          value={filters.typeSign}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="prepod"
          placeholder="Prepod"
          value={filters.prepod}
          onChange={handleFilterChange}
        />
      </div>
      <table className="student-signs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Prepod ID</th>
            <th>Data Sign</th>
            <th>Time Slot</th>
            <th>Type Sign</th>
            <th>Prepod</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSigns.map((sign) => (
            <tr key={sign.id}>
              {editingSign && editingSign.id === sign.id ? (
                <>
                  <td>{sign.id}</td>
                  <td>{sign.idStudent}</td>
                  <td>
                    <input
                      type="text"
                      value={editingSign.idPrepod}
                      onChange={(e) => handleInputChange(e, 'idPrepod')}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editingSign.dataSign}
                      onChange={(e) => handleInputChange(e, 'dataSign')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingSign.timeSlot}
                      onChange={(e) => handleInputChange(e, 'timeSlot')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingSign.typeSign}
                      onChange={(e) => handleInputChange(e, 'typeSign')}
                    />
                  </td>
                  <td>{sign.prepod?.fio || 'Преподаватель не указан'}</td>
                  <td className="actions">
                    <button onClick={handleSaveSign}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{sign.id}</td>
                  <td>{sign.idStudent}</td>
                  <td>{sign.idPrepod}</td>
                  <td>{sign.dataSign}</td>
                  <td>{sign.timeSlot}</td>
                  <td>{sign.typeSign}</td>
                  <td>{sign.prepod?.fio || 'Преподаватель не указан'}</td>
                  <td className="actions">
                    <button onClick={() => handleEditSign(sign)}>Edit</button>
                    <button onClick={() => handleDeleteSign(sign.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="action-buttons">
        <button className="back-button" onClick={onBack}>
          К студентам
        </button>
        <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Закрыть форму' : 'Добавить запись'}
        </button>
      </div>

      {showAddForm && (
        <AdminSignForm
          userId={student.id}
          prepods={prepods}
          onSignAdded={handleSignAdded}
        />
      )}
    </div>
  );
};

export default StudentSigns;
