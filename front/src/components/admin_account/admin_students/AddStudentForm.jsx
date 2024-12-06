import React, { useState, useEffect } from 'react';
import './AddStudentForm.css';

const AddStudentForm = ({ onAddStudent }) => {
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
  const [additionalInfo, setAdditionalInfo] = useState(false);

  useEffect(() => {
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

    fetchFilials();
    fetchTarifs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { filial, ...rest } = newStudent;
      const response = await fetch('http://localhost:8080/api/v1/students/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student: rest, filial_name: filial })
      });
      const addedStudent = await response.json();
      onAddStudent(addedStudent);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="add-student-form-container">
      <h3 className="add-student-form-container-h3">Добавить нового студента</h3>
      {!additionalInfo ? (
        <form onSubmit={(e) => { e.preventDefault(); setAdditionalInfo(true); }}>
          <div className="add-student-form-group">
            <label htmlFor="FIO" className="add-student-form-group-label">Full Name</label>
            <input
              type="text"
              name="FIO"
              id="FIO"
              placeholder="Full Name"
              value={newStudent.FIO}
              onChange={handleInputChange}
              className="add-student-form-group-input"
            />
          </div>
          <div className="add-student-form-group">
            <label htmlFor="email" className="add-student-form-group-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={newStudent.email}
              onChange={handleInputChange}
              className="add-student-form-group-input"
            />
          </div>
          <div className="add-student-form-group">
            <label htmlFor="studPassword" className="add-student-form-group-label">Password</label>
            <input
              type="password"
              name="studPassword"
              id="studPassword"
              placeholder="Password"
              value={newStudent.studPassword}
              onChange={handleInputChange}
              className="add-student-form-group-input"
            />
          </div>
          <button type="submit" className="add-student-form-submit-button">Next</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="add-student-form-group">
            <label htmlFor="dateBorn" className="add-student-form-group-label">Date of Birth</label>
            <input
              type="date"
              name="dateBorn"
              id="dateBorn"
              placeholder="Date of Birth"
              value={newStudent.dateBorn}
              onChange={handleInputChange}
              className="add-student-form-group-input"
            />
          </div>
          <div className="add-student-form-group">
            <label htmlFor="mobile" className="add-student-form-group-label">Phone Number</label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              placeholder="Phone Number"
              value={newStudent.mobile}
              onChange={handleInputChange}
              className="add-student-form-group-input"
            />
          </div>
          <div className="add-student-form-group">
            <label htmlFor="filial" className="add-student-form-group-label">Filial</label>
            <select name="filial" id="filial" value={newStudent.filial} onChange={handleInputChange} className="add-student-form-group-select">
              {filials.map((filial, index) => (
                <option key={index} value={filial.name}>
                  {filial.name}
                </option>
              ))}
            </select>
          </div>
          <div className="add-student-form-group">
            <label htmlFor="tarif" className="add-student-form-group-label">Tarif</label>
            <select name="tarif" id="tarif" value={newStudent.tarif} onChange={handleInputChange} className="add-student-form-group-select">
              {tarifs.map((tarif, index) => (
                <option key={index} value={tarif}>
                  {tarif}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-student-form-submit-button">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AddStudentForm;
