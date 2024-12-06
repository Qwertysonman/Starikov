import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';
import { FaTimes, FaUser, FaLock, FaEnvelope, FaCalendar, FaPhone, FaBuilding, FaMoneyBill } from "react-icons/fa";
import { UserContext } from './../../UserContext';

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState(false);
    const [formData, setFormData] = useState({
        FIO: '',
        email: '',
        studPassword: '',
        dateBorn: '',
        mobile: '',
        tarif: '',
        filial: ''
    });
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [filials, setFilials] = useState([]);
    const [tarifs, setTarifs] = useState([]);
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);

    const registerLink = () => {
        setAction('active');
    };

    const loginLink = () => {
        setAction('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        setAdditionalInfo(true);
    };

    const handleAdditionalInfoSubmit = (e) => {
        e.preventDefault();
        sendRegisterData(formData);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const email = formData.email;
        if (email.startsWith('Admin')) {
            sendAdminLoginData({
                email: formData.email,
                studPassword: formData.studPassword
            });
        } else if (email.startsWith('Prepod')) {
            sendPrepodLoginData({
                email: formData.email,
                studPassword: formData.studPassword
            });
        } else {
            sendLoginData({
                email: formData.email,
                studPassword: formData.studPassword
            });
        }
    };

    const sendRegisterData = (data) => {
        const url = 'http://localhost:8080/api/v1/students/register';
        const { filial, ...rest } = data;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                student: rest,
                filial_name: filial
            })
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    setError('Неверные почта или пароль. Повторите еще раз.');
                } else {
                    setError('Ошибка регистрации. Повторите еще раз.');
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUserData(data);
            setResponseData(data);
            navigate('/person');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const sendLoginData = (data) => {
        const url = 'http://localhost:8080/api/v1/students/login';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    setError('Неверные почта или пароль. Повторите еще раз.');
                } else {
                    setError('Ошибка регистрации. Повторите еще раз.');
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUserData(data);
            setResponseData(data);
            navigate('/person');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const sendAdminLoginData = (data) => {
        const url = 'http://localhost:8080/api/v1/admins/admin_login';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    setError('Неверные почта или пароль. Повторите еще раз.');
                } else {
                    setError('Ошибка регистрации. Повторите еще раз.');
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUserData(data);
            setResponseData(data);
            navigate('/admin');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const sendPrepodLoginData = (data) => {
        const url = 'http://localhost:8080/api/v1/prepods/prepod_login';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    setError('Неверные почта или пароль. Повторите еще раз.');
                } else {
                    setError('Ошибка регистрации. Повторите еще раз.');
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUserData(data);
            setResponseData(data);
            navigate('/prepod');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const closeErrorMessage = () => {
        setError(null);
    };

    const fetchFilials = () => {
        const url = 'http://localhost:8080/api/v1/filials/find_all';

        fetch(url, {
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
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const fetchTarifs = () => {
        const url = 'http://localhost:8080/api/v1/tarifs/find_all';

        fetch(url, {
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
            setTarifs(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    useEffect(() => {
        fetchFilials();
        fetchTarifs();
    }, []);

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="login-register-container">
            <div className={`login-register-wrapper ${action}`}>
                <button className="close-button" onClick={handleClose}>
                    <FaTimes />
                </button>
                {!additionalInfo ? (
                    <>
                        <div className={`form-box login ${action}`}>
                            <form onSubmit={handleLoginSubmit}>
                                <h1>Login</h1>
                                <div className="input-box">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder='Email'
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    <FaEnvelope className="icon" />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="password"
                                        name="studPassword"
                                        placeholder='Password'
                                        required
                                        value={formData.studPassword}
                                        onChange={handleInputChange}
                                    />
                                    <FaLock className="icon" />
                                </div>
                                <div className="remember-forgot">
                                    <label><input type="checkbox" />Remember me</label>
                                    <a href="#">Forgot password?</a>
                                </div>
                                <button type="submit">Login</button>
                                <div className='register-link'>
                                    <p>Don't have an account?
                                        <a href="#" onClick={(e) => { e.preventDefault(); registerLink(); }}> Register</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                        <div className={`form-box register ${action}`}>
                            <form onSubmit={handleRegisterSubmit}>
                                <h1>Registration</h1>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        name="FIO"
                                        placeholder='FIO'
                                        required
                                        value={formData.FIO}
                                        onChange={handleInputChange}
                                    />
                                    <FaUser className="icon" />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder='Email'
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    <FaEnvelope className="icon" />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="password"
                                        name="studPassword"
                                        placeholder='Password'
                                        required
                                        value={formData.studPassword}
                                        onChange={handleInputChange}
                                    />
                                    <FaLock className="icon" />
                                </div>
                                <div className="remember-forgot">
                                    <label><input type="checkbox" />I agree to the terms & conditions</label>
                                </div>
                                <button type="submit">Next</button>
                                <div className='register-link'>
                                    <p>Already have an account?
                                        <a href="#" onClick={(e) => { e.preventDefault(); loginLink(); }}> Login </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="form-box additional-info">
                        <form onSubmit={handleAdditionalInfoSubmit}>
                            <h1>Additional Information</h1>
                            <div className="input-box">
                                <input
                                    type="date"
                                    name="dateBorn"
                                    placeholder='Date of Birth'
                                    required
                                    value={formData.dateBorn}
                                    onChange={handleInputChange}
                                />
                                <FaCalendar className="icon" />
                            </div>
                            <div className="input-box">
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder='Phone Number'
                                    required
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                />
                                <FaPhone className="icon" />
                            </div>
                            <div className="input-box">
                                <select
                                    name="filial"
                                    required
                                    value={formData.filial}
                                    onChange={handleInputChange}
                                >
                                    {filials.map((filial, index) => (
                                        <option key={index} value={filial}>{filial}</option>
                                    ))}
                                </select>
                                <FaBuilding className="icon" />
                            </div>
                            <div className="input-box">
                                <select
                                    name="tarif"
                                    required
                                    value={formData.tarif}
                                    onChange={handleInputChange}
                                >
                                    {tarifs.map((tarif, index) => (
                                        <option key={index} value={tarif}>{tarif}</option>
                                    ))}
                                </select>
                                <FaMoneyBill className="icon" />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}
                {responseData && (
                    <div className="response-data">
                        <h2>Response from Server</h2>
                        <pre>{JSON.stringify(responseData, null, 2)}</pre>
                    </div>
                )}
                {error && (
                    <div className="error-message">
                        <button className="close-button" onClick={closeErrorMessage}>
                            <FaTimes />
                        </button>
                        <h2>Error</h2>
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginRegister;
