import React, { useEffect, useState } from 'react';
import './../admin_students/StudentSigns.css'; // Используем те же стили, что и для StudentSigns
import AdminPracticeForm from './AdminPracticeForm'; // Предполагается, что у вас есть такой компонент

const PrepodPractice = ({ prepod, onBack }) => {
  const [practices, setPractices] = useState([]);
  const [filteredPractices, setFilteredPractices] = useState([]);
  const [filters, setFilters] = useState({
    id: '',
    dayWeak: '',
    idPrepod: '',
    timeSlot: '',
    typeLesson: '',
    place: '',
    prepod: ''
  });
  const [editingPractice, setEditingPractice] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [prepods, setPrepods] = useState([]);

  // Загрузка данных о практиках и преподавателях
  useEffect(() => {
    const fetchPracticesAndPrepods = async () => {
      try {
        const practicesResponse = await fetch('http://localhost:8080/api/v1/practices/find_by_prepod_id', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prepod)
        });
        if (!practicesResponse.ok) throw new Error('Error fetching practices');
        const practicesData = await practicesResponse.json();
        setPractices(practicesData);
        setFilteredPractices(practicesData);

        const prepodsResponse = await fetch('http://localhost:8080/api/v1/prepods/find_all', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!prepodsResponse.ok) throw new Error('Error fetching prepods');
        const prepodsData = await prepodsResponse.json();
        setPrepods(prepodsData);

        console.log('Loaded practices:', practicesData);
        console.log('Loaded prepods:', prepodsData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchPracticesAndPrepods();
  }, [prepod]);

  // Применение фильтров
  useEffect(() => {
    const applyFilters = () => {
      let filtered = practices;
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          filtered = filtered.filter((practice) =>
            String(practice[key]).toLowerCase().includes(filters[key].toLowerCase())
          );
        }
      });
      filtered.sort((a, b) => new Date(b.timeSlot) - new Date(a.timeSlot));
      setFilteredPractices(filtered);
    };

    applyFilters();
  }, [filters, practices]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleEditPractice = (practice) => setEditingPractice(practice);

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditingPractice({ ...editingPractice, [field]: value });
  };

  const handleSavePractice = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/practices/update_practice', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPractice)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const updatedPractice = await response.json();
      setPractices((prev) => prev.map((practice) => (practice.id === updatedPractice.id ? updatedPractice : practice)));
      setEditingPractice(null);
    } catch (error) {
      console.error('Error updating practice:', error);
    }
  };

  const handleDeletePractice = async (id) => {
    try {
      const practiceToDelete = { id };
      const response = await fetch('http://localhost:8080/api/v1/practices/delete_practice', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(practiceToDelete)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setPractices((prev) => prev.filter((practice) => practice.id !== id));
    } catch (error) {
      console.error('Error deleting practice:', error);
    }
  };

  const handlePracticeAdded = (newPractice) => {
    setPractices((prev) => [...prev, newPractice]);
    setShowAddForm(false);
  };

  return (
    <div className="student-signs-container">
      <div className="filters-container">
        <input type="text" name="id" placeholder="ID" value={filters.id} onChange={handleFilterChange} />
        <input
          type="text"
          name="dayWeak"
          placeholder="Day Weak"
          value={filters.dayWeak}
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
          name="timeSlot"
          placeholder="Time Slot"
          value={filters.timeSlot}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="typeLesson"
          placeholder="Type Lesson"
          value={filters.typeLesson}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="place"
          placeholder="Place"
          value={filters.place}
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
            <th>Day Weak</th>
            <th>Prepod ID</th>
            <th>Time Slot</th>
            <th>Type Lesson</th>
            <th>Place</th>
            <th>Prepod</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPractices.map((practice) => (
            <tr key={practice.id}>
              {editingPractice && editingPractice.id === practice.id ? (
                <>
                  <td>{practice.id}</td>
                  <td>
                    <input
                      type="text"
                      value={editingPractice.dayWeak}
                      onChange={(e) => handleInputChange(e, 'dayWeak')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingPractice.idPrepod}
                      onChange={(e) => handleInputChange(e, 'idPrepod')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingPractice.timeSlot}
                      onChange={(e) => handleInputChange(e, 'timeSlot')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingPractice.typeLesson}
                      onChange={(e) => handleInputChange(e, 'typeLesson')}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editingPractice.place}
                      onChange={(e) => handleInputChange(e, 'place')}
                    />
                  </td>
                  <td>{prepod.fio || 'Преподаватель не указан'}</td>
                  <td className="actions">
                    <button onClick={handleSavePractice}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{practice.id}</td>
                  <td>{practice.dayWeak}</td>
                  <td>{practice.idPrepod}</td>
                  <td>{practice.timeSlot}</td>
                  <td>{practice.typeLesson}</td>
                  <td>{practice.place}</td>
                  <td>{prepod.fio || 'Преподаватель не указан'}</td>
                  <td className="actions">
                    <button onClick={() => handleEditPractice(practice)}>Edit</button>
                    <button onClick={() => handleDeletePractice(practice.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="action-buttons">
        <button className="back-button" onClick={onBack}>
          К преподавателям
        </button>
        <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Закрыть форму' : 'Добавить практику'}
        </button>
      </div>

      {showAddForm && (
        <AdminPracticeForm
          prepodId={prepod.id}
          prepods={prepods}
          onPracticeAdded={handlePracticeAdded}
        />
      )}
    </div>
  );
};

export default PrepodPractice;
