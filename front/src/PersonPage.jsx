import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "./components/main/footer/Footer";
import Accountheader from './components/personal_account/account_header/Accountheader';
import Accountmain from "./components/personal_account/accountmain/Accountmain";
import Signs from './components/personal_account/accountmain/Signs';
import SignForm from './components/personal_account/accountmain/SignForm';
import ConfirmationModal from './components/personal_account/accountmain/Modal/ConfirmationModal';
import FilterForm from './components/personal_account/accountmain/FilterForm';
import { UserContext } from './UserContext';
import { SignsContext } from './SignsContext';

const PersonPage = () => {
    const { userData } = useContext(UserContext);
    const { signs, setSigns } = useContext(SignsContext);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [filteredSigns, setFilteredSigns] = useState([]);
    const [sortAscending, setSortAscending] = useState(true);
    const [filials, setFilials] = useState([]);
    const [prepods, setPrepods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (userData && userData.email.startsWith('Admin')) {
            navigate('/admin');
        }
    }, [userData, navigate]);

    // Загружаем записи пользователя
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/signs/find_active', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const transformedSigns = data.map(sign => ({
                id: sign.id,
                type: sign.typeSign,
                date: sign.dataSign,
                time: sign.timeSlot,
                place: sign.student.filial.name,
                prepod: sign.prepod.fio
            }));
            setSigns(transformedSigns);
            setFilteredSigns(transformedSigns); // Синхронизируем фильтрованные записи
        })
        .catch(error => {
            console.error('Error fetching signs:', error);
        });
    }, [userData, setSigns]);

    // Синхронизируем filteredSigns при изменении signs
    useEffect(() => {
        setFilteredSigns(signs);
    }, [signs]);

    // Загружаем филиалы
    const fetchFilials = () => {
        fetch('http://localhost:8080/api/v1/filials/find_all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setFilials(data);
        })
        .catch(error => {
            console.error('Error fetching filials:', error);
        });
    };

    // Загружаем преподавателей
    const fetchPrepods = () => {
        fetch('http://localhost:8080/api/v1/prepods/find_all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched prepods:', data); // Лог данных преподавателей
            setPrepods(data);
        })
        .catch(error => {
            console.error('Error fetching prepods:', error);
        });
    };

    useEffect(() => {
        fetchFilials();
        fetchPrepods();
    }, []);

    const handleEditSign = (updatedSign) => {
        const updatedSigns = signs.map(s => (s.id === updatedSign.id ? updatedSign : s));
        setSigns(updatedSigns);
    };

    const handleDeleteSign = (id) => {
        fetch('http://localhost:8080/api/v1/signs/delete_sign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            const updatedSigns = signs.filter(sign => sign.id !== id);
            setSigns(updatedSigns);
        })
        .catch(error => {
            console.error('Error deleting sign:', error);
        });
    };

    const confirmDelete = () => {
        const updatedSigns = signs.filter(sign => sign.id !== idToDelete);
        setSigns(updatedSigns);
        setShowModal(false);
        setIdToDelete(null);
    };

    const cancelDelete = () => {
        setShowModal(false);
        setIdToDelete(null);
    };

    const handleFilter = (filter) => {
        const filtered = signs.filter(sign => {
            return (
                (filter.type === '' || sign.type === filter.type) &&
                (filter.date === '' || sign.date === filter.date) &&
                (filter.place === '' || sign.place.includes(filter.place)) &&
                (filter.prepod === '' || sign.prepod.includes(filter.prepod))
            );
        });
        setFilteredSigns(filtered);
    };

    const handleSort = () => {
        const sorted = [...filteredSigns].sort((a, b) => {
            if (sortAscending) {
                return new Date(a.date) - new Date(b.date);
            } else {
                return new Date(b.date) - new Date(a.date);
            }
        });
        setFilteredSigns(sorted);
        setSortAscending(!sortAscending);
    };

    const handleResetFilter = () => {
        setFilteredSigns(signs);
    };

    return (
        <div>
            <Accountheader data={userData} />
            <Accountmain data={userData} />
            <FilterForm
                onFilter={handleFilter}
                onSort={handleSort}
                onReset={handleResetFilter}
                filials={filials}
                prepods={prepods}
            />
            <div className="accountmain">
                <Signs
                    signs={filteredSigns}
                    onEditSign={handleEditSign}
                    onDelete={handleDeleteSign}
                    availableSlots={availableSlots}
                    prepods={prepods}
                    userData={userData}
                />
            </div>
            {userData && userData.filial && (
                <SignForm
                    availableSlots={availableSlots}
                    userData={userData}
                    prepods={prepods}
                    setSigns={setSigns}
                />
            )}
            <Footer />
            {showModal && (
                <ConfirmationModal
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
};

export default PersonPage;
