import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import LoginRegister from './components/logreg/LoginRegister';
import PersonPage from './PersonPage';
import AdminPage from './AdminPage';
import PrepodPage from './PrepodPage';
import { UserProvider } from './UserContext';
import { SignsProvider } from './SignsContext';


const App = () => {
    return (
        <SignsProvider>
            <UserProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<LoginRegister />} />
                        <Route path="/person" element={<PersonPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/prepod" element={<PrepodPage />}/>
                    </Routes>
                </Router>
            </UserProvider>
        </SignsProvider>
    );
};

export default App;
