import React, { useEffect, useState } from 'react';
import './Students.css';
import StudentSigns from './StudentSigns';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({
    id: '',
    FIO: '',
    mobile: '',
    email: '',
    dateBorn: '',
    stateTeory: '',
    statePractic: '',
    tarif: '',
    balans: '',
    filial: ''
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [showingStudentSigns, setShowingStudentSigns] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(false);
  const [newStudent, setNewStudent] = useState({
    FIO: '',
    email: '',
    studPassword: '',
    dateBorn: '',
    mobile: '',
    tarif: '',
    filial: ''
  });
  const [filials, setFilials] = useState([]);
  const [tarifs, setTarifs] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/students/get_all');
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    const fetchFilials = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/filials/find_all');
        const data = await response.json();
        setFilials(data);
      } catch (error) {
        console.error('Error fetching filials:', error);
      }
    };

    const fetchTarifs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/tarifs/find_all');
        const data = await response.json();
        setTarifs(data);
      } catch (error) {
        console.error('Error fetching tarifs:', error);
      }
    };

    fetchStudents();
    fetchFilials();
    fetchTarifs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = students;
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          filtered = filtered.filter((student) =>
            String(student[key]).toLowerCase().includes(filters[key].toLowerCase())
          );
        }
      });
      setFilteredStudents(filtered);
    };

    applyFilters();
  }, [filters, students]);

  const handleAddStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAddStudentSubmit = async () => {
    try {
      const { filial, ...rest } = newStudent;
      const response = await fetch('http://localhost:8080/api/v1/students/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student: rest, filial_name: filial })
      });
      const addedStudent = await response.json();
      setStudents([...students, addedStudent]);
      setFilteredStudents([...filteredStudents, addedStudent]);
      setShowAddForm(false);
      setNewStudent({
        FIO: '',
        email: '',
        studPassword: '',
        dateBorn: '',
        mobile: '',
        tarif: '',
        filial: ''
      });
    } catch (error) {
      console.error('Error adding new student:', error);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditingStudent({ ...editingStudent, [field]: value });
  };

  const handleSaveStudent = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/students/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingStudent)
      });
      const updatedStudent = await response.json();
      setStudents(
        students.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );
      setFilteredStudents(
        filteredStudents.map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student
        )
      );
      setEditingStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleShowStudentSigns = (student) => {
    setShowingStudentSigns(student);
  };

  const handleBackToStudents = () => {
    setShowingStudentSigns(null);
  };

  return (
    <div className="student-table-container">
      {!showingStudentSigns ? (
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
              name="FIO"
              placeholder="FIO"
              value={filters.FIO}
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
              name="dateBorn"
              placeholder="Date Born"
              value={filters.dateBorn}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="stateTeory"
              placeholder="State Teory"
              value={filters.stateTeory}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="statePractic"
              placeholder="State Practic"
              value={filters.statePractic}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="tarif"
              placeholder="Tarif"
              value={filters.tarif}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="balans"
              placeholder="Balans"
              value={filters.balans}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="filial"
              placeholder="Filial"
              value={filters.filial}
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
                <th>Date Born</th>
                <th>State Teory</th>
                <th>State Practic</th>
                <th>Tarif</th>
                <th>Balans</th>
                <th>Filial</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <React.Fragment key={student.id}>
                  {editingStudent && editingStudent.id === student.id ? (
                    <tr>
                      <td>{student.id}</td>
                      <td>
                        <input
                          type="text"
                          value={editingStudent.FIO}
                          onChange={(e) => handleInputChange(e, 'FIO')}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingStudent.mobile}
                          onChange={(e) => handleInputChange(e, 'mobile')}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingStudent.email}
                          onChange={(e) => handleInputChange(e, 'email')}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingStudent.dateBorn}
                          onChange={(e) => handleInputChange(e, 'dateBorn')}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingStudent.stateTeory}
                          onChange={(e) => handleInputChange(e, 'stateTeory')}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingStudent.statePractic}
                          onChange={(e) => handleInputChange(e, 'statePractic')}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingStudent.tarif}
                          onChange={(e) => handleInputChange(e, 'tarif')}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingStudent.balans}
                          onChange={(e) => handleInputChange(e, 'balans')}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingStudent.filial.name}
                          onChange={(e) => handleInputChange(e, 'filial.name')}
                        />
                      </td>
                      <td>
                        <button onClick={handleSaveStudent}>Save</button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td>{student.id}</td>
                      <td>{student.FIO}</td>
                      <td>{student.mobile}</td>
                      <td>{student.email}</td>
                      <td>{student.dateBorn}</td>
                      <td>{student.stateTeory}</td>
                      <td>{student.statePractic}</td>
                      <td>{student.tarif}</td>
                      <td>{student.balans}</td>
                      <td>{student.filial.name}</td>
                      <td className="actions">
                        <button onClick={() => handleEditStudent(student)}>Edit</button>
                        <button onClick={() => handleShowStudentSigns(student)}>Show</button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <button className="student-add-button" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Отмена' : 'Добавить ученика'}
          </button>
          {showAddForm && (
            <div className="student-add-form-container">
              <h3 className="student-add-form-container-h3">Регистрация студента</h3>
              {!additionalInfo ? (
                <form onSubmit={(e) => { e.preventDefault(); setAdditionalInfo(true); }}>
                  <div className="student-add-form-group">
                    <label className="student-add-form-group-label">ФИО</label>
                    <input
                      type="text"
                      name="FIO"
                      placeholder="Full Name"
                      value={newStudent.FIO}
                      onChange={handleAddStudentChange}
                      className="student-add-form-group-input"
                    />
                  </div>
                  <div className="student-add-form-group">
                    <label className="student-add-form-group-label">Почта</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={newStudent.email}
                      onChange={handleAddStudentChange}
                      className="student-add-form-group-input"
                    />
                  </div>
                  <div className="student-add-form-group">
                    <label className="student-add-form-group-label">Пароль</label>
                    <input
                      type="password"
                      name="studPassword"
                      placeholder="Password"
                      value={newStudent.studPassword}
                      onChange={handleAddStudentChange}
                      className="student-add-form-group-input"
                    />
                  </div>
                  <button type="submit" className="student-add-form-submit-button">Далее</button>
                </form>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleAddStudentSubmit(); }}>
                  <div className="student-add-form-group">
                    <label className="student-add-form-group-label">Дата рождения</label>
                    <input
                      type="date"
                      name="dateBorn"
                      placeholder="Date of Birth"
                      value={newStudent.dateBorn}
                      onChange={handleAddStudentChange}
                      className="student-add-form-group-input"
                    />
                  </div>
                  <div className="student-add-form-group">
                    <label className="student-add-form-group-label">Номер телеофона</label>
                    <input
                      type="text"
                      name="mobile"
                      placeholder="Phone Number"
                      value={newStudent.mobile}
                      onChange={handleAddStudentChange}
                      className="student-add-form-group-input"
                    />
                  </div>
                  <div className="student-add-form-group">
                    <label className="student-add-form-group-label">Филиал</label>
                    <select
                      name="filial"
                      value={newStudent.filial}
                      onChange={handleAddStudentChange}
                      className="student-add-form-group-select"
                    >
                      {filials.map((filial, index) => (
                        <option key={index} value={filial}>{filial}</option>
                      ))}
                    </select>
                  </div>
                  <div className="student-add-form-group">
                    <label className="student-add-form-group-label">Тариф</label>
                    <select
                      name="tarif"
                      value={newStudent.tarif}
                      onChange={handleAddStudentChange}
                      className="student-add-form-group-select"
                    >
                      {tarifs.map((tarif, index) => (
                        <option key={index} value={tarif}>{tarif}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="student-add-form-submit-button">Создать</button>
                </form>
              )}
            </div>
          )}
        </>
      ) : (
        <StudentSigns student={showingStudentSigns} onBack={handleBackToStudents} />
      )}
    </div>
  );
};

export default Students;
