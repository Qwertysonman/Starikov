import React, { useEffect, useState } from 'react';
import './../admin_students/Students.css'; // Используем те же стили, что и для Students
import PrepodPractice from './PrepodPractice'; // Импортируем новый компонент

const Prepods = () => {
  const [prepods, setPrepods] = useState([]);
  const [filteredPrepods, setFilteredPrepods] = useState([]);
  const [filters, setFilters] = useState({
    id: '',
    fio: '',
    mobile: '',
    email: '',
    transmission: ''
  });
  const [editingPrepod, setEditingPrepod] = useState(null);
  const [showingPrepodPractice, setShowingPrepodsPractice] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPrepod, setNewPrepod] = useState({
    fio: '',
    mobile: '',
    email: '',
    transmission: ''
  });

  useEffect(() => {
    const fetchPrepods = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/prepods/find_all_prepod');
        const data = await response.json();
        console.log('Fetched prepods:', data); // Добавим этот лог
        setPrepods(data);
        setFilteredPrepods(data);
      } catch (error) {
        console.error('Error fetching prepods:', error);
      }
    };

    fetchPrepods();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = prepods;
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          filtered = filtered.filter((prepod) =>
            String(prepod[key]).toLowerCase().includes(filters[key].toLowerCase())
          );
        }
      });
      setFilteredPrepods(filtered);
    };

    applyFilters();
  }, [filters, prepods]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleAddPrepodChange = (e) => {
    const { name, value } = e.target;
    setNewPrepod({ ...newPrepod, [name]: value });
  };

  const handleAddPrepodSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/prepods/new_prepod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPrepod)
      });
      const addedPrepod = await response.json();
      setPrepods([...prepods, addedPrepod]);
      setFilteredPrepods([...filteredPrepods, addedPrepod]);
      setShowAddForm(false);
      setNewPrepod({
        fio: '',
        mobile: '',
        email: '',
        transmission: ''
      });
    } catch (error) {
      console.error('Error adding new prepod:', error);
    }
  };

  const handleEditPrepod = (prepod) => {
    setEditingPrepod(prepod);
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditingPrepod({ ...editingPrepod, [field]: value });
  };

  const handleShowPractice = (prepod) => {
    setShowingPrepodsPractice(prepod);
  }

  const handleBackToStudents = () => {
    setShowingPrepodsPractice(null);
  }

  const handleSavePrepod = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/prepods/update_prepod', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPrepod)
      });
      const updatedPrepod = await response.json();
      setPrepods(
        prepods.map((prepod) =>
          prepod.id === updatedPrepod.id ? updatedPrepod : prepod
        )
      );
      setFilteredPrepods(
        filteredPrepods.map((prepod) =>
          prepod.id === updatedPrepod.id ? updatedPrepod : prepod
        )
      );
      setEditingPrepod(null);
    } catch (error) {
      console.error('Error updating prepod:', error);
    }
  };

  const handleDeletePrepod = async (id) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/prepods/delete_prepod', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setPrepods(prepods.filter((prepod) => prepod.id !== id));
      setFilteredPrepods(filteredPrepods.filter((prepod) => prepod.id !== id));
    } catch (error) {
      console.error('Error deleting prepod:', error);
    }
  };

  return (
    <div className="student-table-container">
      {!showingPrepodPractice ? (
        <>
          <div className="student-filters-container">
            <input
              type="text"
              name="id"
              placeholder="ID"
              value={filters.id}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="fio"
              placeholder="FIO"
              value={filters.fio}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={filters.mobile}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={filters.email}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="transmission"
              placeholder="Transmission"
              value={filters.transmission}
              onChange={handleFilterChange}
            />
          </div>
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>FIO</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Transmission</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrepods.map((prepod) => (
                <React.Fragment key={prepod.id}>
                  {editingPrepod && editingPrepod.id === prepod.id ? (
                    <tr>
                      <td>{prepod.id}</td>
                      <td>
                        <input
                          type="text"
                          value={editingPrepod.fio}
                          onChange={(e) => handleInputChange(e, 'fio')}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingPrepod.mobile}
                          onChange={(e) => handleInputChange(e, 'mobile')}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingPrepod.email}
                          onChange={(e) => handleInputChange(e, 'email')}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingPrepod.transmission}
                          onChange={(e) => handleInputChange(e, 'transmission')}
                        />
                      </td>
                      <td>
                        <button onClick={handleSavePrepod}>Save</button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td>{prepod.id}</td>
                      <td>{prepod.fio}</td>
                      <td>{prepod.mobile}</td>
                      <td>{prepod.email}</td>
                      <td>{prepod.transmission}</td>
                      <td className="actions">
                        <button onClick={() => handleEditPrepod(prepod)}>Edit</button>
                        <button onClick={() => handleDeletePrepod(prepod.id)}>Delete</button>
                        <button onClick={() => handleShowPractice(prepod)}>Show</button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <button className="student-add-button" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Отмена' : 'Добавить преподавателя'}
          </button>
          {showAddForm && (
            <div className="student-add-form-container">
              <h3 className="student-add-form-container-h3">Регистрация преподавателя</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleAddPrepodSubmit(); }}>
                <div className="student-add-form-group">
                  <label className="student-add-form-group-label">ФИО</label>
                  <input
                    type="text"
                    name="fio"
                    placeholder="Full Name"
                    value={newPrepod.fio}
                    onChange={handleAddPrepodChange}
                    className="student-add-form-group-input"
                  />
                </div>
                <div className="student-add-form-group">
                  <label className="student-add-form-group-label">Почта</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newPrepod.email}
                    onChange={handleAddPrepodChange}
                    className="student-add-form-group-input"
                  />
                </div>
                <div className="student-add-form-group">
                  <label className="student-add-form-group-label">Номер телефона</label>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Phone Number"
                    value={newPrepod.mobile}
                    onChange={handleAddPrepodChange}
                    className="student-add-form-group-input"
                  />
                </div>
                <div className="student-add-form-group">
                  <label className="student-add-form-group-label">Трансмиссия</label>
                  <input
                    type="text"
                    name="transmission"
                    placeholder="Transmission"
                    value={newPrepod.transmission}
                    onChange={handleAddPrepodChange}
                    className="student-add-form-group-input"
                  />
                </div>
                <button type="submit" className="student-add-form-submit-button">Создать</button>
              </form>
            </div>
          )}
        </>
      ) : (
        <PrepodPractice prepod={showingPrepodPractice} onBack={handleBackToStudents} />
      )}
    </div>
  );
};

export default Prepods;
